var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var store = require('./store');

app.use(express.bodyParser());

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/static/index.html');
});

var currentJson = function(id) {
	return { value : store.current(id) };
}

app.get('/:id/current.json', function(req, res) {
	res.send(currentJson(req.params.id));
});

app.post('/:id', function(req, res) {
	store.store(req.params.id, req.body.value);
	res.send('OK');
});

app.use(express.static(__dirname + '/static'));

io.sockets.on('connection', function (socket) {
	socket.on('power-id', function(data) {
		var id = data;
		console.log('Connect for id ' + id);	
		setInterval(function() {
			socket.emit('power', currentJson(id));
		}, 5000);
	});
});


server.listen(3000);

process.on('SIGINT', function() {
	console.log("Closing");
	server.close();
});
