const goals = {
    '[GG] AddToCart': 200372,
    '[GG] Order and Revenue': 200517,
    '[T01] AddToBasket relevant products': 200367,
    '[T01] Order relevant products': 200368
};

export default () => {
    if (window.location.href.match('/checkout')) {
        waitCheckoutEvents('warenkorb', 'addToCart', addToCart);
        waitCheckoutEvents('bestaetigung', 'checkout.purchase', order);
    }
};

function waitCheckoutEvents(pageName, eventName, callback) {
    Kameleoon.API.Core.runWhenConditionTrue(() => {
        return window.location.href.match(`/checkout/${pageName}`)
            && typeof dataLayer !== 'undefined'
            && dataLayer.filter(item => {
                return item.event;
            }).length
            && dataLayer.filter(item => {
                return item.event;
            }).filter(item => {
                return item.event.match(eventName);
            });
    }, () => {
        callback();
    });
}

function addToCart() {
    const eventAddToCart = dataLayer.filter(item => item.event).filter(item => item.event.match('addToCart'))[0];
    if (eventAddToCart && eventAddToCart.ecommerce && eventAddToCart.ecommerce.add && eventAddToCart.ecommerce.add.products) {
        const prodList = eventAddToCart.ecommerce.add.products;
        prodList.forEach((item) => {
            Kameleoon.API.Goals.processConversion(goals['[GG] AddToCart']);
            if (localStorage.getItem('kam-actual-viewed-products') && localStorage.getItem('kam-actual-viewed-products').indexOf(item.id) !== -1 ) Kameleoon.API.Goals.processConversion(goals['[T01] AddToBasket relevant products']);
        });
    }
}

function order() {
    const eventOrder = dataLayer.filter(item => item.event).filter(item => item.event.match('checkout.purchase'))[0];
    if (eventOrder) {
        let revenue = '0.00';
        let quantityMonth = 24;
        if (eventOrder.transactionProducts) {
            const existFairFlatProd = eventOrder.transactionProducts.filter((item) => item.name.match('FairFlat'));
            if (existFairFlatProd.length) quantityMonth = 18;
        }
        if (eventOrder.orderTotalOnetimePrice && eventOrder.orderTotalMonthlyPrice) {
            revenue = +eventOrder.orderTotalOnetimePrice + +eventOrder.orderTotalMonthlyPrice * quantityMonth;
        }
        if (eventOrder.transactionProducts) {
            const prodList = eventOrder.transactionProducts;
            for (let i = 0; i < prodList.length; i++) {
                const item = prodList[i];
                if (localStorage.getItem('kam-actual-viewed-products') && localStorage.getItem('kam-actual-viewed-products').indexOf(item.id) !== -1
                    && Kameleoon.API.Data.readLocalData('kam-number-of-tiles')) {
                    Kameleoon.API.Goals.processConversion(goals['[T01] Order relevant products'], revenue);
                    break;
                }
            }
        }
        Kameleoon.API.Goals.processConversion(goals['[GG] Order and Revenue'], revenue);
    }
}






