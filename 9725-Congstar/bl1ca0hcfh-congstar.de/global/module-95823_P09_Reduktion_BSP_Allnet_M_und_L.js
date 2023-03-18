export const P09ReduktionBSPAllnetMundL = () => {
    const goals = {
        '[GG|P09] Order and Revenue M or L': 291351,
    };

    if (/\/checkout\/bestaetigung\/?(\?|#|$)/.test(window.location.href)) {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => window.dataLayer
        && window.dataLayer?.some((item) => item.transactionProducts),
            () => {
                const { transactionProducts } = window.dataLayer.find(
                    (item) => item.transactionProducts
                );

                transactionProducts.forEach((product) => {
                    const revenue = product.productMonthlyPrice * 24;

                    if (
                        product.name.includes('AllnetFlatM')
            || product.name.includes('AllnetFlatL')
                    ) {
                        Kameleoon.API.Goals.processConversion(
                            goals['[T13] Order and Revenue M + L'],
                            revenue
                        );
                    }
                });
            }
        );
    }
};
