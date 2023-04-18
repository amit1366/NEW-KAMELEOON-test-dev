import { bmstring, animatehtml } from "./html";
import { selectors } from "./selectors";
import { commongoals } from "./common";



commongoals()
function init() {
    // insert element 
    document.querySelector(selectors.header).insertAdjacentHTML('afterend', bmstring);
    document.querySelector(selectors.headerLogindbtn).insertAdjacentHTML('afterBegin', animatehtml)

    /*clik on bm
    ragister button*/
    document.querySelector(selectors.bmregistrationButton).addEventListener('click', function () {
        let input = Kameleoon.API.Utils.querySelectorAll('.bm-email-input')[0].value
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (input.match(validRegex) && input != '') {
            document.querySelector(selectors.body).classList.add('popup-active')
            this.closest(selectors.formRightSec).classList.add('d-none')
            document.querySelector(selectors.iframeMainel).classList.remove('d-none');
            Kameleoon.API.Goals.processConversion(goals['[T17] Step 1 Registration_BM']);
            console.log('[T17] Step 1 Login_BM');
        } else {
            document.querySelector(selectors.bmEmailInput).classList.add('show-error')
        }
        getiframeelement()
    })

    /**  */
    function getiframeelement() {
        // when iframe present 
        let inputval = Kameleoon.API.Utils.querySelectorAll('.bm-email-input')[0].value
        let iframe = document.querySelector(selectors.bmIframe);
        let iframeheaderel = iframe.contentWindow.document.querySelector('.pusher')
        iframeheaderel.classList.add('bm-pusharheader');
        let fornemail = iframe.contentWindow.document.querySelector(selectors.iframeEmail);
        fornemail.classList.add('active')
        fornemail.value = inputval
    }




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


    /**when submit form redirect url */
    // Get the iframe element
    var iframedatalayer = document.querySelector(selectors.bmIframe);
    // attach a load event listener to the iframe
    iframedatalayer.addEventListener("load", () => {
        // check if the iframe has been reloaded after form submission
        const iframeUrl = iframedatalayer.contentWindow.location.href;
        let fire = false;
        if (iframeUrl == "https://www.seidensticker.com/de/de/account" && fire == false) {
            //onDataHelperLoad()
            fire = true;
            window.location.href = 'https://www.seidensticker.com/de/de/account';
            Kameleoon.API.Goals.processConversion(goals['[T17] Step 2_BM']);
            console.log('[T17] Step 2_BM');
        }
        getiframeelement()
    });


}
Kameleoon.API.Core.runWhenElementPresent('header a[href*="login"]', () => {
    init();

}, 500);