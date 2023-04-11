// console.log('New2 SS variation code called');
import { htmlString } from "./html";
import { bmTogglefunction } from "./functions";

bmTogglefunction()

function init() {
    // console.log('New2 SS variation inside init');
    Kameleoon.API.Utils.querySelectorAll('body')[0].classList.add('bm-accordian');
    Kameleoon.API.Utils.querySelectorAll('.trust-area')[0].insertAdjacentHTML('afterend',htmlString);

 


}
Kameleoon.API.Core.runWhenElementPresent("body", () => {
    init();
}, 200);
