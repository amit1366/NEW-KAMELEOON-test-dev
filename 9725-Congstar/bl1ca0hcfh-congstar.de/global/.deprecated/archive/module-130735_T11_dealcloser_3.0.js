export const T11Dealcloser = () => {
    const currentUrl = window.location.pathname;
    const goals = {
        '[T11] Order and Revenue M + L + S': 234172,
        '[T11] AddToCart M + L + S': 234173,
    };

    function addUrlObjectToLocalStorage(url) {
        const visitedPagesArray = Kameleoon.API.Data.readLocalData('visitedPagesNew') || [];
        let timeSpend = 0;
        Kameleoon.API.Data
            .writeLocalData('visitedPages',
                [...visitedPagesArray.filter((obj) => currentUrl !== obj.visitedPage), {
                    visitedPage: url, timesVisited: Kameleoon.API.Visitor.numberOfVisits, timeSpend,
                }],
                true);

        setInterval(() => {
            timeSpend += 5;
            Kameleoon.API.Data
                .writeLocalData('visitedPagesNew',
                    [...visitedPagesArray.filter((obj) => currentUrl !== obj.visitedPage), {
                        visitedPage: url,
                        timesVisited: Kameleoon.API.Visitor.numberOfVisits,
                        timeSpend,
                    }],
                    true);
        }, 5000);
    }

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
                    if (product.name.includes('Allnet Flat L')
                        || product.name.includes('Allnet Flat M')
                        || product.name.includes('Allnet Flat S')) {
                        Kameleoon.API.Goals.processConversion(goals['[T11] AddToCart M + L + S']);
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
                        || product.name.includes('AllnetFlatL')
                        || product.name.includes('AllnetFlatS')) {

                        Kameleoon.API.Goals
                            .processConversion(goals['[T11] Order and Revenue M + L + S'],
                                revenue);
                    }
                });
            }, 200);
    }

    if (Kameleoon.API.CurrentVisit.device.type === 'Phone'
        && (document.location.pathname === '/handytarife/allnet-flat-s/'
        || document.location.pathname === '/handytarife/allnet-flat-m/'
        || document.location.pathname === '/handytarife/allnet-flat-l/')) {
        addUrlObjectToLocalStorage(currentUrl);
        if (!Kameleoon.API.Visitor.customData.ISP) {
            fetch('https://api.ipgeolocation.io/ipgeo?apiKey=be917988947b422789cf3a5e585269fb')
                .then((response) => response.json())
                .then((data) => {
                    if (data.isp !== undefined && data.isp !== '') {
                        Kameleoon.API.Data.setCustomData('ISP', data.isp);
                    }
                });
        }
    }
};
