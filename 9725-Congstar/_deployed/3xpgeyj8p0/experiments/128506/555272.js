const goals = {
    '[P06] Interaction with contact form': 231208,
    '[P06] Interaction FAQs': 231209,
    '[P06] Exit on FAQs': 231210
};
/* eslint-disable */ 
const formData = [
    {
        client: true,
        product: 'Mobilfunk',
        reason: "Lieferstatus SIM-Karte",
        id: 'YUlVME1xWHFsOGgyUnNCTjhUejJUUT09' 
    },
    {
        client: true,
        product: 'Mobilfunk',
        reason: "Lieferstatus Handy",
        id: 'Slk5UW9UQlRvaDFVUmR5MVZqVGlOZz09' 
    },
    {
        client: true,
        product: 'Mobilfunk',
        reason: "Rufnummernmitnahme",
        id: 'Um5HMmRTZVlOenRjSGRkSUE1bC85dz09' 
    },
    {
        client: true,
        product: 'Mobilfunk',
        reason: "Vertrag anpassen",
        id: 'MzBxQlRESkhXUXAvbFlJOUE2Mjd2dz09' 
    },
    {
        client: true,
        product: 'Mobilfunk',
        reason: "Kundendaten ändern",
        id: 'TC93T1d4ejl2aWU3SW42ZmRGckRYdz09' 
    },
    {
        client: true,
        product: 'Mobilfunk',
        reason: "Kundendaten",
        id: 'SkE3N1BYa2Z4K1BBVm15Y0lVbTQvUT09' 
    },
    {
        client: true,
        product: 'Mobilfunk',
        reason: "Rechnungsfrage",
        id: 'dVF2NDFrNTI2WnpwWkZjTEVCeG1CQT09' 
    },
    {
        client: true,
        product: 'Mobilfunk',
        reason: "Störung",
        id: 'b3lLVlQ5TTVrK0JuaTF2N2oxWVJiQT09' 
    },
    {
        client: true,
        product: 'Mobilfunk',
        reason: "Widerruf/Stornierung",
        id: 'VDMzYW14YUNibERGM2RYUHBtTkkxQT09' 
    },
    {
        client: true,
        product: 'Mobilfunk',
        reason: "Umzug",
        id: 'K1FLMjFjMERPa0FBaEZ3dTVoWlZzdz09' 
    },
    {
        client: true,
        product: 'Mobilfunk',
        reason: "Frage / Rückfrage zur Kündigung",
        id: 'WjZLSS9QekpwZzNDamF4eHJuRW9YZz09' 
    },
    {
        client: true,
        product: 'Mobilfunk',
        reason: "Lieferstatus",
        id: 'TUYyOFZyQ2ZJWmw0V1R5QUNsdzRmQT09' 
    },
    {
        client: true,
        product: 'DSL / VDSL',
        reason: "Lieferstatus",
        id: 'cWtoRGpFVmZtZXNTSlRxcEJnMnhaZz09' 
    },
    {
        client: true,
        product: 'DSL / VDSL',
        reason: "Rufnummernmitnahme",
        id: 'dDBwVGhXaHBTNG1PMExkMEtzTy95QT09' 
    },
    {
        client: true,
        product: 'DSL / VDSL',
        reason: "Vertrag anpassen",
        id: 'aXl6MnIwUW5oZ0NpZndVNjJXdVdLZz09' 
    },
    {
        client: true,
        product: 'DSL / VDSL',
        reason: "Kundendaten ändern",
        id: 'OWZpK1F1MVEwS0ZleTVUejFmL0NIdz09' 
    },
    {
        client: true,
        product: 'DSL / VDSL',
        reason: "Rechnungsfrage",
        id: 'MFRFTEhxM0pIb3Q1Q2Jkb0hhZXUxdz09' 
    },
    {
        client: true,
        product: 'DSL / VDSL',
        reason: "Störung",
        id: 'RDMraXEvYTIrcDhrQkcyNS9ucUlVQT09' 
    },
    {
        client: true,
        product: 'DSL / VDSL',
        reason: "Widerruf/Stornierung",
        id: 'OXErd2UyNHpieUxFQm85QURsa3ZLZz09' 
    },
    {
        client: true,
        product: 'DSL / VDSL',
        reason: "Umzug",
        id: 'M3Bqd3RSTXAzYnRBUnZabnZ5ZWdtQT09' 
    },
    {
        client: true,
        product: 'DSL / VDSL',
        reason: "Frage / Rückfrage zur Kündigung",
        id: 'c3JNS1h3RlZJNHR0MjR3aXVpd1FDUT09' 
    },
    {
        client: true,
        product: 'congstar X / Homespot',
        reason: "Rufnummernmitnahme",
        id: 'b2RuRTdERitTWEo4dllUbFcwSUREZz09' 
    },
    {
        client: true,
        product: 'congstar X / Homespot',
        reason: "Vertrag anpassen",
        id: 'NUIyTkZDcTkvckVlQ3NhNk5kU2ZmQT09' 
    },
    {
        client: true,
        product: 'congstar X / Homespot',
        reason: "Lieferstatus",
        id: 'K0lYRTkxc0xzOEQvUUZCL25rck8yQT09' 
    },
    {
        client: true,
        product: 'congstar X / Homespot',
        reason: "Kundendaten ändern",
        id: 'V3FyVStacnZGaUpWemtPV2EyVDBvQT09' 
    },
    {
        client: true,
        product: 'congstar X / Homespot',
        reason: "Rechnungsfrage",
        id: 'L1lsamhnQ0dFdDhiSzRNQUIydlY1QT09' 
    },
    {
        client: true,
        product: 'congstar X / Homespot',
        reason: "Umzug",
        id: 'S0lPcW5EWXJTNGV2TUpZWGk0NWpidz09' 
    },
    {
        client: true,
        product: 'congstar X / Homespot',
        reason: "Widerruf/Stornierung",
        id: 'bGh1MEJ6cjNlSC9ueGFIZUExd3J6Zz09' 
    },
    {
        client: true,
        product: 'congstar X / Homespot',
        reason: "Frage / Rückfrage zur Kündigung",
        id: 'TkVVTTBKZ3JVOGJPUlQ2VENhSnp6Zz09' 
    },
    {
        client: true,
        product: 'congstar X / Homespot',
        reason: "Störung",
        id: 'aEFBWk10Y2pVb3UySWR4c1IvR1ZxQT09' 
    },
    {
        client: true,
        product: 'Freunde werben Freunde',
        reason: "Kontaktgrund auswählen",
        id: 'VWZvSXhoNVZLMDI2LzhubHI5NStTUT09' 
    },
    // noch kein congstar Kunde
    {
        client: false,
        product: 'Mobilfunk',
        reason: "Kontaktgrund auswählen",
        id: 'YW4zN2ZvRzRlRTlYT3BjcFJIVEpDQT09' 
    },
    {
        client: false,
        product: 'DSL / VDSL',
        reason: "Kontaktgrund auswählen",
        id: 'NlJKSERIMnRsVkpaZE1CUEVXSlBXdz09' 
    },
    {
        client: false,
        product: 'congstar X / Homespot',
        reason: "Kontaktgrund auswählen",
        id: 'eDUyQ09XM0Q1TjNNdmxWUUNUUDVoZz09' 
    },
    {
        client: false,
        product: 'Freunde werben Freunde',
        reason: "Kontaktgrund auswählen",
        id: 'ckpIVWxFZzNZVzk2MW5jeGM4YXdDUT09' 
    }

];
/* eslint-enable */ 
const regExp = /https:\/\/www\.congstar.de/;

