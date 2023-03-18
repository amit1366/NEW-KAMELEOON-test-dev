import { goals } from './goals';

Kameleoon.API.Core.runWhenElementPresent('.loading-overlay-wrapper .bucket__wrap #legitimationDHLIdentCheck', () => {
    // console.log(' inside main function - common code');
    Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {
        const WeiterCta = target.closest('[pagetitle="Legitimation"] .bucket .bucket__content .btn-primary--next');
        if (WeiterCta) {
            console.log('[T35] Click Weiter');
            Kameleoon.API.Goals.processConversion(goals['[T35] Click Weiter']);

            // if dhl is selected
            const DHLIdentCheck = Kameleoon.API.Utils.querySelectorAll('.loading-overlay-wrapper .bucket__wrap #legitimationDHLIdentCheck')[0];
            if (DHLIdentCheck.checked) {
                console.log('[T35] Select DHL');
                Kameleoon.API.Goals.processConversion(goals['[T35] Select DHL']);
            }

            // if idnow is selected
            const idnow = Kameleoon.API.Utils.querySelectorAll('.loading-overlay-wrapper .bucket__wrap #idNow')[0];
            if (idnow.checked) {
                console.log('[T35] Select IDnow');
                Kameleoon.API.Goals.processConversion(goals['[T35] Select IDnow']);
            }

            // if KlarnaIdent is selected
            const KlarnaIdent = Kameleoon.API.Utils.querySelectorAll('.loading-overlay-wrapper .bucket__wrap #preOrderKlarnaIdent')[0];
            if (KlarnaIdent.checked) {
                console.log('[T35] Select KlarnaIdent');
                Kameleoon.API.Goals.processConversion(goals['[T35] Select KlarnaIdent']);
            }

        }
    });

    // click on dhl mehr cta
    Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {
        const DHLmehrCta = target.closest('#legitimation-provider-selection-form .bucket__content [data-test-lib-dhl-ident-check-more-details]');
        if (DHLmehrCta) {
            // console.log('[T35] Click Mehr Details DHL');
            Kameleoon.API.Goals.processConversion(goals['[T35] Click Mehr Details DHL']);
        }
        // click on idnow mehr cta
        const iDnowCta = target.closest('#legitimation-provider-selection-form .bucket__content [data-test-lib-idnow-more-details]');
        if (iDnowCta) {
            // console.log('[T35] Click Mehr Details IDnow');
            Kameleoon.API.Goals.processConversion(goals['[T35] Click Mehr Details IDnow']);
        }
         // click on KlarnaIdent mehr cta
        const KlarnaIdentCta = target.closest('#legitimation-provider-selection-form .bucket__content [data-test-lib-pre-order-klarna-more-details]');
        if (KlarnaIdentCta) {
            // console.log('[T35] Click Mehr Details KlarnaIdent');
            Kameleoon.API.Goals.processConversion(goals['[T35] Click Mehr Details KlarnaIdent']);
        }
    });

  
    if (/\/checkout\/legitimation/.test(window.location.href)) {
        Kameleoon.API.Goals.processConversion(goals['[T35] Exit Legitimation']);
    } else {
        Kameleoon.API.Goals.cancelConversion(goals['[T35] Exit Legitimation']);
    }

}, 200);

// goals for step 4
Kameleoon.API.Core.runWhenElementPresent("[pagetitle='Deine Bestellübersicht'] .customer-data .row [data-test-identification-method]", () => {
    function goalsFor4thStep() {
        // if user is on 4th step and DHL is selected
        const identifyDHL = Kameleoon.API.Utils.querySelectorAll('[pagetitle="Deine Bestellübersicht"] .customer-data .row [data-test-identification-method]')[0];
        if (identifyDHL && identifyDHL.textContent.indexOf('DHL') > -1) {
            // console.log('[T35] Succesful DHL');
            Kameleoon.API.Goals.processConversion(goals['[T35] Succesful DHL']);
        }

        // if user is on 4th step and idnow is selected
        const identifyIdnow = Kameleoon.API.Utils.querySelectorAll('[pagetitle="Deine Bestellübersicht"] .customer-data .row [data-test-identification-method]')[0];
        if (identifyIdnow && identifyIdnow.textContent.indexOf('IDnow') > -1) {
            // console.log('[T35] Succesful IDnow');
            Kameleoon.API.Goals.processConversion(goals['[T35] Succesful IDnow']);
        }

        // if user is on 4th step and KLARNA is selected
        const identifyKlarna = Kameleoon.API.Utils.querySelectorAll('[pagetitle="Deine Bestellübersicht"] .customer-data .row [data-test-identification-method]')[0];
        if (identifyKlarna && identifyKlarna.textContent.indexOf('KLARNA') > -1) {
            // console.log('[T35] Succesful KlarnaIdent');
            Kameleoon.API.Goals.processConversion(goals['[T35] Succesful KlarnaIdent']);
        }
    }
    goalsFor4thStep();

    if (/\/checkout\/uebersicht/.test(window.location.href)) {
        Kameleoon.API.Goals.processConversion(goals['[T35] Exit Übersicht']);
    } else {
        Kameleoon.API.Goals.cancelConversion(goals['[T35] Exit Übersicht']);
    }

}, 200);
