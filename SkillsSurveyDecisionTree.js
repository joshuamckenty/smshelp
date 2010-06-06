

exports.BuildingSurveyDecisionTree = function() {

    var that = this;

    var tm = new (require("./TextMessage");
    
    var questions = new (require("./Question")).Question

    var qStrings = ["Tell us about nature of skills your offering: [M]edical, [R]isk, [D]isaster, [L]abour/manual work, [T]echnical/IT"
             "Tell us about your qualifications and experience: degrees, university, #years experience post graduation, areas of specialty"
             "What is your country of origin? Where are you based? [city, zip/postal code, nation]"
             "What are your weekly hours of availability to respond to text messages: [Mon:hh:mm-hh:mm, Sun:hh:mm-hh:mm]"
             "Thank you for registering with TXTHLP.org -- help you need by SMS --"];

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
    }

    this.LoadMessages = loadMessages;
    this.NextMessage = nextMessage;

    construct();

};