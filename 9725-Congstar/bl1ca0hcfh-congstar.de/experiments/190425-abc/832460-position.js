import { bmstring, animatehtml } from "./html";
import { selectors } from "./selectors";
import { commongoals } from "./common";
import { listnerclickhandler } from "./functions";



commongoals()
function init() {
    // insert element 
    document.querySelector(selectors.header).insertAdjacentHTML('afterend', bmstring);
    document.querySelector(selectors.headerLogindbtn).insertAdjacentHTML('afterBegin', animatehtml)

    // call main func
    listnerclickhandler()
}
Kameleoon.API.Core.runWhenElementPresent('header a[href*="login"]', () => {
    init();

}, 500);