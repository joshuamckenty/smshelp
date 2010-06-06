var sys = require("sys");
exports.BuildingSurveyDecisionTree = function() {

    var that = this;

    var tm = new require("./TextMessage");

    var quest = require("./Question");

    var questions = new quest.Question;


    var qStrings = ["What type of building is this? Reply with [H]ouse, [A]partment, [R]etail, [O]ffice, [W]arehouse, or [I]ndustrial.",
                    "How many stories does this building have? What is it made out of (eg, brick, wood, steel, etc.)?",
                    "Where is this building?  Reply with the address if possible, otherwise reply with the postcode or light-post number.",
                    "How much of the side of this building is covered by windows?  Reply none, some, most, or all, or %.",
                    "What is the average occupancy in this building? What is its primary use? Reply living, restaurant, office, shop, hotel, multiple",
                    "Thank you for using TXTHLP.org -- help you need by SMS --. Your mobile account will be credited shortly. More credits available for doing other buildings in your area."];


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
    }

    this.LoadMessages = loadMessages;
    this.NextMessage = nextMessage;

    construct();

};
