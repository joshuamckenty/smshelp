exports.Question = function Question() {

    var that = this;
    var stateWrapper = { _private: { query: "", nextQuestion: {}}};

    function makeGetSet(obj, key) {
        return (function(value) {

            if (value === undefined) { return (obj._private[key]); }
            else { obj._private[key] = value; return (that); }

        });
    }

    function nextQ(key){return(stateWrapper["_private"].nextQuestion[key]);}
    function addQ(key, q){stateWrapper["_private"].nextQuestion[key] = q;}
    function getNextQuestion(tm){
    
        var next = nextQ("") | nextQ(tm.Body().toLower());
        
        if(next){
            return(next);
        }else{
            return(null);
        }
   }
   
    function addQuestion(resp, question){
        addQ(resp, question);
    }


    this.Query = makeGetSet(stateWrapper, "query"); 
    this.NextQuestion = getNextQuestion;
    this.AddNextQuestion = addQuestion;

    this.MakeQuestion = function(){return(new Question());}

};
