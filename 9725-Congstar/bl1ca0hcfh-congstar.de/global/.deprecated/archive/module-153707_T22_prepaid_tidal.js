export const T22PrepaidTidal = () => {
    if (window.location.href.match(/\/checkout\/warenkorb\/?(\?|#|$)/)) {

        const goals = {
            'T22 A2C Musik Option': 273876,
        };

        let addToCartLayer = null;
        Kameleoon.API.Core.runWhenConditionTrue(
            () => {
                const layer = dataLayer.find((item) => item.event === 'checkout.basketItems'
                && item.basketItems);
                if (layer) {
                    addToCartLayer = layer;
                    return true;
                }
            },
            () => {
                const { basketItems } = addToCartLayer;
                basketItems.forEach((product) => {
                    if (product.name.match(/TIDAL/)) {
                        Kameleoon.API.Goals.processConversion(goals['T22 A2C Musik Option']);
                    }
                });
            }, 200
        );
    }
};
