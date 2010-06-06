var port = 6379;
var host = "smshlp.org"

var sys = require("sys");
var redisClient = require("./redis-client").createClient(port, host);

redisClient.subscribeTo("med.*", handleMessage);

function handleMessage(channel, message, subscriptionPattern) {
    var output = "[" + channel;
    if (subscriptionPattern)
        output += " (from pattern '" + subscriptionPattern + "')";
    output += "]: " + message;
    sys.puts(output);
    redisClient.close();
}

exports.MessageProcessor(){


}