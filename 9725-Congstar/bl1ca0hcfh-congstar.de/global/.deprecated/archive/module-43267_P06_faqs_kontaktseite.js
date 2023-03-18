/* eslint-disable */ 
export const P06FaqsKontaktseite = () => {
    const goals = {
        '[P06] Interaction with contact form': 231208,
        '[GG] Contact form sent': 231207,
        '[P06] View Hilfe&Service': 231211,
        '[P06] Interaction FAQs': 231209,
        '[P06] Exit on FAQs': 231210
    };

    const regExpURL = /https:\/\/www\.congstar\.de\/hilfe-service\/kontakt\/kontaktformular/;
    if (!regExpURL.test(document.location.href) 
        && sessionStorage.getItem('kamDev__interactionWithContactForm')) {
        sessionStorage.removeItem('kamDev__interactionWithContactForm');
    }
    const addGoal = (event) => {
        if (event.data.client || event.data.product || event.data.reason) {
            if (regExpURL.test(document.location.href) 
                && !sessionStorage.getItem('kamDev__interactionWithContactForm')) {
                Kameleoon.API.Goals.processConversion(goals['[P06] Interaction with contact form']);
                sessionStorage.setItem('kamDev__interactionWithContactForm', true);
            } 
        }
        
        if (event.data.form_submit === true) {
            if (!sessionStorage.getItem('kameleoon__contactFormSent')) {
                sessionStorage.setItem('kameleoon__contactFormSent', true);
            }
            Kameleoon.API.Goals.processConversion(goals['[GG] Contact form sent']);
        }
    }

    window.addEventListener('message', addGoal);


    if (window.location.href === 'https://www.congstar.de/hilfe-service/'
        || window.location.href === 'https://www.congstar.de/hilfe-service') {
        Kameleoon.API.Goals.processConversion(goals['[P06] View Hilfe&Service']);
    }


    Kameleoon.API.Core.runWhenElementPresent('[container-id="6991787"]', ([containerId]) => {
        Kameleoon.API.Utils.addUniversalClickListener(containerId, (event) => {
            if (event.target.closest('a')) {
                Kameleoon.API.Goals.processConversion(goals['[P06] Interaction FAQs']);
    
                if (!sessionStorage.getItem('exitOnFAQs')) {
                    sessionStorage.setItem('exitOnFAQs', true);
                }
            }
        });
    });

    Kameleoon.API.Utils.addEventListener(window, 'beforeunload', () => {
        if (sessionStorage.getItem('exitOnFAQs')
            && !sessionStorage.getItem('kameleoon__contactFormSent')) {
            Kameleoon.API.Goals.processConversion(goals['[P06] Exit on FAQs']);
            sessionStorage.removeItem('exitOnFAQs');
        }    
    });
    
    Kameleoon.API.Core.runWhenElementPresent('#cxco-wrapperVa .cxco-inputWrapper', 
        ([faqQuestion]) => {
            Kameleoon.API.Utils.addUniversalClickListener(
                faqQuestion.querySelector('button'), () => {
                    const faqInput = faqQuestion.querySelector('input');
                    if (faqInput && faqInput.value !== '') {
                        Kameleoon.API.Goals.processConversion(goals['[P06] Interaction FAQs']);
                        if (!sessionStorage.getItem('exitOnFAQs')) {
                            sessionStorage.setItem('exitOnFAQs', true);
                        }
                    }
                }
            );
        });
    
    Kameleoon.API.Core.runWhenElementPresent('#cxco-wrapperVa .cxco-inputWrapper input', 
        ([cxcoInputWrapperInput]) => {
            Kameleoon.API.Utils.addEventListener(cxcoInputWrapperInput, 'keydown', (event) => {
                if (event.target.value !== '' && event.which === 13) {
                    Kameleoon.API.Goals.processConversion(goals['[P06] Interaction FAQs']);
                    if (!sessionStorage.getItem('exitOnFAQs')) {
                        sessionStorage.setItem('exitOnFAQs', true);
                    }
                }
            });
        });
}
