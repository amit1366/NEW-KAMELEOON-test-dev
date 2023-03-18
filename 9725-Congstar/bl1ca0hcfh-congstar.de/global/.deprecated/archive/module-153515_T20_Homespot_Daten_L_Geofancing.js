import { getProduct } from '../experiments/153515-T20_Homespot_Daten_L_Geofancing/funcs';
import { storageNames } from '../experiments/153515-T20_Homespot_Daten_L_Geofancing/consts';

/* eslint-disable func-names */
export const T20HomespotDatenLGeofancing = () => {
    const goals = {
        '[GG] Daten L 30': 273718,
        '[GG] Daten L 100': 273716,
        '[GG] Daten L 200': 273717,
    };
    
    const products = {
        30: goals['[GG] Daten L 30'],
        100: goals['[GG] Daten L 100'],
        200: goals['[GG] Daten L 200'],
    };

    const isHasInterestingProductInBasket = () => {
        const product = getProduct(storageNames.PDPAddToCart);
    
        const layer = dataLayer.find(({ event }) => event === 'checkout.basketItems');
        if (products[product] && layer && layer.basketItems 
            && layer.basketItems.some(({ id }) => id === 419 || id === 418)) { 
            return true;
        }
        return false;
    };

    const isPurchasedInterestingProduct = () => {
        const product = getProduct(storageNames.tarifAtCart);
    
        const layer = dataLayer.find(({ event }) => event === 'checkout.purchase');
        if (products[product] && layer && layer.transactionProducts 
            && layer.transactionProducts.some(({ id }) => id === 419 || id === 418)) { 
            return true;
        }
        return false;
    };

    const checkItems = () => {
        Kameleoon.API.Core.runWhenConditionTrue( 
            () => window.dataLayer, 
            () => {
                if (location.href.match(/checkout\/bestaetigung/)) {
                    const product = getProduct(storageNames.tarifAtCart);
            
                    if (isPurchasedInterestingProduct()) {
                        Kameleoon.API.Goals.processConversion(products[product]);
                        sessionStorage.removeItem(storageNames.tarifAtCart);
                        localStorage.removeItem(storageNames.tarifAtCart);
                        sessionStorage.removeItem(storageNames.PDPAddToCart);
                        localStorage.removeItem(storageNames.PDPAddToCart);
                    }
                } else if (location.href.match(/checkout\/(warenkorb|uebersicht)/)) {
                    if (isHasInterestingProductInBasket()) {
                        const trigger = () => {
                            Kameleoon.API.Events.trigger('daten_l_geofancing');
                            Kameleoon.API.Segments.reevaluate(177985);
                        };
                        trigger();
                        Kameleoon.API.Utils.addEventListener(window, 'load', trigger);
                        const wrapper = document.querySelector(
                            'body > div.container-fluid.wrapper > div > checkout-root > checkout-progress-bar-page'
                        );
                        if (wrapper) {
                            new MutationObserver(trigger).observe(wrapper, { childList: true });
                        }
                    }
                }
            }
        );
    };
    checkItems();
};
