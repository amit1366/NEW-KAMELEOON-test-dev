// this is original code from help.kameleoon.com + T03 variation selection
/*
function (experiment) {
    if (experiment.id == "149062") { 
        console.log('targeted on [DEV|CSC|T04] Tariffreiheit');
        //code for the experiment you would like a specific behavior. 
        // It has to be adapted to your use case
        // const tarifName = Kameleoon.API.CurrentVisit.customData['[DEV] CSC T04'];
        // dataLayer.push({
        //     kameleoon_audience: tarifName,
        //     kameleoon_experiment: '[DEV|T04|CSC] Tarifwechselfreiheit'
        // });
        
        if (typeof tarifName !== 'undefined') {
            console.log(tarifName);
             if (tarifName.match('_KG')) {
                console.log('target this user to Original (KG) => 715817');
                return 715817;
            } else if (tarifName.match('_TG')) {
                console.log('target this user to TG => 718736');
                return 718736;
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
        return registeredVariationId ? registeredVariationId : "none";
    }
}
*/
