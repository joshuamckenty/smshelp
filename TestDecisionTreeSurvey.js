var sys = require("sys");

var dt = require("./DecisionTree");
var riskDT = require("./BuildingSurveyDecisionTree");
var medDT = require("./MedicalSurveyDecisionTree");
var skillsDT = require("./SkillsSurveyDecisionTree");

exports.TestDecisionTreeSurvey = function() {

    var that = this;


    function RunSurveyTest(survey) {

        var nextQ = null;
        var responses = [];

        survey.LoadState(responses);

        nextQ = survey.CurrentQuestion();


        while (nextQ) {

            sys.puts("Question: " + nextQ.Query());
            sys.puts("Response: " + "Fake Response");
            sys.puts("\n");

            responses.push("Test Response");

            survey.LoadState(responses);
            nextQ = survey.CurrentQuestion();

        }

        responses.push(["Test Response", "", ""]);

        survey.LoadState(responses);
        nextQ = survey.CurrentQuestion();
        if (nextQ) {
            sys.puts("Question: " + nextQ.Query());
            sys.puts("Response: " + "Fake Response");
            sys.puts("\n");
        }
    }

    this.RunTests = function() {

        sys.puts("SURVEY START\n\n");
        RunSurveyTest(new riskDT.BuildingSurveyDecisionTree());
        sys.puts("SURVEY END\n\n");

        sys.puts("SURVEY START\n\n");
        RunSurveyTest(new skillsDT.SkillsSurveyDecisionTree());
        sys.puts("SURVEY END\n\n");

        sys.puts("SURVEY START\n\n");
        RunSurveyTest(new medDT.MedicalSurveyDecisionTree());
        sys.puts("SURVEY END\n\n");
    };
};