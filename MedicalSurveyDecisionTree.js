

exports.BuildingSurveyDecisionTree = function() {

    var that = this;

    var tm = new (require("./TextMessage");
    
    var questions = new (require("./Question")).Question

    var qStrings = ["Tell us about patient: Age[#], Sex [M/F], Weight [kg], height [cm], Location [Town, zip/postal code], Kenya [(Y)es or (N)o]"
         "Describe symptoms: Type, location, duration[#(h)rs or #(d)ays], severity[(l)ow, (m)ed, (h)igh]. (e.g. rash,chest,24h,l; other)"
         "Describe medical history: on medication, Known allergies, any medical conditions (e.g. Lipitor, lidocaine, high blood pressure)"
         "Your details have been sent to a Medical Doctor for diagnosis. Typical response time 10 mins."
         "Doctor: have you had any family history of diabetes?"
         "Doctor: Advice/likely Diagnosis: Terbuculosis. Treatment: antibiotics for 10 days. Drink plenty of water."
         "Thank you for using TXTHLP.org -- help you need by SMS --"];

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