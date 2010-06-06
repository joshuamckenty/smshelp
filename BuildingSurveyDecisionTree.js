exports.BuildingSurveyDecisionTree = function() {

    var that = this;

    var questions = new (require("./Question")).Question
    
    questions.Query("What type of building is this? Reply with [H]ouse, [A]partment, [R]etail, [O]ffice, [W]arehouse, or [I]ndustrial.");
    
    var tempQ = questions.MakeQuestion();
    
    questions.AddNextQuestion("", tempQ);
    
    
    
    
    {query: "What type of building is this? Reply with [H]ouse, [A]partment, [R]etail, [O]ffice, [W]arehouse, or [I]ndustrial.",
              }
    
    User: "*"
    Service: "Reply with [M]edical, [R]isk, [D]isaster, [S]kills I have {If this is emergency? If yes call 999}" 
    User: "R"
    S: "What type of building is this? Reply with [H]ouse, [A]partment, [R]etail, [O]ffice, [W]arehouse, or [I]ndustrial."
    User: "H"
    S: "How many stories does this building have? What is it made out of (eg, brick, wood, steel, etc.)?"
    User: "2, brick"
    S: "Where is this building?  Reply with the address if possible, otherwise reply with the postcode or light-post number."
    User: "Light Post 20815"
    S: "How much of the side of this building is covered by windows?  Reply none, some, most, or all, or %."
    User: "most"
    S: "What is the average occupancy in this building? What is its primary use? Reply living, restaurant, office, shop, hotel, multiple"
    User: "9, living"
    S: "Thank you for using TXTHLP.org -- help you need by SMS --. Your mobile account will be credited shortly. More credits available for doing other buildings in your area."

    

    

function loadMessages(messageArray) {



}


function nextMessage(currentMessage) {




}

this.LoadMessages = loadMessages;
this.NextMessage = nextMessage;

};