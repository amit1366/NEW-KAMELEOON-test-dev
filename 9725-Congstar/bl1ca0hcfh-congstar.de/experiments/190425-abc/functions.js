import { selectors } from "./selectors";

function live(selector, event, callback, context) {
    /****Helper Functions****/
    // helper for enabling IE 8 event bindings
    function addEvent(el, type, handler) {
        if (el.attachEvent) el.attachEvent("on" + type, handler);
        else el.addEventListener(type, handler);
    }
    // matches polyfill
    this && this.Element &&
        (function (ElementPrototype) {
            ElementPrototype.matches =
                ElementPrototype.matches ||
                ElementPrototype.matchesSelector ||
                ElementPrototype.webkitMatchesSelector ||
                ElementPrototype.msMatchesSelector ||
                function (selector) {
                    var node = this,
                        nodes = (
                            node.parentNode || node.document
                        ).querySelectorAll(selector),
                        i = -1;
                    while (nodes[++i] && nodes[i] != node);
                    return !!nodes[i];
                };
        })(Element.prototype);
    // live binding helper using matchesSelector
    function live(selector, event, callback, context) {
        addEvent(context || document, event, function (e) {
            var found,
                el = e.target || e.srcElement;
            while (
                el &&
                el.matches &&
                el !== context &&
                !(found = el.matches(selector))
            )
                el = el.parentElement;
            if (found) callback.call(el, e);
        });
    }
    live(selector, event, callback, context);
}

export const showpopup = () => {
    // click in register btn popup
    live(selectors.bmloginButton, 'click', function () {
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
        let fornemail = iframe.contentWindow.document.querySelector(selectors.iframeEmail)
        fornemail.value = input
        let form = iframe.contentWindow.document.querySelector(selectors.popupForm);
        form.setAttribute('target', "_parent")
    })


    // 
    live(selectors.bmEmailInput, 'click', function () {
        document.querySelector(selectors.bmEmailInput).classList.toggle('active')
    });

    live('.bm-close, #bm-popup-overlay', 'click', function () {
        document.querySelector(selectors.body).classList.remove('bm-popup-active');
    })

    // click on header loginbtn show popup
    live(selectors.headerLogindbtn, 'click', function (e) {
        e.preventDefault()
        document.querySelector(selectors.body).classList.add('bm-popup-active');
    })
}