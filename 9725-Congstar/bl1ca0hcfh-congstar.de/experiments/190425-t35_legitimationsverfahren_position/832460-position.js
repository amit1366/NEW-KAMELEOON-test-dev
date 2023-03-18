// console.log('New2 SS variation code called');
function init() {
    // console.log('New2 SS variation inside init');
    Kameleoon.API.Utils.querySelectorAll('body')[0].classList.add('bm-Congstar-T35');



}
Kameleoon.API.Core.runWhenElementPresent("body", () => {
    init();
}, 200);
