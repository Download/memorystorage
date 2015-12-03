/*! 
 * memorystorage.js - A memory-backed implementation of the Web Storage API.
 *
 * @copyright Copyright 2015 by Stijn de Witt. Some rights reserved. 
 * @license Licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
 */
// API methods and properties will be cloaked
var API = {'clear':1, 'getItem':1, 'id':1, 'key':1, 'length':1, 'removeItem':1, 'setItem':1},
	CLOAK = '__memorystorage_cloaked_items__';

// Used to store all memorystorage objects
var storage = {};

/** @module memorystorage */

/**
 * Creates a new MemoryStorage object implementing the <a href="http://www.w3.org/TR/webstorage/">Web Storage API</a> using memory.
 * 
 * <p>If no arguments are given, the created memory storage object will read from and write to the
 * <code>global</code> memory storage. If a string argument is given, the new storage object
 * will read from and write to it's own segment of memory. Any data written to such a memory
 * storage object will only show up in other memory storage objects that have been created with
 * the same id. This data will not show up in the <code>global</code> memory space. As such it 
 * is recommended to always construct a memory storage object with a unique string id as argument.</p> 
 * 
 * @param id Optional string argument used to isolate this memory storage object from others.
 *
 * @alias module:memorystorage.MemoryStorage
 * @class 
 */
function MemoryStorage(id) {// jshint ignore:line
	// make sure id is assigned
	id = id || 'global';
	// try to get existing store
	var result = storage[id]; 
	// return it if found
	if (result) {return result;}
	
	// make sure there is no harm in leaving out new in invocations to MemoryStorage
	if (! (this instanceof MemoryStorage)) {return new MemoryStorage(id);}
	
	// create a new store and save a ref to it so we can get it back later
	result = storage[id] = this;
	// create a space to store 'cloaked' key/values: items that have a key
	// that collides with Web Storage API method names.
	var cloaked = {};
	Object.defineProperty(result, CLOAK, {
		enumerable: false,
		configurable: true,
		get: function(){return cloaked;}
	});
	/**
	 * private method to find all enumerable keys
	 * @returns {Array.<String>}
	 */
	function enumerableKeys(){
		var keys = Object.keys(result).filter(function(x){return !(x in API);});
		return keys.concat(Object.keys(cloaked));
	}

	// Allow client code to read the id
	Object.defineProperty(result, 'id', {
		enumerable: true,
		configurable: true,
		get: function(){return id;}
	});
	// Create the length property
	Object.defineProperty(result, 'length', {
		enumerable: true,
		configurable: true,
		get: function(){
			return enumerableKeys().length;
		}
	});
	// Create API methods
	result.getItem = function MemoryStorage_getItem(key) {
		return key in API ? this[CLOAK][key] : this[key];
	};
	result.setItem = function MemoryStorage_setItem(key, val) {
		if (key in API) {this[CLOAK][key] = val;}
		else {this[key] = val;}
	};
	result.removeItem = function MemoryStorage_removeItem(key) {
		if (key in API) {delete this[CLOAK][key];}
		else {delete this[key];}
	};
	/**
	 * Needed to enumerate over all items in the collection
	 * @param {Number} idx - the index
	 * @returns {null|string} - the name of the nth key in the storage
	 */
	result.key = function MemoryStorage_key(idx) {
		var keys = enumerableKeys();
		return idx >= 0 && idx < keys.length ? keys[idx] : null;
	};
	result.clear = function MemoryStorage_clear() {
		var keys = Object.keys(this).filter(function(x){return !(x in API);});
		for (var i=0,key; key=keys[i]; i++) {
			if (! (key in API)) {delete this[key];}
		}
		keys = Object.keys(this[CLOAK]);
		for (var i=0,key; key=keys[i]; i++) {
			delete this[CLOAK][key];
		}
	};

	if (typeof Proxy === 'undefined')
	{
		return result;
	}
	// ES6 Proxy to support Object.keys() on a MemoryStorage object
	return new Proxy(result, {
		ownKeys: function() {
			return enumerableKeys();
		}
	});
}
