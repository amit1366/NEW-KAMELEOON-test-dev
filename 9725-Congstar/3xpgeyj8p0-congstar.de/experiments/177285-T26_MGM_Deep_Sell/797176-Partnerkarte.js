import {
    createElement, createElementTY, images, simCard
} from '../../../_helpers/T26-MGM_Deep_Sell/markups';
import { goals } from '../../../_helpers/T26-MGM_Deep_Sell/goals';

if (!document.location.pathname.includes('/checkout/bestaetigung')) {
    const bannerData = {
        headline: 'PARTNERKARTE',
        text: 'Exklusive Rabatte auf den nächsten Tarif für dich, Partner oder Familie!',
        button: 'Kundenvorteil sichern',
        link: 'https://www.congstar.de/meincongstar/angebote/partnerkarte/',
        images: [
            simCard,
        ],
    };

    createElement(bannerData, true, goals, true);
} else {
    const bannerData = {
        headlineLeft: 'CONGSTAR FOR FRIENDS',
        textLeft: 'Herzlichen Glückwunsch, du bist nun congstar Kunde. Empfiehl uns weiter & sichere deinen Freunden und dir mit congstar for friends exklusive Vorteile!',
        buttonLeft: 'congstar empfehlen',
        linkLeft: 'https://www.congstar.de/for-friends',
        headlineRight: 'CONGSTAR DEALS',
        textRight: 'Exklusive Rabatte auf den nächsten Tarif für dich, Partner oder Familie!',
        buttonRight: 'Kundenvorteil sichern',
        linkRight: 'https://www.congstar.de/meincongstar/angebote/partnerkarte/',
        images: [
            images.generic,
            images.genericMobile,
            simCard,
        ],
    };

    Kameleoon.API.Core.runWhenElementPresent('.row.row-template--2-col.row--relative', ([element]) => {
        element.classList.add('kam-hidden');
        createElementTY(element, bannerData, true, goals, true);
    });
}
