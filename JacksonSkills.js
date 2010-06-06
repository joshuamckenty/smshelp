var sys = require("sys");
var mp = require("./MessageProcessor");
var riskDT = require("./SkillsSurveyDecisionTree");

function main() {

    sys.puts("Server Started.");

    var survey = new mp.MessageProcessor("skills", riskDT.SkillsSurveyDecisionTree());

    survey.Start();
}


main();
