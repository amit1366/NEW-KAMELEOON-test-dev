// console.log('New2 SS variation code called');
import { commstring, gashtml } from "./html";
import { bmTogglefunction } from "./functions";
import { commongoals } from "./common";
import { selectors } from "./selectors";

bmTogglefunction()
commongoals()
function init() {
    // insert
    Kameleoon.API.Utils.querySelectorAll('body')[0].classList.add(selectors.bodyClsel);

    let pathname = window.location.pathname
    if (pathname.indexOf('/strom') > -1) {
        Kameleoon.API.Utils.querySelectorAll(selectors.stromPageEL)[0].insertAdjacentHTML('afterend', commstring);
    } else if (pathname.indexOf('/gas') > -1) {
        Kameleoon.API.Utils.querySelectorAll(selectors.gasPageEl)[0].insertAdjacentHTML('afterend', gashtml);
    }
}
Kameleoon.API.Core.runWhenElementPresent("#footer-bottom", () => {
    init();
}, 500);
