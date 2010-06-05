	
	var sys = require('sys');
	var http = require('http');
	var url = require('url');
	var tm = require('./TextMessage');
	
//	http.createServer(requestHandler).listen(8000);
	
//	sys.puts('Server running at http://127.0.0.1:8000/');
	

	function test(){
		
		var message = new tm.TextMessage();
		
		message.ToPhone("7038555608");
		
		sys.puts(message.ToPhone());
		
		var jsonState = message.Serialize();
		
		sys.puts(jsonState);
		
		var m2 = new tm.TextMessage(jsonState);
		
		sys.puts(m2.ToPhone());
		
	}
	
	test();

	function requestHandler(req, res) {
		
		var message = url.parse(request.url);
		
		DeliverMessage(req)
	
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end(req);

	}
	
	
	function DeliverMessage(){}
	
	
	