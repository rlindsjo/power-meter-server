var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var currentUsage = [];

app.use(express.bodyParser());


app.get('/', function(req, res) {
	res.sendfile(__dirname + '/static/index.html');
});

app.get('/:id/current.json', function(req, res) {
	result = { value : currentUsage[req.params.id] };
	res.send(result);
});

app.post('/:id', function(req, res) {
	res.send('OK');
	currentUsage[req.params.id] = parseFloat(req.body.value);
});

app.use(express.static(__dirname + '/static'));


io.sockets.on('connection', function (socket) {
		socket.on('power-id', function(data) {
		  var id = data;
		  console.log('Connect for id ' + id);	
		  currentUsage[id] = 0;
		  setInterval(function() {
			  socket.emit('power', { value: currentUsage[id] });
		  }, 5000);
		});
	});


server.listen(3000);

server.on('close', function() {
	console.log("Closed");
});

process.on('SIGINT', function() {
	console.log("Closing");
	server.close();
});
