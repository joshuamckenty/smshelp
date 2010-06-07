var sys = require("sys");

var smsHelpDAL = new (require("./SMSHelpDAL")).DAL();
//var smsHelpDAL = new (require("./DummyDAL")).DAL();

exports.MessageProcessor = function(messageType, decisionTree) {

    var tm = require("./TextMessage");

    var port = 6379;
    var host = "smshlp.org"

    var from = "6503183775";

    var tmio = new (require("./TextMessageIO")).TextMessageIO(host, port, messageType, messageHandler, "outbound.foo");
    //var tmio = new (require("./DummyTextMessageIO")).TextMessageIO(host, port, messageType, messageHandler, "outbound.foo");

    function TextMessageArrayToResponseArray(tmArray) {

        var responses = [];

        for (var i = 0; i < tmArray.length; i++) {
            responses.push(tmArray[i].Body());
        }

        return (responses);
    }

    function messageHandler(newMsg) {

        sys.puts("Message Recieved: From: " + newMsg.FromPhone() + " Message: " + newMsg.Body());
        sys.puts("Session ID: " + newMsg.Sid());

        function gotMessages(sessionMessages) {

            // need to add the latest message to evaluate the tree to the current question.
            sessionMessages.push(newMsg);

            decisionTree.LoadState(TextMessageArrayToResponseArray(sessionMessages));

            var curQuestion = decisionTree.CurrentQuestion();

            if (curQuestion) {
                var nextTm = new tm.TextMessage();

                nextTm.FromPhone(from);
                nextTm.ToPhone(newMsg.FromPhone());
                nextTm.Body(curQuestion.Query());

                tmio.SendMessage(nextTm);
                smsHelpDAL.SaveMessage(newMsg);

                sys.puts("Message Sent: To: " + nextTm.ToPhone() + " Message: " + nextTm.Body() + "\n");
            }
        };

        smsHelpDAL.GetSessionMessages(newMsg.Sid(), gotMessages);
    }

    this.Start = function() { tmio.Start(); };
    this.Stop = function() { tmio.Stop(); };

};
