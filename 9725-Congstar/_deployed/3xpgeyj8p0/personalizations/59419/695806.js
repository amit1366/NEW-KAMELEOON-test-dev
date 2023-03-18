/* eslint-disable max-len */
const markup = `
<div id="cyberdeal" class="cyber-container">
    <div class="container-content">
        <div id="img-container">
            <img class="img-height" src="https://storage.kameleoon.com/congstar/black-friday-banner/Visual%20Cyber%20Deal.png">
        </div>
        <div class="content-text">
            <h3 class="headline-size">Nur vom 25.11.-29.11.:</h3>
            <div class="text-size">Die <a id="allnet-link" href="https://www.congstar.de/handytarife/allnet-flat-m/">Allnet Flat M</a> jetzt mit 25 GB (<strike><span class="text-size">statt 10 GB<span></strike>) für nur 20&nbsp;€ mtl.
            <span class="breakpoint">\r\n</span>
            Außerdem schenken wir dir bei Abschluss einer Allnet Flat S, M, L oder Fair Flat den Bereitstellungspreis!</div>
        </div>
        <div class="close">
            <div id="close" class="close-pointer">
                <strong>&#xE90D</strong>
            </div>
        </div>
    </div>
</div>
`;

const goals = {
    'P11 Klick Banner': 267833,
    'P11 Klick X Banner': 267834
};

Kameleoon.API.Core.runWhenElementPresent('body', ([element]) => {
    element.insertAdjacentHTML('afterbegin', markup);
});

Kameleoon.API.Core.runWhenElementPresent('.header', ([header]) => {
    header.classList.add('add-height');
    document.querySelector('.content').classList.add('add-margin');
    document.querySelector('#header-nav__main').classList.add('hamburger-menu');    
    document.querySelector('.header-nav__wrapper-list').classList.add('hamburger-parent');
    document.querySelector('.main-nav.list-unstyled').classList.add('hamburger-content');
    document.querySelector('.filter-facet-panel').classList.add('filter-height');
});

Kameleoon.API.Core.runWhenElementPresent('#close', ([element]) => {
    element.addEventListener('click', () => {
        const cyberdeal = document.querySelector('#cyberdeal');
        cyberdeal.style.display = 'none';

        Kameleoon.API.Goals.processConversion(goals['P11 Klick X Banner']);
        Kameleoon.API.Data.writeLocalData('blackfriday-banner-closed', +new Date(), true);

        document.querySelector('.header').classList.remove('add-height');
        document.querySelector('.content').classList.remove('add-margin');
        document.querySelector('#header-nav__main').classList.remove('hamburger-menu');
        document.querySelector('.header-nav__wrapper-list').classList.remove('hamburger-parent');
        document.querySelector('.main-nav.list-unstyled').classList.remove('hamburger-content');
        document.querySelector('.filter-facet-panel').classList.remove('filter-height');
    });
});

Kameleoon.API.Core.runWhenElementPresent('#allnet-link', ([element]) => {
    element.addEventListener('click', () => {
        Kameleoon.API.Goals.processConversion(goals['P11 Klick Banner']);
    });
});
