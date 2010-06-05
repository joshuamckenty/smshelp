// do our includes
var http = require('http'),
	path = require('path'),
	sys = require('sys'),
	url = require('url'),
	events = require('events');
	
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

