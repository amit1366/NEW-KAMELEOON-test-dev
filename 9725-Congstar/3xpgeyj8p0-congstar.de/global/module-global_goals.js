export const globalGoals = () => {
    const goals = {
        '[GG] AddToCart S': 236177,
        '[GG] AddToCart M': 236178,
        '[GG] AddToCart L': 236179,
        '[GG] Order and Revenue S': 236197,
        '[GG] Order and Revenue M': 234174,
        '[GG] Order and Revenue L': 234175,
        '[GG] Order and Revenue M + L + S': 284431,
        '[GG] Order and Revenue S extra': 297195,
        '[GG] Contact form sent': 231207,
        '[GG] Daten all': 230952,
        '[GG] Homespot all': 230953,
        '[GG] VVL  in CSC': 212465,
        '[GG] A2C FairFlat': 226503,
        '[GG] FairFlat': 226528,
        '[GG] AddToCart L Prepaid': 239100,
        '[GG] AddToCart Iphone 12': 239101,
        '[GG] AddToCart Smartphone >=900€': 239103,
        '[GG] Order Extra Daten ': 273758,
        '[GG] Order Disney Option': 273759,
    };
    if (/\/checkout\/warenkorb\/?(\?|#|$)/.test(window.location.href)) {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => dataLayer.some((item) => item.event && item.basketItems),
            () => {
                const { basketItems } = window.dataLayer.find((item) => item.basketItems);
                basketItems.forEach((product) => {
                    if (/Allnet ?Flat ?S/.test(product.name)) {
                        Kameleoon.API.Goals.processConversion(goals['[GG] AddToCart S']);
                    }
                    if (/Allnet ?Flat ?M/.test(product.name)) {
                        Kameleoon.API.Goals.processConversion(goals['[GG] AddToCart M']);
                    }
                    if (/Allnet ?Flat ?L/.test(product.name)) {
                        Kameleoon.API.Goals.processConversion(goals['[GG] AddToCart L']);
                    }

                    // Takeover from T16ProduktanordnungPremiumsegment
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
            },
            200
        );
    }

    if (/\/checkout\/bestaetigung\/?(\?|#|$)/.test(window.location.href)) {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => dataLayer.some((item) => item.transactionProducts), () => {
                const { transactionProducts } = window.dataLayer
                    .find((item) => item.transactionProducts);

                transactionProducts.forEach((product) => {
                    const revenue = product.productMonthlyPrice * 24;
                    if (/AllnetFlatSExtra/.test(product.name)) {
                        Kameleoon.API.Goals.processConversion(goals['[GG] Order and Revenue S extra'],
                            revenue);
                    } else if (/Allnet ?Flat ?S/.test(product.name)) {
                        Kameleoon.API.Goals.processConversion(goals['[GG] Order and Revenue S'],
                            revenue);
                    }
                    if (/Allnet ?Flat ?M/.test(product.name)) {
                        Kameleoon.API.Goals.processConversion(goals['[GG] Order and Revenue M'],
                            revenue);
                    } else if (/Allnet ?Flat ?L/.test(product.name)) {
                        Kameleoon.API.Goals.processConversion(goals['[GG] Order and Revenue L'],
                            revenue);
                    }
                    Kameleoon.API.Goals.processConversion(
                        goals['[GG] Order and Revenue M + L + S'], revenue
                    );
                    if (/Extra-Daten(2|5)GB/.test(product.name)) {
                        Kameleoon.API.Goals.processConversion(goals['[GG] Order Extra Daten ']);
                    }
                    if (/VideoOption–Disney\+/.test(product.name)) {
                        Kameleoon.API.Goals.processConversion(goals['[GG] Order Disney Option']);
                    }
                });
            });

        // Takeover from P07
        let currentId;

        // eslint-disable-next-line no-inner-declarations
        function findProductId(data) {
            const productsId = [300, 301, 302, 303, 304, 305, 414, 415,
                418, 416, 417, 419, 6213, 6214, 6215, 6216, 6219, 6220,
                6221, 6222, 6223, 6224, 6225, 6226];
            const basketItems = data && data.basketItems;
            if (basketItems) {
                for (let i = 0; i < basketItems.length; i++) {
                    const tarrifId = basketItems[i].id;
                    if (productsId.includes(tarrifId)) {
                        currentId = tarrifId;
                        return true;
                    }
                }
            }
        }

        // eslint-disable-next-line no-inner-declarations
        function checkBoughtProduct(cb) {
            if (dataLayer) {
                return dataLayer.find(cb);
            }
        }

        Kameleoon.API.Core.runWhenConditionTrue(
            () => checkBoughtProduct(findProductId),
            () => {
                if (String(currentId)[0] <= '4') {
                    Kameleoon.API.Goals.processConversion(goals['[GG] Daten all']);
                } else {
                    Kameleoon.API.Goals.processConversion(goals['[GG] Homespot all']);
                }
            }
        );
        // end Takeover from P07
    }

    // Takeover from P06
    if (/www.congstar.de\/hilfe-service\/kontakt\/kontaktformular/.test(window.location.href)) {
        const addGoal = (event) => {
            if (event.data.form_submit === true) {
                if (!sessionStorage.getItem('kameleoon__contactFormSent')) {
                    sessionStorage.setItem('kameleoon__contactFormSent', true);
                }
                Kameleoon.API.Goals.processConversion(goals['[GG] Contact form sent']);
            }
        };
        window.addEventListener('message', addGoal);
    }

    // Takeover from T06 Databoost
    if (/www.congstar.de\/meincongstar\/vertragsverlaengerung\/bestaetigung/.test(window.location.href)) {
        Kameleoon.API.Goals.processConversion(goals['[GG] VVL  in CSC']);
    }

    // Takeover from T10 BSP
    const url = 'www.congstar.de/handytarife/fair-flat/';
    const filterGoals = ['215327', '215328', '215329', '215330', '215331', '226503'];
    const selectors = {
        button: '.configurator-selection__actions .btn-icon.btn-icon--large.btn-icon--block.btn-icon--dark-transparent.btn-icon--multiline.icon--add-to-basket',
    };

    if (location.href.includes(url)) {
        Kameleoon.API.Core.runWhenElementPresent(
            selectors.button,
            ([button]) => {
                Kameleoon.API.Utils.addUniversalClickListener(
                    button,
                    () => Kameleoon.API.Goals.processConversion(goals['[GG] A2C FairFlat'])
                );
            }
        );
    }

    if (!Kameleoon.API.Data.readLocalData('Kam_Dev_Goal_Last_active')) {
        const defaultOptions = {};
        filterGoals.forEach((goalId) => {
            defaultOptions[goalId] = 0;
        });
        Kameleoon.API.Data.writeLocalData('Kam_Dev_Goal_Last_active', defaultOptions, true);
    }

    Kameleoon.API.Core.runWhenConditionTrue(
        () => {
            const infoParse = Kameleoon.API.Data.readLocalData('Kam_Dev_Goal_Last_active');
            if (!infoParse) return;
            const { conversions } = Kameleoon.API.CurrentVisit;
            return filterGoals.some(
                (id) => conversions[id] && conversions[id].count !== infoParse[id]
            );
        },
        () => {
            const { conversions } = Kameleoon.API.CurrentVisit;
            const options = {};
            filterGoals.forEach((goalId) => {
                if (conversions[goalId]) {
                    options[goalId] = conversions[goalId].count;
                }
            });
            Kameleoon.API.Data.writeLocalData('Kam_Dev_Goal_Last_active', options, true);
            Kameleoon.API.Goals.processConversion(goals['[GG] FairFlat']);
        },
    );

    const sessionStorageNames = {
        wasExtraDatenOrdered: 'kameleoonDev__153079-wasExtraDatenOrdered',
        wasDisneyOrdered: 'kameleoonDev__153079-wasDisneyOrdered',
    };

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
                            sessionStorage.getItem(sessionStorageNames.wasExtraDatenOrdered) !== 'true'
                            && (product.name.includes('Extra-Daten5GB') || product.name.includes('Extra-Daten2GB'))
                        ) {
                            Kameleoon.API.Goals.processConversion(goals['[GG] Order Extra Daten ']);
                            sessionStorage.setItem(sessionStorageNames.wasExtraDatenOrdered, 'true');
                        }
                        if (
                            sessionStorage.getItem(sessionStorageNames.wasDisneyOrdered) !== 'true'
                            && product.name.includes('VideoOption–Disney+')
                        ) {
                            Kameleoon.API.Goals.processConversion(goals['[GG] Order Disney Option']);
                            sessionStorage.setItem(sessionStorageNames.wasDisneyOrdered, 'true');
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
