// console.log('New2 SS variation code called');
import { bmstring } from "./html";
import { insertbtnel } from "./functions";



// commongoals()
function init() {
    /**  add class body element*/
    Kameleoon.API.Utils.querySelectorAll('body')[0].classList.add('bm-pdp')
    Kameleoon.API.Utils.querySelectorAll('body.page-list-view')[0].insertAdjacentHTML('afterBegin', bmstring)

    /**
     * event on page scroll
     */
    insertbtnel()
    window.addEventListener('scroll', function () {
        insertbtnel();
    })
}

Kameleoon.API.Core.runWhenElementPresent('.products-list', () => {
    init();
}, 500);