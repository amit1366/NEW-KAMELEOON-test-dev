// on click overlay and  cross  function
function hideOnAction(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.addEventListener('click', () => {
            document.querySelector('body').classList.remove('show-bm-product-detail');
            document.querySelector('html').classList.remove('show-bm-iframe');
        });
    }
}

/* click on
iframe atc button 
*/
function iframecontent() {
    setTimeout(function () {

        //get element iframe content
        var iframe = document.querySelector('div.bm-pdpiframe iframe');
        iframe.contentWindow.document.querySelector('#novosales-app > header').classList.add('bm-popup-header')
        iframe.contentWindow.document.querySelector('.page-main').classList.add('bm-pdp-content')
        iframe.contentWindow.document.querySelector('footer.footer').classList.add('bm-popup-footer')

        /* when the user click on popup atc button */
        const bmModalIframe = document.querySelector('div.bm-pdpiframe iframe');
        const atcButton = iframe.contentWindow.document.querySelector('.sale-box__button-to-cart > button')
        atcButton.addEventListener('click', async () => {
            console.log('click butto');
            try {
                const response = await fetch('https://www.falke.com/de_de/ajax/basket/add/');
                const data = await response.text();
                if (response.url.includes('/basket/add/')) {
                    setTimeout(() => {
                        const modalatc = bmModalIframe.contentWindow.document.querySelector('#addToCartModal a.add-to-cart-modal__button');
                        modalatc.classList.add('bm-modal-atc');
                        modalatc.addEventListener('click', async () => {
                            console.log('add to cart');
                            const basketResponse = await fetch('https://www.falke.com/de_de/basket/');
                            const basketData = await basketResponse.text();
                            console.log(basketResponse.url.includes('/basket/'));
                            if (basketResponse.url.includes('/basket/')) {
                                window.location.href = 'https://www.falke.com/de_de/basket/';
                            }
                        });
                    }, 1000);
                }
            } catch (error) {
                console.error(error);
            }
        });

    }, 800)
}


export function insertbtnel() {
    const productElements = document.querySelectorAll('.products-list .products-list__element');
    productElements.forEach((el) => {
        const productWrapper = el.querySelector('.product-box__details');
        console.log(productWrapper)
        if (productWrapper) {
            if (productWrapper.querySelector('.bmproduct-btn')) return
            productWrapper.insertAdjacentHTML('afterbegin', '<div class="bmproduct-btn"><span>In den Warenkorb</span></div>');

        }

        const buttonEl = el.querySelector('.bmproduct-btn span');
        if (buttonEl) {
            buttonEl.addEventListener('click', () => {
                const getUrl = el.querySelector('.product-box__name').getAttribute('href');
                document.querySelector('.bm-pdpiframe iframe').setAttribute('src', getUrl);
                document.querySelector('body').classList.add('show-bm-product-detail');
                iframecontent();
                document.querySelector('html').classList.add('show-bm-iframe');

                // on click overlay and  cross 
                const crossButton = '.bm-close';
                const overlayButton = '.bm-overlay';
                hideOnAction(crossButton);
                hideOnAction(overlayButton);
            });
        }
    });
}


