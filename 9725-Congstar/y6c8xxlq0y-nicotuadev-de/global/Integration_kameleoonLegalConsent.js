export function integrationKameleoonLegalConsent() {

    const getConsentCookie = () => {
        const value = document.cookie.match(`tracking-preferences=([^;]+)`);
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
    Kameleoon.API.Core.runWhenConditionTrue(
        () => window.kameleoonNoConsent !== undefined,
        () => {
            Kameleoon.API.Core.enableLegalConsent();
        }
    );
}
