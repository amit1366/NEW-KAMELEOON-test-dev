export const T10BSP = () => {
    const url = 'www.congstar.de/handytarife/fair-flat/';
    const filterGoals = ['215327', '215328', '215329', '215330', '215331', '226503'];
    const selectors = {
        button: '.configurator-selection__actions .btn-icon.btn-icon--large.btn-icon--block.btn-icon--dark-transparent.btn-icon--multiline.icon--add-to-basket',
    };
    
    const goals = {
        '[GG] A2C FairFlat': 226503,
        '[GG] FairFlat': 226528,
    };
    
    if (location.href.includes(url)) {
        Kameleoon.API.Core.runWhenElementPresent(
            selectors.button,
            ([button]) => {
                Kameleoon.API.Utils.addUniversalClickListener(
                    button,
                    () => Kameleoon.API.Goals.processConversion(goals['[GG] A2C FairFlat'])
                );
            }
        );
    }
    
    if (!Kameleoon.API.Data.readLocalData('Kam_Dev_Goal_Last_active')) {
        const defaultOptions = {};
        filterGoals.forEach((goalId) => {
            defaultOptions[goalId] = 0;
        });
        Kameleoon.API.Data.writeLocalData('Kam_Dev_Goal_Last_active', defaultOptions, true);
    }
        
    Kameleoon.API.Core.runWhenConditionTrue(
        () => {
            const infoParse = Kameleoon.API.Data.readLocalData('Kam_Dev_Goal_Last_active');
            if (!infoParse) return;
            const { conversions } = Kameleoon.API.CurrentVisit;
            return filterGoals.some(
                (id) => conversions[id] && conversions[id].count !== infoParse[id]
            );
        },
        () => {
            const { conversions } = Kameleoon.API.CurrentVisit;
            const options = {};
            filterGoals.forEach((goalId) => {
                if (conversions[goalId]) {
                    options[goalId] = conversions[goalId].count;
                }
            });
            Kameleoon.API.Data.writeLocalData('Kam_Dev_Goal_Last_active', options, true);
            Kameleoon.API.Goals.processConversion(goals['[GG] FairFlat']);
        },
    );
};
