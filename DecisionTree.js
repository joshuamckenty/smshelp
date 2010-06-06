var sys = require("sys");
exports.DecisionTree = function(questArray) {

    var that = this;

    var tm = new require("./TextMessage");

    var quest = require("./Question");

    var questions = new quest.Question();


    var qStrings = questArray

    var nextQuestion = null;

    function construct() {

        var previous = questions;
        var next = null;

        sys.puts("QStrings is " + qStrings.length)
        for (var i = 0; i < qStrings.length; i++) {
            next = new quest.Question();
            next.Query(qStrings[i]);
            previous.AddNextQuestion("a", next);
            next = previous;
        }
        sys.puts("constructed");
    }

	var curIndex = 0;

    function loadMessages(messageArray) {
        curIndex= messageArray.length;
	return;
	sys.puts("message load with length of " + messageArray.length);
        nextQuestion = questions.NextQuestion(messageArray[0]);
        for (var i = 1; i < messageArray.length; i++) {
            nextQuestion = nextQuestion.NextQuestion(messageArray[i]);
        }
        sys.puts("messagesLoaded next question:" +  nextQuestion.Query());
    }

    function nextMessage(currentMessage) {
        

	sys.puts("next message");
        var txtMsg = new tm.TextMessage();
        var nextQ;

	curIndex++;

	if(qStrings[curIndex]){
	sys.puts("message:"+qStrings[curIndex]);
		txtMsg.ToPhone(currentMessage.FromPhone());
		txtMsg.Body(qStrings[curIndex]);
		return(txtMsg);
	}else{
		return(null);
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

    this.LoadMessages = loadMessages;
    this.NextMessage = nextMessage;

    construct();

};
