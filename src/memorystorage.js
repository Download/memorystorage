/*! 
 * memorystorage.js - A memory-backed implementation of the Web Storage API.
 *
 * @copyright Copyright 2015 by Stijn de Witt. Some rights reserved. 
 * @license Licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
 */
(function (u,m,d) {
    if (typeof define === 'function' && define.amd) {define(d);} 
    else if (typeof exports === 'object') {module.exports = d();} 
    else {u[m] = d();}
}(this, 'MemoryStorage', function(){
	'use strict';

	var API = {'clear':1, 'getItem':1, 'key':1, 'length':1, 'removeItem':1, 'setItem':1},
		API_LENGTH = Object.keys(API).length,
		CLOAK = '__memorystorage_cloaked_items__';

	// Used to store all data
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
	function MemoryStorage(id) {
		id = id || 'global';
		var result = storage[id]; 
		if (result) {return result;}
		
		result = storage[id] = this;
		// create a space to store 'cloaked' key/values: items that have a key
		// that collides with Web Storage API method names.
		var cloaked = {};
		Object.defineProperty(this, CLOAK, {
			enumerable: false,
			get: function(){return cloaked;}
		});
		Object.defineProperty(this, 'length', {
			enumerable: true,
			get: function(){
				return Object.keys(this).length + Object.keys(this[CLOAK]).length - API_LENGTH;
			}
		});
		this.getItem = function MemoryStorage_getItem(key) {
			return key in API ? this[CLOAK][key] : this[key];
		};
		this.setItem = function MemoryStorage_setItem(key, val) {
			if (key in API) {this[CLOAK][key] = val;}
			else {this[key] = val;}
		};
		this.removeItem = function MemoryStorage_removeItem(key) {
			if (key in API) {delete this[CLOAK][key];}
			else {delete this[key];}
		};
		this.key = function MemoryStorage_key(idx) {
			var keys = Object.keys(this).concat(Object.keys(this[CLOAK]));
			keys = keys.filter(function(x){return !(x in API);});
			return idx >= 0 && idx < keys.length ? keys[idx] : null;
		};
		this.clear = function MemoryStorage_clear() {
			var keys = Object.keys(this).filter(function(x){return !(x in API);});
			for (var i=0,key; key=keys[i]; i++) {
				if (! (key in API)) {delete this[key];}
			}
			keys = Object.keys(this[CLOAK]);
			for (var i=0,key; key=keys[i]; i++) {
				delete this[CLOAK][key];
			}
		};
		return result;
	}
	
	// EXPOSE
	return MemoryStorage;
}));
