const goals = {
    '[T06] AddToCart Databoost': 212468,
    '[T06] Order and Revenue': 212469,
    '[T06] AddToCart Product': 212471,
};
    
const checkboxSelectors = {
    extraDataCheckBox1: `#available-option-2568`,
    extraDataCheckBox2: `#available-option-2569`,
};

const urls = [
    `https://www.congstar.de/handytarife/allnet-flat-s/`,
    `https://www.congstar.de/handytarife/allnet-flat-m/`,
    `https://www.congstar.de/handytarife/allnet-flat-l/`,
];

if (urls.some((url) => location.href.match(url))) {

    const fireAddToCartDataboost = () => {
        Kameleoon.API.Goals.processConversion(goals['[T06] AddToCart Databoost']);
    };

    const fireAddToCart = () => {
        Kameleoon.API.Goals.processConversion(goals['[T06] AddToCart Product']);
    };
        
    Kameleoon.API.Core.runWhenElementPresent(`.kam-purchase-offer__add2Cart-btn`, (button) => {
        Kameleoon.API.Utils.addEventListener(button[0], `mousedown`, fireAddToCartDataboost);
        Kameleoon.API.Utils.addEventListener(button[0], `mousedown`, fireAddToCart);
    });

    Kameleoon.API.Core.runWhenElementPresent(`.kam-purchase-offer__cancel-offer-btn`, (button) => {
        Kameleoon.API.Utils.addEventListener(button[0], `mousedown`, fireAddToCart);
    });

    Kameleoon.API.Core.runWhenElementPresent(`button[data-test-action=addToCart]`, (button) => {
        Kameleoon.API.Utils.addEventListener(button[0], `mousedown`, fireAddToCart);
    });
        
    Kameleoon.API.Core.runWhenConditionTrue(
        () => Object.keys(checkboxSelectors)
            .some((key) => document.querySelector(checkboxSelectors[key]))
                && document.querySelector(`button[data-test-action=addToCart]`),
            
        () => {
            const extraDataCheckBoxKey = Object.keys(checkboxSelectors)
                .filter((key) => document.querySelector(checkboxSelectors[key]));
        
            const extraDataCheckBox = document.querySelector(checkboxSelectors[extraDataCheckBoxKey]);  
            const ctaButton = document.querySelector(`button[data-test-action=addToCart]`);
                
            Kameleoon.API.Utils.addEventListener(ctaButton, `mousedown`, () => {
                if (extraDataCheckBox.dataset.testState === `isSelected`) {
                    fireAddToCartDataboost();
                }
            });
        }
    );

}  
    
// The following code is from GLOBAL
const fire = (function () {
    if (window.location.href.match('/checkout')) {
        waitCheckoutEvents('bestaetigung', 'checkout.purchase', order);
    }
});
    
function waitCheckoutEvents(pageName, eventName, callback) {
    Kameleoon.API.Core.runWhenConditionTrue(function () {
        return window.location.href.match('/checkout/'.concat(pageName))
                    && typeof dataLayer !== 'undefined'
                    && dataLayer.filter(function (item) {
                        return item.event;
                    }).length
                    && dataLayer.filter(function (item) {
                        return item.event;
                    }).filter(function (item) {
                        return item.event.match(eventName);
                    });
    }, function () {
        callback();
    });
}
      
function order() {
    const eventOrder = dataLayer.filter(function (item) {
        return item.event;
    }).filter(function (item) {
        return item.event.match('checkout.purchase');
    })[0];
    
    if (eventOrder) {
        let revenue = '0.00';
        let quantityMonth = 24;
    
        if (eventOrder.transactionProducts) {
            const existFairFlatProd = eventOrder.transactionProducts.filter(function (item) {
                return item.name.match('FairFlat');
            });
            if (existFairFlatProd.length) quantityMonth = 18;
        }
    
        if (eventOrder.orderTotalOnetimePrice && eventOrder.orderTotalMonthlyPrice) {
            revenue = +eventOrder.orderTotalOnetimePrice + +eventOrder.orderTotalMonthlyPrice * quantityMonth;
        }
    
        Kameleoon.API.Goals.processConversion(goals['[T06] Order and Revenue'], revenue);
    }
}
    
fire();
