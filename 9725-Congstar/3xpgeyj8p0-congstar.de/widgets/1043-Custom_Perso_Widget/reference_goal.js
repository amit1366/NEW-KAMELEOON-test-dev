var goalID = 123456;
var testID = 12345;
var selector = '[container-id="6895287"]';
var currentTest = Kameleoon.API.Experiments.getById(testID) || Kameleoon.API.Experiments.getById('simulation');
if (currentTest.associatedVariation && currentTest.associatedVariation.id === 'reference') {
    Kameleoon.API.Core.runWhenElementPresent(selector, function (elem) {
        elem.addEventListener('click', function () {
            Kameleoon.API.Goals.processConversion(goalID);
        })
    })
}