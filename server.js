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
http.createServer(function(req, res) {
    var request = url.parse(req.url, true);
    sys.log(JSON.stringify(request.query));
    var smsstring = request.query.Body;
    var method = smsstring.split(" ")[0].toLowerCase();
    switch (method) {
        case 'm':
        case 'med':
        case 'medical':
            method = "medical";
            break;
        case 'r':
        case 'risk':
            method = "risk";
            break;
        case 's':
        case 'skills':
            method = "skills";
            break;
        default:
            method = "help";
    }

    session = client.get("session:" + request.query.From + ":method")
    if (session) {
        method = session;
    } else if (method != 'help') {
        client.set("session:" + request.query.From + ":method", method);
        client.incr("totals:sessions:" + method);
        client.incr("totals:sessions");
    }
    var message = new tm.TextMessage();
    message.FromPhone(request.query.From).FromZip(request.query.FromZip);
    message.FromCity(request.query.FromCity).FromCountry(request.query.FromCountry);
    message.FromState(request.query.FromState).Body(request.query.Body);
    sid = "session:" + request.query.From
    message.Sid(sid)
    payload = message.Serialize();
    client.lpush(sid, payload);
    if (method == 'help') {
        sys.log('Sending instructions')
        body = "Please send: (m)edical, (r)isk, (d)isaster, or (s)killz."
        sendTwimlSMSReply(res, request.query.From, body)
    } else {
        channelName = method + "." + request.query.From;
        sys.log('Sending to ' + channelName);
        client.publish(channelName, payload);
    }
    // listen on the PORT defined in the environment or 4000 if not provided
}).listen(parseInt(PORT, 10));

