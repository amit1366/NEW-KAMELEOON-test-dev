export const P08CongstaXUmfrage = () => {
    const goals = {
        '[P08] congstar X order and revenue': 229595
    };
    
    if (/congstar\.de\/checkout/.test(document.location.href)) {
    
        const getCheckoutEvent = () => dataLayer.some((item) => item.event 
            && item.event.match(/ee\.(addToCart|purchase)/));
        const getBasketItemsEvent = () => dataLayer.some((item) => item.event 
            && item.event.match(/checkout\.basketItems/));
        const getBasketCongstarX = () => dataLayer.some((event) => event.basketItems 
            && event.basketItems.some((item) => item.name === 'congstarX'));
    
        const getCartContentValue = () => {
    
            const dataLayerObject = dataLayer.find((item) => item.basketItems).basketItems;
    
            const summofItems = dataLayerObject.reduce((summ, item) => { 
                summ += Number(item.productMonthlyPrice);
                return summ;
            }, 0);
    
            return summofItems;
        };
        if (/\/checkout\/(warenkorb|bestaetigung)/.test(document.location.href)) {
            Kameleoon.API.Core.runWhenConditionTrue(
                () => window.dataLayer 
                    && getCheckoutEvent() 
                    && getBasketItemsEvent() 
                    && getBasketCongstarX(),
                () => {
                    const cartValues = getCartContentValue();
    
                    if (/\/checkout\/bestaetigung/.test(document.location.href)) {
    
                        Kameleoon.API.Goals
                            .processConversion(goals['[P08] congstar X order and revenue'], 
                                cartValues);
    
                    }
                }
            );
                
        }
    }
    
};
