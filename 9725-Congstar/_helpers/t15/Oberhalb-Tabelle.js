import { svg } from './svg';

export default () => {
    const selectors = {
        header: '.hero'
    };
    const bannerHTML = `
    <div class=kam-banner>
        ${svg}<span> Gute Wahl: Du hast Dich für das beste Produkt entschieden! <span>
    </div>
    `;
    Kameleoon.API.Core.runWhenElementPresent(selectors.header, ([header]) => {
        header.insertAdjacentHTML('beforeend', bannerHTML);
    });
};
