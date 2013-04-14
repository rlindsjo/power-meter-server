var assert = require('assert')
var store = require('../src/store').create();

exports['test current on empty store is 0'] = function() {
  assert.equal(0, store.current('nonexisting'), 'Incorrect default value')
}

exports['test setting 1 current is 1'] = function() {
  store.store('one', 1)
  assert.equal(1, store.current('one'), 'Incorrect stored value')
}

if (module == require.main) require('test').run(exports)
