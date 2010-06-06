var sys = require("sys");
var dt = require("./DecisionTree");

exports.BuildingSurveyDecisionTree = function() {

    var qStrings = ["What type of building is this? Reply with [H]ouse, [A]partment, [R]etail, [O]ffice, [W]arehouse, or [I]ndustrial.",
                    "How many stories does this building have? What is it made out of (eg, brick, wood, steel, etc.)?",
                    "Where is this building?  Reply with the address if possible, otherwise reply with the postcode or light-post number.",
                    "How much of the side of this building is covered by windows?  Reply none, some, most, or all, or %.",
                    "What is the average occupancy in this building? What is its primary use? Reply living, restaurant, office, shop, hotel, multiple",
                    "Thank you for using TXTHLP.org -- help you need by SMS --. Your mobile account will be credited shortly. More credits available for doing other buildings in your area."];

    return (new dt.DecisionTree(qStrings));
};

