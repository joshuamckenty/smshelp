var sys = require('sys');

exports.Question = function Question(questionString, possibleResponses) {

    var that = this;
    var stateWrapper = { _private: { query: (questionString ? questionString : ""), responses: (possibleResponses ? possibleResponses : [])} };

    function makeGetSet(obj, key) {
        return (function(value) {

            if (value === undefined) { return (obj._private[key]); }
            else { obj._private[key] = value; return (that); }

        });
    }

    function getNextQuestion(responseString) {

        var myChildren = that.Responses();

        for (var i = 0; i < myChildren.length; i++) {

            if (myChildren[i] && myChildren[i].Matches) {

                if (myChildren[i].Matches(responseString)) {

                    return (myChildren[i].NextQuestion());
                }
            }
        }

        return (null);
    }

    this.Query = makeGetSet(stateWrapper, "query");
    this.NextQuestion = getNextQuestion;
    this.Responses = makeGetSet(stateWrapper, "responses");
};
