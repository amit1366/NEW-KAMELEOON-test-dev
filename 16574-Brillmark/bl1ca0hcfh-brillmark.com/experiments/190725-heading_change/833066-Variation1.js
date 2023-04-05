import { selectors } from './selectors';

import { insertOffCanvas, listenAllRequests, showOffCanvas } from './functions';

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
Kameleoon.API.Utils.querySelectorAll('button#quicknavigation-cart')[0].addEventListener('click', function () {
    console.log('click cart');
    Kameleoon.API.Core.runWhenElementPresent("#sidebar-content-wrapper", () => {

        insertOffCanvas(getOffCanvasLayout);

        listenAllRequests(getItemLayout);
        // showOffCanvas()
    }, 2000)
})

// wait for element cart page
Kameleoon.API.Core.runWhenElementPresent(".cart-total-bottom-holder", () => {
    insertOffCanvas(getOffCanvasLayout);

    listenAllRequests(getItemLayout);
}, 2000)