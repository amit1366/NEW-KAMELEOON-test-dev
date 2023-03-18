import { markup } from './banner_markup';

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
