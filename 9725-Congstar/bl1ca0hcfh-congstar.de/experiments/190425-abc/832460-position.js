// console.log('New2 SS variation code called');
import { bmstring } from "./html";
// import { bmTogglefunction } from "./functions";

import { selectors } from "./selectors";



// commongoals()
function init() {
    // insert
    Kameleoon.API.Utils.querySelectorAll('body')[0].classList.add('hello-popup');

    Kameleoon.API.Utils.querySelectorAll('.fullscreen-banner.container-fluid')[0].insertAdjacentHTML('beforeend', bmstring)
    Kameleoon.API.Utils.querySelectorAll('.pusher > header svg')[0].closest('header').classList.add('hello');
    // // on email submition iframe open



    // click in register btn show popup
    Kameleoon.API.Utils.querySelectorAll('button#open-registration-form')[0].addEventListener('click', function () {
        let input = Kameleoon.API.Utils.querySelectorAll('.bm-email-input')[0].value
        // console.log(input);
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (input.match(validRegex) && input != '') {
            Kameleoon.API.Utils.querySelectorAll('body')[0].classList.add('popup-active')
            this.closest('.bm-content-right-previous').classList.add('d-none')
            Kameleoon.API.Utils.querySelectorAll('.bm-login-fetch-data')[0].classList.remove('d-none');

            // document.querySelector(selectors.registerBtn).click()
        } else {
            Kameleoon.API.Utils.querySelectorAll('.bm-email-input')[0].classList.add('show-error')
        }




        // setTimeout(function () {
        console.log('hp');
        // Kameleoon.API.Core.runWhenElementPresent("#account_register_submit", () => {
        let iframe = document.querySelector('.bm-iframe iframe');
        console.log(iframe);
        //find button inside iframe
        let button = iframe.contentWindow.document.querySelector('#account_register_submit');
        var forminput = iframe.contentWindow.document.querySelector('form.was-validated');
        let formnfields = iframe.contentWindow.document.querySelector('.form-control.is-invalid')
        console.log(forminput);
        console.log(button);
        button.addEventListener('mousedown', function (e) {
            console.log('btn-click');

            //js ajex complete
            const send = XMLHttpRequest.prototype.send;
            XMLHttpRequest.prototype.send = function () {
                console.log('click');
                this.addEventListener('load', function () {
                    console.log((this.status === 302 || this.status === 200) && this.responseURL.indexOf('/account') > -1);
                    if ((this.status === 302 || this.status === 200) && this.responseURL.indexOf('/account/login') > -1) {

                        // Perform the redirect here
                        window.location.href = 'https://www.seidensticker.com/de/de/damen/topseller';
                    }
                    // add your global handler here
                });
                return send.apply(this, arguments);
            };

            // setTimeout(function () {
            //     iframe = document.querySelector('.bm-iframe iframe');
            //     forminput = iframe.contentWindow.document.querySelector('form.was-validated');
            //     // setTimeout(function () {
            //     formnfields = iframe.contentWindow.document.querySelector('.form-control.is-invalid')
            //     console.log(iframe, forminput, formnfields);
            //     console.log(!forminput);
            //     if (!forminput) {
            //         console.log('close complete');
            //         window.location.href = 'https://www.seidensticker.com/de/de/account/login'
            //     } else {
            //         console.log('close incomplete');
            //     }
            //     // }, 2000)


            // }, 100)
            // window.location.href = "google.com"
        })


    })

    // remove popup
    Kameleoon.API.Utils.querySelectorAll('.bm-close')[0].addEventListener('click', function () {
        Kameleoon.API.Utils.querySelectorAll('body')[0].classList.remove('popup-active')
    })

    //bm-email-input
    Kameleoon.API.Utils.querySelectorAll('.bm-email-input')[0].addEventListener('mousedown', function () {
        console.log('click');
        Kameleoon.API.Utils.querySelectorAll('.bm-email-input')[0].classList.toggle('active')
    })



}
Kameleoon.API.Core.runWhenElementPresent('header a[href*="login"]', () => {
    init();
}, 500);
