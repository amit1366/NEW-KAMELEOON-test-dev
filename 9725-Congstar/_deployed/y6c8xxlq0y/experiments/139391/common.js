const goals = {

    'T18 Click Weiter zur Tarifauswahl': 241757,
    'T18 Click Weiter zur Tarifauswahl + Weiter zur Miete': 241758

};

Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {

    // eslint-disable-next-line max-len
    if (target.closest('div.configurator-selection__actions.configurator-selection__actions--tablet-modification > button')) {
        Kameleoon.API.Goals
            .processConversion(goals['T18 Click Weiter zur Tarifauswahl']);
        Kameleoon.API.Goals
            .processConversion(goals['T18 Click Weiter zur Tarifauswahl + Weiter zur Miete']);

    } else if (target.closest('kam-btn') 
    ) {
        Kameleoon.API.Goals
            .processConversion(goals['T18 Click Weiter zur Tarifauswahl + Weiter zur Miete']);
    }
});
