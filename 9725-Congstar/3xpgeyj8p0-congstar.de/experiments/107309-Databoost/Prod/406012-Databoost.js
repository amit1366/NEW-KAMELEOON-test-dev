import { createPopup, createOverlay } from './popup.js';
import { hideElement, showElement, showElementDeep, removeElemet, addOverlayToCtaButton } from './utils.js';
import { addListenerToStar } from './modal.js';
import removeCells from './removeCells.js';

const mainParentNodeSelector = `body > div.container-fluid.wrapper > div > div:nth-child(1) > div > div > div > plan-configurator > div.eft-shop-plan-configurator.theme--postpaid > plan-configurator-settings > div > div.eft-shop-plan-configurator__options.background-color--bright > div > plan-configurator-option-group:nth-child(3) > div > ng-transclude > plan-configurator-option:nth-child(2)`;

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
            && document.querySelector(mainParentNodeSelector)
        );
    },
    () => {
        document.body.classList.add(`kam-ckeckbox-hidden`);
        const extraDataCheckBoxKey = Object.keys(checkboxSelectors)
            .filter((key) => document.querySelector(checkboxSelectors[key]));
        const extraDataCheckBox = document.querySelector(checkboxSelectors[extraDataCheckBoxKey]);

        const extraDatenCheckBoxMainParent = extraDataCheckBox
            .parentNode
            .parentNode
            .parentNode
            .parentNode;

        if (extraDatenCheckBoxMainParent.tagName === `PLAN-CONFIGURATOR-OPTION`) {

            hideElement(extraDatenCheckBoxMainParent);

            const ctaButton = document.querySelector(`button[data-test-action=addToCart]`);
            addOverlayToCtaButton(ctaButton);

            const ctaButtonOverlay = document.querySelector(`.kam-CTAbutton-overlay`);

            const popupStorageValue = extraDatenCheckBoxMainParent.querySelector(`.configurator-option__title label`)
                ? extraDatenCheckBoxMainParent.querySelector(`.configurator-option__title label`).textContent.match(/\d/g)[0]
                : '';

            const priceDefaultText = extraDatenCheckBoxMainParent.querySelector(`.configurator-option__price div`)
                ? extraDatenCheckBoxMainParent.querySelector(`.configurator-option__price div`).textContent
                : '';

            const popupPrice = {
                value: priceDefaultText.match(/\d/g)[0],
                cents: priceDefaultText.match(/,\d\d/g)[0].replace(',', ''),
            };

            if (popupStorageValue && popupPrice.value && popupPrice.cents) {
                const newPopup = createPopup(popupStorageValue, popupPrice);
                const newPopupOverlay = createOverlay();
                document.body.insertAdjacentHTML(`beforeend`, newPopup);
                document.body.insertAdjacentHTML(`beforeend`, newPopupOverlay);

                const popup = document.querySelector(`.kam-popup`);
                const popupOverlay = document.querySelector(`.kam-popup__overlay`);
                const closePopupButton = document.querySelector(`.kam-popup__close-btn`);

                const defaultStarButton = extraDatenCheckBoxMainParent.querySelector(`a`);

                const clickDefaultStarButton = () => {
                    defaultStarButton.click();
                };

                const closePopup = () => {
                    removeElemet(popup);
                    removeElemet(popupOverlay);
                    showElementDeep(extraDatenCheckBoxMainParent);
                    removeElemet(ctaButtonOverlay);
                };

                const openPopup = () => {
                    showElement(popup);
                    showElement(popupOverlay);
                    addListenerToStar(clickDefaultStarButton);
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

            }

        }

    }, 200
);

