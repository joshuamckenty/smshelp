var sys = require("sys");
exports.DecisionTree = function(rootQuestion) {

    var that = this;

    var quest = require("./Question");
    var qResp = require("./QuestionResponse");

    var stateWrapper = { _private: { questionRoot: (rootQuestion ? rootQuestion : null)} };

    function makeGetSet(obj, key) {
        return (function(value) {

            if (value === undefined) { return (obj._private[key]); }
            else { obj._private[key] = value; return (that); }

        });
    }

    var currentQuestion = null;

 
    function loadState(responseArray) {

        currentQuestion = that.QuestionTreeRoot();

        for (var i = 0; i < responseArray.length; i++) {

            if (currentQuestion) {
                currentQuestion = currentQuestion.NextQuestion(responseArray[i]);
            } else { break; }
        }
    }

    function curQuestion() {
        return (currentQuestion);
    }

  
    function makeQuestionSurveyTreeFromStrings(qStrings) {

        var root = null;

        var previous = null;
        var current = null;

        if (qStrings.length > 0) {
            root = new quest.Question(qStrings[0]);
            previous = root;
        }

        for (var i = 1; i < qStrings.length; i++) {

            current = new quest.Question(qStrings[i]);
            previous.Responses([new qResp.QuestionResponse(".*", current)]);

            previous = current;

        }

        return (root);
    }

    this.QuestionTreeRoot = makeGetSet(stateWrapper, "questionTreeRoot");
    this.LoadState = loadState;
    this.CurrentQuestion = curQuestion;

    this.MakeQuestionSurveyTreeFromStrings = makeQuestionSurveyTreeFromStrings;

};
