/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable func-names */
// T02 - CSC
export function t02CSC() {

    const goals = {
        '[DEV|GG] Klick auf in den Warenkorb': 238272,
    };

    // Global Click on AddToCart for T02
    if (/\/meincongstar\/tarifwechsel\/tarifkonfigurator\?contractid=.*&planid=(407|408)/.test(window.location.href)) {
        if (/nicotuadev/.test(window.location.href)) {
            Kameleoon.API.Core.runWhenElementPresent('button[data-test-action="addToCart"]', ([elements]) => {
                elements.addEventListener('click', () => {
                    Kameleoon.API.Goals.processConversion(goals['[DEV|GG] Klick auf in den Warenkorb']);
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
                
            // 'https://customers.kameleoon.com/congstarcsc/e81544eee17e326f61f90f06a03740cbf5e5742a63c5bff5cf0666de1393ef0e';
            const url = `https://customers.kameleoon.com/congstarcsc/${customerProfileID}`;
    
            fetch(url, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    window.kam_results = result;
                    if (typeof result.content !== 'undefined') {
                        Kameleoon.API.Data.setCustomData('CSC T02', result.content);
                    }
                    if (typeof result.purchased !== 'undefined') {
                        // purchased - should be false (boolean)
                        Kameleoon.API.Data.setCustomData('CSC T02 Purchased', result.purchased);
                    }
                })
                .catch((error) => console.log('error', error));
        }
    }
        
    Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.dataLayer !== 'undefined', () => {
        // In case the dataLayer was faster than kameleoon
        if (window.dataLayer.filter((item) => item.event === 'customerInsights.profile.ready').length) {
            const customerProfileID = window.dataLayer.filter((item) => item.event === 'customerInsights.profile.ready')[0].ci_customerProfile.customerId;
            Kameleoon.API.Data.setCustomData('CSC T02 User', customerProfileID);
            setCSCData(customerProfileID);
        } else {
            // Monkey Patch the dataLayer Push to gain the exact event
            window.dataLayer.push = (function (oldPush) {
                return function (...args) {
                    // customerInsights.profile.ready
                    if (args[0].event === 'customerInsights.profile.ready') {
                        Kameleoon.API.Data.setCustomData('CSC T02 User', args[0].ci_customerProfile.customerId);
                        setCSCData(args[0].ci_customerProfile.customerId);
                    }
                    return oldPush.apply(this, args);
                };
            }(window.dataLayer.push));
        }
    });
    
    // If a client will purchase the CD should be set and the webservice accordingly
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
        if (window.dataLayer.some((item) => item['tw-newPlanId'] && (item['tw-newPlanId'] === '407' || item['tw-newPlanId'] === '408'))) {
            Kameleoon.API.Goals.processConversion(238894);
        }
        setClientPurchase();
    }
}
