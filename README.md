# memorystorage <sub><sup>v0.12.0</sup></sub>
Memory-backed storage that implements the [Web Storage API](http://www.w3.org/TR/webstorage/), making it a drop-in replacement for `localStorage` and `sessionStorage` in environments where these are not available.
[Project website](http://download.github.io/memorystorage)

[![npm](https://img.shields.io/npm/v/memorystorage.svg?maxAge=2592000)](https://npmjs.com/package/memorystorage)
[![license](https://img.shields.io/npm/l/memorystorage.svg)](https://creativecommons.org/licenses/by/4.0/)
[![travis](https://img.shields.io/travis/Download/memorystorage.svg)](https://travis-ci.org/Download/memorystorage)
[![greenkeeper](https://img.shields.io/david/Download/memorystorage.svg?maxAge=2592000)](https://greenkeeper.io/)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

<sup><sub><sup><sub>.</sub></sup></sub></sup>

![logo](https://rawgit.com/download/memorystorage/0.12.0/memorystorage.png)

<sup><sub><sup><sub>.</sub></sup></sub></sup>


## Installation
**For Node**
```sh
npm install --save memorystorage
```

**For browsers**
## Include on your page
`memorystorage` can be used directly from CDN, from a local script file, or from a module loader.

### CDN
This is by far the easiest method and gives good performance to boost. Use this if you are in doubt.
```xml
<script src="https://cdn.rawgit.com/download/memorystorage/0.12.0/dist/memorystorage.min.js"></script>
```

### Local script file
Download memorystorage.min.js, place it in a folder `lib` in the root of your website and include it like this:
```xml
<script src="lib/memorystorage.min.js"></script>
```

#### Download
* [memorystorage.umd.js](https://cdn.rawgit.com/download/memorystorage/0.12.0/dist/memorystorage.umd.js) (~4kB, commented)
* [memorystorage.min.js](https://cdn.rawgit.com/download/memorystorage/0.12.0/dist/memorystorage.min.js) (~2kB, minified)
* [memorystorage.min.js.map](https://cdn.rawgit.com/download/memorystorage/0.12.0/dist/memorystorage.min.js.map) (~2kB, debug map file)

### Module loaders
Memorystorage implements the Universal Module Pattern and as such, is available to be consumed
from Node modules as well as via an AMD loader such as RequireJS.

#### Node
```javascript
var MemoryStorage = require('memorystorage');
// here, the MemoryStorage function is available
var myStorage = new MemoryStorage('my-app');
```

#### AMD
```javascript
define(['memorystorage'], function(MemoryStorage){
	// here, the MemoryStorage function is available
	var myStorage = new MemoryStorage('my-app');
});
```
To be able to load MemoryStorage from CDN as an AMD module, configure the CDN url like so <small>(note the absence of `.js` in the url)</small>:
```javascript
require.config({
	paths: {
		'memorystorage': 'https://cdn.rawgit.com/download/memorystorage/0.12.0/dist/memorystorage.min'
	}
});
```

#### ES2015
```js
import MemoryStorage from 'memorystorage'
// here, the MemoryStorage function is available
const myStorage = new MemoryStorage('my-app');
```

## Create a memory storage object
The `MemoryStorage` function creates (or returns) a storage object implementing the W3C Web Storage API.
By default, scripts share a `global` storage object, so scripts can access and mutate each other's store
object. To have MemoryStorage create a storage object that is isolated from other scripts, you pass in
a unique ID which acts as a namespace:

```javascript
var isolated = new MemoryStorage('my-app'); // isolated from other scripts, recommended.
```

If you don't pass in an ID, or use the ID `'global'`, you get a globally shared storage object:

```javascript
var global = new MemoryStorage(); // will default to a globally shared storage object.
var global2 = new MemoryStorage('global'); // effectively same as above
```

For your convenience, the constructor permits `new`-less invocation:
```javascript
var store = MemoryStorage('my-store');
var global = MemoryStorage();
```

Instances of `MemoryStorage` expose an immutable `id` property that is set to
the id the store was created with:

```javascript
alert(store.id); // alerts 'my-store'
alert(global.id); // alerts 'global'
```

## Use it
```javascript
store.setItem('myString', 'Hello MemoryStorage!');
store.myObject = JSON.stringify({my: 'object'}));
alert(store.getItem('My string')); // alerts 'Hello MemoryStorage!'
alert(store['My string']); // alerts 'Hello MemoryStorage!'
alert(store.length); // alerts '2'
alert(store.key(1)); // alerts 'My object'
store.removeItem('My string');
alert(store.length); // alerts '1'
store.clear();
alert(store.length); // alerts '0'
```

## Staying within the Web Storage API
The Web Storage API is pretty small. For discovering which key-value pairs are available within
the storage object, you basically only have the `length` property and the `key(idx)` function.
The same applies to reading, writing and removing keys. You have the functions `getItem`, `setItem`
and `removeItem` and there is `clear` but that pretty much sums it up.

In practice there are many other ways to interact with storage objects, such as `store[myKey] = myValue`,
or `delete store[myKey]` or `Object.keys(store)` etc, but please remember that when you use these
constructs, you venture outside the interface provided by the Web Storage API and run the risk of
incompatibility.

This project is committed to be as compatible as possible with the `localStorage` object present in
real-life browsers, but due to inherent limitations to the Javascript language, it's impossible to
guarantee the same behavior in all instances if you go beyond the Web Storage API.

### Example of going outside of the API
Here is some code to print all the keys and values in the `store` object that does not limit itself
to the Web Storage API:
```js
var keys = Object.keys(store);
for (var i=0; i<keys.length; i++) {
	var key = keys(i);
	var value = store[key];
	console.info(key + ': ' + value);
}
```

### Example of staying within the API
Here is the same code, rewritten to stay within the API:
```js
for (var i=0; i<store.length; i++) {
	var key = store.key(i);
	var value = store.getItem(key);
	console.info(key + ': ' + value);
}
```

## Beyond the Web Storage API
MemoryStorage is type-agnostic; it doesn't care about the type of data you store.
If you want to remain within the Web Storage API, you should only read and write strings,
however if you want you can store other types just as well:
```javascript
store.myObject = {my: 'object'};
alert(store.myObject.my); // alerts 'object'
var tree = {
	nested: {
		objects: {
			working: 'Sure!'
		}
	}
}
store.setItem('tree', tree);
alert(store.tree.nested.objects.working); // alerts 'Sure!'
```

## Contributors
I'd like to draw your attention to the people that contributed to this project with bug reports,
documentation, pull requests or other forms of support.
* [Stafford Brunk](https://github.com/wingrunr21)
	 * [Push v0.9.10 to NPM #1](https://github.com/Download/memorystorage/issues/1) (reported issue)
* [Matthias Seemann](https://github.com/semmel):
   * [Items with store API key names are considered by key() #3](https://github.com/Download/memorystorage/pull/3) (code contribution)
   * [getItem should return null for not-existing keys #4](https://github.com/Download/memorystorage/pull/4) (code contribution)
* [Chris Smola](https://github.com/Smolations)
   * [Add npm install to README #5](https://github.com/Download/memorystorage/issues/5) (reported issue)
* [Corentin Minne](https://github.com/CorentinMinne)
   * [Invalid exports in package.json #14](https://github.com/Download/memorystorage/issues/14) (code contribution)

## Copyright
©2016 by Stijn de Witt and contributors. Some rights reserved.

## License
Licensed under the [Creative Commons Attribution 4.0 International (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/) Open Source license.
