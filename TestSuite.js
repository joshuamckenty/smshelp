var sys = require('sys');
var qresp = new (require("./TestQuestionResponse")).TestQuestionResponse;
var build = new (require("./TestDecisionTreeSurvey")).TestDecisionTreeSurvey;

function main() {

    sys.puts("\n-- START -- Question Response Tests ---------------------------------\n");

    qresp.RunTests();

    sys.puts("\n-- END ---- Question Response Tests ---------------------------------\n");

    sys.puts("\n-- START -- Decision Tree Survey Tests ---------------------------------\n");

    build.RunTests();

    sys.puts("\n-- END ---- Decision Tree Survey Tests ---------------------------------\n");
}


main();
