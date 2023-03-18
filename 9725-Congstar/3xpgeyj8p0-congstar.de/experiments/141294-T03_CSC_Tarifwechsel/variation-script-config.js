/* eslint-disable max-len */
/*
// this is original code from help.kameleoon.com + T03 variation selection

function (experiment) {
    if (experiment.id == "141294") { 
        console.log('targeted on [CSC|T03] Tarifreihenfolge TW-Seite');
        //code for the experiment you would like a specific behavior. It has to be adapted to your use case
        const tarifName = Kameleoon.API.CurrentVisit.customData['CSC T03'];
        dataLayer.push({
            kameleoon_audience: tarifName,
            kameleoon_experiment: '[CSC|T03] Tarifreihenfolge TW-Seite'
        });
        if (typeof tarifName !== 'undefined') {
            console.log(tarifName);
            if (tarifName.match('Original')) {
                console.log('target this user to T03 => Original');
                return 0;
            } else if (tarifName.match('Ein_Tarif')) {
                console.log('target this user to T03 => Ein_Tarif');
                return 662114;
            } else if (tarifName.match('Zwei_Tarife')) {
                console.log('target this user to T03 => Zwei_Tarife');
                return 661815;
            }
        }
    } else { //default behavior is applied for all other experiments
        var registeredVariationId;
        var deviationRandom = experiment.obtainVariationAssignmentRandomNumber();
        var total = 0.0;
        for (var i = 0, l = experiment.variations.length; i < l; ++i) {
            total += experiment.variations[i].deviation;
            if (deviationRandom <= total) {
                registeredVariationId = experiment.variations[i].id;
                break;
            }
        }
        return registeredVariationId != null ? registeredVariationId : "none";
    }
}
*/
