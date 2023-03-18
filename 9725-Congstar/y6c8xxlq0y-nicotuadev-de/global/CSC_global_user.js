/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable func-names */
export function globalCSC(setCSCData) {

    Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.dataLayer !== 'undefined', () => {
        // In case the dataLayer was faster than kameleoon
        if (window.dataLayer.filter((item) => item.event === 'customerInsights.profile.ready').length) {
            const customerProfileID = window.dataLayer.filter((item) => item.event === 'customerInsights.profile.ready')[0].ci_customerProfile.customerId;
            Kameleoon.API.Data.setCustomData('[DEV][GG] CSC User', customerProfileID);
            // eslint-disable-next-line no-undef
            setCSCData(customerProfileID);
            console.log('customerProfileID set');
        } else {
            // Monkey Patch the dataLayer Push to gain the exact event
            window.dataLayer.push = (function (oldPush) {
                return function (...args) {
                    // customerInsights.profile.ready
                    if (args[0].event === 'customerInsights.profile.ready') {
                        Kameleoon.API.Data.setCustomData('[DEV][GG] CSC User', args[0].ci_customerProfile.customerId);
                        // eslint-disable-next-line no-undef
                        setCSCData(args[0].ci_customerProfile.customerId);
                        console.log('customerProfileID set via monkey patch');
                    }
                    return oldPush.apply(this, args);
                };
            }(window.dataLayer.push));
        }
    });

}
