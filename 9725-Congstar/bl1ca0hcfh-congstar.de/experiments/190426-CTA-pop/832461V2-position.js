import { insertbtnel } from "./functionsV2";



// commongoals()
function init() {
//hello popup
    Kameleoon.API.Utils.querySelectorAll('body')[0].classList.add('bm-falke-t10')

    insertbtnel()
    window.addEventListener('scroll', function () {
        console.log('scroll');
        insertbtnel();
    })


}

Kameleoon.API.Core.runWhenElementPresent('.products-list', () => {
    init();
}, 500);