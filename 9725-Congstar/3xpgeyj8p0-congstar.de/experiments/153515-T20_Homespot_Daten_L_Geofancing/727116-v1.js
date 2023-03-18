import { tarifSettings, storageNames, testID } from './consts';
import { getProduct } from './funcs';
import { handlePDP } from './pdp';
import { handleCartAndCheckout } from './cartAndCheckout';

const checkCartAndCheckout = () => {
    if (location.href.match(/checkout\/warenkorb/)) {
        const isAddedInterestingProductToBasket = () => {
            const layer = dataLayer.find(({ event }) => event === 'ee.addToCart');
            if (layer && layer.ecommerce && layer.ecommerce.add && layer.ecommerce.add.products 
                && layer.ecommerce.add.products.some(({ id }) => id === 419 || id === 418)) { 
                return true;
            }
            return false;
        };
    
        const product = getProduct(storageNames.PDPAddToCart);
    
        if (isAddedInterestingProductToBasket()
            && tarifSettings[product] && tarifSettings[product].addToCartGoal) { 
            Kameleoon.API.Goals.processConversion(tarifSettings[product].addToCartGoal);
        }
    
        if (tarifSettings[product]) {
            const { name, cartDescription, price: [payment] } = tarifSettings[product];
            handleCartAndCheckout({
                name,
                description: cartDescription,
                payment
            });
        }
        
    } else if (location.href.match(/checkout\/uebersicht/)) {
        const product = getProduct(storageNames.PDPAddToCart);
    
        if (tarifSettings[product]) {
            sessionStorage.setItem(storageNames.tarifAtCart, product);
            localStorage.setItem(storageNames.tarifAtCart, product);  
                      
            const { name, summaryDescription, price: [payment] } = tarifSettings[product];
            handleCartAndCheckout({
                name,
                description: summaryDescription,
                payment
            });
        }
    } 
};

if (location.href.match(/checkout\/(warenkorb|uebersicht)/)) {
    const mutationAttr = `kam-added-mutation-${testID}`;
    Kameleoon.API.Core.runWhenElementPresent(
        // eslint-disable-next-line max-len
        `body > div.container-fluid.wrapper > div > checkout-root > checkout-progress-bar-page:not([${mutationAttr}="true"])`,
        ([wrapper]) => {
            wrapper.setAttribute(mutationAttr, true);
            new MutationObserver(checkCartAndCheckout).observe(wrapper, { childList: true });
            Kameleoon.API.Utils.addEventListener(window, 'load', checkCartAndCheckout);
        }
    );
    checkCartAndCheckout();
} else {
    for (const name in tarifSettings) {
        if (Object.prototype.hasOwnProperty.call(tarifSettings, name) 
        && tarifSettings[name].isIntersecting()) {
            handlePDP(tarifSettings[name], name);
            break;
        }
    }
}
