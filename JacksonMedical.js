var sys = require("sys");
var mp = require("./MessageProcessor");
var riskDT = require("./MedicalSurveyDecisionTree");

function main() {

    sys.puts("Server Started.");

    var survey = new mp.MessageProcessor("medical", riskDT.BuildingSurveyDecisionTree());

    survey.Start();
}


main();
