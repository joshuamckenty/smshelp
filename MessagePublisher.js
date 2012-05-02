var sys = require('sys');
var http = require('http');
var url = require('url');

loadSubscribers();

http.createServer(requestHandler).listen(8000);
sys.puts('Server running at http://127.0.0.1:8000/');

function requestHandler(req, res) {

	var args = url.parse(request.url);

	if(args){

		if(args.action){


			if(args.action === "subscribe"){

				doSubscription(args, res);


			}else if(args.action === "deliver"){

				doDelivery(args, res);

			}

		}

	}
}

function doSubscription(args, res){

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(req);


}


function doDelivery(args, res){

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(req);

}

function loadSubscribers(){




}