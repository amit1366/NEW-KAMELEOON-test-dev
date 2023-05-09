import { giffstring } from "./html";


// viewport helper
function elementInViewport2(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }
    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
}


// function check element in viewport
let body;
function eleinviewport() {

    const kameleoon = Kameleoon.API.Utils
    body = kameleoon.querySelectorAll('body')[0]
    body.classList.add('Sticky-Add2Cart');

    // match condition element available
    if (kameleoon.querySelectorAll('button.btn-buy')[0]) {
        if (elementInViewport2(document.querySelector('button.btn-buy'))) {
            body.classList.remove("bm_inviewport");
            // console.log('body');			
        } else {
            body.classList.add("bm_inviewport");
        }
    }

    // check shedow element
    let host = document.querySelector('.row trikot-konfigurator')
    if (host) {
        // Get a reference to the Shadow Root
        let shadowRoot;
        shadowRoot = host.shadowRoot;
        if (shadowRoot) {
            let shadowRootel = shadowRoot.querySelector('.buybox__actions button');
            // Use standard DOM methods to access elements in the Shadow DOM
            if (elementInViewport2(shadowRootel)) {
                body.classList.remove("bm_inviewport");		
            } else {
                body.classList.add("bm_inviewport");
            }
        }
    }
}



export function stickybanner() {

    Kameleoon.API.Utils.querySelectorAll('body')[0].insertAdjacentHTML('afterbegin', giffstring)
    eleinviewport()
    // window.scroll(0, 50)
    body.addEventListener("mousewheel", function () {
        eleinviewport()
    });

    // simple page elment
    document.querySelector('.bm-atc').addEventListener("click", function () {
        console.log('click sticky btn goal');
        document.querySelector('button.btn-buy').click()
    });

    // click event for shadow root pages
    let hostshadow = document.querySelector('.row trikot-konfigurator')
    // Get a reference to the Shadow Root
    if (hostshadow) {
        let shadowRootel = hostshadow.shadowRoot;

        // Use standard DOM methods to access elements in the Shadow DOM
        let btndesable;
        let shadowel = shadowRootel.querySelector('.buybox__actions button');
        btndesable = shadowRootel.querySelector('.buybox__actions button[disabled]');
        console.log(btndesable);
        shadowel.setAttribute('style', 'padding:15px 10px;')
        //style="padding: 15px 10px;"
        // kameleoon.querySelectorAll('')
        document.querySelector('.bm-atc').addEventListener("click", function () {
            if (!btndesable) {
                console.log('click sticky btn goal');
                shadowel.click()
            }
        });
    }

}

