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
    if (type === 0 && document.querySelector(selectors.cartProductslideName)) {

        // document.querySelector(selectors.cartProductslideName)
        productName = document.querySelector(selectors.cartProductslideName).innerText;
        productColor = document.querySelector(selectors.cartProductslideColor).innerText
        productSize = document.querySelector(selectors.cartProductslideSize)
        productSize = productSize.options[productSize.selectedIndex].text;
        productPrice = document.querySelector(selectors.cartProductslidePrise).innerText
        productQuantity = 20;
        productImage = document.querySelector(selectors.cartProductslideImage).getAttribute('data-srcset').match(/[\w.-\d/]+ 2x/g)[0].replace(' 2x', '');
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
    if (document.querySelector(selectors.cartProductslideName)) {
        getRecoCart(productcartId);
    }
};

export const insertOffCanvas = (getOffCanvasLayout) => {

    if (window.innerWidth > 739.98) {
        if (document.querySelector(selectors.cratElementWrapper)) {
            document.querySelector(selectors.cratElementWrapper).insertAdjacentHTML(
                'afterBegin',
                getOffCanvasLayout()
            );
        }
    } else if (window.innerWidth <= 739.98) {
        if (document.querySelector('#minicart-cart-prices-wrapper')) {
            document.querySelector('#panel-cart-wrapper #minicart-cart-prices-wrapper').insertAdjacentHTML(
                'afterBegin',
                getOffCanvasLayout()
            );
        }
    }

};



export function listenAllRequests(getItemLayout) {
    const offCanvas = document.querySelector(selectors.kamOffCanvas);
    if (offCanvas && document.querySelector(selectors.cartProductName)) {
        showOffCanvas(offCanvas, 1, getItemLayout);
    }
}

// cat page slider 
export const insertOffCanvasCart = (getOffCanvasLayout) => {
    if (document.querySelector(selectors.cartProductslideImage)) {//cartProductHolder
        document.querySelector(selectors.cartProductHolder).insertAdjacentHTML(
            'afterend',
            getOffCanvasLayout()
        );
    }
}

export function listenAllRequestsCart(getItemLayout) {
    const offCanvas = document.querySelector(selectors.kamOffCanvas);
    if (offCanvas && document.querySelector(selectors.cartProductslideName)) {
        showOffCanvas(offCanvas, 0, getItemLayout);
    }
}