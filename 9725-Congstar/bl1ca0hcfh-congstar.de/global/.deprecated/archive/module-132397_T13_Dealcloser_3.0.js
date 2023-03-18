export const T13Dealcloser = () => {
    const goals = {
        '[T13] Order and Revenue M + L': 235419,
        '[T13] AddToCart M + L': 235420,
    };

    if (document.location.pathname === '/checkout/warenkorb') {
        Kameleoon.API.Core
            .runWhenConditionTrue(() => dataLayer.some((item) => item.ecommerce 
            && item.ecommerce.add 
            && item.ecommerce.add.products), () => {
                const { 
                    ecommerce: { 
                        add: { products }
                    }
                } = window.dataLayer.find((item) => item.ecommerce 
                    && item.ecommerce.add 
                    && item.ecommerce.add.products);

                products.forEach((product) => {
                    if (product.name.includes('Allnet Flat L') 
                        || product.name.includes('Allnet Flat M')) {
                        Kameleoon.API.Goals.processConversion(goals['[T13] AddToCart M + L']);
                    }
                });
            }, 200);
    }

    if (document.location.pathname === '/checkout/bestaetigung') {
        Kameleoon.API.Core
            .runWhenConditionTrue(() => dataLayer.some((item) => item.transactionProducts), () => {
                const { transactionProducts } = window.dataLayer
                    .find((item) => item.transactionProducts);

                transactionProducts.forEach((product) => {
                    const revenue = product.productMonthlyPrice * 24;

                    if (product.name.includes('AllnetFlatM')
                        || product.name.includes('AllnetFlatL')) {

                        Kameleoon.API.Goals
                            .processConversion(goals['[T13] Order and Revenue M + L'], 
                                revenue);
                    }
                });
            }, 200);
    }
};
