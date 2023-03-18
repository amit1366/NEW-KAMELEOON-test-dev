export const T03CscTarifwechsel = () => {
    const goals = {
        '[GG|CSC|T03] A2C Tarifwechsel': 242856,
        '[GG|CSC|T03] Tarifwechsel Order': 242857,
        '[T03|CSC] - TW auf Tarif S, M, L Order': 242858,
        '[T03|CSC] - TW auf Tarif S Order': 242859,
        '[T03|CSC] - TW auf Tarif M Order': 242860,
        '[T03|CSC] - TW auf Tarif L Order': 242861
    };

    if (/\/meincongstar\/tarifwechsel\/tarifkonfigurator\?contractid=.*&planid=(390|389|408|407|394|393)/.test(window.location.href)) {
        Kameleoon.API.Core.runWhenElementPresent(
            'button[data-test-action="addToCart"]',
            ([elements]) => {
                elements.addEventListener('click', () => {
                    Kameleoon.API.Goals.processConversion(goals['[GG|CSC|T03] A2C Tarifwechsel']);
                });
            }
        );
    }

    function setCSCData(customerProfileID) {
        if (customerProfileID !== '') {
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const url = `https://customers.kameleoon.com/congstarcsc_t03/${customerProfileID}`;

            fetch(url, requestOptions)
                .then((response) => response.json())
                .then(
                    (result) => {
                        window.kam_results = result;
                        if (typeof result.name !== 'undefined') {

                            if (
                                Kameleoon.API.CurrentVisit.customData['CSC T03'] !== 'undefined'
                                && Kameleoon.API.CurrentVisit.customData['CSC T03'] !== result.name
                            ) {
                                if (result.name.match('Original')) {
                                    Kameleoon.API.Experiments.assignVariation(141294, 0, true);
                                } else if (result.name.match('Ein_Tarif')) {
                                    Kameleoon.API.Experiments.assignVariation(141294, 662114, true);
                                } else if (result.name.match('Zwei_Tarife')) {
                                    Kameleoon.API.Experiments.assignVariation(141294, 661815, true);
                                }
                                dataLayer.push({
                                    kameleoon_audience: result.name,
                                    kameleoon_experiment: '[CSC|T03] Tarifreihenfolge TW-Seite'
                                });
                            }
                            Kameleoon.API.Data.setCustomData('CSC T03', result.name);
                        }
                        if (typeof result.tarif1 !== 'undefined') {
                            Kameleoon.API.Data.setCustomData('CSC T03 Tarif 1', result.tarif1);
                            if (typeof result.tarif2 !== 'undefined') {
                                Kameleoon.API.Data.setCustomData('CSC T03 Tarif 2', result.tarif2);
                            }
                            if (typeof result.purchased !== 'undefined') {
                                Kameleoon.API.Data.setCustomData(
                                    'CSC T03 Purchased', result.purchased
                                );
                            }

                        }
                    }
                ).catch((error) => console.log('error', error));
        }
    }

    Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.dataLayer !== 'undefined', () => {
        if (
            window.dataLayer.filter((item) => item.event === 'customerInsights.profile.ready').length
        ) {
            const customerProfileID = window.dataLayer.filter(
                (item) => item.event === 'customerInsights.profile.ready'
            )[0].ci_customerProfile.customerId;
            Kameleoon.API.Data.setCustomData('CSC T03 User', customerProfileID);
            setCSCData(customerProfileID);
        } else {
            window.dataLayer.push = (function newPush(oldPush) {
                return function patch(...args) {
                    if (args[0].event === 'customerInsights.profile.ready') {
                        Kameleoon.API.Data.setCustomData(
                            'CSC T03 User',
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
        Kameleoon.API.Data.setCustomData('CSC T03 Purchased', true);
        if (Kameleoon.API.CurrentVisit.customData['CSC T03 User'] !== undefined) {
            const requestOptions = { method: 'PATCH', redirect: 'follow' };
            const url = `https://customers.kameleoon.com/congstarcsc_t03/${Kameleoon.API.CurrentVisit.customData['CSC T03 User']}`;
            fetch(url, requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log('error', error));
        }
    }

    if (/\/meincongstar\/tarifwechsel\/bestaetigung/.test(window.location.href)) {

        if (window.dataLayer.some((item) => item['tw-newPlanId']
                && (item['tw-newPlanId'] === '390' || item['tw-newPlanId'] === '389'))) {
            Kameleoon.API.Goals.processConversion(goals['[T03|CSC] - TW auf Tarif S Order']);
            Kameleoon.API.Goals.processConversion(goals['[T03|CSC] - TW auf Tarif S, M, L Order']);
        } else if (window.dataLayer.some((item) => item['tw-newPlanId']
                && (item['tw-newPlanId'] === '408' || item['tw-newPlanId'] === '407'))) {
            Kameleoon.API.Goals.processConversion(goals['[T03|CSC] - TW auf Tarif M Order']);
            Kameleoon.API.Goals.processConversion(goals['[T03|CSC] - TW auf Tarif S, M, L Order']);
        } else if (window.dataLayer.some((item) => item['tw-newPlanId']
                && (item['tw-newPlanId'] === '394' || item['tw-newPlanId'] === '393'))) {
            Kameleoon.API.Goals.processConversion(goals['[T03|CSC] - TW auf Tarif L Order']);
            Kameleoon.API.Goals.processConversion(goals['[T03|CSC] - TW auf Tarif S, M, L Order']);
        }
        Kameleoon.API.Goals.processConversion(goals['[GG|CSC|T03] Tarifwechsel Order']);
        setClientPurchase();
    }
};
