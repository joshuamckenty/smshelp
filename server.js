// do our includes
var http = require('http'),
	path = require('path'),
	sys = require('sys'),
	url = require('url'),
	tm = require('./TextMessage'),
	events = require('events'),
        client = require("./redis-client").createClient();
	
// setup some local variables we need
var PORT = process.env.PORT || 4000,
	notifier = new events.EventEmitter(),
	dataStore = [];
	
sys.log('Starting HTTP server on port ' + PORT);

// client.set("totals:sessions", "0")

function sendTwimlSMSReply(httpResponse, number, body) {
	httpResponse.writeHead(200, {'Content-Type': 'text/xml'});
	httpResponse.end("<Response><Sms>" + body + "</Sms></Response>");
}

// create our HTTP server which will listen for requests
http.createServer(function (req, res) {
	var request = url.parse(req.url, true);
	sys.log(JSON.stringify(request.query));
        var smsstring = request.query.Body;
	var method = smsstring.split(" ")[0].toLowerCase();
	switch(method) {
                        case 'm':
                        case 'med':
                        case 'medical':
                          method = "medical";
                          break;
                        case 'r':
                        case 'risk':
                          method = "risk";
                          break;
                        default:
                          method = "help";
        }
        
        session = client.get("session:" + request.query.From + ":method")
        if (session) {
           method = session
        } else if (method != 'help')  {
          client.set("session:" + request.query.From + ":method", method);
          client.incr("totals:sessions")
        }
	var message = new tm.TextMessage();
	message.FromPhone(request.query.From).FromZip(request.query.FromZip);
	message.FromCity(request.query.FromCity).FromCountry(request.query.FromCountry);
	message.FromState(request.query.FromState).Body(request.query.Body);
        payload = message.Serialize(); 
        client.set("session:" + request.query.From, payload);
        if (method == 'help') {
	   sys.log('Sending instructions')
	   body = "Please send: (m)edical, (r)isk, (d)isaster, or (s)killz." 
	   sendTwimlSMSReply(res, request.query.From, body)
        } else {
          channelName = method + "." + request.query.From;
          client.publish(channelName, payload);
        }
        /*
	switch(method) {
                        case 'medical':
                            sys.log('Sending medical instructions')
		            var message = new tm.TextMessage();
                            message.ToPhone(request.query.From).FromPhone("6503183775")
                            message.Body("Snd: Patients NAME, AGE [#], SEX [M/F], LOCATION [Freeform]") 
			    client.publish("outbound.foo", message.Serialize()); 
                            break;
                        case 'risk':
                            sys.log('Sending risk instructions')
                            // Create Session if it doesn't exist
                            channelName = "risk." + request.query.From;
                            payload = message.Serialize(); 
                            client.set("session:" + request.query.From, payload);
			    client.publish(channelName, payload);
		            var message = new tm.TextMessage();
                            message.ToPhone(request.query.From).FromPhone("6503183775")
                            message.Body("Snd: Location, Building Size (floors), Materials") 
			    client.publish("outbound.foo", message.Serialize() ); 
                            break;
			case 'help':
			default:
                            sys.log('Sending instructions')
                            body = "Please send: (m)edical, (r)isk, (d)isaster, or (s)killz." 
                            sendTwimlSMSReply(res, request.query.From, body)
	}
        */	
// listen on the PORT defined in the environment or 4000 if not provided
}).listen(parseInt(PORT, 10));

