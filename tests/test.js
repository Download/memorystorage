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
	assert.ok(Object.keys(store).length == (6+3), "store has 9 enumerable properties (6 api methods + 3 stored items)");
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
	assert.ok(store.getItem('test1')===undefined, "get removed item returns undefined");

	store.setItem('getItem', 'test');
	assert.ok(typeof store.getItem === 'function', "store API methods cannot be overwritten.");
	assert.ok(store.getItem('getItem') === 'test', "getItem successfully retrieves item with API name.");
	store.removeItem('getItem');
	assert.ok(store.getItem('getItem') === undefined, "After removal of item with API name, getItem returns undefined.");
	
	var glob = new MemoryStorage();
	assert.ok(glob.length===0, "local store items are not visible globally");
	glob.setItem('glob0', 'data0');
	assert.ok(glob.length===1 && glob.getItem('glob0')==='data0', "globally stored items are retrieved ok");
	assert.ok(store.getItem('glob0')===undefined, "global items are not visible in the local store");
	glob.removeItem('glob0');
	assert.ok(glob.length===0, "global length is updated correctly");
	assert.ok(glob.key(0)===null, "global keys are removed correctly");
	assert.ok(glob.getItem('glob0')===undefined, "global values are removed correctly");

	store.clear();
	assert.ok(store.length===0, "store is cleared");
	assert.ok(store.key(0)===null, "no keys in cleared store");
	assert.ok(store.getItem('test0')===undefined, "no values in cleared store");
});





