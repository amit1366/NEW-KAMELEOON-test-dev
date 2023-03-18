export const initializeT21Goals = () => {
    const goals = {
        'T21 A2C LTE50': 273393,
        'T21 A2C Extra Daten': 273394,
        '[GG] Order Extra Daten ': 273395,
        'T21 A2C Disney Option': 273396,
        '[GG] Order Disney Option': 273397,
        'T21 A2C Musik Option': 273398,
        'T21 24 Monate chosen': 273400,
    };

    const sessionStorageNames = {
        plan24: 'kameleoonDev__153079-plan24',
        lte50: 'kameleoonDev__153079-lte50',
        extraDaten: 'kameleoonDev__153079-extraDaten',
        disney: 'kameleoonDev__153079-disney',
        musik: 'kameleoonDev__153079-musik',

        wasExtraDatenOrdered: 'kameleoonDev__153079-wasExtraDatenOrdered',
        wasDisneyOrdered: 'kameleoonDev__153079-wasDisneyOrdered',
    };

    let addToCartLayer = null;
    if (window.location.href.match(/\/checkout\/warenkorb\/?(\?|#|$)/)) {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => {
                const layer = dataLayer.find((item) => item.event
                && item.basketItems);
                if (layer) {
                    addToCartLayer = layer;
                    return true;
                }
            },
            () => {
                const { basketItems } = addToCartLayer;
                basketItems.forEach((product) => {
                    if (product.name.match(/AllnetFlat[SML]/)) {
                        let plan = null;
                        if (sessionStorage.getItem(sessionStorageNames.plan24) === 'true') {
                            Kameleoon.API.Goals.processConversion(goals['T21 24 Monate chosen']);
                            plan = '24 Laufzeit';
                        } else if (sessionStorage.getItem(sessionStorageNames.plan24) === 'false') {
                            plan = 'Ohne Laufzeit';
                        }

                        if (plan) {
                            Kameleoon.API.Data.setCustomData('Contract duration', plan);
                        }
                        if (sessionStorage.getItem(sessionStorageNames.lte50) === 'true') {
                            Kameleoon.API.Goals.processConversion(goals['T21 A2C LTE50']);
                        }
                        if (sessionStorage.getItem(sessionStorageNames.extraDaten) === 'true') {
                            Kameleoon.API.Goals.processConversion(goals['T21 A2C Extra Daten']);
                        }
                        if (sessionStorage.getItem(sessionStorageNames.disney) === 'true') {
                            Kameleoon.API.Goals.processConversion(goals['T21 A2C Disney Option']);
                        }
                        if (sessionStorage.getItem(sessionStorageNames.musik) === 'true') {
                            Kameleoon.API.Goals.processConversion(goals['T21 A2C Musik Option']);
                        }
                    }
                });
                Object.values(sessionStorageNames).forEach((value) => {
                    sessionStorage.setItem(value, 'false');
                });
            }, 200
        );
    }

    if (document.location.pathname === '/checkout/bestaetigung') {
        let orderDataLayer = null;
        Kameleoon.API.Core
            .runWhenConditionTrue(
                () => {
                    const layer = dataLayer.find((item) => item.transactionProducts);
                    if (layer) {
                        orderDataLayer = layer;
                        return true;
                    }
                },
                () => {
                    const { transactionProducts } = orderDataLayer;

                    transactionProducts.forEach((product) => {
                        if (
                            sessionStorage.getItem(
                                sessionStorageNames.wasExtraDatenOrdered
                            ) !== 'true'
                            && product.name.includes('Extra-Daten5GB')
                        ) {
                            Kameleoon.API.Goals.processConversion(goals['[GG] Order Extra Daten ']);
                            sessionStorage.setItem(
                                sessionStorageNames.wasExtraDatenOrdered,
                                'true'
                            );
                        }
                        if (
                            sessionStorage.getItem(
                                sessionStorageNames.wasDisneyOrdered
                            ) !== 'true'
                            && product.name.includes('VideoOption–Disney+')
                        ) {
                            Kameleoon.API.Goals.processConversion(
                                goals['[GG] Order Disney Option']
                            );
                            sessionStorage.setItem(
                                sessionStorageNames.wasDisneyOrdered,
                                'true'
                            );
                        }
                    });
                },
                200
            );
    } else {
        sessionStorage.setItem(sessionStorageNames.wasExtraDatenOrdered, 'false');
        sessionStorage.setItem(sessionStorageNames.wasDisneyOrdered, 'false');
    }
};
