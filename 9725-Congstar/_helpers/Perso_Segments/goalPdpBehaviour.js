import { localData, pdpBehaviour } from './utils';
import goals from './goals';

export default () => {
    const isPhoneUrl = pdpBehaviour.findUrl();
    if (!isPhoneUrl) return;
    Kameleoon.API.Core.runWhenConditionTrue(pdpBehaviour.conditionFindTotalPrice, () => {
        Kameleoon.API.Core.runWhenElementPresent('.configurator-selection__actions button', ([btn]) => {
            const price = pdpBehaviour.getPrice();
            const name = pdpBehaviour.getName();
            const usedPhone900 = localData.usedUrl('Perso Segments Goals', 'pdpPhoneGoalValidate900', name);
            const usedPhone500 = localData.usedUrl('Perso Segments Goals', 'pdpPhoneGoalValidate500', name);
            if (price >= 900 && !usedPhone900) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Smartphone pages >=900€']);
                localData.updateVisitedUrl('Perso Segments Goals', 'pdpPhoneGoalValidate900', name);
            }
            if (price < 500 && !usedPhone500) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Smartphone pages <500€']);
                localData.updateVisitedUrl('Perso Segments Goals', 'pdpPhoneGoalValidate500', name);
            }
            Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
                if (price <= 900 && !usedPhone900) {
                    Kameleoon.API.Goals.processConversion(goals['[GG] Smartphone pages >=900€']);
                    localData.updateVisitedUrl('Perso Segments Goals', 'pdpPhoneGoalValidate900', name);
                }
            });
        });
    });
};
