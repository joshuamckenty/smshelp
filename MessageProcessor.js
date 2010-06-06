var smsHelpDAL = new (require("./SMSHelpDAL")).DAL();

exports.MessageProcessor() = function(messageType, decisionTree) {

    var port = 6379;
    var host = "smshlp.org"

    function messageHandler(tm) {
        SaveMessage(tm)

        tmio.SendMessage(decisionTree.NextMessage(tm));
        
    }


    var tmio = new (require("./TextMessageIO")).TextMessageIO(host, port, messageType, messageHandler, "outbound");


    this.Start = function() { tmio.Start(); };
    this.Stop = function() { tmio.Stop(); };

};