import { selectors } from './selectors';
import { getReco } from './reco';
import { getRecoCart } from './recocart';

// const offCanvas = document.querySelector(selectors.kamOffCanvas);
export const showOffCanvas = (offCanvas, type, getItemLayout) => {
    let productName = '';
    let productColor = '';
    let productSize = '';
    let productQuantity = '';
    let productPrice = '';
    let productImage = '';
    let productId = '';

    if (type === 1 && document.querySelector(selectors.cartProductName)) {
        console.log(selectors.cartProductName);
        // console.log('hii this is cart');
        productName = document.querySelector(selectors.cartProductName).innerText;
        console.log(productName);
        productColor = document.querySelector(selectors.cartProductColor).innerText
        productSize = document.querySelector(selectors.cartproductSize).innerText
        productPrice = document.querySelector(selectors.cartproductPrice).innerText
        productQuantity = 50;
        productImage = document.querySelector('.minicard-tile__image .minicart-item-product-image').getAttribute('srcset').match(/[\w.-\d/]+ 2x/g)[0].replace(' 2x', '');
        productId = productImage.match(/\d+.[(png)(jpg)]+/g)[0]
            .replace('.png', '')
            .replace('.jpg', '');

    }
    else if (type === 0) {
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
    if (document.querySelector(selectors.cartProductName)) {
        console.log(productId);
        getReco(productId);
    } else {
        console.log(productId);
        getRecoCart(productId)
    }
};

export const insertOffCanvas = (getOffCanvasLayout) => {
    if (document.querySelector(selectors.cratElementWrapper)) {
        document.querySelector(selectors.cratElementWrapper).insertAdjacentHTML(
            'beforeend',
            getOffCanvasLayout()
        );
    }
    if (document.querySelector('.cart-list-wrapper .cart-total-tile-wrapper')) {
        document.querySelector('.cart-list-wrapper .cart-total-tile-wrapper').insertAdjacentHTML(
            'afterend',
            getOffCanvasLayout()
        );
    }
};

export function listenAllRequests(getItemLayout) {
    const offCanvas = document.querySelector(selectors.kamOffCanvas);
    const cartSlider = document.querySelector('.img-fluid.cart-product-image')
    if (offCanvas) {
        showOffCanvas(offCanvas, 1, getItemLayout);
    }
    if (cartSlider) {
        showOffCanvas(offCanvas, 0, getItemLayout);
    }
}