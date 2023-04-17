// console.log('New2 SS variation code called');
import { bmstring, animatehtml } from "./html";
// import { bmTogglefunction } from "./functions";
// import { live, showpopup } from "./functions";
import { selectors } from "./selectors";
import { commongoals } from "./common";



commongoals()
function init() {
    // insert element 
    document.querySelector(selectors.header).insertAdjacentHTML('afterend', bmstring);
    document.querySelector(selectors.headerLogindbtn).insertAdjacentHTML('afterBegin', animatehtml)


    /*clik on bm
    ragister button*/
    document.querySelector(selectors.bmloginButton).addEventListener('click', function () {
        console.log('click');
        let input = Kameleoon.API.Utils.querySelectorAll('.bm-email-input')[0].value
        console.log(input);
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (input.match(validRegex) && input != '') {
            document.querySelector(selectors.body).classList.add('popup-active')
            this.closest(selectors.formRightSec).classList.add('d-none')
            document.querySelector(selectors.iframeMainel).classList.remove('d-none');
        } else {
            document.querySelector(selectors.bmEmailInput).classList.add('show-error')
        }

        // when iframe present 
        let iframe = document.querySelector(selectors.bmIframe);
        let iframeheaderel = iframe.contentWindow.document.querySelector('.pusher')
        iframeheaderel.classList.add('bm-pusharheader');
        let fornemail = iframe.contentWindow.document.querySelector(selectors.iframeEmail);
        fornemail.classList.add('active')
        fornemail.value = input
        let form = iframe.contentWindow.document.querySelector(selectors.popupForm);
        form.setAttribute('target', "_parent")
    })



    /*click on header
    login icon */
    document.querySelector(selectors.headerLogindbtn).addEventListener('click', function (e) {
        e.preventDefault()
        document.querySelector(selectors.body).classList.add('bm-popup-active');
        this.classList.add('bm-removeanimation')
    })

    /*click on cross icon
    remove popup */
    document.querySelector(selectors.popupCrossIcon).addEventListener('click', function (e) {
        document.querySelector(selectors.body).classList.remove('bm-popup-active');
    })

    // click on overlay
    document.querySelector(selectors.bmOverlay).addEventListener('click', function (e) {
        document.querySelector(selectors.body).classList.remove('bm-popup-active');
    })

    // click on input register button
    document.querySelector(selectors.bmEmailInput).addEventListener('click', function () {
        document.querySelector(selectors.bmEmailInput).classList.add('active')
    });

    // click outside the popup remove popup
    var ignoreClickOnMeElement = document.querySelector(selectors.body)
    ignoreClickOnMeElement.addEventListener('click', function (event) {
        if (!event.target.closest(selectors.bmEmailInput)) {
            document.querySelector(selectors.bmEmailInput).classList.remove('active')
        }
    });


}
Kameleoon.API.Core.runWhenElementPresent('header a[href*="login"]', () => {
    init();
}, 500);
