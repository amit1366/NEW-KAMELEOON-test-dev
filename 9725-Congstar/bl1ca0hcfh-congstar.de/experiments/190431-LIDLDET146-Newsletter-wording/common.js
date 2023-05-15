import { goals } from './goals';

export const commongoals = () => {
    Kameleoon.API.Core.runWhenElementPresent('body', () => {
        // console.log(' inside main function - common code');
        Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {
            // let loginbutton = document.querySelector(selectors.headerLogindbtn)
            if (target.closest('.footer__flap')) {
                Kameleoon.API.Goals.processConversion(goals['[T146|DE] Click NL Flap']);
                console.log('[T146|DE] Click NL Flap');
            }

            if (target.closest('.kam-newsletter-banner_wrapper')) {
                Kameleoon.API.Goals.processConversion(goals['[T146|DE] Click NL Teaser']);
                console.log('[T146|DE] Click NL Teaser');
            }

        });

        if (window.location.href.indexOf('/success-page-lidl') > -1) {
            Kameleoon.API.Goals.processConversion(goals['[T146|DE] NL Subscription']);
            console.log('[T146|DE] NL Subscription');
        }
        if (window.location.href.indexOf('/confirmation-page-lidl') > -1) {
            Kameleoon.API.Goals.processConversion(goals['[T146|DE] NL Subscription (Double Opt-In)']);
            console.log('[T146|DE] NL Subscription (Double Opt-In)');
        }
        if (window.location.href.indexOf('/newsletter-anmeldeseite') > -1 || window.location.href.indexOf('/newsletter-anmeldung') > -1) {
            Kameleoon.API.Goals.processConversion(goals['[T146|DE] NL Landingpage']);
            console.log('[T146|DE] NL Landingpage');
        }

    }, 200);

}