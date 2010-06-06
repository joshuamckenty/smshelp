
var tm = require('./TextMessage');
var client = require("./redis-client").createClient();

exports.DAL = function() {

    function saveMessage(tm) { return (true); }
    function getMessage(id) { return (true); }
    function getSessionMessages(sessionId, callback) {

        // return ([]);
        client.lrange(sessionId,  0, -1, function (err, jsonMessages) { 
          if (!jsonMessages) {
            jsonMessages = [];
          }
          var textMessages = [];
          for (var i = 0; i < jsonMessages.length; i++) {
            textMessages[i] = new tm.TextMessage(jsonMessages[i]);
          }
          callback (textMessages);
        });
    };

    this.SaveMessage = saveMessage;
    this.GetMessage = getMessage;
    this.GetSessionMessages = getSessionMessages;

}
