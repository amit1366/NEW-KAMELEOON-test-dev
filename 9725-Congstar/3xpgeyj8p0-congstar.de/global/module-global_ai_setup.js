export const globlaAiSetup = () => {
    if (/\/handytarife\/(allnet-flat-m|allnet-flat-s)\//.test(document.location.href)) {
        Kameleoon.API.Data.setCustomData('[AI]PlanSeenS,M,FF(5GB)', true);
    } else if (/\/handytarife\/fair-flat\//.test(document.location.href)) {
        Kameleoon.API.Core.runWhenElementPresent(
            '.eft-shop-plan-configurator__settings',
            ([module]) => {
                Kameleoon.API.Data.setCustomData('[AI]PlanSeenS,M,FF(5GB)', true);
                module.addEventListener('click', () => {
                    setTimeout(() => {
                        const currentySlected = module.querySelector('.segment--selected .segment-text');
                        const idNumber = currentySlected && currentySlected.id.match(/\d+/);
                        if (idNumber && idNumber[0] < 8) {
                            Kameleoon.API.Data.setCustomData('[AI]PlanSeenS,M,FF(5GB)', true);
                        } else if (idNumber) {
                            Kameleoon.API.Data.resetCustomData('[AI]PlanSeenS,M,FF(5GB)');
                        }
                    }, 99);
                });
            }
        );
    }

    if (/\/handys\/details\//.test(document.location.href)) {
        Kameleoon.API.Core.runWhenElementPresent('device-price-selection', ([elem]) => {
            elem.addEventListener('click', ({ target }) => {
                if (target.closest('.configurator-selection button.btn-icon--large')) {
                    for (let i = dataLayer.length - 1; i > 0; i--) {
                        if (dataLayer[i].ecommerce && dataLayer[i].ecommerce.detail.products[0]) {
                            Kameleoon.API.Data.writeLocalData(
                                'KamDev_LastAdd2CartItem',
                                dataLayer[i].ecommerce.detail.products[0],
                                false
                            );
                        }
                    }
                }
            }, true);
        });
    }

    const goals = {
        '[GG] Order and Revenue': 200517,
        '[GG] AddToCart': 200372,
    };
    if (/congstar\.de\/checkout/.test(document.location.href)) {
        Kameleoon.API.Utils.addEventListener(document, 'kameleoonInit', Kameleoon.API.Core.load);
        const phoneStorage = Kameleoon.API.Data.readLocalData('KamDev_LastAdd2CartItem');
        const getCheckoutEvent = () => dataLayer.some(
            (item) => item.event && item.event.match(/ee\.(addToCart|purchase)/)
        );
        const getBasketItemsEvent = () => dataLayer.some(
            (item) => item.event && item.event.match(/checkout\.basketItems/)
        );
        const getCustomerAge = () => {
            for (let i = 0; i < dataLayer.length; i++) {
                const ageRange = dataLayer[i].customerAgeRange
                    && dataLayer[i].customerAgeRange.match(/\d+/);
                if (ageRange) return Number(ageRange[0]);
            }
        };
        const getCartContentValue = () => {
            let monthSumm = 0;
            const dataLayerObject = dataLayer.find((item) => item.basketItems).basketItems;
            dataLayerObject.forEach(
                (item) => { monthSumm += Number(item.productMonthlyPrice); }
            );
            return {
                summ: monthSumm,
                option: dataLayerObject.some((item) => item.type === 'option'),
                phone: phoneStorage
                    ? dataLayerObject.some((item) => item.id === phoneStorage.id)
                    : false,
            };
        };
        if (/\/checkout\/(warenkorb|bestaetigung)/.test(document.location.href)) {
            Kameleoon.API.Core.runWhenConditionTrue(
                () => window.dataLayer && getCheckoutEvent() && getBasketItemsEvent(),
                () => {
                    const cartValues = getCartContentValue();
                    if (/\/checkout\/warenkorb/.test(document.location.href)) {
                        Kameleoon.API.Data.setCustomData('[AI]A2CPlan', cartValues.summ);
                        Kameleoon.API.Goals.processConversion(goals['[GG] AddToCart'], cartValues.summ);
                    } else if (/\/checkout\/bestaetigung/.test(document.location.href)) {
                        Kameleoon.API.Goals.processConversion(goals['[GG] Order and Revenue'], cartValues.summ);
                        // console.log('[AI]OrderAge', getCustomerAge());
                        if (getCustomerAge()) Kameleoon.API.Data.setCustomData('[AI]OrderAge', getCustomerAge());
                        // console.log('[AI]OrderOption', cartValues.option);
                        if (cartValues.option) Kameleoon.API.Data.setCustomData('[AI]OrderOption', true);
                        if (cartValues.phone) {
                            const phonePrice = phoneStorage.price;
                            let CDname;
                            if (phonePrice > 601) {
                                CDname = '[AI]OrderPhoneSegment-premium';
                            } else if (phonePrice > 301) {
                                CDname = '[AI]OrderPhoneSegment-middel';
                            } else {
                                CDname = '[AI]OrderPhoneSegment-low';
                            }
                            Kameleoon.API.Data.setCustomData(CDname, true);
                        }
                    }
                }
            );
        }
    }
};
