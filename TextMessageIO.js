

exports.TextMessageIO = RedisMessageIO; 


function RedisMessageIO(host, port, incomingChanel, newMessageHandler, outgoingChanel){

    var that = this;

    this.NewMessageHandler = newMessageHandler;
    
    var sys = require("sys");
    var redisClient = require("./redis-client").createClient(port, host);
    
    var tm = require("./TextMessage");

    function start(){
        redisClient.subscribeTo(incomingChanel + ".*", handleMessage);
    }
    
    function stop(){
        redisClient.close();
    }
    
    function sendMessage(txtMessage){
            
        redisClient.publish(outgoingChanel, txtMessage.Serialize(), 
			      function (err, reply) {
			        sys.puts("Published message to " + 
				  (reply === 0 ? "no one" : (reply + " subscriber(s).")));
			    });
    }

    function handleMessage(channel, message, subscriptionPattern) {
         that.NewMessageHandler(new tm.TextMessage(message));
     }


     this.Start = start;
     this.Stop = stop;
     this.SendMessage = sendMessage;
}