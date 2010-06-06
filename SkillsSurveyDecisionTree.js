
var dt = require("./DecisionTree");
    
exports.SkillsSurveyDecisionTree = function() {

      var qStrings = ["Tell us about nature of skills your offering: [M]edical, [R]isk, [D]isaster, [L]abour/manual work, [T]echnical/IT",
             "Tell us about your qualifications and experience: degrees, university, #years experience post graduation, areas of specialty",
             "What is your country of origin? Where are you based? [city, zip/postal code, nation]",
             "What are your weekly hours of availability to respond to text messages: [Mon:hh:mm-hh:mm, Sun:hh:mm-hh:mm]",
             "Thank you for registering with TXTHLP.org -- help you need by SMS --"];


    return(new dt.DecisionTree(qStrings));
};
