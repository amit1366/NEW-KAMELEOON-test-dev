export const T16ProduktanordnungPremiumsegment = () => {
    const goals = {
        '[GG] AddToCart L Prepaid': 239100,
        '[GG] AddToCart Iphone 12': 239101,
        '[GG] AddToCart Smartphone >=900€': 239103
    };

    if (/\/checkout\/warenkorb\/?(\?|#|$)/.test(window.location.href)) {
        Kameleoon.API.Core.runWhenConditionTrue(() => dataLayer.some((item) => item.event
        && item.basketItems), () => {
            const { basketItems } = window.dataLayer.find((item) => item.basketItems);
            basketItems.forEach((product) => {
                if (product.name.includes('PrepaidAllnetL')) {
                    Kameleoon.API.Goals.processConversion(goals['[GG] AddToCart L Prepaid']);
                }
                if (product.name.includes('AppleiPhone12')
                    && !product.name.includes('Aktion')
                    && !product.name.includes('Pro')) {
                    Kameleoon.API.Goals.processConversion(goals['[GG] AddToCart Iphone 12']);
                }
                if (parseFloat(product.productOnetimePrice) >= 900) {
                    Kameleoon.API.Goals.processConversion(
                        goals['[GG] AddToCart Smartphone >=900€']
                    );
                }
            });
        }, 200);
    }
};
