

var rdc = require("./redis-client");

exports.TextMessageIO = RedisMessageIO; 


function RedisMessageIO(host, port, incomingChanel, newMessageHandler, outgoingChanel){

    var that = this;

    this.NewMessageHandler = newMessageHandler;
    
    var sys = require("sys");
    // var redisClient = require("./redis-client").createClient(port, host);
    var redisClient = rdc.createClient();
    
    var tm = require("./TextMessage");

    function start(){
        redisClient.subscribeTo(incomingChanel + ".*", handleMessage);
    }
    
    function stop(){
        redisClient.close();
    }
    
    function sendMessage(txtMessage){
            
        var sendRedisClient = rdc.createClient();
        sys.log("publishing to " + outgoingChanel)
        sys.log("publishing to host and port " + host +" " + port)
        sendRedisClient.publish("outbound.foo", txtMessage.Serialize());
    }

    function handleMessage(channel, message, subscriptionPattern) {
         that.NewMessageHandler(new tm.TextMessage(message));
     }


     this.Start = start;
     this.Stop = stop;
     this.SendMessage = sendMessage;
}
