var sys = require("sys");

var port = 6379;
var host = "smshlp.org"

function messageHandler(tm) {
    sys.puts(tm.FromPhone());
    sys.puts(tm.FromCity());
    sys.puts(tm.FromState());
    sys.puts(tm.FromZip());
}

var tmio = new (require("./TextMessageIO")).TextMessageIO(host, port, "med", messageHandler, "outbound");


function end() {
    sys.puts("TEST END"); tmio.Stop();
}


function test() {

    sys.puts("TEST START");

    tmio.Start();

    setTimeout(end, 10000);
}


test();