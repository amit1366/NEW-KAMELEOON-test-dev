import { common } from "./common";

const bm_strip= `<div class="bm_strip_wrap">fraenk - eine Marke der Telekom Deutschland GmbH</div>`;

function init() {

    let homePage = 'https://fraenk.de/';
    let holDirFraenk = 'https://fraenk.de/hol-dir-fraenk/';

    if(window.location.href === homePage){
        // add #brand at the end of the url 
        window.location.href = homePage+'#brand';
    }
    if(window.location.href === holDirFraenk){
        // add #brand at the end of the url 
        window.location.href = holDirFraenk+'#brand';
    }

    if(window.location.href.indexOf('#brand') > -1 || window.location.href.indexOf('#brand') > -1){

        // insert element
        Kameleoon.API.Utils.querySelectorAll('body')[0].classList.add('bm_fraenk_t1');
        var interval =  setInterval(function(){
            if(Kameleoon.API.Utils.querySelectorAll('.bm_strip_wrap')[0]) return
            Kameleoon.API.Utils.querySelectorAll('.tariff-pricing__addition')[0].insertAdjacentHTML('beforebegin', bm_strip);
        }, 50);
        
        setTimeout(function(){
            clearInterval(interval)
        }, 5000); 
    }
};
common()
Kameleoon.API.Core.runWhenElementPresent('.tariff-pricing__addition', () => {
    init();

}, 500);