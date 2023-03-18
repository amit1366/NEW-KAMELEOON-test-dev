import { createElement, createElementTY, images } from '../../../_helpers/T26-MGM_Deep_Sell/markups';
import { goals } from '../../../_helpers/T26-MGM_Deep_Sell/goals';

if (!document.location.pathname.includes('/checkout/bestaetigung')) {
    const bannerData = {
        headline: 'CONGSTAR FOR FRIENDS',
        text: 'Du hast Freunde, die bereits bei congstar Kunde sind? Lass dich werben und sichere deinen Freunden und dir mit congstar for Friends jeweils 10% Rabatt.',
        button: 'Wie geht das?',
        link: 'https://www.congstar.de/for-friends',
        images: [
            images.only10,
            images.only10Mobile,
        ],
    };

    createElement(bannerData, false, goals, false);
} else {
    const bannerData = {
        headlineLeft: 'CONGSTAR FOR FRIENDS',
        textLeft: 'Herzlichen Glückwunsch, du bist nun congstar Kunde. Empfiehl uns weiter & sichere deinen Freunden und dir mit congstar for friends exklusive Vorteile!',
        buttonLeft: 'congstar empfehlen',
        linkLeft: 'https://www.congstar.de/for-friends',
        headlineRight: 'CONGSTAR DEALS',
        textRight: 'Shopping & mehr: Exklusive Gutscheine nur für congstar Kunden!',
        buttonRight: 'congstar Deals entdecken',
        linkRight: 'https://www.congstar.de/congstar-deals/',
        images: [
            images.generic,
            images.genericMobile,
            images.taschenCheckout,
        ],
    };

    Kameleoon.API.Core.runWhenElementPresent('.row.row-template--2-col.row--relative', ([element]) => {
        element.classList.add('kam-hidden');
        createElementTY(element, bannerData, false, goals, false);
    });
}
