// console.log('New2 SS variation code called');
import { bmstring, animatehtml } from "./html";
import { insertbtnel } from "./functions";



// commongoals()
function init() {
//hello popup
    Kameleoon.API.Utils.querySelectorAll('body')[0].classList.add('bm-pdp')
    Kameleoon.API.Utils.querySelectorAll('body.page-list-view')[0].insertAdjacentHTML('afterBegin', bmstring)


    insertbtnel()
    window.addEventListener('scroll', function () {
        console.log('scroll');
        insertbtnel();
    })


}

Kameleoon.API.Core.runWhenElementPresent('.products-list', () => {
    init();
}, 500);