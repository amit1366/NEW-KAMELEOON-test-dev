import { selectors } from './selectors';
import { urls } from './urls';
import { getReco } from './reco';

export const showOffCanvas = (offCanvas, type, getItemLayout) => {
    let productName = '';
    let productColor = '';
    let productSize = '';
    let productQuantity = '';
    let productPrice = '';
    let productImage = '';
    let productId = '';
    if (type === 0) {
        productName = document.querySelector(selectors.pdpProductName).innerText;
        productColor = document.querySelector(selectors.pdpProductColor).innerText;
        productSize = document.querySelector(selectors.pdpProductSize);
        productSize = productSize.options[productSize.selectedIndex].text;
        productQuantity = window.globalThis.T10ProductQuantity;
        productPrice = document.querySelector(selectors.pdpProductPrice).innerText;
        productImage = document.querySelector(selectors.pdpProductImage).getAttribute('src');
        productId = tc_vars.productId;
    } else if (type === 1) {
        const { T10POPAdd2CartButton } = window.globalThis;
        if (T10POPAdd2CartButton) {
            const productCard = T10POPAdd2CartButton.closest(selectors.popProductCard);
            productName = productCard.querySelector(selectors.popProductName).textContent;
            const productColorRadio = productCard
                .querySelector(selectors.popProductColorCheckedRadio);
            if (productColorRadio
                && productColorRadio
                    .nextElementSibling
                    .classList
                    .contains(selectors.popProductColorLabel.slice(1))) {
                productColor = productColorRadio.nextElementSibling.textContent;
            }
            productSize = productCard.querySelector(selectors.popProductSizeCheckedBox).textContent;
            productQuantity = 1;
            productPrice = productCard.querySelector(selectors.popProductPrice).textContent;
            productImage = productCard.querySelector(selectors.popProductImage)
                .querySelector('source')
                .getAttribute('srcset')
                .match(/[\w.-\d/]+ 2x/g)[0]
                .replace(' 2x', '');
            productId = productImage.match(/\d+.[(png)(jpg)]+/g)[0]
                .replace('.png', '')
                .replace('.jpg', '');
        }
    }

    productPrice = parseFloat(productPrice
        .replace(' ', '')
        .replace(',', '.'));
    productPrice = Number(productQuantity)
        ? Number(productQuantity) * Number(productPrice)
        : Number(productPrice);
    offCanvas.insertAdjacentHTML('afterbegin', getItemLayout(
        productImage,
        productName,
        productColor,
        productSize,
        productQuantity,
        `${Math.round(productPrice * 100) / 100} €`
    ));
    getReco(productId);
    offCanvas.classList.add('active');
    const pageShadow = document.querySelector(selectors.kamOffCanvasOverlay);
    const body = document.querySelector('body');
    if (pageShadow) {
        pageShadow.classList.add('active');
    }
    if (window.innerWidth > 739.98) {
        body.classList.add('sidebar-active');
        offCanvas.classList.remove('slideFromRight');
    } else if (window.innerWidth <= 739.98) {
        body.classList.add('panel-active');
        offCanvas.classList.add('slideFromRight');
    }
    offCanvas.classList.remove('slideToRight');
    offCanvas.classList.remove('animation-finished');
};

export const hideOffCanvas = (offCanvas) => {
    const body = document.querySelector('body');
    body.classList.remove('panel-active');
    body.classList.remove('sidebar-active');
    offCanvas.classList.remove('active');
    offCanvas.innerHTML = '';
    const pageShadow = document.querySelector(selectors.kamOffCanvasOverlay);
    if (pageShadow) {
        pageShadow.classList.remove('active');
    }
    if (pageShadow && window.innerWidth > 739.98) {
        offCanvas.classList.remove('slideFromRight');
        offCanvas.classList.remove('slideToRight');
        offCanvas.classList.remove('animation-finished');
    } else if (window.innerWidth <= 739.98) {
        offCanvas.classList.add('slideToRight');
        offCanvas.classList.add('animation-finished');
    }
};

export const insertOffCanvas = (getOffCanvasLayout) => {
    document.querySelector(selectors.header).insertAdjacentHTML(
        'afterend',
        getOffCanvasLayout()
    );

    Kameleoon.API.Core.runWhenElementPresent(selectors.pdpAdd2CartButton, () => {
        window.globalThis.T10ProductQuantity = 1;
        const productQuantitySelector = document.querySelector(selectors.pdpProductQuantity);
        if (productQuantitySelector) {
            productQuantitySelector.addEventListener('change', ({ target }) => {
                window.globalThis.T10ProductQuantity = target.value;
            });
        }
    });

    Kameleoon.API.Core.runWhenElementPresent(selectors.popAdd2CartButton, () => {
        window.globalThis.T10POPAdd2CartButton = null;
        document.addEventListener('click', ({ target }) => {
            const button = target.closest(selectors.popAdd2CartButton);
            if (button) {
                window.globalThis.T10POPAdd2CartButton = button;
            }
        });
    });

    Kameleoon.API.Core.runWhenElementPresent(selectors.kamOffCanvas, ([offCanvas]) => {
        document.addEventListener('click', ({ target }) => {
            if (
                target.closest(selectors.kamOffCanvas)
                && (
                    target.closest(selectors.kamOffCanvasHeaderClose)
                    || target.closest(selectors.kamOffCanvasShopButton)
                )
            ) {
                hideOffCanvas(offCanvas);
            }
        });

        Kameleoon.API.Core.runWhenElementPresent(selectors.kamOffCanvasOverlay, ([pageShadow]) => {
            pageShadow.addEventListener('click', () => {
                hideOffCanvas(offCanvas);
            });
        });
    });
};

export function listenAllRequests(getItemLayout) {
    const { send } = XMLHttpRequest.prototype;
    // eslint-disable-next-line func-names
    XMLHttpRequest.prototype.send = function () {
        this.addEventListener('load', () => {
            if (
                this.responseURL.match(urls.add2Cart)
                && this.readyState === 4
            ) {
                const offCanvas = document.querySelector(selectors.kamOffCanvas);
                const wishlistAdd2CartButton = document
                    .querySelector(selectors.wishlistAdd2CartButton);
                if (offCanvas && !wishlistAdd2CartButton) {
                    if (document.querySelector(selectors.pdpAdd2CartButton)) {
                        showOffCanvas(offCanvas, 0, getItemLayout);
                    } else if (document.querySelector(selectors.popAdd2CartButton)) {
                        showOffCanvas(offCanvas, 1, getItemLayout);
                    }
                }
            }
        });
        // eslint-disable-next-line prefer-rest-params
        return send.apply(this, arguments);
    };
}