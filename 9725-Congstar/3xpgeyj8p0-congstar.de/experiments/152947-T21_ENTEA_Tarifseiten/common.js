import { checkCheckboxAndFireGoal, fireGoal, waitForElementAndSetClickListener } from './functions';

import { goals } from './goals';
import { selectors } from './selectors';
import { sessionStorageService } from './sessionStorageService';

sessionStorageService.setValue(sessionStorageService.names.plan24, 'true');
sessionStorageService.setValue(sessionStorageService.names.lte50, 'true');

waitForElementAndSetClickListener(
    selectors.planSelectionTab,
    () => {
        fireGoal(goals['T21 Klick Tab contract duration (Primary)']);
    }
);

waitForElementAndSetClickListener(
    selectors.plan24SelectionTab,
    () => {
        sessionStorageService.setValue(sessionStorageService.names.plan24, 'true');
    }
);

waitForElementAndSetClickListener(
    selectors.planFlexSelectionTab,
    () => {
        sessionStorageService.setValue(sessionStorageService.names.plan24, 'false');
    }
);

let lte50Selector = selectors.lte50Option;
let extraDatenSelector = selectors.extraDatenOption;

if (location.pathname.includes('allnet-flat-m')) {
    lte50Selector = selectors.extraDatenOption;
    extraDatenSelector = selectors.lte50Option;
}

const lteCheckboxGoals = {
    checkGoal: goals['T21 LTE50 checked'],
    uncheckGoal: goals['T21 LTE50 unchecked']
};
waitForElementAndSetClickListener(
    lte50Selector,
    (event) => {
        checkCheckboxAndFireGoal(
            event,
            lteCheckboxGoals,
            sessionStorageService.names.lte50
        );
    },
    true
);

const extraDatenCheckboxGoals = {
    checkGoal: goals['T21 Extra Daten checked'],
    uncheckGoal: goals['T21 Extra Daten unchecked']
};
waitForElementAndSetClickListener(
    extraDatenSelector,
    (event) => {
        checkCheckboxAndFireGoal(
            event,
            extraDatenCheckboxGoals,
            sessionStorageService.names.extraDaten
        );
    },
    true
);

const disneyCheckboxGoals = {
    checkGoal: goals['T21 Disney Option checked'],
    uncheckGoal: goals['T21 Disney Option unchecked']
};
waitForElementAndSetClickListener(
    selectors.disneyOption,
    (event) => {
        checkCheckboxAndFireGoal(
            event,
            disneyCheckboxGoals,
            sessionStorageService.names.disney
        );
    },
    true
);

const musikCheckboxGoals = {
    checkGoal: goals['T21 Musik Option checked'],
    uncheckGoal: goals['T21 Musik Option unchecked']
};
waitForElementAndSetClickListener(
    selectors.musikOption,
    (event) => {
        checkCheckboxAndFireGoal(
            event,
            musikCheckboxGoals,
            sessionStorageService.names.musik
        );
    },
    true
);
