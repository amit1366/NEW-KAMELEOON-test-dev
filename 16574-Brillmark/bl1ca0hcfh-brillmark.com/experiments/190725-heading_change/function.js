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
    console.log('image=>' + productImage + '', 'productname=>' + productName + '', 'colcor=>' + productColor + '', 'size=>' + productSize + '', 'quantety=>' + productQuantity + '', 'price =>' + productPrice + '');
    offCanvas.insertAdjacentHTML('afterbegin', getItemLayout(
        productImage,
        productName,
        productColor,
        productSize,
        productQuantity,
        `${Math.round(productPrice * 100) / 100} €`
    ));
    getReco(productId);
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
    if (offCanvas) {
        showOffCanvas(offCanvas, 1, getItemLayout);
    }
}