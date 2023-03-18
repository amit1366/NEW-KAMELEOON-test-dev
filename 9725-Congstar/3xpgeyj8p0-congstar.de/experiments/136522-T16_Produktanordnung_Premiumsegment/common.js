/* eslint-disable max-len */
const goals = {
    '[T16] Klick ANF L / Startseite': 239104,
    '[T16] Klick Prepaid ANF L / Startseite': 239105,
    '[T16] Klick on  Apple iPhone 12 / Startseite': 239106,
    '[T16] Klick on  Apple iPhone 12 Pro / Startseite': 240857,
    '[T16] Klick on ANF L, Prepaid L, Apple iPhone 12 / Startseite': 239107,
    '[T16] Klick on ANF L, Prepaid L, Apple iPhone 12 Pro / Startseite': 240858,
    '[T16] Klick ANF Prepaid L / Tarifseite': 239108,
    '[T16] Klick ANF Postpaid L / Tarifseite': 239133,
    '[T16] Klick Apple iPhone 12 PÜS': 239109,
    '[T16] Klick Apple iPhone 12 Pro PÜS': 240860,
};

const startPage = '/';
const tarifvergleichPostpaid = '/handytarife/smartphone-tarife-im-vergleich/';
const tarifvergleichPrepaid = '/prepaid/prepaid-tarife-vergleich/';
const starkstesSmartphone = '/handys/alle-handys/';

if (document.location.pathname === startPage) {
    let clickEvent;
    let slickPos;
    Kameleoon.API.Core.runWhenElementPresent('.device-teaser-slider .slick-track', () => {
        const sliders = document.querySelectorAll('.content > .row-template--1-col')[0]
            .children[0].children[4].querySelectorAll('.row');
        sliders.forEach((sliderElement) => {
            setTimeout(() => {
                const editableElement = sliderElement.children[0]
                    .children[0].children[1].querySelector('.slick-slider')
                    .querySelector('.slick-slide').children[0].children[0];

                editableElement.querySelectorAll('a:not(.footnote__link)').forEach((link) => {
                    link.addEventListener('click', (event) => { event.preventDefault(); });
                    link.addEventListener('mousedown', (event) => {
                        clickEvent = event;
                        slickPos = link.closest('.slick-track').style.transform;
                    });
                    link.addEventListener('mouseup', (event) => {
                        let wasClick = false;
                        if (clickEvent !== undefined && clickEvent.target === event.target
                            && slickPos === link.closest('.slick-track').style.transform) wasClick = true;
                        clickEvent = undefined;
                        if (wasClick) {
                            const name = link.closest('.slick-track').querySelector('h4').innerText;
                            console.log(name);
                            if (name === 'Allnet Flat L') {
                                Kameleoon.API.Goals.processConversion(goals['[T16] Klick ANF L / Startseite']);
                                Kameleoon.API.Goals.processConversion(goals['[T16] Klick on ANF L, Prepaid L, Apple iPhone 12 Pro / Startseite']);
                                if (event.which === 1) window.location.href = link.href;
                            }
                            if (name === 'Prepaid Allnet L') {
                                Kameleoon.API.Goals.processConversion(goals['[T16] Klick Prepaid ANF L / Startseite']);
                                Kameleoon.API.Goals.processConversion(goals['[T16] Klick on ANF L, Prepaid L, Apple iPhone 12 Pro / Startseite']);
                                if (event.which === 1) window.location.href = link.href;
                            }
                            if (name === 'Apple iPhone 12 Pro') {
                                Kameleoon.API.Goals.processConversion(goals['[T16] Klick on  Apple iPhone 12 Pro / Startseite']);
                                Kameleoon.API.Goals.processConversion(goals['[T16] Klick on ANF L, Prepaid L, Apple iPhone 12 Pro / Startseite']);
                                if (event.which === 1) window.location.href = link.href;
                            }
                        }
                    });
                });
            }, 100);
        });
    }, 100);
} else if (document.location.pathname === tarifvergleichPostpaid) {
    let clickEvent;
    Kameleoon.API.Core.runWhenElementPresent('#c7671687, #c7672927, #c6856444, #c6857144', (editableElements) => {
        editableElements.forEach((editableElement) => {
            const link = editableElement.querySelector('a:not(.footnote__link)');
            link.addEventListener('click', (event) => { event.preventDefault(); });
            link.addEventListener('mousedown', (event) => { clickEvent = event; });
            link.addEventListener('mouseup', (event) => {
                let wasClick = false;
                if (clickEvent !== undefined && clickEvent.target === event.target) wasClick = true;
                clickEvent = undefined;
                if (wasClick) {
                    Kameleoon.API.Goals.processConversion(goals['[T16] Klick ANF Postpaid L / Tarifseite']);
                    if (event.which === 1) window.location.href = link.href;
                }
            });
        });
    });
} else if (document.location.pathname === tarifvergleichPrepaid) {
    let clickEvent;
    Kameleoon.API.Core.runWhenElementPresent('#c6858304, #c6858764', (editableElements) => {
        editableElements.forEach((editableElement) => {
            const link = editableElement.querySelector('a:not(.footnote__link)');
            link.addEventListener('click', (event) => { event.preventDefault(); });
            link.addEventListener('mousedown', (event) => { clickEvent = event; });
            link.addEventListener('mouseup', (event) => {
                let wasClick = false;
                if (clickEvent !== undefined && clickEvent.target === event.target) wasClick = true;
                clickEvent = undefined;
                if (wasClick) {
                    Kameleoon.API.Goals.processConversion(goals['[T16] Klick ANF Prepaid L / Tarifseite']);
                    if (event.which === 1) window.location.href = link.href;
                }
            });
        });
    });
} else if (document.location.pathname === starkstesSmartphone) {
    let clickEvent;
    Kameleoon.API.Core.runWhenElementPresent('device-teaser[data-teaser-id=12967]', ([editableElement]) => {
        editableElement.querySelectorAll('a:not(.footnote__link)').forEach((link) => {
            link.addEventListener('click', (event) => { event.preventDefault(); });
            link.addEventListener('mousedown', (event) => { clickEvent = event; });
            link.addEventListener('mouseup', (event) => {
                let wasClick = false;
                if (clickEvent !== undefined && clickEvent.target === event.target) wasClick = true;
                clickEvent = undefined;
                if (wasClick) {
                    Kameleoon.API.Goals.processConversion(goals['[T16] Klick Apple iPhone 12 Pro PÜS']);
                    if (event.which === 1) window.location.href = link.href;
                }
            });
        });
    });
}
