var sys = require('sys');
var tm = require("./TextMessage");

exports.TextMessageIO = DummyMessageIO; 

function DummyMessageIO(host, port, incomingChanel, newMessageHandler, outgoingChanel){

    var that = this;

    this.NewMessageHandler = newMessageHandler;
    

    var intervalHandle;
    var messagesSent = 0;

    function sendDummyMessageToProcessor() {

        if (messagesSent < 10) {

            var fakeTm = new tm.TextMessage();
            fakeTm.FromPhone("7035555555").ToPhone("605555555").Body("Fake Message " + messagesSent );

            //sys.puts("FAKE MESSAGE IO Message Sent to Processor: From: " + fakeTm.FromPhone() + " Message: " + fakeTm.Body());
            newMessageHandler(fakeTm);
            

            messagesSent++;
        
        } else {that.Stop(); }
    }

    function start() {
        intervalHandle = setInterval(sendDummyMessageToProcessor, 500);
    }

    function stop() {
        if (intervalHandle) {         
            clearInterval(intervalHandle);
            intervalHandle = null;
        }
    }
    
    function sendMessage(txtMessage){

        //sys.puts("FAKE MESSAGE IO Message Recieved to Be Sent: To: " + txtMessage.ToPhone() + " Message: " + txtMessage.Body());
    }

     this.Start = start;
     this.Stop = stop;
     this.SendMessage = sendMessage;
}
