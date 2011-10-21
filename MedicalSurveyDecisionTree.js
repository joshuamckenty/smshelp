
var dt = require("./DecisionTree");

exports.MedicalSurveyDecisionTree = function() {

    var qStrings = ["Tell us about patient: Age[#], Sex [M/F], Weight [kg], height [cm], Location [Town, zip/postal code], Kenya [(Y)es or (N)o]",
         "Describe symptoms: Type, location, duration[#(h)rs or #(d)ays], severity[(l)ow, (m)ed, (h)igh]. (e.g. rash,chest,24h,l; other)",
         "Describe medical history: on medication, Known allergies, any medical conditions (e.g. Lipitor, lidocaine, high blood pressure)",
         "Your details have been sent to a Medical Doctor for diagnosis. Typical response time 10 mins.",
         "Doctor: have you had any family history of diabetes?",
         "Doctor: Advice/likely Diagnosis: Terbuculosis. Treatment: antibiotics for 10 days. Drink plenty of water.",
         "Thank you for using TXTHLP.org -- help you need by SMS --"];

    var survey = new dt.DecisionTree();
    var questionTree = survey.MakeQuestionSurveyTreeFromStrings(qStrings);

    survey.QuestionTreeRoot(questionTree);

    return (survey);
};