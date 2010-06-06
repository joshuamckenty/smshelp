var sys = require('sys');

exports.Question = function Question() {

    var that = this;
    var stateWrapper = { _private: { query: "", nextQuestion: {}} };

    function makeGetSet(obj, key) {
        return (function(value) {

            if (value === undefined) { return (obj._private[key]); }
            else { obj._private[key] = value; return (that); }

        });
    }

    function nextQ(key) { return (stateWrapper["_private"].nextQuestion[key]); }
    function addQ(key, q) { stateWrapper["_private"].nextQuestion[key] = q; }
    function getNextQuestion(tm) {
       sys.log("Getting question for response of " + tm.Body())

        // var next = nextQ("a") || nextQ(tm.Body().toLowerCase());
        return nextQ("a")
        if (next) {
            return (next);
        } else {
            return (null);
        }
    }

    function addQuestion(resp, question) {
        sys.log("Adding response for 'resp'" + resp);
        addQ(resp, question);
    }


    this.Query = makeGetSet(stateWrapper, "query");
    this.NextQuestion = getNextQuestion;
    this.AddNextQuestion = addQuestion;

};
