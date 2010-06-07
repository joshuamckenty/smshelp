var sys = require("sys");

var smsHelpDAL = new (require("./SMSHelpDAL")).DAL();

exports.MessageProcessor = function(messageType, decisionTree) {

    var port = 6379;
    var host = "smshlp.org"

    var from = "6503183775";

    var tmio = new (require("./TextMessageIO")).TextMessageIO(host, port, messageType, messageHandler, "outbound.foo");

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


    function nextMessage(currentMessage) {


        sys.puts("next message");
        var txtMsg = new tm.TextMessage();
        var nextQ;

        curIndex++;

        if (qStrings[curIndex]) {
            sys.puts("message:" + qStrings[curIndex]);
            txtMsg.ToPhone(currentMessage.FromPhone());
            txtMsg.Body(qStrings[curIndex]);
            return (txtMsg);
        } else {
            return (null);
        }

        if (nextQuestion) {
            sys.log('Getting next message for nextQuestion');
            nextQ = nextQuestion.NextQuestion(currentMessage);
        } else {
            return (null);
        }

        if (nextQ) {
            txtMsg.ToPhone(currentMessage.FromPhone());
            txtMsg.Body(nextQ.Query());
        } else {
            return (null);
        }
        return txtMsg;
    }

    function loadMessages(messageArray) {
        curIndex = messageArray.length;
        return;
        sys.puts("message load with length of " + messageArray.length);
        nextQuestion = questions.NextQuestion(messageArray[0]);
        for (var i = 1; i < messageArray.length; i++) {
            nextQuestion = nextQuestion.NextQuestion(messageArray[i]);
        }
        sys.puts("messagesLoaded next question:" + nextQuestion.Query());
    }







    this.Start = function() { tmio.Start(); };
    this.Stop = function() { tmio.Stop(); };

};
