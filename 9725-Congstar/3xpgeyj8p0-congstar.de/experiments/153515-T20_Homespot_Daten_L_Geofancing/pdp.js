import { handledAttr, selectors, modalTargetText, storageNames } from './consts';
import { getConfigurationDescriptionMarkup } from './markup';

const setCheckedLTEOption = () => {
    Kameleoon.API.Core.runWhenElementPresent(selectors.checkboxLTE, ([checkboxLTE]) => {
        checkboxLTE.setAttribute(handledAttr, 'true');
        if (!checkboxLTE.checked) checkboxLTE.checked = true;
    });
};

const changeConfigurationDescription = (descriptions) => {
    Kameleoon.API.Core.runWhenElementPresent(
        selectors.configurationDescriptionContainer, 
        ([configurationDescriptionContainer]) => {
            let descriptionsMarkup = '';
            descriptions.forEach((description) => {
                descriptionsMarkup += getConfigurationDescriptionMarkup(...description);
            });

            configurationDescriptionContainer.insertAdjacentHTML(
                'beforeend', descriptionsMarkup
            );
        }
    );
};

const changePrice = (euro, cent = '00') => {
    Kameleoon.API.Core.runWhenElementPresent(
        selectors.priceWrapper, 
        ([priceWrapper]) => {
            priceWrapper.setAttribute(handledAttr, 'true');
            const priceEuro = priceWrapper.querySelector(selectors.priceEuro);
            const priceCent = priceWrapper.querySelector(selectors.priceCent);

            if (priceEuro) priceEuro.innerText = euro;
            if (priceCent) priceCent.innerText = cent;
            changePrice(euro, cent);
        }
    );
};

const changeModal = (text) => {
    Kameleoon.API.Core.runWhenElementPresent(
        selectors.modalBody, 
        ([modalBody]) => {
            modalBody.setAttribute(handledAttr, 'true');
            if (modalBody.innerText === modalTargetText) {
                modalBody.innerText = text;
            }
            changeModal(text);
        }
    );
};

const addAddToCartListenner = (name) => {
    Kameleoon.API.Core.runWhenElementPresent(selectors.PDPaddToCart, ([PDPaddToCart]) => {
        PDPaddToCart.setAttribute(handledAttr, 'true');
        Kameleoon.API.Utils.addUniversalClickListener(PDPaddToCart, () => {
            sessionStorage.setItem(storageNames.PDPAddToCart, name);
            localStorage.setItem(storageNames.PDPAddToCart, name);
        });
    });
};

export const handlePDP = (tariff, name) => {
    setCheckedLTEOption();
    changeConfigurationDescription(tariff.descriptions);
    changePrice(...tariff.price);
    changeModal(tariff.modalText);
    addAddToCartListenner(name);
};
