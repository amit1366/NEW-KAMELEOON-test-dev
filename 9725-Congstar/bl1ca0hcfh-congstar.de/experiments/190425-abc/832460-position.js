// console.log('New2 SS variation code called');
import { bmstring } from "./html";
// import { bmTogglefunction } from "./functions";

// import { selectors } from "./selectors";


// commongoals()
function init() {
    // insert
    Kameleoon.API.Utils.querySelectorAll('body')[0].classList.add('hello');

   
        Kameleoon.API.Utils.querySelectorAll('.header-nav  .navbar-nav .link-online-shop')[0].insertAdjacentHTML('beforeend', bmstring);

}
Kameleoon.API.Core.runWhenElementPresent(".navbar-nav .link-online-shop", () => {
    init();
}, 500);
