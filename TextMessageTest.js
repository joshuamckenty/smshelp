	
	var sys = require('sys');
	var http = require('http');
	var url = require('url');
	var tm = require('./TextMessage');
	

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


	