const goals = {
    '[T19] ACCEPT_ALL': 285188,
    '[T19] DENY_ALL': 285192,
    '[T19] SAVE': 285190,
    '[T19] MORE_INFORMATION_LINK': 285191,
};

window.addEventListener('UC_UI_CMP_EVENT', (data) => {
    /* debugging / QA */
    console.log('TEST: source =>', data.detail.source);
    console.log('TEST: type =>', data.detail.type);
    console.log('TEST: Variant =>', data.detail.abTestVariant);
    console.log('TEST: Variant in storage =>', data.currentTarget.UC_AB_VARIANT);
    // These are our custom events for each basic action
    // in our Consent Management Platform
    if (data.detail.type === 'ACCEPT_ALL') Kameleoon.API.Goals.processConversion(goals['[T19] ACCEPT_ALL']);
    if (data.detail.type === 'DENY_ALL') Kameleoon.API.Goals.processConversion(goals['[T19] DENY_ALL']);
    if (data.detail.type === 'SAVE') Kameleoon.API.Goals.processConversion(goals['[T19] SAVE']);
    if (data.detail.type === 'MORE_INFORMATION_LINK') Kameleoon.API.Goals.processConversion(goals['[T19] MORE_INFORMATION_LINK']);
});
