var sys = require("sys");

var smsHelpDAL = new (require("./SMSHelpDAL")).DAL();

exports.MessageProcessor = function(messageType, decisionTree) {

    var port = 6379;
    var host = "smshlp.org"

    var from = "6503183775";

    function messageHandler(tm) {

        sys.puts("Message Recieved: From: " + tm.FromPhone() + " Message: " + tm.Body());
        sys.puts("Session ID is " + tm.Sid());

        decisionTree.LoadMessages(smsHelpDAL.GetSessionMessages(tm.Sid()));

        var nextTm = decisionTree.NextMessage(tm);

        if (nextTm) {

            sys.puts("Message Sent: To: " + nextTm.ToPhone() + " Message: " + tm.Body());
            
            nextTm.FromPhone(from);

            tmio.SendMessage(nextTm);
            smsHelpDAL.SaveMessage(tm);
        }
    }

    var tmio = new (require("./TextMessageIO")).TextMessageIO(host, port, messageType, messageHandler, "outbound");

    this.Start = function() { tmio.Start(); };
    this.Stop = function() { tmio.Stop(); };

};
