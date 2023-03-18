export const T17Dealcloser = () => {
    const goals = {
        '[T17] Order and Revenue S, M, L': 237946,
        '[T17] AddToCart S, M + L': 237945,
    };

    if (document.location.pathname === '/checkout/warenkorb') {
        Kameleoon.API.Core
            .runWhenConditionTrue(() => dataLayer.some((item) => item.ecommerce
            && item.ecommerce.add
            && item.ecommerce.add.products), () => {
                const {
                    ecommerce: {
                        add: { products },
                    },
                } = window.dataLayer.find((item) => item.ecommerce
                    && item.ecommerce.add
                    && item.ecommerce.add.products);

                products.forEach((product) => {
                    if (product.name.includes('Allnet Flat S')
                        || product.name.includes('Allnet Flat L')
                        || product.name.includes('Allnet Flat M')) {
                        Kameleoon.API.Goals.processConversion(goals['[T17] AddToCart S, M + L']);
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

                    if (product.name.includes('AllnetFlatS')
                        || product.name.includes('AllnetFlatM')
                        || product.name.includes('AllnetFlatL')) {

                        Kameleoon.API.Goals
                            .processConversion(goals['[T17] Order and Revenue S, M, L'],
                                revenue);
                    }
                });
            }, 200);
    }
};
