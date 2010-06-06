
exports.BuildingSurveyDecisionTree = function() {

    var that = this;

    var tm = require("./TextMessage");
    var queslib = require("./Question");
    var questions = new queslib.Question();

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

            next = previous.MakeQuestion();
            next.Query(qStrings[i]);
            previous.AddNextQuestion("", next);
            next = previous;
        }
    }

    function loadMessages(messageArray) {

        if(messageArray.length > 0){
            nextQuestion = questions.NextQuestion(messageArray[0].Body());
        }

        for (var i = 1; i < messageArray.length; i++) {
            if (messageArray[i] && messageArray[i].Body && nextQuestion) {
                nextQuestion = nextQuestion.NextQuestion(messageArray[i].Body());
            }
        }
    }
    
    function nextMessage(currentMessage) {
        var txtMsg = new tm.TextMessage();
        var nextQ;
        
        if(nextQuestion){
            sys.log('Getting next message for nextQuestion');
            nextQ= nextQuestion.NextQuestion(currentMessage);
        }else{
            return(null);
        }
        
        if(nextQ){
            txtMsg.ToPhone(currentMessage.FromPhone());
            txtMsg.Body(nextQ.Query());
        }else{
            return(null);
        }
        return txtMsg;
    }

    this.LoadMessages = loadMessages;
    this.NextMessage = nextMessage;

    construct();

};
