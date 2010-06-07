var tm = require('./TextMessage');
var sys = require('sys');

exports.DAL = function() {

    var textHistory = [];

    function printArray(a, arrayName) {

        sys.puts("\n\n" + arrayName + " Length: " + a.length);

        var str = "";
        for (var i = 0; i < a.length; i++) {

            str += arrayName + "[" + i + "]: " + a[i].Body();
            str += "\n"
        }
        sys.puts(str + "\n");
    }

    function saveMessage(tm) {
        textHistory.push(tm);
        //printArray(textHistory, "textHistory");
    }
    function getMessage(id) { return (true); }

    function copyArray(a) {
        var c = [];
        for (var i = 0; i < a.length; i++) {
            c[i] = a[i];
        }
        return (c);
    }

    function getSessionMessages(sessionId, callback) {
        callback(copyArray(textHistory));
    };

    this.SaveMessage = saveMessage;
    this.GetMessage = getMessage;
    this.GetSessionMessages = getSessionMessages;

}