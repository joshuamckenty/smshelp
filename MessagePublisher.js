var sys = require('sys');
var http = require('http');
var url = require('url');


//	http.createServer(requestHandler).listen(8000);

//	sys.puts('Server running at http://127.0.0.1:8000/');


function requestHandler(req, res) {
	
	var message = url.parse(request.url);
	
	DeliverMessage(req)

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(req);

}


function DeliverMessage(){}

