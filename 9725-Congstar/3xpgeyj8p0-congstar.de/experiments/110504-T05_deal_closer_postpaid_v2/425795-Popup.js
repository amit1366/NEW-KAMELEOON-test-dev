import {initPopup} from './popup';
import {dispalyFootnote} from './info-star-modal.js';

let countOfVisit = +Kameleoon.API.Data.readLocalData('KameleoonDev__quantityOfVisits');

const initVariation = () => {
    countOfVisit++;    
    initPopup(dispalyFootnote);
    if (!sessionStorage.getItem('KameleoonDev__curentVisit')) {
        sessionStorage.setItem('KameleoonDev__curentVisit', true);
        Kameleoon.API.Data.writeLocalData('KameleoonDev__quantityOfVisits', countOfVisit, true);
        fetch('https://www.congstar.de/portal/handytarife/allnet-flat-m/?sp=cweb&cc=rb-07ghjk');
    }
};

initVariation();
