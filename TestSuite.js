var sys = require('sys');
var qresp = new (require("./TestQuestionResponse")).TestQuestionResponse;

function main() {

    sys.puts("\n-- START -- Question Response Tests ---------------------------------\n");

    qresp.RunTests();

    sys.puts("\n-- END ---- Question Response Tests ---------------------------------\n");
}


main();
