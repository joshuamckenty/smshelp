
var http = require('http'),
	path = require('path'),
	sys = require('sys'),
	url = require('url'),
	tm = require('./TextMessage'),
	events = require('events'),
        client = require("./redis-client").createClient();
	

setInterval(function (){  
  
		            var message = new tm.TextMessage();
		            message.FromPhone("2508844384").FromZip("");
                            message.FromCity("Marshall").FromCountry("US");
                            message.FromState("AL").Body("I like to help");
                            payload = message.Serialize(); 
  client.publish("med.foo", payload, function (err, reply) { sys.puts("nothing") })
}, 2000)
