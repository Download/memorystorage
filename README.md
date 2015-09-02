# memorystorage <sub><sup>v0.9.6</sup></sub>
Memory-backed storage that implements the [Web Storage API](http://www.w3.org/TR/webstorage/), making it a drop-in replacement for `localStorage` and `sessionStorage` in environments where these are not available. 
[Project website](http://download.github.io/memorystorage)

## Download
* [memorystorage.js](https://cdn.rawgit.com/download/memorystorage/0.9.6/src/memorystorage.js) (~3kB, commented)
* [memorystorage.min.js](https://cdn.rawgit.com/download/memorystorage/0.9.6/dist/memorystorage.min.js) (~2kB, minified)
* [memorystorage.min.js.map](https://cdn.rawgit.com/download/memorystorage/0.9.6/dist/memorystorage.min.js.map) (~2kB, debug map file)

## Include on your page
`memorystorage` can be used directly from CDN, or from a local script file.

### CDN
```xml
<script src="https://cdn.rawgit.com/download/memorystorage/0.9.6/dist/memorystorage.min.js"></script>
```

### Local script file
Download memorystorage.min.js, place it in a folder `lib` in the root of your website and include it like this:
```xml
<script src="lib/memorystorage.min.js"></script>
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

## Copyright
Copyright 2015 by Stijn de Witt. Some rights reserved.

## License
Licensed under the [Creative Commons Attribution 4.0 International (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/) Open Source license.