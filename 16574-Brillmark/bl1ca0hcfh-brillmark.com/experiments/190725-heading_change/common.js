import { fireGoal, goals } from './goals';
import { selectors } from './selectors';

Kameleoon.API.Core.runWhenElementPresent(selectors.kamOffCanvas, () => {
    document.addEventListener('click', ({ target }) => {
        if (target.closest(selectors.recoProduct)) {
            fireGoal(goals['Klick Reco (Primary)']);
        }

        if (
            target.closest(`${selectors.kamOffCanvas} ${selectors.kamOffCanvasHeaderClose}`)
            || target.closest(selectors.kamOffCanvasOverlay)
        ) {
            fireGoal(goals.Close);
        }

        if (target.closest(selectors.kamOffCanvasShopButton)) {
            fireGoal(goals['Klick Weitershoppen']);
        }

        if (target.closest(`${selectors.kamOffCanvas} ${selectors.kamOffCanvasCartButton}`)) {
            fireGoal(goals['Klick zum Warenkorb']);
        }
    });
});