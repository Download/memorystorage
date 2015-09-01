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
	 * <p>An options object may be passed as the second argument. At the moment only one option is available:</p>
	 *
	 * <table>
	 *   <tr><th>Name</th><th>Type</th><th>Default</th><tr>
	 *   <tr><td>idKey</td><td>String</td><td>'memId'</td><tr>
	 * </table>
	 * 
	 * @param id Optional string argument used to isolate this memory storage object from others.
	 * @param options Optional options object. 
	 *
	 * @alias module:memorystorage.MemoryStorage
	 * @class 
	 */
	function MemoryStorage(id, options) {
		var idKey = options && options.idKey || 'memId';
		this[idKey] = id || 'global';
		if (!storage[this[idKey]]) {storage[this[idKey]] = {};}
		var keys = Object.keys(storage[this[idKey]]);
		Object.defineProperty(this, 'length', {
			enumerable: true,
			get: function(){return keys.length;}
		});		
		this.getItem = function MemoryStorage_getItem(key) {
			return storage[this[idKey]][key];
		};
		this.setItem = function MemoryStorage_setItem(key, val) {
			if (! (key in storage[this[idKey]])) {
				keys.push(key);
			}
			storage[this[idKey]][key] = val;
		};
		this.removeItem = function MemoryStorage_removeItem(key) {
			if (key in storage[this[idKey]]) {
				keys.splice(keys.indexOf(key), 1);
				delete storage[this[idKey]][key];
			}
		};
		this.key = function MemoryStorage_key(idx) {
			return idx >= 0 && idx < keys.length ? keys[idx] : null;
		};
		this.clear = function MemoryStorage_clear() {
			for (var i=0; i<keys.length; i++) {
				delete storage[this[idKey]][keys[i]];
			}
			keys.splice(0, keys.length);
		};
	}
	
	// Used to store all data
	var storage = {};

	// EXPOSE
	return MemoryStorage;
}));
