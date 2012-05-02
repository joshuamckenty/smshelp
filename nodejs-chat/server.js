// do our includes
var http = require('http'),
	path = require('path'),
	sys = require('sys'),
	url = require('url'),
	paperboy = require('./lib/paperboy'),
	events = require('events');

// setup some local variables we need
var PORT = process.env.PORT || 8001,
	HISTORY_LENGTH = 20,
	WEBROOT = path.join(path.dirname(__filename), 'webroot'),
	lastGC = 0,
	notifier = new events.EventEmitter(),
	dataStore = [];

sys.log('Starting HTTP server on port ' + PORT);

function sendErrorResponse(httpResponse, msg) {
	httpResponse.writeHead(500, {'Content-Type': 'text/javascript'});
	httpResponse.end(JSON.stringify({ status: 500, response: msg}));
}

function sendMessagesResponse(httpResponse, messages) {
	httpResponse.writeHead(200, {'Content-Type': 'text/javascript'});
	httpResponse.end(JSON.stringify({ status: 200, response: messages.filter(function(value) {
		return value !== null;
	})}));
}

function sendSubmitResponse(httpResponse, index) {
	httpResponse.writeHead(200, {'Content-Type': 'text/javascript'});
	httpResponse.end("chat.receiveSendResponse(" + JSON.stringify({ status: 200, response: { submitedMessageIndex: index }}) + ");");
}

function sendResponse(httpResponse, msg) {
	httpResponse.writeHead(200, {'Content-Type': 'text/javascript'});
	httpResponse.end(JSON.stringify({ status: 200, response: msg}));
}

function gcMessageHistory() {
	if((dataStore.length - lastGC) > (HISTORY_LENGTH * 2)) {
		sys.log("GCing the message history - length: " + dataStore.length + " lastGC: " + lastGC );
		for( var i = lastGC; i < dataStore.length - HISTORY_LENGTH; i++ ) {
			dataStore[i] = null;
			delete dataStore[i];
			lastGC = i;
		}
	}
}

// create our HTTP server which will listen for requests
http.createServer(function (req, res) {
	var request = url.parse(req.url, true);

	// check if this is an API request
	if(request.pathname.indexOf("/api/") == 0) {
		sys.log("api request");

		var pos = request.pathname.indexOf("/", 5);
		var method = request.pathname.substr(5, (pos === -1 ? req.url.length : pos) - 5);

		switch(method) {
			case 'poll':
				sys.log("poll request");
				var last = request.pathname.substr(request.pathname.lastIndexOf("/") + 1);
				if(last < 0) last = 0;

				sys.log("Last: '" + last + "' - Length: '" + dataStore.length + "'");

				if(dataStore.length - 1 > last) {

					var messages = dataStore.slice(last);
					sendMessagesResponse(res, messages);
				} else {
					notifier.addListener("indexChange", function(index) {
						var messages = dataStore.slice(index);
						sendMessagesResponse(res, messages);
					});
				}

				gcMessageHistory();

				break;
			case 'send':
				sys.log("send request");

				if(!request.query) {
					sys.log("no query params");
					return sendErrorResponse(res, 'Invalid HTTP request');
				}

				sys.log(JSON.stringify(request.query));

				var clientId = request.query.clientId;
				var content = request.query.content;

				if(!clientId) {
					sys.log("no client id provided");
					return sendErrorResponse(res, 'No client ID provided');
				}

				if(content.length < 1) {
					sys.log("no message provided");
					return sendErrorResponse(res, 'No message provided');
				}

				sys.log("creating message");
				var message = { clientId: clientId, content: content, sequence: dataStore.length, ip: req.connection.remoteAddress };

				sys.log("storing message");
				var index = dataStore.push(message) - 1;

				sys.log("sending 200 response before notifying waiting requests");
				sendSubmitResponse(res, index);

				sys.log("notifying listeners of new index: " + index);
				notifier.emit("indexChange", index);

				gcMessageHistory();
				break;
			case 'purge':
				sys.log("clearing logs");
				dataStore = [];

				sys.log("sending response");
				sendResponse(res, "purge OK");

				sys.log("notifying listeners of index reset");
				notifier.emit("indexChange", 0);
				break;
			default:
				sendErrorResponse(res, 'Method not found: "' + method + '"');
		}

  	} else {

		// deliver static content via paperboy
		var ip = req.connection.remoteAddress;
		paperboy
		    .deliver(WEBROOT, req, res)
		    .addHeader('X-PaperRoute', 'Node')
		    .before(function() {
		      sys.log('Received Request')
		    })
		    .after(function(statCode) {
		      sys.log(statCode + " " + req.url + " " + ip);
		    })
		    .error(function(statCode,msg) {
		      res.writeHead(statCode, {'Content-Type': 'text/plain'});
		      res.write("Error: " + statCode);
		      res.close();
		      sys.log(statCode + " " + req.url + " " + ip + " " + msg);
		    })
		    .otherwise(function(err) {
		      var statCode = 404;
		      res.writeHead(statCode, {'Content-Type': 'text/plain'});
			  res.end("Error: " + statCode);
		      sys.log(statCode + " " + req.url + " " + ip + " " + err);
		    });

  	}
// listen on the PORT defined in the environment or 8001 if not provided
}).listen(parseInt(PORT, 10));

