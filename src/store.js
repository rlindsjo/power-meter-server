exports.create = function() {
	var store = [];
	var get = function(id) {
		var holder = store[id];
		if (typeof holder === 'undefined') {
			holder = { 
				current: 0,
				history: []
			};
			store[id] = holder;
		}
		return holder;
	};
	return {
		current:  function(id) {
			return get(id).current;
		},
		store: function(id, rawValue) {
			var value = parseFloat(rawValue);
			get(id).current = value;
		}
	}
}
	
