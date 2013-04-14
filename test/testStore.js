var assert = require('assert')
var store = require('../src/store').create();

exports['test current on empty store is 0'] = function() {
  assert.equal(store.current('nonexisting'), 0, 'Incorrect default value')
}

exports['test setting 1 current is 1'] = function() {
  store.store('one', 1)
  assert.equal(store.current('one'), 1, 'Incorrect stored value')
}

exports['test setting 1 value has that value as history'] = function() {
  store.store('history', 1)
  var history = store.history('history')
  assert.equal(history.length, 1, 'Incorrect number of stored values')
  assert.equal(history[0], 1, 'Incorrect stored value')
}

exports['test setting many values limits history to last 30 values'] = function() {
  var val;
  for (val = 1; val <= 40; val ++) {
    store.store('limit', val)
  }
  var history = store.history('limit')
  assert.equal(history.length, 30, 'Incorrect number of stored values')
  assert.equal(history[0], 11, 'Incorrect stored first value')
  assert.equal(history[29], 40, 'Incorrect stored last value')
}

if (module == require.main) require('test').run(exports)
