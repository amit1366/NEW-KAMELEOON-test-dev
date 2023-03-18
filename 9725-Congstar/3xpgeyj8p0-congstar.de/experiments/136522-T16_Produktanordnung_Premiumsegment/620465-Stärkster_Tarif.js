/* eslint-disable no-undef */
/* eslint-disable max-len */
const startPage = '/';
const tarifvergleichPostpaid = '/handytarife/smartphone-tarife-im-vergleich/';
const tarifvergleichPrepaid = '/prepaid/prepaid-tarife-vergleich/';
const starkstesSmartphone = '/handys/alle-handys/';

const tarifText = 'Unser stärkster Tarif';
const telephoneText = 'Unser stärkstes Smartphone';

const addingMessage = document.createElement('div');
addingMessage.classList.add('kam-showing-message');
addingMessage.innerText = tarifText;

if (document.location.pathname === startPage) {
    Kameleoon.API.Core.runWhenElementPresent('.device-teaser-slider .slick-track', () => {
        const sliders = document.querySelectorAll('.content > .row-template--1-col > div > :nth-child(5)')[0].querySelectorAll('.row');
        for (let i = 0; i < 3; i++) {
            const editableElement = sliders[i].children[0]
                .children[0].children[1].querySelector('.slick-slider')
                .querySelector('.slick-slide').children[0].children[0];
            if (i === 2) addingMessage.innerText = telephoneText;
            editableElement.style.position = 'relative';
            editableElement.insertAdjacentHTML('afterbegin', addingMessage.outerHTML);
        }
    }, 100);
} else if (document.location.pathname === tarifvergleichPostpaid) {
    Kameleoon.API.Core.runWhenElementPresent('#c7671687, #c7672927, #c6856444, #c6857144, #c6858304, #c6858764', (editableElements) => {
        document.querySelectorAll('#c7671927 .col-md-6').forEach((column) => {
            column.querySelectorAll('tr')[5].remove();
        });
        editableElements.forEach((editableElement) => {
            editableElement.style.position = 'relative';
            editableElement.insertAdjacentHTML('afterbegin', addingMessage.outerHTML);
        });
    });
} else if (document.location.pathname === tarifvergleichPrepaid) {
    Kameleoon.API.Core.runWhenElementPresent('#c6858304, #c6858764', (editableElements) => {
        editableElements.forEach((editableElement) => {
            editableElement.style.position = 'relative';
            editableElement.insertAdjacentHTML('afterbegin', addingMessage.outerHTML);
        });
    });
} else if (document.location.pathname === starkstesSmartphone) {
    Kameleoon.API.Core.runWhenElementPresent('device-teaser[data-teaser-id=12967]', ([editableElement]) => {
        addingMessage.innerText = telephoneText;
        editableElement.insertAdjacentHTML('afterbegin', addingMessage.outerHTML);
        editableElement.setAttribute('data-sort-order-price-desc', '0.9');
    });
    Kameleoon.API.Core.runWhenElementPresent('#sorting:not(.kam-selected)', ([sorting]) => {
        sorting.classList.add('kam-selected');
        $('#sorting').val('priceDesc').change();
    }, 100);
    Kameleoon.API.Core.runWhenElementPresent('device-teaser[data-teaser-id="12967"] .theme--experience', ([editableElement]) => {
        const addingAction = document.createElement('div');
        addingAction.classList.add('kam-showing-action');
        addingAction.innerText = 'Aktion';
        editableElement.children[0].append(addingAction);
        editableElement.outerHTML = editableElement.outerHTML.replaceAll('experience', 'phones');
    }, 100);
}
