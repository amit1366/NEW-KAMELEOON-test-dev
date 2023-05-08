import { goals } from './goals';

Kameleoon.API.Core.runWhenElementPresent('.newsletter-footer', () => {
    console.log(' inside main function - common code');
    Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {
        var submitFormBtn = target.closest('.site-footer .newsletter-footer .newsletter-footer__submit')
                var submitText = kameleoon.querySelectorAll('.site-footer .newsletter-footer #footer_newsletter_email')[0]
                if(submitFormBtn && submitText.value !== ''){
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            console.log('[GG] Newsletterformular erfolgreich abgeschickt (primary)');
                            // Kameleoon.API.Goals.processConversion(goals['[GG] Newsletterformular erfolgreich abgeschickt (primary)'])
                        }
                    };
                    xhttp.open("GET", "https://www.kueche-co.de/form/newsletter/footer/507/", true);
                    xhttp.send();
                }
    });

   
}, 200);
