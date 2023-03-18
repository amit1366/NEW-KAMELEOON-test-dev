import { selectors } from './consts';
import { getPriceIntFromText } from './funcs';

const getDisclaimer = (price) => `Ab dem 25. Monat: ${price},00&nbsp;€ monatlich`;
const changeDisclaymer = (disclaymerSelector, prevPayment, newPayment) => {
    const disclaymer = document.querySelector(disclaymerSelector);
    
    const isDisclaymerExistingAndEqual = () => disclaymer 
        && disclaymer.innerHTML === getDisclaimer(prevPayment);

    if (isDisclaymerExistingAndEqual()) {
        disclaymer.innerHTML = getDisclaimer(newPayment);
    }
};

const handleLayout = ({ name, description, payment }) => {
    Kameleoon.API.Core.runWhenElementPresent(selectors.planWrapper, ([planWrapper]) => {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => planWrapper.querySelector(selectors.planOption), 
            () => {
                const planName = planWrapper.querySelector(selectors.planName);
                if (planName) planName.innerText = name;
                const planOption = planWrapper.querySelector(selectors.planOption);
                if (planOption) planOption.innerText = description;
        
                const basicMountlyPayment = planWrapper.querySelector(selectors.basicMountlyPayment);
                let prevPayment = 0;
                if (basicMountlyPayment) {
                    prevPayment = getPriceIntFromText(basicMountlyPayment.innerText) + 5;
                    basicMountlyPayment.innerHTML = `${payment},00&nbsp;€`;
                }
                
                const deviceMountlyPaymentElem = document.querySelector(selectors.deviceMountlyPayment);
                const deviceMountlyPayment = deviceMountlyPaymentElem 
                    ? getPriceIntFromText(deviceMountlyPaymentElem.innerText) : 0;
                const newEuroPayment = payment + deviceMountlyPayment;
        
                const subtotalMountlyPayment = document.querySelector(selectors.subtotalMountlyPayment);
                if (subtotalMountlyPayment) subtotalMountlyPayment.innerText = newEuroPayment;
        
                const totalMountlyPayment = document.querySelector(selectors.totalMountlyPayment);
                if (totalMountlyPayment) totalMountlyPayment.innerText = newEuroPayment;
        
                changeDisclaymer(selectors.subtotalMountlyPaymentDisclaimer, prevPayment, payment);
                changeDisclaymer(selectors.totalMountlyPaymentDisclaimer, prevPayment, payment);
            }, 1000
        );
    });
};

export const handleCartAndCheckout = (tariff) => {
    handleLayout(tariff);

    Kameleoon.API.Core.runWhenElementPresent(
        selectors.itemsContainer, 
        ([itemsContainer]) => {
            const observer = new MutationObserver(() => {
                handleLayout(tariff);
            });
            
            observer.observe(itemsContainer, {
                childList: true,
                subtree: false,
                characterDataOldValue: false
            });
        }
    );
};
