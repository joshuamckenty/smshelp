
var tm = require('./TextMessage');
var client = require("./redis-client").createClient();

exports.DAL = function() {

    function saveMessage(tm) { return (true); }
    function getMessage(id) { return (true); }
    function getSessionMessages(sessionId) {

        // return ([]);
        jsonMessages = client.lrange(sessionId,  0, -1); 
        if (!jsonMessages) {
            jsonMessages = [];
        }
        var textMessages = [];
        for (var i = 0; i < jsonMessages.length; i++) {
            textMessages[i] = new tm.TextMessage(jsonMessages[i]);
        }

        return (textMessages);
    }

    this.SaveMessage = saveMessage;
    this.GetMessage = getMessage;
    this.GetSessionMessages = getSessionMessages;

}
