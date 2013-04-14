var assert = require('assert')
var store = require('../src/store').create();

exports['test current on empty store is 0'] = function() {
  assert.equal(0, store.current('nonexisting'), 'Incorrect default value')
}

exports['test setting 1 current is 1'] = function() {
  store.store('one', 1)
  assert.equal(1, store.current('one'), 'Incorrect stored value')
}

exports['test setting 1 value has that value as history'] = function() {
  store.store('history', 1)
  var history = store.history('history')
  assert.equal(1, history.length, 'Incorrect number of stored values')
  assert.equal(1, history[0], 'Incorrect stored value')
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
