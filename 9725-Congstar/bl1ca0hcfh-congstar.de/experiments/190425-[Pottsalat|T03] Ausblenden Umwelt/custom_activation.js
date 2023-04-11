// Check page condition
let postPageMatch = false;
let isESim = false;

Kameleoon.API.Core.runWhenConditionTrue(() => typeof dataLayer !== 'undefined', () => {
    // Datalayer
    dataLayer.forEach((map) => {
        // Check postpaid products in basketItems
        if (map.event === 'checkout.basketItems') {
            map.basketItems.forEach((prod) => {
                if (prod.category === 'postpaid') {
                    postPageMatch = true;
                }
            });
            // Check sim type in ee.addToCart
        }
        if (map.event === 'ee.addToCart') {
            if (map.ecommerce && map.ecommerce.add && map.ecommerce.add.actionField && map.ecommerce.add.actionField.simtype === 'eSIM') {
                isESim = true;
            }
        }
    });

    // If post page matched and not a eSim matched
    if (postPageMatch && !isESim) {
        setTargeting(true);
    }

}, 200);
