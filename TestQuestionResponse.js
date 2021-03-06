var sys = require('sys');
var resp = require("./QuestionResponse");

exports.TestQuestionResponse = function() {

    var that = this;

    this.RunTests = function() {

        var r = new resp.QuestionResponse();

        r.RegEx(".*");

        sys.puts("Regex: " + r.RegEx());
        
        sys.puts("Matches [a]: " + r.Matches("a"));
        sys.puts("Matches [A]: " + r.Matches("A"));
        
        sys.puts("Matches [b]: " + r.Matches("b"));
        sys.puts("Matches [ ]: " + r.Matches(" "));
        
    }
};