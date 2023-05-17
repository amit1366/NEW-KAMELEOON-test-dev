function init() {

    let homePage = 'https://fraenk.de/';
    let holDirFraenk = 'https://fraenk.de/hol-dir-fraenk/';

    if(window.location.href === homePage || window.location.href.indexOf(homePage+'?') > -1){
        // add #brand at the end of the url 
        window.location.href = homePage+'#brand';
    }
    if(window.location.href === holDirFraenk){
        // add #brand at the end of the url 
        window.location.href = holDirFraenk+'#brand';
    }

};
Kameleoon.API.Core.runWhenElementPresent('.tariff-pricing__addition', () => {
    init();

}, 500);