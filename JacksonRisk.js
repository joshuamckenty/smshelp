var sys = require("sys");
var mp = require("./MessageProcessor");
var riskDT = require("./BuildingSurveyDecisionTree");

function main() {

    sys.puts("Server Started.");

    var survey = new mp.MessageProcessor("risk", riskDT.BuildingSurveyDecisionTree());

    survey.Start();
}


main();
