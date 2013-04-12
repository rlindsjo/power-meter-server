var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var currentUsage = [];
var currentHistory = [];

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
	var currentValue = parseFloat(req.body.value);
	currentUsage[req.params.id] = currentValue;
});

app.use(express.static(__dirname + '/static'));

io.sockets.on('connection', function (socket) {
		socket.on('power-id', function(data) {
		  var id = data;
		  console.log('Connect for id ' + id);	
		  setInterval(function() {
			  var val = currentUsage[id];
			  if (typeof(val) !== 'undefined') {
				  socket.emit('power', { value: val });			  	
			  }
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
