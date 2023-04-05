import { selectors } from './selectors';

import { getReco } from './reco';

// const offCanvas = document.querySelector(selectors.kamOffCanvas);
export const showOffCanvas = (offCanvas, type, getItemLayout) => {
    let productName = '';
    let productColor = '';
    let productSize = '';
    let productQuantity = '';
    let productPrice = '';
    let productImage = '';
    let productId = '';

    if (type === 1) {
        console.log('hii this is cart');
        ;
        productName = document.querySelector(selectors.cartProductName).innerText;

        productColor = document.querySelector(selectors.cartProductColor).innerText

        productSize = document.querySelector('.minicart-item-product-settings').innerText

        productPrice = document.querySelector('.minicart-total-value').innerText
        productQuantity = 10;
        productImage = document.querySelector('.minicard-tile__image .minicart-item-product-image').getAttribute('srcset').match(/[\w.-\d/]+ 2x/g)[0].replace(' 2x', '');
        productId = productImage.match(/\d+.[(png)(jpg)]+/g)[0]
            .replace('.png', '')
            .replace('.jpg', '');
    }
    console.log('image=>' + productImage + '', 'productname=>' + productName + '', 'colcor=>' + productColor + '', 'size=>' + productSize + '', 'quantety=>' + productQuantity + '', 'price =>' + productPrice + '');
    offCanvas.insertAdjacentHTML('afterbegin', getItemLayout(
        productImage,
        productName,
        productColor,
        productSize,
        productQuantity,
        `${Math.round(productPrice * 100) / 100} €`
    ));
    console.log(productId, getReco(productId), getItemLayout);
    getReco(productId);
};

export const insertOffCanvas = (getOffCanvasLayout) => {
    console.log(document.querySelector('#sidebar-content-wrapper'));
    if (document.querySelector('#sidebar-content-wrapper')) {
        document.querySelector('#sidebar-content-wrapper').insertAdjacentHTML(
            'afterBegin',
            getOffCanvasLayout()
        );
    }
};

export function listenAllRequests(getItemLayout) {
    const offCanvas = document.querySelector(selectors.kamOffCanvas);
    console.log(offCanvas);
    if (offCanvas) {
        showOffCanvas(offCanvas, 1, getItemLayout);
    }
}