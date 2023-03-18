import { removeElemet } from './utils.js';

export default () => {
    const urls = [
        `https://www.nicotuadev.de/handytarife/smartphone-tarife-im-vergleich`,
        `https://www.nicotuadev.de/handytarife/allnet-flat-tarife`,
    ];
    console.log(`REMOVE`);
    if (urls.some((url) => location.href.match(url))) {
    
        Kameleoon.API.Core.runWhenElementPresent(`tr.vertical-grey`, (tableRaws) => {

            const targetedRaws = tableRaws.filter((raw) => {
            
                const sell = raw.querySelector(`th`);
                const sellParagraph = raw.querySelector(`p`);

                if (sell) {
                    return sell.textContent.match(`Extra-Daten-Option`);
                } else if (sellParagraph) {
                    return sellParagraph.textContent.match(`mtl.`);
                }

                return false;
            });

            targetedRaws.forEach((raw) => {
                removeElemet(raw);
            });
        
        });

        Kameleoon.API.Core.runWhenElementPresent(`li.icon--check`, (mobileTableRaws) => {
            
            const targetedRaws = mobileTableRaws.filter((raw) => {
            
                const linkText = raw.querySelector(`a > span`);

                if (linkText) {
                    return linkText.textContent.match(`Extra-Daten-Option`);
                }

                return false;
            });
            console.log(targetedRaws);
            targetedRaws.forEach((raw) => {
                removeElemet(raw);
            });
        
        });

        

    }
};