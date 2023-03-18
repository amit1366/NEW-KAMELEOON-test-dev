/* eslint-disable max-len */
const oldPageSelectors = {
    planSelectionTab: 'plan-configurator-settings .eft-shop-plan-configurator__contract-duration .configurator-tab',
    plan24SelectionTab: 'plan-configurator-settings .eft-shop-plan-configurator__contract-duration .configurator-tab:first-child',
    planFlexSelectionTab: 'plan-configurator-settings .eft-shop-plan-configurator__contract-duration .configurator-tab:not(:first-child)',
    lte50Option: 'plan-configurator-option-group:nth-child(3) plan-configurator-option:first-child .checkbox',
    extraDatenOption: 'plan-configurator-option-group:nth-child(3) plan-configurator-option:last-child .checkbox',
    disneyOption: 'plan-configurator-option-group:nth-child(4) plan-configurator-option:last-child .checkbox',
    musikOption: 'plan-configurator-option-group:nth-child(5) plan-configurator-option:last-child .checkbox',
};

const newPageSelectors = {
    planSelectionTab: '.comp-plan-details__contract-duration-selection > .comp-boxed-radio-button',
    plan24SelectionTab: '.comp-plan-details__contract-duration-selection > .comp-boxed-radio-button:first-child',
    planFlexSelectionTab: '.comp-plan-details__contract-duration-selection > .comp-boxed-radio-button:not(:first-child)',
    lte50Option: '.comp-plan-details__options div:first-child .comp-option-category .comp-option-category__option:nth-child(2) .comp-checkbox__input',
    extraDatenOption: '.comp-plan-details__options div:first-child .comp-option-category .comp-option-category__option:nth-child(3) .comp-checkbox__input',
    disneyOption: '.comp-plan-details__options div:last-child .comp-option-category .comp-option-category__option:nth-child(2) .comp-checkbox__input',
    musikOption: '.comp-plan-details__options div:last-child .comp-option-category .comp-option-category__option:nth-child(3) .comp-checkbox__input',
};

export const selectors = {
    planSelectionTab: `${oldPageSelectors.planSelectionTab}, ${newPageSelectors.planSelectionTab}`,
    plan24SelectionTab: `${oldPageSelectors.planSelectionTab}, ${newPageSelectors.planSelectionTab}`,
    planFlexSelectionTab: `${oldPageSelectors.planFlexSelectionTab}, ${newPageSelectors.planFlexSelectionTab}`,
    lte50Option: `${oldPageSelectors.lte50Option}, ${newPageSelectors.lte50Option}`,
    extraDatenOption: `${oldPageSelectors.extraDatenOption}, ${newPageSelectors.extraDatenOption}`,
    disneyOption: `${oldPageSelectors.disneyOption}, ${newPageSelectors.disneyOption}`,
    musikOption: `${oldPageSelectors.musikOption}, ${newPageSelectors.musikOption}`,
};
