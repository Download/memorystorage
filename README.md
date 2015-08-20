# memstore <sub><sup>v0.9.0</sup></sub>
Memory-backed storage object that implements the [Web Storage API](http://www.w3.org/TR/webstorage/).

## Download
* [memstore.js](https://cdn.rawgit.com/download/memstore/0.9.0/src/memstore.js) (~3kB, commented)
* [memstore.min.js](https://cdn.rawgit.com/download/memstore/0.9.0/dist/memstore.min.js) (~2kB, minified)
* [memstore.min.js.map](https://cdn.rawgit.com/download/memstore/0.9.0/dist/memstore.min.js.map) (~2kB, debug map file)

## Include on your page
`memstore` can be used directly from CDN, or from a local script file.

### CDN
```xml
<script src="https://cdn.rawgit.com/download/memstore/0.9.0/dist/memstore.min.js"></script>
```

### Local script file
Download memstore.min.js, place it in a folder `lib` in the root of your website and include it like this:
```xml
<script src="lib/memstore.min.js"></script>
```

## Create a memory storage object
```javascript
var memoryStorage = new MemoryStorage('my-app');
```

## Use it
```javascript
memoryStorage.setItem('My string', 'Hello MemoryStorage!');
memoryStorage.setItem('My object', JSON.stringify({my: 'object'}));
alert(memoryStorage.getItem('My string')); // alerts 'Hello MemoryStorage!'
alert(memoryStorage.length); // alerts '2'
alert(memoryStorage.key(1)); // alerts 'My object'
memoryStorage.removeItem('My string');
alert(memoryStorage.length); // alerts '1'
memoryStorage.clear();
alert(memoryStorage.length); // alerts '0'
```


