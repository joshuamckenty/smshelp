exports.DAL = function() {

    function saveMessage(tm) { return (true); }
    function getMessage(id) { return (true); }


    this.SaveMessage = saveMessage;
    this.GetMessage = getMessage;

}