import { createPopup, createOverlay } from './popup.js';
import { hideElement, showElement, removeElemet, addOverlayToCtaButton } from './utils.js';
import removeCells from './removeCells.js';

removeCells();

const href = location.href;

Kameleoon.API.Utils.setInterval(function () {
    if (location.href !== href) {
        Kameleoon.API.Core.load();
    }
}, 400);

const checkboxSelectors = {
    extraDataCheckBox1: `#available-option-2568`,
    extraDataCheckBox2: `#available-option-2569`,
};

const selectors = {
    ctaButton: `button[data-test-action=addToCart]`,
};

Kameleoon.API.Core.runWhenConditionTrue(
    () => {
        return (
            Object.keys(selectors)
                .every((key) => document.querySelector(selectors[key]))
            && Object.keys(checkboxSelectors)
                .some((key) => document.querySelector(checkboxSelectors[key]))
        );
    },
    () => {
        const extraDataCheckBoxKey = Object.keys(checkboxSelectors)
            .filter((key) => document.querySelector(checkboxSelectors[key]));
        const extraDataCheckBox = document.querySelector(checkboxSelectors[extraDataCheckBoxKey]);

        // Bad selectors on the web-site
        const extraDatenCheckBoxMainParent = extraDataCheckBox
            .parentNode
            .parentNode
            .parentNode
            .parentNode;

        hideElement(extraDatenCheckBoxMainParent);

        const ctaButton = document.querySelector(`button[data-test-action=addToCart]`);
        addOverlayToCtaButton(ctaButton);

        const ctaButtonOverlay = document.querySelector(`.kam-CTAbutton-overlay`);

        const popupStorageValue = extraDatenCheckBoxMainParent.querySelector(`.configurator-option__title label`)
            .textContent.match(/\d/g)[0];
        const popupPriceValue = extraDatenCheckBoxMainParent.querySelector(`.configurator-option__price div`)
            .textContent.match(/\d/g)[0];

        const newPopup = createPopup(popupStorageValue, popupPriceValue);
        const newPopupOverlay = createOverlay();
        document.body.insertAdjacentHTML(`beforeend`, newPopup);
        document.body.insertAdjacentHTML(`beforeend`, newPopupOverlay);

        const popup = document.querySelector(`.kam-popup`);
        const popupOverlay = document.querySelector(`.kam-popup__overlay`);
        const closePopupButton = document.querySelector(`.kam-popup__close-btn`);

        const closePopup = () => {
            removeElemet(popup);
            removeElemet(popupOverlay);
            showElement(extraDatenCheckBoxMainParent);
            removeElemet(ctaButtonOverlay);
        };

        const openPopup = () => {
            showElement(popup);
            showElement(popupOverlay);
        };

        Kameleoon.API.Utils.addEventListener(ctaButtonOverlay, `mousedown`, openPopup);

        Kameleoon.API.Utils.addEventListener(popupOverlay, `mousedown`, closePopup);

        Kameleoon.API.Utils.addEventListener(closePopupButton, `mousedown`, closePopup);

        const pupupCtaButton = document.querySelector(`.kam-purchase-offer__add2Cart-btn`);

        Kameleoon.API.Utils.addEventListener(pupupCtaButton, `mousedown`, () => {
            extraDataCheckBox.click();
            ctaButton.click();
        });

        const pupupBuyWithoutBonusButton = document.querySelector(
            `.kam-purchase-offer__cancel-offer-btn`,
        );

        Kameleoon.API.Utils.addEventListener(pupupBuyWithoutBonusButton, `mousedown`, () =>
            ctaButton.click(),
        );
    }, 200
);

