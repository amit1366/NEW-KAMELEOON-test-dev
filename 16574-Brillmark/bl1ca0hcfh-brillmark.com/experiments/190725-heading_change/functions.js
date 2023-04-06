import { selectors } from './selectors';

import { getReco, getRecoCart } from './reco';

// const offCanvas = document.querySelector(selectors.kamOffCanvas);
export const showOffCanvas = (offCanvas, type, getItemLayout) => {
    let productName = '';
    let productColor = '';
    let productSize = '';
    let productQuantity = '';
    let productPrice = '';
    let productImage = '';
    let productId = '';
    let productcartId = '';

    if (type === 1 && document.querySelector(selectors.cartProductName)) {
        console.log('hii this is cart');
        productName = document.querySelector(selectors.cartProductName).innerText;
        productColor = document.querySelector(selectors.cartProductColor).innerText
        productSize = document.querySelector(selectors.cartproductSize).innerText
        productPrice = document.querySelector(selectors.cartproductPrice).innerText
        productQuantity = 20;
        productImage = document.querySelector('.minicard-tile__image .minicart-item-product-image').getAttribute('srcset').match(/[\w.-\d/]+ 2x/g)[0].replace(' 2x', '');
        productId = productImage.match(/\d+.[(png)(jpg)]+/g)[0]
            .replace('.png', '')
            .replace('.jpg', '');
    }
    if (type === 0 && Kameleoon.API.Utils.querySelectorAll('.cart-tile-information-wrapper > a.product-name')[0]) {
        console.log('this cart');
        productName = Kameleoon.API.Utils.querySelectorAll('.cart-tile-information-wrapper > a.product-name')[0].innerText;
        console.log(productName);
        productColor = Kameleoon.API.Utils.querySelectorAll('.cart-tile-information-wrapper .cart-tile-product-color')[0].innerText
        productSize = Kameleoon.API.Utils.querySelectorAll('.form-select-wrapper .form-select[id*="select-size-product"]')[0]
        productSize = productSize.options[productSize.selectedIndex].text;
        productPrice = Kameleoon.API.Utils.querySelectorAll('.product-price-inner-holder .product-price')[0].innerText
        productQuantity = 20;
        productImage = document.querySelector('.img-fluid.cart-product-image') && document.querySelector('.img-fluid.cart-product-image').getAttribute('data-srcset').match(/[\w.-\d/]+ 2x/g)[0].replace(' 2x', '');
        console.log(productImage);
        productcartId = productImage.match(/\d+.[(png)(jpg)]+/g)[0]
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

    if (document.querySelector(selectors.cartProductName)) {
        getReco(productId);
    }
    if (type === 0 && Kameleoon.API.Utils.querySelectorAll('.cart-tile-information-wrapper > a.product-name')[0]) {
        getRecoCart(productcartId);
    }
};

export const insertOffCanvas = (getOffCanvasLayout) => {
    if (document.querySelector(selectors.cratElementWrapper)) {
        document.querySelector(selectors.cratElementWrapper).insertAdjacentHTML(
            'afterBegin',
            getOffCanvasLayout()
        );
    }
};



export function listenAllRequests(getItemLayout) {
    const offCanvas = document.querySelector(selectors.kamOffCanvas);
    if (offCanvas && document.querySelector(selectors.cartProductName)) {
        showOffCanvas(offCanvas, 1, getItemLayout);
    }
    // if (offCanvas && Kameleoon.API.Utils.querySelectorAll('.cart-tile-information-wrapper > a.product-name')) {
    //     showOffCanvas(offCanvas, 0, getItemLayout);
    // }
}

// cat page slider 
export const insertOffCanvasCart = (getOffCanvasLayout) => {
    if (document.querySelector('.img-fluid.cart-product-image')) {
        document.querySelector('.cart-total-bottom-holder').insertAdjacentHTML(
            'afterend',
            getOffCanvasLayout()
        );
    }
}

export function listenAllRequestsCart(getItemLayout) {
    const offCanvas = document.querySelector(selectors.kamOffCanvas);
    // if (offCanvas && document.querySelector(selectors.cartProductName)) {
    //     showOffCanvas(offCanvas, 1, getItemLayout);
    // }
    if (offCanvas && Kameleoon.API.Utils.querySelectorAll('.cart-tile-information-wrapper > a.product-name')) {
        showOffCanvas(offCanvas, 0, getItemLayout);
    }
}