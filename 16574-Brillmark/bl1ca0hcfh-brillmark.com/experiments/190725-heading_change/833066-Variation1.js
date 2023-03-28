import { selectors } from './selectors';
import { urls } from './urls';
import { insertOffCanvas, listenAllRequests } from './functions';

const getOffCanvasLayout = () => `
    <div class="${selectors.kamOffCanvasOverlay.slice(1)}"></div>
    <aside id="${selectors.kamOffCanvas.slice(1)}">
    </aside>
`;
console.log('hello');
const getItemLayout = (imgUrl, name, color, size, amount, price) => `
    <div id="kam-add2cart-off_canvas-header">
            <div class="ef-icon icon-transparent">
                <svg class="svg-icon icon-cart">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wcsstore/ErnstingsStorefrontAssetStore/svg/efa.svg#check2"></use>
                </svg>
            </div>
            <h2 id="kam-add2cart-off_canvas-header__text">Fantastisch!</h2>
            <div id="${selectors.kamOffCanvasHeaderClose.slice(1)}" class="ef-icon ef-icon-small">
                <svg class="svg-icon icon-close">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wcsstore/ErnstingsStorefrontAssetStore/svg/efa.svg#close"></use>
                </svg>
            </div>
    </div>
    <div id="${selectors.kamOffCanvasContentWrapper.slice(1)}">
        <div id="kam-add2cart-off_canvas-reco-wrapper">
            <div class="kam-add2cart-off_canvas-item row mx-auto py-3">
                <div class="kam-add2cart-off_canvas-item__image ml-auto">
                    <img class="img-fluid"
                        src="${imgUrl}"
                        alt="Kinder Regenjacke" />
                </div>
                <div class="kam-add2cart-off_canvas-item-details mr-auto">
                    <p class="kam-add2cart-off_canvas-item-details__message">
                        <svg class="svg-icon icon-cart">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/wcsstore/ErnstingsStorefrontAssetStore/svg/efa.svg#check2"></use>
                        </svg>
                        Ihr Artikel liegt im Warenkorb
                    </p>
                    <p class="kam-add2cart-off_canvas-item-details__name">
                        ${name}
                    </p>
                    <p class="kam-add2cart-off_canvas-item-details__color">
                        ${color}
                    </p>
                    <p class="kam-add2cart-off_canvas-item-details__extra">
                        Größe: ${size} | Anzahl: ${amount}
                    </p>
                    <p class="kam-add2cart-off_canvas-item-details__price">
                        ${price}
                    </p>
                </div>
            </div>
            <div id="${selectors.kamOffCanvasReco.slice(1)}" class="row mx-auto py-5"></div>
        </div>
        <div id="kam-add2cart-off_canvas-footer" class="row">
            <div id="${selectors.kamOffCanvasCartButton.slice(1)}"
                class="col-auto col-sm-4 mr-auto">
                <a href="${urls.cart}" class="btn btn-mediumgrey btn-text" tabindex="0">
                    <span class="btn-label">Zum Warenkorb</span>
                </a>
            </div>
            <div id="${selectors.kamOffCanvasShopButton.slice(1)}"
                class="col-auto col-sm-4 ml-auto">
                <a class="btn btn-green btn-text" tabindex="1">
                    <span class="btn-label">Weiter shoppen</span>
                </a>
            </div>
        </div>
    </div>
`;

insertOffCanvas(getOffCanvasLayout);

listenAllRequests(getItemLayout);