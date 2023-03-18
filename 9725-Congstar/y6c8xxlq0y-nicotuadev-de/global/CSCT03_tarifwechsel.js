/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable func-names */
export function t03CSC() {

    const goals = {
        '[DEV|GG|CSC|T03] A2C Tarifwechsel': 241817,
        '[DEV|GG|CSC|T03] Tarifwechsel Order': 241823,
        '[DEV|T03|CSC] - TW auf Tarif S, M, L Order': 242689,
        '[DEV|T03|CSC] - TW auf Tarif S Order': 242686,
        '[DEV|T03|CSC] - TW auf Tarif M Order': 242687,
        '[DEV|T03|CSC] - TW auf Tarif L Order': 242688
    };

    // Global Click on AddToCart for T03
    if (/\/meincongstar\/tarifwechsel\/tarifkonfigurator\?contractid=.*&planid=(390|389|408|407|394|393)/.test(window.location.href)) {
        if (/nicotuadev/.test(window.location.href)) {
            Kameleoon.API.Core.runWhenElementPresent('button[data-test-action="addToCart"]', ([elements]) => {
                elements.addEventListener('click', () => {
                    Kameleoon.API.Goals.processConversion(goals['[DEV|GG|CSC|T03] A2C Tarifwechsel']);
                });
            });
        }
    }

    // Set these custom datas for additional targeting
    function setCSCData(customerProfileID) {
        if (customerProfileID !== '') {
            // Get additional user data via congstar csc webservice
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const url = `https://customers.kameleoon.com/congstarcsc_t03/${customerProfileID}`;

            fetch(url, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    window.kam_results = result;
                    if (typeof result.name !== 'undefined') {

                        if (typeof Kameleoon.API.CurrentVisit.customData['[DEV] CSC T03'] !== 'undefined'
                            && Kameleoon.API.CurrentVisit.customData['[DEV] CSC T03'] !== result.name) {
                            console.log('ACHTUNG - bereits mit anderem Nutzer eingeloggt - setze neue Varianten');

                            if (result.name.match('Original')) {
                                console.log('assign this user to DEV T03 => Original');
                                Kameleoon.API.Experiments.assignVariation(138367, 0, true);
                            } else if (result.name.match('Ein_Tarif')) {
                                Kameleoon.API.Experiments.assignVariation(138367, 635431, true);
                                console.log('assign this user to DEV T03 => Ein_Tarif');
                            } else if (result.name.match('Zwei_Tarife')) {
                                console.log('assign this user to DEV T03 => Zwei_Tarife');
                                Kameleoon.API.Experiments.assignVariation(138367, 635432, true);
                            }
                            dataLayer.push({
                                kameleoon_audience: result.name,
                                kameleoon_experiment: '[DEV|CSC|T03] Tarifreihenfolge TW-Seite'
                            });
                        } else {
                            console.log('Nutzer Tarif/Variante identisch - OK ');
                        }
                        Kameleoon.API.Data.setCustomData('[DEV] CSC T03', result.name); // contains Tariff name
                    }

                    if (typeof result.tarif1 !== 'undefined') {
                        // purchased - should be false (boolean)
                        Kameleoon.API.Data.setCustomData('[DEV] CSC T03 Tarif 1', result.tarif1); // contains 1st tariff id  number
                    }
                    if (typeof result.tarif2 !== 'undefined') {
                        // purchased - should be false (boolean)
                        Kameleoon.API.Data.setCustomData('[DEV] CSC T03 Tarif 2', result.tarif2); // contains 2nd tariff id number
                    }
                    if (typeof result.purchased !== 'undefined') {
                        // purchased - should be false (boolean)
                        Kameleoon.API.Data.setCustomData('[DEV] CSC T03 Purchased', result.purchased); // contains false/true
                    }

                })
                .catch((error) => console.log('error', error));
        }
    }

    Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.dataLayer !== 'undefined', () => {
        // In case the dataLayer was faster than kameleoon
        if (window.dataLayer.filter((item) => item.event === 'customerInsights.profile.ready').length) {
            const customerProfileID = window.dataLayer.filter((item) => item.event === 'customerInsights.profile.ready')[0].ci_customerProfile.customerId;
            Kameleoon.API.Data.setCustomData('[DEV] CSC T03 User', customerProfileID); // contains ID
            setCSCData(customerProfileID);
        } else {
            // Monkey Patch the dataLayer Push to gain the exact event
            window.dataLayer.push = (function (oldPush) {
                return function (...args) {
                    // customerInsights.profile.ready
                    if (args[0].event === 'customerInsights.profile.ready') {
                        Kameleoon.API.Data.setCustomData('[DEV] CSC T03 User', args[0].ci_customerProfile.customerId);
                        setCSCData(args[0].ci_customerProfile.customerId);
                    }
                    return oldPush.apply(this, args);
                };
            }(window.dataLayer.push));
        }
    });
    /*
    // get sure to go into correct variant
    if (/\/meincongstar\/tarifwechsel\/tarifauswahl/.test(window.location.href)) {
        const tarifName = String(Kameleoon.API.CurrentVisit.customData['[DEV] CSC T03']);

        if (tarifName.match('Original')) {
            console.log('assign this user to T03 => Original');
            Kameleoon.API.Experiments.assignVariation(138367, 0);
        } else if (tarifName.match('Ein_Tarif')) {
            Kameleoon.API.Experiments.assignVariation(138367, 635431);
            console.log('assign this user to T03 => Ein_Tarif');
        } else if (tarifName.match('Zwei_Tarife')) {
            console.log('assign this user to T03 => Zwei_Tarife');
            Kameleoon.API.Experiments.assignVariation(138367, 635432);
        }

        dataLayer.push({
            kameleoon_audience: tarifName,
            kameleoon_experiment: '[DEV|CSC|T03] Tarifreihenfolge TW-Seite'
        });
        
    }
    */

    // If a client will purchase the CD should be set and the webservice accordingly
    function setClientPurchase() {
        Kameleoon.API.Data.setCustomData('[DEV] CSC T03 Purchased', true);
        /* currently on Testing!, but comment in when GO LIVE!
        if (Kameleoon.API.CurrentVisit.customData['[DEV] CSC T03 User'] !== undefined) {
            const requestOptions = { method: 'PATCH', redirect: 'follow' };
            const url = `https://customers.kameleoon.com/congstarcsc_t03/${Kameleoon.API.CurrentVisit.customData['[DEV] CSC T03 User']}`;
            fetch(url, requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log('error', error));
        }
        */
    }

    if (/\/meincongstar\/tarifwechsel\/bestaetigung/.test(window.location.href)) {

        if (window.dataLayer.some((item) => item['tw-newPlanId']
                && (item['tw-newPlanId'] === '390' || item['tw-newPlanId'] === '389'))) {
            Kameleoon.API.Goals.processConversion(goals['[DEV|T03|CSC] - TW auf Tarif S Order']);
            Kameleoon.API.Goals.processConversion(goals['[DEV|T03|CSC] - TW auf Tarif S, M, L Order']);
        } else if (window.dataLayer.some((item) => item['tw-newPlanId']
                && (item['tw-newPlanId'] === '408' || item['tw-newPlanId'] === '407'))) {
            Kameleoon.API.Goals.processConversion(goals['[DEV|T03|CSC] - TW auf Tarif M Order']);
            Kameleoon.API.Goals.processConversion(goals['[DEV|T03|CSC] - TW auf Tarif S, M, L Order']);
        } else if (window.dataLayer.some((item) => item['tw-newPlanId']
                && (item['tw-newPlanId'] === '394' || item['tw-newPlanId'] === '393'))) {
            Kameleoon.API.Goals.processConversion(goals['[DEV|T03|CSC] - TW auf Tarif L Order']);
            Kameleoon.API.Goals.processConversion(goals['[DEV|T03|CSC] - TW auf Tarif S, M, L Order']);
        }
        // allgemein
        Kameleoon.API.Goals.processConversion(goals['[DEV|GG|CSC|T03] Tarifwechsel Order']);
        setClientPurchase();

    }
}
