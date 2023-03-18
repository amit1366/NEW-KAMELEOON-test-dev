export function globalCSC(setCSCData) {
    Kameleoon.API.Core.runWhenConditionTrue(
        () => typeof window.dataLayer !== 'undefined',
        () => {
            if (
                window.dataLayer
                    .filter((item) => item.event === 'customerInsights.profile.ready').length
            ) {
                const customerProfileID = window.dataLayer.filter(
                    (item) => item.event === 'customerInsights.profile.ready'
                )[0].ci_customerProfile.customerId;
                Kameleoon.API.Data.setCustomData('[GG] CSC User', customerProfileID);
                setCSCData(customerProfileID);
            } else {
                window.dataLayer.push = (function newPush(oldPush) {
                    return function patch(...args) {
                        if (args[0].event === 'customerInsights.profile.ready') {
                            Kameleoon.API.Data.setCustomData(
                                '[GG] CSC User', args[0].ci_customerProfile.customerId
                            );
                            setCSCData(args[0].ci_customerProfile.customerId);
                        }
                        return oldPush.apply(this, args);
                    };
                }(window.dataLayer.push));
            }
        }
    );
}
