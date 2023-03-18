/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable func-names */

/* for prod:
[GG|CSC|T04] A2C Tarifwechsel
Kameleoon.API.Goals.processConversion(271587)
*/

import { globalCSC } from './CSC_global_user';

export function t04CSC() {

    const goals = {
        '[DEV][GG|CSC|T04] A2C Tarifwechsel': 271589
    };

    // Global Click on AddToCart for T04
    if (/\/meincongstar\/tarifwechsel\/tarifkonfigurator(\?back=unset&contractid=|\?contractid=)/.test(window.location.href)) {
        if (/nicotuadev/.test(window.location.href)) {
            Kameleoon.API.Core.runWhenElementPresent('button[data-test-action="addToCart"]', ([elements]) => {
                elements.addEventListener('click', () => {
                    Kameleoon.API.Goals.processConversion(goals['[DEV][GG|CSC|T04] A2C Tarifwechsel']);
                });
            });
        }
    }

    // Set these custom datas for additional targeting
    // call "setCSCData" function in CSC_global_user.js, if required for CSC experiment

    // eslint-disable-next-line no-unused-vars
    function setCSCData(customerProfileID) {
        if (customerProfileID !== '') {
            // Get additional user data via congstar csc webservice
            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };

            const url = `https://customers.kameleoon.com/congstarcsc_t04/${customerProfileID}`;

            fetch(url, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    window.kam_results = result;
                    if (typeof result.name !== 'undefined') {

                        if (typeof Kameleoon.API.CurrentVisit.customData['[DEV] CSC T04'] !== 'undefined'
                            && Kameleoon.API.CurrentVisit.customData['[DEV] CSC T04'] !== result.name) {
                            // careful - user already logged in, set new variants (expID: 149062)

                            if (result.name.match('_KG')) {
                                Kameleoon.API.Experiments.assignVariation(149062, 715817, true);
                                console.log('assign this user to => TW-Freiheit|Reference');
                            } else if (result.name.match('_TG')) {
                                console.log('assign this user to => TW-Freiheit|Variation');
                                Kameleoon.API.Experiments.assignVariation(149062, 635432, true);
                            }
                            dataLayer.push({
                                kameleoon_audience: result.name,
                                kameleoon_experiment: '[DEV|T04|CSC] Tarifwechselfreiheit'
                            });
                        } else {
                            console.log('Nutzer Tarif/Variante identisch - OK ');
                        }
                        Kameleoon.API.Data.setCustomData('[DEV] CSC T04', result.name); // contains Tariff name
                    }

                    if (typeof result.purchased !== 'undefined') {
                        // purchased - should be false (boolean)
                        Kameleoon.API.Data.setCustomData('[DEV] CSC T04 Purchased', result.purchased); // contains false/true
                    }

                })
                .catch((error) => console.log('error', error));
        }
    }

    globalCSC(setCSCData);

    // If a client will purchase the CD should be set and the webservice accordingly
    function setClientPurchase() {
        Kameleoon.API.Data.setCustomData('[DEV] CSC T04 Purchased', true);
        /* currently on Testing!, but comment in when GO LIVE!
        if (Kameleoon.API.CurrentVisit.customData['[DEV] CSC T04 User'] !== undefined) {
            const requestOptions = { method: 'PATCH', redirect: 'follow' };
            const url = `https://customers.kameleoon.com/congstarcsc_t04/${Kameleoon.API.CurrentVisit.customData['[DEV] CSC T04 User']}`;
            fetch(url, requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log('error', error));
        }
        */
    }

    if (/\/meincongstar\/tarifwechsel\/bestaetigung/.test(window.location.href)) {
        setClientPurchase();
    }
}
