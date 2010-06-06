var sys = require("sys");

exports.TextMessage = function(jsonState) {

    var that = this;
    var stateWrapper = { _private: { from: "", fcity: "", fstate: "", fzip: "", fcountry: "",
        to: "", tcity: "", tstate: "", tzip: "", tcountry: "",
        body: "",
        twilosmssid: "",
        twiloacctid: ""
    }
    };

    function makeGetSet(obj, key) {
        return (function(value) {

            if (value === undefined) { return (obj._private[key]); }
            else { obj._private[key] = value; return (that); }

        });
    }

    this.FromPhone = makeGetSet(stateWrapper, "from");
    this.FromCity = makeGetSet(stateWrapper, "fcity");
    this.FromState = makeGetSet(stateWrapper, "fstate");
    this.FromZip = makeGetSet(stateWrapper, "fzip");
    this.FromCountry = makeGetSet(stateWrapper, "fcountry");

    this.ToPhone = makeGetSet(stateWrapper, "to");
    this.ToCity = makeGetSet(stateWrapper, "tcity");
    this.ToState = makeGetSet(stateWrapper, "tstate");
    this.ToZip = makeGetSet(stateWrapper, "tzip");
    this.ToCountry = makeGetSet(stateWrapper, "tcountry");

    this.Body = makeGetSet(stateWrapper, "body");

    this.TwiloSmsSid = makeGetSet(stateWrapper, "twilosmssid");
    this.TwiloAcctId = makeGetSet(stateWrapper, "twiloacctid");

    this.Serialize = function() { return (JSON.stringify(stateWrapper["_private"])); };
    this.Deserialize = function(json) {
    try {
            stateWrapper["_private"] = JSON.parse(json.toString())
        } catch (e) { sys.puts(e); return (null); }
    };
    
    if (jsonState) {
        that.Deserialize(jsonState);
    }
}
