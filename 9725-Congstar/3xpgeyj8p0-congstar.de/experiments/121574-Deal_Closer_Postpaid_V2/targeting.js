if (Kameleoon.API.CurrentVisit.customData['Plan PDP']) {
    if ((Kameleoon.API.CurrentVisit.customData['Plan PDP'].some(item => item === 'Plan M' || item === 'Plan S')) &&
        !Kameleoon.API.CurrentVisit.customData['Plan PDP'].includes('Plan L')) {
        return true;
    } else if (Kameleoon.API.CurrentVisit.customData['Plan PDP'].some(item => item === 'Plan M' || item === 'Plan L') &&
        !Kameleoon.API.CurrentVisit.customData['Plan PDP'].includes('Plan S')) {
        return true;
    } else if (Kameleoon.API.CurrentVisit.customData['Plan PDP'].length === 3 && Kameleoon.API.CurrentVisit.customData['Last seen plan PDP']) {
        return true;
    } else {
        return false;
    }
}
