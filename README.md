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
```javascript
var memoryStorage = new MemoryStorage('my-app');
```

## Use it
```javascript
memoryStorage.setItem('myString', 'Hello MemoryStorage!');
memoryStorage.myObject = JSON.stringify({my: 'object'}));
alert(memoryStorage.getItem('My string')); // alerts 'Hello MemoryStorage!'
alert(memoryStorage['My string']); // alerts 'Hello MemoryStorage!'
alert(memoryStorage.length); // alerts '2'
alert(memoryStorage.key(1)); // alerts 'My object'
memoryStorage.removeItem('My string');
alert(memoryStorage.length); // alerts '1'
memoryStorage.clear();
alert(memoryStorage.length); // alerts '0'
```

## Beyond the Web Storage API
MemoryStorage is type-agnosic; it doesn't care about the type of data you store. 
If you want to remain within the Web Storage API, you should only read and write strings, 
however if you want you can store other types just as well:
```javascript
memoryStorage.myObject = {my: 'object'};
alert(memoryStorage.myObject.my); // alerts 'object'
var tree = {
	nested: {
		objects: {
			working: 'Sure!'
		}
	}
}
memoryStorage.setItem('tree', tree);
alert(memoryStorage.tree.nested.objects.working); // alerts 'Sure!'
```


