require.config({
	baseUrl: '../dist',
	paths: {
		'memorystorage': './memorystorage.min',
	}
});
define(['memorystorage'], function(MemoryStorage){
	QUnit.test("AMD Module Compliance Test", function( assert ) {
		assert.ok(MemoryStorage !== undefined, 'MemoryStorage is defined');
		assert.ok(typeof MemoryStorage === 'function', 'MemoryStorage is a function');
		assert.ok(window.MemoryStorage === undefined, 'global MemoryStorage is NOT defined');
	});

	QUnit.test("W3C Web Storage API Compliance Test", function( assert ) {
		var store = new MemoryStorage('local');

		store.clear();
		assert.ok(store.length===0, "store cleared");
		store.setItem('test0', 'data0');
		assert.ok(store.length===1, "first item added to store");
		assert.ok(store.key(0)==='test0', "key registered");
		assert.ok(store.key(99)===null, "key() should return null when index out of bounds")
		assert.ok(store.getItem('test0')==='data0', "value retrieved with getItem matches stored value");
		assert.ok(store['test0']==='data0', "value retrieved with index operators matches stored value");
		store['test0'] = 'changed';
		assert.ok(store['test0']==='changed', "value updated correctly with index operators.");
		store['test1'] = 'data1';
		assert.ok(store.length===2, 'value added correctly with index operators');
		store.setItem('test2', 'data2');
		assert.ok(store.length===3, 'three items added to store');
		assert.ok(Object.keys(store).length == (3), "store has 3 enumerable properties (no api methods + 3 stored items)");
		assert.ok(store.getItem('test1')==='data1' && store.getItem('test2')==='data2', "retrieved values matches stored values");
		var keyOrderBefore = '';
		for (var i=0; i<store.length; i++) {
			keyOrderBefore += store.key(i);
		}
		store.setItem('test2', 'data2.2');
		var keyOrderAfter = '';
		for (var i=0; i<store.length; i++) {
			keyOrderAfter += store.key(i);
		}
		assert.ok(keyOrderBefore === keyOrderAfter, 'Key order not affected by mutation');

		store.removeItem('test1');
		assert.ok(store.length===2, "item removed correctly with removeItem");
		store.removeItem('test1');
		assert.ok(store.length===2, "double removal has no effect");
		assert.ok(store.getItem('test1')===null, "get removed item returns null");

		store.setItem('getItem', 'test');
		assert.ok(typeof store.getItem === 'function', "store API methods cannot be overwritten.");
		assert.ok(store.getItem('getItem') === 'test', "getItem successfully retrieves item with API name.");
		store.removeItem('getItem');
		assert.ok(store.getItem('getItem') === null, "After removal of item with API name, getItem returns null.");

		var glob = new MemoryStorage();
		assert.ok(glob.length===0, "local store items are not visible globally");
		glob.setItem('glob0', 'data0');
		assert.ok(glob.length===1 && glob.getItem('glob0')==='data0', "globally stored items are retrieved ok");
		assert.ok(store.getItem('glob0')===null, "global items are not visible in the local store");
		glob.removeItem('glob0');
		assert.ok(glob.length===0, "global length is updated correctly");
		assert.ok(glob.key(0)===null, "global keys are removed correctly");
		assert.ok(glob.getItem('glob0')===null, "global values are removed correctly");

		store.clear();
		assert.ok(store.length===0, "store is cleared");
		assert.ok(store.key(0)===null, "no keys in cleared store");
		assert.ok(store.getItem('test0')===null, "no values in cleared store");
	});

	QUnit.test("Multiple Instances Test", function( assert ) {
		var store1 = new MemoryStorage('local');
		var store2 = new MemoryStorage('local');
		store1.clear();
		store1.setItem('test0', 'data0');
		assert.ok(store2.getItem('test0') === store1.getItem('test0'), "Item added to store1 is also visible in store2");
		store1['test0'] = 'changed';
		assert.ok((store2.getItem('test0') === store1.getItem('test0')) && store1.getItem('test0') === 'changed', "Item changed in store1 is also changed in store2");
		store1['test1'] = 'data1';
		assert.ok(store2.length === store1.length, "Store lengths remain consistent");
		for (var i=0; i<store1.length; i++) {
			assert.ok(store1.key(i) === store2.key(i), 'Order of keys is consistent across stores');
			assert.ok(store1[store1.key(i)] === store2.getItem(store2.key(i)), 'Order and contents of values are consistent across stores');
		}
		store1.clear();
		assert.ok(store2.length===0, "Clearing store1 also clears store2");
	});


	QUnit.test("Beyond W3C API Test", function( assert ) {
		var store = new MemoryStorage('local');
		store.clear();
		store.my = {object: 'Yes!'};
		assert.ok(typeof store.getItem('my') === 'object', 'Object returned with getItem when object was stored');
		assert.ok(store.getItem('my').object === 'Yes!', 'Contents of objects survive storing/retrieving');
		store.tree = {nested: {objects: {works: 'Sure!'}}};
		assert.ok(store.tree.nested.objects.works === 'Sure!', 'Deep nested trees stored correctly');
		store.clear();
	});

	QUnit.test("New-less Construction Test", function( assert ) {
		var store1 = MemoryStorage('local');
		assert.ok(store1, 'Existing store is defined and not null');
		assert.ok(store1 instanceof MemoryStorage, 'Existing store is instanceof MemoryStorage');

		var store2 = MemoryStorage('new-store');
		assert.ok(store2, 'New store is defined and not null');
		assert.ok(store2 instanceof MemoryStorage, 'New store is instanceof MemoryStorage');
	});
});

