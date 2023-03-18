import {
    bulletPoint,
    newPrices,
    starTextLFlex,
    starTextLNormal,
    starTextMFlex,
    starTextMNormal,
} from './texts';

Kameleoon.API.Data.writeLocalData('kamP09IsMonthly', false);
const pageIsM = document.location.pathname.includes('/allnet-flat-m');
const datas = [
    {
        selector: '.styles__Prices-sc-15gmzq7-4.foyCHQ div:nth-child(2) span.eNfhZL',
        text: '0,00&nbsp;€ statt 15,00&nbsp;€',
    },
    {
        selector: '.styles__Prices-sc-15gmzq7-4.jkBXEC div:nth-child(2) span.eNfhZL',
        text: '10,00&nbsp;€ statt 35,00&nbsp;€',
    },
];
const htmls = [
    {
        selector: '.bRunba',
        html: bulletPoint,
    },
    {
        selector: 'div[data-testid="activationPrice"]',
        html: newPrices,
    },
];

function setStarText() {
    Kameleoon.API.Core.runWhenElementPresent(
        '#aria-description .sc-grREDI.fLwEK div:not([kam-p09-handled])',
        ([starElement]) => {
            const isMonthly = Kameleoon.API.Data.readLocalData('kamP09IsMonthly');
            if (pageIsM) {
                starElement.innerHTML = !isMonthly ? starTextMNormal : starTextMFlex;
            } else {
                starElement.innerHTML = !isMonthly ? starTextLNormal : starTextLFlex;
            }

            starElement.setAttribute('kam-p09-handled', true);
            setStarText();
        }
    );
}

function setTarifText() {
    Kameleoon.API.Core.runWhenElementPresent(
        '#aria-description div.sc-hKdnnL.dXodTF:not([kam-p09-handled])',
        ([tarifElement]) => {
            const childs = tarifElement.querySelectorAll('.sc-dIouRR.iiqzYB').length > 0 ? tarifElement.querySelectorAll('.sc-dIouRR.iiqzYB') : tarifElement.querySelectorAll('.sc-dIouRR.iXaxck');

            childs[7].innerText = '0 €';
            childs[9].innerText = '10 €';

            tarifElement.setAttribute('kam-p09-handled', true);
            setTarifText();
        }
    );
}

function setNewPrice(selector, text) {
    Kameleoon.API.Core.runWhenElementPresent(selector, ([element]) => {
        element.innerHTML = text;
        element.classList.add('kam-text-end');
    });
}

function insertHTML(selector, html) {
    Kameleoon.API.Core.runWhenElementPresent(selector, ([element]) => {
        element.insertAdjacentHTML('beforebegin', html);
    });
}

function toggleElements(remove) {
    const flexes = document.querySelectorAll('.kam-flex');
    const normals = document.querySelectorAll('.kam-normal');

    if (remove) {
        normals.forEach((normal) => {
            normal.classList.remove('kam-hidden');
        });
        flexes.forEach((flex) => {
            flex.classList.add('kam-hidden');
        });
    } else {
        flexes.forEach((flex) => {
            flex.classList.remove('kam-hidden');
        });
        normals.forEach((normal) => {
            normal.classList.add('kam-hidden');
        });
    }

}

Kameleoon.API.Utils.addEventListener(document, 'click', ({ target }) => {
    const button = document.querySelector('a[data-testid="cart-button"]');
    button.pathname = `/portal${button.pathname}`;

    if (target.closest('[id="426"]') || target.closest('[id="428"]')) {
        Kameleoon.API.Data.writeLocalData('kamP09IsMonthly', false);
        button.search += `&cc=rb-13dhnr`;
        toggleElements(true);
    } else if (target.closest('[id="425"]') || target.closest('[id="427"]')) {
        Kameleoon.API.Data.writeLocalData('kamP09IsMonthly', true);
        button.search += `&cc=rb-13wbrt`;
        toggleElements(false);
    }
});

Kameleoon.API.Core.runWhenElementPresent('a[data-testid="cart-button"]', ([button]) => {
    button.pathname = `/portal${button.pathname}`;
    button.search += `&cc=rb-13dhnr`;
});

datas.forEach((data) => {
    setNewPrice(data.selector, data.text);
});

htmls.forEach((data) => {
    insertHTML(data.selector, data.html);
});

setStarText();
setTarifText();

function addClickEvent(iconSelector, popupSelector) {
    Kameleoon.API.Core.runWhenElementPresent(iconSelector, ([element]) => {
        const icon = document.querySelector(popupSelector);

        Kameleoon.API.Utils.addEventListener(element, 'click', () => {
            icon.click();
        });
    });
}

addClickEvent('#kam-icon-left', '[data-testid="total-price"] button');
addClickEvent('#kam-icon-right', '[data-testid="total-price"] button');
