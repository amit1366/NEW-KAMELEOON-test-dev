export const T02CscMessagebordDealcloser = () => {
    const goals = {
        '[CSC|T02] Klick auf in den Warenkorb': 238183,
    };

    if (
        /\/meincongstar\/tarifwechsel\/tarifkonfigurator\?contractid=.*&planid=(407|408)/
            .test(window.location.href)
    ) {
        Kameleoon.API.Core.runWhenElementPresent(
            'button[data-test-action="addToCart"]',
            ([elements]) => {
                elements.addEventListener('click', () => {
                    Kameleoon.API.Goals.processConversion(goals['[CSC|T02] Klick auf in den Warenkorb']);
                });
            }
        );
    }

    function setCSCData(customerProfileID) {
        if (customerProfileID !== '') {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow',
            };

            const url = `https://customers.kameleoon.com/congstarcsc/${customerProfileID}`;

            fetch(url, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    window.kam_results = result;
                    if (typeof result.content !== 'undefined') {
                        Kameleoon.API.Data.setCustomData('CSC T02', result.content);
                    }
                    if (typeof result.purchased !== 'undefined') {
                        Kameleoon.API.Data.setCustomData('CSC T02 Purchased', result.purchased);
                    }

                })
                .catch((error) => console.warn('error', error));
        }
    }

    Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.dataLayer !== 'undefined', () => {
        if (
            window.dataLayer.filter(
                (item) => item.event === 'customerInsights.profile.ready'
            ).length
        ) {
            const customerProfileID = window.dataLayer.filter(
                (item) => item.event === 'customerInsights.profile.ready'
            )[0].ci_customerProfile.customerId;
            Kameleoon.API.Data.setCustomData('CSC T02 User', customerProfileID);
            setCSCData(customerProfileID);
        } else {
            window.dataLayer.push = (function newPush(oldPush) {
                return function patch(...args) {
                    if (args[0].event === 'customerInsights.profile.ready') {
                        Kameleoon.API.Data.setCustomData(
                            'CSC T02 User',
                            args[0].ci_customerProfile.customerId
                        );
                        setCSCData(args[0].ci_customerProfile.customerId);
                    }
                    return oldPush.apply(this, args);
                };
            }(window.dataLayer.push));
        }
    });

    function setClientPurchase() {
        Kameleoon.API.Data.setCustomData('CSC T02 Purchased', true);

        if (Kameleoon.API.CurrentVisit.customData['CSC T02 User'] !== undefined) {
            const requestOptions = { method: 'PATCH', redirect: 'follow' };
            const url = `https://customers.kameleoon.com/congstarcsc/${Kameleoon.API.CurrentVisit.customData['CSC T02 User']}`;
            fetch(url, requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log('error', error));
        }
    }

    if (/\/meincongstar\/tarifwechsel\/bestaetigung/.test(window.location.href)) {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => window.dataLayer && window.dataLayer.some((item) => item['tw-newPlanId']),
            () => {
                if (
                    window.dataLayer.some(
                        (item) => item['tw-newPlanId']
                            && (item['tw-newPlanId'] === '407' || item['tw-newPlanId'] === '408')
                    )) {
                    Kameleoon.API.Goals.processConversion(238895);
                }
            }
        );

        setClientPurchase();
    }
};
