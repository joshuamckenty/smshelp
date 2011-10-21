var sys    = require('sys'),
    http   = require('http'),
    httpcli   = require('./httpclient'),
    base64 = require('./vendor/base64');

// exports.send_sms = function() {
	TWILIO_API_URL = 'api.twilio.com'
	APIVERSION = "2008-08-01"
	TwilioSID = "ACca7ce03367db8cef4d084532d0fd78f1"
	AuthToken = "6b37a8f9cb1703e01f9c131327e8eab1"
	URL = APIVERSION + "/Accounts/" + TwilioSID +"/SMS/Messages"
	var twilio = http.createClient(443, TWILIO_API_URL);
        // var twilio = new httpcli.httpclient()
// twilio.setSecure("x509_PEM");
	TO_PHONE='2508844384'
	FROM_PHONE='6503183775'
	BODY='I like to party.'

	authstring = base64.encode('%s:%s' % (TwilioSID, AuthToken))
	authstring = authstring.replace('\n', '')
	var headers = [];
	headers['Authorization'] = "Basic " + authstring;
	headers['Host'] = "api.twilio.com";
        headers['Content-encoding'] = 'application/x-www-form-urlencoded';
        content = 'To='+TO_PHONE+"&"+'From='+FROM_PHONE+"&"+'Body='+BODY;
        headers['Content-Length'] = content.length;
        headers['Connection'] = 'close';
        sys.puts(content.length)
        sys.puts(URL);

	// twilio.perform('https://' + TWILIO_API_URL + '/'+URL, "POST",  function(result) {
        // sys.puts(sys.inspect(result));
        // }, content, headers);
        request = twilio.request("POST", "/"+URL, headers)
	request.write(content, 'utf8');
	request.end();
// }

