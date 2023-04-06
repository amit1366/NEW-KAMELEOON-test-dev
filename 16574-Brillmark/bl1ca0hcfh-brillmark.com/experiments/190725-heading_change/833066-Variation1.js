import { selectors } from './selectors';

import { insertOffCanvas, listenAllRequests, insertOffCanvasCart, listenAllRequestsCart } from './functions';


const getOffCanvasLayout = () => `
    <div class="bm-cartslider" id="${selectors.kamOffCanvas.slice(1)}">
    </div>
`;
const getItemLayout = () => `
    <div id = "${selectors.kamOffCanvasContentWrapper.slice(1)}" >
        <div id="${selectors.kamOffCanvasReco.slice(1)}" class="row mx-auto py-5"></div>
    </div>
`
    ;
// for product pages
//    if (window.innerWidth > 739.98) {
        
//     } else if (window.innerWidth <= 739.98) {
        
//     } 
Kameleoon.API.Utils.querySelectorAll('button#quicknavigation-cart')[0].addEventListener('click', function () {
    console.log('click cart');
    Kameleoon.API.Core.runWhenElementPresent("#sidebar-content-wrapper, #minicart-cart-prices-wrapper", () => {
        insertOffCanvas(getOffCanvasLayout);
        listenAllRequests(getItemLayout);
    }, 100)
});


// wait for element cart page
Kameleoon.API.Core.runWhenElementPresent(".img-fluid.cart-product-image", () => {
    insertOffCanvasCart(getOffCanvasLayout);

    listenAllRequestsCart(getItemLayout);
}, 15000)