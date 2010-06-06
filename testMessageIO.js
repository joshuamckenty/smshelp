var sys = require("sys");
var txtm = require("./TextMessage");

var port = 6379;
var host = "smshlp.org"

function messageHandler(tm) {
    sys.puts(tm.FromPhone());
    sys.puts(tm.FromCity());
    sys.puts(tm.FromState());
    sys.puts(tm.FromZip());
}

var tmio = new (require("./TextMessageIO")).TextMessageIO(host, port, "med", messageHandler, "outbound.foo");


function end() {
    sys.puts("TEST END"); tmio.Stop();
}


function test() {

    sys.puts("TEST START");

    var tm = new txtm.TextMessage();

    tm.ToPhone("7038555608");
    tm.FromPhone("6503183775");
    tm.Body("Hello World.");

    tmio.SendMessage(tm);    
    

    tmio.Start();

    setTimeout(end, 10000);
}


test();