function performRequestSelectId(id) {
    const url = encodeURI(`https://web-api.congstar.de/cms/content/elements/${id}`);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('x-api-key', 'Kameleoon');
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            const containerId = document
                .querySelector('content-loader-container[container-id="6991787"]');
            if (containerId) {
                containerId.innerHTML = xhr.response;
                Kameleoon.API.Goals.processConversion(goals['[P06] Interaction with contact form']);
            
            }

        }
    });
    xhr.send();
}

Kameleoon.API.Core.runWhenElementPresent('[container-id="7462247"]', ([containerId]) => {
    const helpBlock = `
        <div class="kam-help-block">
            <h2>Du benötigst Hilfe?</h2>
            <p>
                Wähle im Kontaktformular Product und Kontaktgrund aus.
                Wir stellen dir passende Tipps zu deiner Auswahl bereit,
                damit du dein Anliegen einfach selbst erledigen kannst.
            </p>
        </div>
    `;
    containerId.insertAdjacentHTML(
        'afterbegin',
        helpBlock
    );
});

Kameleoon.API.Core.runWhenElementPresent('[container-id="6991787"]', ([containerId]) => {
    Kameleoon.API.Utils.addUniversalClickListener(containerId, (event) => {
        if (event.target.closest('a')) {
            Kameleoon.API.Goals.processConversion(goals['[P06] Interaction FAQs']);

            if (!sessionStorage.getItem('exitOnFAQs')) {
                sessionStorage.setItem('exitOnFAQs', true);
            }
        }
    });

    window.addEventListener('message', (event) => {
        if (!regExp.test(event.origin)) {
            // eslint-disable-next-line
            const resData = formData.filter((item) => {
                if (item.client === event.data.client 
                    && item.product === event.data.product  
                    && (item.reason === event.data.reason 
                        || item.reason === 'Kontaktgrund auswählen')) {
                    return item;
                } 
            });
            if (resData.length > 0) {
                performRequestSelectId(resData[0].id);
            } else {
                containerId.innerHTML = '';
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

Kameleoon.API.Core.runWhenElementPresent('#cxco-wrapperVa .cxco-inputWrapper', ([faqQuestion]) => {
    
    Kameleoon.API.Utils.addUniversalClickListener(faqQuestion.querySelector('button'), () => {
        const faqInput = faqQuestion.querySelector('input');
        if (faqInput && faqInput.value !== '') {
            Kameleoon.API.Goals.processConversion(goals['[P06] Interaction FAQs']);
            if (!sessionStorage.getItem('exitOnFAQs')) {
                sessionStorage.setItem('exitOnFAQs', true);
            }
        }
        
    });
});

// eslint-disable-next-line
Kameleoon.API.Core.runWhenElementPresent('#cxco-wrapperVa .cxco-inputWrapper input', ([cxcoInputWrapperInput]) => {
    Kameleoon.API.Utils.addEventListener(cxcoInputWrapperInput, 'keydown', (event) => {
        if (event.target.value !== '' && event.which === 13) {
            Kameleoon.API.Goals.processConversion(goals['[P06] Interaction FAQs']);
            if (!sessionStorage.getItem('exitOnFAQs')) {
                sessionStorage.setItem('exitOnFAQs', true);
            }
        }
    });
});
