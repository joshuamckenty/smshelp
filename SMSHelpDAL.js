
var tm = require('./TextMessage');

exports.DAL = function() {

    function saveMessage(tm) { return (true); }
    function getMessage(id) { return (true); }
    function getSessionMessages(sessionId) {

        return ([]);
        
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