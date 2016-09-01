(function (u, m, d) {
	if (typeof define === 'function' && define.amd) {define('memorystorage', [], function(){return (d());});}
	else if (typeof exports === 'object') {module.exports = d();}
	else {u[m] = d();}
}(this, 'MemoryStorage', function() {'use strict';

/*! memorystorage.js - A memory-backed implementation of the Web Storage API.
 *
 * @copyright Copyright 2016 by Stijn de Witt and contributors. Some rights reserved.
 * @license Licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
 */

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
 */
function MemoryStorage(id) {
	// make sure id is assigned
	id = id || 'global'
	// try to get existing store
	var result = storage[id]
	// return it if found
	if (result) {return result}

	// make sure there is no harm in leaving out new in invocations to MemoryStorage
	if (! (this instanceof MemoryStorage)) {return new MemoryStorage(id);}

	// create a new store and save a ref to it so we can get it back later
	result = storage[id] = this;
	// create a space to store 'cloaked' key/values: items that have a key
	// that collides with Web Storage API method names.
	var cloak = {};

	// Allow client code to read the id
	Object.defineProperty(result, 'id', {enumerable:true, configurable:true, value:id})

	// Create the length property
	Object.defineProperty(result, 'length', {enumerable:true, configurable:true, get:function(){
		return enumerableKeys().length
	}})

	// Create API methods
	result.getItem = function MemoryStorage_getItem(key) {
		return (key in API ? cloak[key] : this[key]) || null
	}
	result.setItem = function MemoryStorage_setItem(key, val) {
		key in API ? cloak[key] = val : this[key] = val
	}
	result.removeItem = function MemoryStorage_removeItem(key) {
		key in API ? delete cloak[key] : delete this[key]
	}
	result.key = function MemoryStorage_key(idx) {
		var keys = enumerableKeys()
		return idx >= 0 && idx < keys.length ? keys[idx] : null
	}
	result.clear = function MemoryStorage_clear() {
		var keys = uncloakedKeys()
		for (var i=0,key; key=keys[i]; i++) {
			delete this[key]
		}
		keys = cloakedKeys()
		for (var i=0,key; key=keys[i]; i++) {
			delete cloak[key]
		}
	}

	// Wrap in ES6 Proxy if available to support Object.keys() on a MemoryStorage object
	return typeof Proxy === 'undefined' ? result : new Proxy(result, {ownKeys: function() {return enumerableKeys()}})

	// helper functions
	function uncloakedKeys() {return Object.keys(result).filter(function(x){return !(x in API)})}
	function cloakedKeys() {return Object.keys(cloak)}
	function enumerableKeys(){return uncloakedKeys().concat(cloakedKeys())}
}

// API methods and properties will be cloaked
var API = {clear:1, getItem:1, id:1, key:1, length:1, removeItem:1, setItem:1}

// Used to store all memorystorage objects
var storage = {};


return MemoryStorage;
}));
