import { initPopup } from './popup';

let countOfVisit = +Kameleoon.API.Data.readLocalData('KameleoonDev__quantityOfVisits');

const initVariation = () => {
    countOfVisit++;

    if (Kameleoon.API.CurrentVisit.customData['Plan PDP']) {
        if ((Kameleoon.API.CurrentVisit.customData['Plan PDP']
            .some((item) => item === 'Plan M' || item === 'Plan S'))
            && !Kameleoon.API.CurrentVisit.customData['Plan PDP'].includes('Plan L')) {
            initPopup('mBanner');
            fetch('https://www.congstar.de/portal/handytarife/allnet-flat-m/?sp=cweb&cc=rb-07ghjk');
        } else if (Kameleoon.API.CurrentVisit.customData['Plan PDP']
            .some((item) => item === 'Plan M' || item === 'Plan L')
            && !Kameleoon.API.CurrentVisit.customData['Plan PDP'].includes('Plan S')) {
            initPopup('lBanner');
            fetch('https://www.congstar.de/portal/handytarife/allnet-flat-l/?sp=cweb&cc=rb-08ghjk');
        } else if (Kameleoon.API.CurrentVisit.customData['Plan PDP'].length === 3 
            && Kameleoon.API.CurrentVisit.customData['Last seen plan PDP']) {
            if (Kameleoon.API.CurrentVisit.customData['Last seen plan PDP'].includes('Plan L')) {
                initPopup('lBanner');
                // eslint-disable-next-line
                fetch('https://www.congstar.de/portal/handytarife/allnet-flat-l/?sp=cweb&cc=rb-08ghjk');
            } else {
                initPopup('mBanner');
                // eslint-disable-next-line
                fetch('https://www.congstar.de/portal/handytarife/allnet-flat-m/?sp=cweb&cc=rb-07ghjk');
            }
        }
    }

    if (!sessionStorage.getItem('KameleoonDev__curentVisit')) {
        sessionStorage.setItem('KameleoonDev__curentVisit', true);
        Kameleoon.API.Data.writeLocalData('KameleoonDev__quantityOfVisits', countOfVisit, true);
    }
};

initVariation();
