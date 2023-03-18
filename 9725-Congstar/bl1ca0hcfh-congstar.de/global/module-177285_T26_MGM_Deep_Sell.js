export const T26MGMDeepSell = () => {
    const goals = {
        '[GG] Friends code redeemed': 292232,
        '[GG] Order Partnerkarte': 292247,
    };

    if (document.location.pathname.includes('/checkout/bestaetigung')) {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => window.dataLayer && window.dataLayer.some((data) => data.event === 'ee.purchase',
                () => {
                    const {
                        ecommerce: {
                            purchase: {
                                actionField: {
                                    campaignEntryData,
                                },
                            },
                        },
                    } = window.dataLayer.find((data) => data.event === 'ee.purchase');

                    if (campaignEntryData.toLowerCase() === 'partnerkarte') {
                        Kameleoon.API.Goals.processConversion(goals['[GG] Order Partnerkarte']);
                    }
                })
        );
    }
};
