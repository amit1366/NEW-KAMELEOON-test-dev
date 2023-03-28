import { selectors } from './selectors';
import { urls } from './urls';
import { insertOffCanvas, listenAllRequests } from './functions';
console.log('hello');
const getOffCanvasLayout = () => `
    <div class="${selectors.kamOffCanvasOverlay.slice(1)}"></div>
    <aside id="${selectors.kamOffCanvas.slice(1)}">
    </aside>
`;
console.log(selectors.kamOffCanvasHeaderClose.slice(1))

const getItemLayout = (imgUrl, name, color, size, quantity, price) => `
    <div id="${selectors.kamOffCanvasHeaderClose.slice(1)}">
        <svg class="svg-icon icon-close">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wcsstore/ErnstingsStorefrontAssetStore/svg/efa.svg#close"></use>
        </svg>
    </div>
    <p id="kam-add2cart-off_canvas-header__text" class="interstate-regular">
        Ihr Produkt wurde erfolgreich in den Warenkorb gelegt.
    </p>
    <div id="${selectors.kamOffCanvasContentWrapper.slice(1)}">
        <div class="kam-add2cart-off_canvas-item">
            <div class="kam-add2cart-off_canvas-item__image">
                <img class="img-fluid"
                    src="${imgUrl}"
                    alt="Kinder Regenjacke" />
            </div>
            <div class="kam-add2cart-off_canvas-item-details interstate-regular">
                <p class="interstate-bold">${name}</p>
                <p>${color}</p>
                <p>${size}</p>
                <p>Anzahl: ${quantity}</p>
                <div class="product-price-wrapper">
                    <div class="product-price-inner-holder">
                        <span class="product-price">
                            ${price}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="kam-add2cart-off_canvas-buttons">
            <div id="${selectors.kamOffCanvasShopButton.slice(1)}" class="kam-button kam-continue">
                <button type="button" class="btn btn-green btn-text">
                    <span class="btn-inner-wrapper">
                        <span class="btn-label">Weiter shoppen</span>
                        <span class="btn-icon">
                        <svg class="svg-icon icon-arrow-right">
                        <use
                    xlink:href="/wcsstore/ErnstingsStorefrontAssetStore/svg/efa.svg#arrow-right">
                        </use>
                        </svg>
                        </span>
                    </span>
                </button>
            </div>
            <div id="${selectors.kamOffCanvasCartButton.slice(1)}" class="kam-button kam-cart">
                <a href="${urls.cart}"
                    id="checkout-data-guest-btn-back"
                    class="btn btn-darkgrey btn-text">
                    <span class="btn-inner-wrapper">
                        <span class="btn-label">Zum Warenkorb</span>
                        <span class="btn-icon">
                        <svg class="svg-icon icon-arrow-right">
                        <use
                    xlink:href="/wcsstore/ErnstingsStorefrontAssetStore/svg/efa.svg#arrow-right">
                        </use>
                        </svg>
                        </span>
                    </span>
                </a>
            </div>
        </div>
    </div>
    <div class="${selectors.kamOffCanvasReco.slice(1)}">
        <div id="${selectors.kamOffCanvasReco.slice(1)}"></div>
    </div>
`;

insertOffCanvas(getOffCanvasLayout);

listenAllRequests(getItemLayout);
