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

        if (qStrings.length > 0) {
            previous.Query(qStrings[0]);
        }

        for (var i = 1; i < qStrings.length; i++) {

            next = new quest.Question();
            next.Query(qStrings[i]);
            previous.AddNextQuestion("", next);
            next = previous;
        }
        sys.puts("constructed");
    }

    var firstMessage = false;

    function loadMessages(messageArray) {
        sys.puts("message load");
        if (messageArray.length > 0) {
            nextQuestion = questions.NextQuestion(messageArray[0].Body());
        } else {
            firstMessage = true;
            sys.puts("firstQuestion");
            return;
        }

        for (var i = 1; i < messageArray.length; i++) {
            if (messageArray[i] && messageArray[i].Body && nextQuestion) {
                nextQuestion = nextQuestion.NextQuestion(messageArray[i].Body());
            }
        }
        sys.puts("messagesLoaded");
    }

    function nextMessage(currentMessage) {
        sys.puts("next message");
        var txtMsg = new tm.TextMessage();
        var nextQ;

        sys.puts("firstmsg:" + firstMessage + " questions: " + questions);
        if (firstMessage && questions) {

            txtMsg.ToPhone(currentMessage.FromPhone());
            txtMsg.Body(questions.Query());

            sys.puts(txtMsg.Body());
            sys.puts(txtMsg.ToPhone());

            return (txtMsg);
        }

        firstMessage = false;

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
