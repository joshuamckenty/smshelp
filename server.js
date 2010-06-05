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

function sendTwimlSMSReply(httpResponse, number, body) {
    // Use Twilio library here...
	httpResponse.writeHead(200, {'Content-Type': 'text/xml'});
	httpResponse.end("<Response><Sms>" + body + "</Sms></Response>");
}


// create our HTTP server which will listen for requests
http.createServer(function (req, res) {
	var request = url.parse(req.url, true);
	sys.log(JSON.stringify(request.query));
        var smsstring = request.query.Body;
	var method = smsstring.split(" ")[0]
	switch(method) {
                        case 'm':
                        case 'med':
                        case 'medical':
                            sys.log('Sending medical instructions')
                            // Create Session if it doesn't exist
                            channelName = "med." + request.query.From;
		            var message = new tm.TextMessage();
		            message.FromPhone(request.query.From).FromZip(request.query.FromZip);
                            message.FromCity(request.query.FromCity).FromCountry(request.query.FromCountry);
                            message.FromState(request.query.FromState).Body(request.query.Body);
                            payload = message.Serialize(); 
                            client.set("session:" + request.query.From, payload);
			    client.publish(channelName, payload, 
			      function (err, reply) {
			        sys.puts("Published message to " + 
				  (reply === 0 ? "no one" : (reply + " subscriber(s).")));
			    });
                            body = "Snd: Patients NAME, AGE [#], SEX [M/F], LOCATION [Freeform]" 
                            sendTwimlSMSReply(res, request.query.From, body)
                            break
			case '?':
			default:
                            sys.log('Sending instructions')
                            body = "Please send: (m)edical, (r)isk, (d)isaster, or (s)killz." 
                            sendTwimlSMSReply(res, request.query.From, body)
	}	
// listen on the PORT defined in the environment or 4000 if not provided
}).listen(parseInt(PORT, 10));

