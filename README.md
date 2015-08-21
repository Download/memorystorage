# memorystorage <sub><sup>v0.9.2</sup></sub>
Memory-backed storage that implements the [Web Storage API](http://www.w3.org/TR/webstorage/), making it a drop-in replacement for `localStorage` and `sessionStorage` in environments where these are not available. 
[Project website](http://download.github.io/memorystorage)

## Download
* [memorystorage.js](https://cdn.rawgit.com/download/memorystorage/0.9.2/src/memorystorage.js) (~3kB, commented)
* [memorystorage.min.js](https://cdn.rawgit.com/download/memorystorage/0.9.2/dist/memorystorage.min.js) (~2kB, minified)
* [memorystorage.min.js.map](https://cdn.rawgit.com/download/memorystorage/0.9.2/dist/memorystorage.min.js.map) (~2kB, debug map file)

## Include on your page
`memorystorage` can be used directly from CDN, or from a local script file.

### CDN
```xml
<script src="https://cdn.rawgit.com/download/memorystorage/0.9.2/dist/memorystorage.min.js"></script>
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


