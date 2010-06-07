var sys = require('sys');

exports.QuestionResponse = function(regex) {

    var that = this;
    var stateWrapper = { _private: { responseRegEx: ""} };

    function makeGetSet(obj, key) {
        return (function(value) {

            if (value === undefined) { return (obj._private[key]); }
            else { obj._private[key] = value; return (that); }

        });
    }


    function matchResponse(r) {
        var test = new RegExp(that.RegEx());
        return (test.test(r));
    }

    this.RegEx = makeGetSet(stateWrapper, "responseRegEx");
    this.Matches = matchResponse;
};
