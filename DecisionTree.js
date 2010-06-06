var sys = require("sys");
exports.DecisionTree = function(questArray) {

    var that = this;

    var tm = new require("./TextMessage");

    var quest = require("./Question");

    var questions = new quest.Question;


    var qStrings = questArray

    var nextQuestion = null;

    function construct() {

        var previous = questions;
        var next = null;

        for (var i = 0; i < qStrings.length; i++) {

            next = new quest.Question();
            next.Query(qStrings[i]);
            previous.AddNextQuestion("", next);
            next = previous;
        }
        sys.puts("constructed");
    }

    function loadMessages(messageArray) {
        sys.puts("message load");
        nextQuestion = null;
        for (var i = 0; i < messageArray.length; i++) {
            if (messageArray[i] && messageArray[i].Body && nextQuestion) {
                nextQuestion = nextQuestion.NextQuestion(messageArray[i]);
            }
        }
        sys.puts("messagesLoaded");
    }

    function nextMessage(currentMessage) {
        sys.puts("next message");
        var txtMsg = new tm.TextMessage();
        var nextQ;

        sys.puts("firstmsg:" + firstMessage + " questions: " + questions);

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

    this.LoadMessages = loadMessages;
    this.NextMessage = nextMessage;

    construct();

};
