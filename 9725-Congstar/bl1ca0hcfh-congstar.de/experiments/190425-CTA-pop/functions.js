import { selectors } from "./selectors";

// on click overlay and  cross  function
function hideOnAction(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.addEventListener('click', () => {
            document.querySelector(selectors.bmBodyel).classList.remove(selectors.bmProductDetail);
            document.querySelector(selectors.bmHtml).classList.remove(selectors.bmIframe);

        });
    }
}

/* click on
iframe atc button 
*/
function iframecontent() {
    setTimeout(function () {

        //get element iframe content
        var iframe = document.querySelector(selectors.iframeElement);
        iframe.contentWindow.document.querySelector(selectors.iframeHeader).classList.add('bm-popup-header')
        iframe.contentWindow.document.querySelector(selectors.mainContent).classList.add('bm-pdp-content')
        iframe.contentWindow.document.querySelector(selectors.bmFooter).classList.add('bm-popup-footer')

        /* when the user click on popup atc button */
        const bmModalIframe = document.querySelector(selectors.iframeElement);
        const atcButton = iframe.contentWindow.document.querySelector(selectors.iframeAtcButton)
        atcButton.addEventListener('click', async () => {
            // try {
            //     const response = await fetch('https://www.falke.com/de_de/ajax/basket/add/');
            //     const data = await response.text();
            //     if (response.url.includes('/basket/add/')) {
            //         setTimeout(() => {
            //             const modalatc = bmModalIframe.contentWindow.document.querySelector(selectors.modalAtcButton);
            //             modalatc.classList.add('bm-modal-atc');
            //             modalatc.addEventListener('click', async () => {
            //                 const basketResponse = await fetch('https://www.falke.com/de_de/basket/');
            //                 const basketData = await basketResponse.text();
            //                 if (basketResponse.url.includes('/basket/')) {
            //                     window.location.href = 'https://www.falke.com/de_de/basket/';
            //                 }
            //             });
            //         }, 1000);
            //     }
            // } catch (error) {

            // }
            console.log('hello');
        });

    }, 1000)
}


/** insert btn on product
 *  or get pdp url*/
export function insertbtnel() {
    const productElements = document.querySelectorAll(selectors.PlpProducts);
    productElements.forEach((el) => {
        const productWrapper = el.querySelector(selectors.productDetail);

        if (productWrapper) {
            if (productWrapper.querySelector('.bmproduct-btn')) return
            productWrapper.insertAdjacentHTML('afterbegin', '<div class="bmproduct-btn"><span>In den Warenkorb</span></div>');

        }

        /** click event on appear hover product btn */
        const buttonEl = el.querySelector(selectors.bmProductBtn);
        if (buttonEl) {
            buttonEl.addEventListener('click', () => {
                const getUrl = el.querySelector(selectors.productAttrel).getAttribute('href');
                document.querySelector(selectors.popupIframe).setAttribute('src', getUrl);

                document.querySelector(selectors.bmBodyel).classList.add(selectors.bmProductDetail);
                iframecontent();
                document.querySelector(selectors.bmHtml).classList.add(selectors.bmIframe);
                // on click overlay and  cross 
                const crossButton = selectors.popupCloseIcon;
                const overlayButton = selectors.popupOverlay;
                hideOnAction(crossButton);
                hideOnAction(overlayButton);

                setTimeout(function () {
                    const bmModalIframemodal = document.querySelector(selectors.iframeElement);
                    const atcButtonmodal = bmModalIframemodal.contentWindow.document.querySelector('.pdp-size-variations.sale-box__size-variations')
                    console.log(atcButtonmodal);
                    atcButtonmodal.insertAdjacentHTML('afterend', "<div class=\"bm-details\"><a href=" + getUrl + ">mehr Details</a></div>")
                }, 1000)
            });
        }
    });
}


