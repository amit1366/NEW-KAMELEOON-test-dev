// console.log('New2 SS variation code called');
import { bmstring, animatehtml } from "./html";
// import { bmTogglefunction } from "./functions";
// import { live, showpopup } from "./functions";
// import { selectors } from "./selectors";
// import { commongoals } from "./common";



// commongoals()
function init() {
//hello popup
    Kameleoon.API.Utils.querySelectorAll('body')[0].classList.add('bm-pdp')
    Kameleoon.API.Utils.querySelectorAll('body.page-list-view')[0].insertAdjacentHTML('afterBegin', bmstring)

 
    // on click overlay and  cross  function
    function Hideoncrosspop(){
        const crossButton= document.querySelector('.bm-close')
        console.log( crossButton)
        if (crossButton) {
            crossButton.addEventListener('click', () => {
                console.log('cross')
                document.querySelector('body').classList.remove('show-bm-product-detail');
                document.querySelector('html').classList.remove('show-bm-iframe');
            })
        }
    }
    function Hideonoverlay(){
        const crossButton= document.querySelector('.bm-overlay')
        console.log( crossButton)
        if (crossButton) {
            crossButton.addEventListener('click', () => {
                console.log('cross')
                document.querySelector('body').classList.remove('show-bm-product-detail');
                document.querySelector('html').classList.remove('show-bm-iframe');
            })
        }
    }


    const productElements = document.querySelectorAll('.products-list .products-list__element');
    productElements.forEach((el) => {
        const productWrapper = el.querySelector('.product-box__price-wrapper');
        console.log(productWrapper)
        if (productWrapper) {              
                productWrapper.insertAdjacentHTML('afterbegin', '<div class="bmproduct-btn"><span>In den Warenkorb</span></div>');
           
        }

        const buttonEl = el.querySelector('.bmproduct-btn span');
        if (buttonEl) {
            buttonEl.addEventListener('click', () => {
                console.log('click');
                const getUrl = el.querySelector('.product-box__name').getAttribute('href');
                document.querySelector('.bm-pdpiframe iframe').setAttribute('src', getUrl);
                document.querySelector('body').classList.add('show-bm-product-detail');
                iframecontent();
                document.querySelector('html').classList.add('show-bm-iframe');

                 // on click overlay and  cross 
                 Hideoncrosspop()
                 Hideonoverlay()
            });
        }
    });

    function iframecontent() {
        setTimeout(function () {
            var iframe = document.querySelector('div.bm-pdpiframe iframe');
            iframe.contentWindow.document.querySelector('#novosales-app > header').classList.add('bm-popup-header')
            iframe.contentWindow.document.querySelector('.page-main').classList.add('bm-pdp-content')
            iframe.contentWindow.document.querySelector('footer.footer').classList.add('bm-popup-footer')


            // when the user click on popup atc button 
            const bmModalIframe = document.querySelector('div.bm-pdpiframe iframe');
            const atcButton = iframe.contentWindow.document.querySelector('.sale-box__button-to-cart > button')
            console.log();
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

        }, 2000)
    }

  
       
      
 
  




}

Kameleoon.API.Core.runWhenElementPresent('.products-list', () => {
    init();
}, 500);