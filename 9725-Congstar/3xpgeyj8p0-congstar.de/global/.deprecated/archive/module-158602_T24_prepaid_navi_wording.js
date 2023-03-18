export const T24PrepaidNaviWording = () => {
    const goals = {
        '[Congstar|T24] Add2Cart HJ-Paket': 279039,
        '[Congstar|T24] Order HJ-Paket': 279040,
    };
    let includesTestProduct;
    const checkdataLayerForProduct = (key, eventName) => {
        if (!(window.dataLayer && window.dataLayer.some(({ event }) => event === eventName))) return;
        const { ecommerce: { [key]: { products } } } = window.dataLayer.find(({ event }) => event === eventName);
        includesTestProduct = products.some(({ id }) => id === 421);
        return true;
    };

    if (document.location.pathname === '/checkout/warenkorb') {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => checkdataLayerForProduct('add', 'ee.addToCart'),
            () => {
                if (includesTestProduct) {
                    Kameleoon.API.Goals.processConversion(
                        goals['[Congstar|T24] Add2Cart HJ-Paket']
                    );
                    includesTestProduct = false;
                }
                checkdataLayerForProduct('remove', 'ee.removeFromCart');
                if (includesTestProduct) {
                    Kameleoon.API.Goals.cancelConversion(
                        goals['[Congstar|T24] Add2Cart HJ-Paket']
                    );
                }
            }
        );
    } else if (
        document.location.pathname === '/checkout/bestaetigung'
        || document.location.pathname === '/checkout/uebersicht'
    ) {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => checkdataLayerForProduct('purchase', 'ee.purchase'),
            () => {
                if (includesTestProduct) {
                    Kameleoon.API.Goals.processConversion(
                        goals['[Congstar|T24] Order HJ-Paket']
                    );
                }
            }
        );
    }
};
