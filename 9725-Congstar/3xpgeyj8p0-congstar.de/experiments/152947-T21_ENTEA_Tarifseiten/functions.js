import { sessionStorageService } from './sessionStorageService';

export const fireGoal = (goalId) => {
    Kameleoon.API.Goals.processConversion(goalId);
};

export const waitForElementAndSetClickListener = (selector, listener, isDocument = false,) => {
    Kameleoon.API.Core.runWhenElementPresent(
        selector,
        (elements) => {
            if (isDocument) {
                document.addEventListener(
                    'click',
                    (event) => {
                        const { target } = event;
                        if (target.closest(selector)) {
                            listener(event);
                        }
                    }
                );
            } else {
                elements.forEach((element) => {
                    Kameleoon.API.Utils.addUniversalClickListener(element, listener);
                });
            }
        },
        200
    );
};

export const checkCheckboxAndFireGoal = (event, { checkGoal, uncheckGoal }, sessionStorageName) => {
    const newCheckbox = event.target.closest('.comp-checkbox');
    const oldCheckbox = event.target.closest('.checkbox-container > .checkbox');

    if (newCheckbox) {
        const isNewCheckboxChecked = newCheckbox.classList.contains('comp-checkbox--selected');
        if (isNewCheckboxChecked && checkGoal) {
            fireGoal(checkGoal);
            if (sessionStorageName) {
                sessionStorageService.setValue(sessionStorageName, 'true');
            }
        } else if (
            !isNewCheckboxChecked
            && uncheckGoal
        ) {
            fireGoal(uncheckGoal);
            if (sessionStorageName) {
                sessionStorageService.setValue(sessionStorageName, 'false');
            }
        }
    }
    if (oldCheckbox) {
        const isOldCheckboxChecked = oldCheckbox.classList.contains('ng-empty');
        if (
            isOldCheckboxChecked
            && checkGoal
        ) {
            fireGoal(checkGoal);
        } else if (
            !isOldCheckboxChecked
            && uncheckGoal
        ) {
            fireGoal(uncheckGoal);
        }
    }
};
