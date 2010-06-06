var sys = require("sys");

var smsHelpDAL = new (require("./SMSHelpDAL")).DAL();

exports.MessageProcessor = function(messageType, decisionTree) {

    var port = 6379;
    var host = "smshlp.org"

    var from = "6503183775";

    function messageHandler(tm) {

        sys.puts("Message Recieved: From: " + tm.FromPhone() + " Message: " + tm.Body());
        sys.puts("Session ID is " + tm.Sid());

        function gotMessages(sessmessages) {
		decisionTree.LoadMessages(sessmessages);

		var nextTm = decisionTree.NextMessage(tm);

		if (nextTm) {

		    sys.puts("Message Sent: To: " + nextTm.ToPhone() + " Message: " + tm.Body());

		    nextTm.FromPhone(from);

		    tmio.SendMessage(nextTm);
		    smsHelpDAL.SaveMessage(tm);
		}
        };
        smsHelpDAL.GetSessionMessages(tm.Sid(), gotMessages);
    }

    var tmio = new (require("./TextMessageIO")).TextMessageIO(host, port, messageType, messageHandler, "outbound.foo");

    this.Start = function() { tmio.Start(); };
    this.Stop = function() { tmio.Stop(); };

};
