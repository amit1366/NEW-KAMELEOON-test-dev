export const globalIntegrationKameleoonLegalConsent = () => {

    const getConsentCookie = () => {
        const value = document.cookie.match(`cpolicy=([^;]+)`);
        return value ? decodeURIComponent(value[1]).includes('"marketing":true') : undefined;
    };

    Kameleoon.API.Core.runWhenConditionTrue(
        () => getConsentCookie() !== undefined,
        () => {
            if (getConsentCookie()) {
                Kameleoon.API.Core.enableLegalConsent();
            } else {
                Kameleoon.API.Core.disableLegalConsent();
            }
        }
    );
}; 
