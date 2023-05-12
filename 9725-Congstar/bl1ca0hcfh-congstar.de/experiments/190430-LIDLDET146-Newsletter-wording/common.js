// import { goals } from './goals';
import { selectors } from './selectors';

export const commongoals = () => {
    Kameleoon.API.Core.runWhenElementPresent('header', () => {
        // console.log(' inside main function - common code');
        Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {
            // let loginbutton = document.querySelector(selectors.headerLogindbtn)
            if (target.closest(selectors.headerLogindbtn)) {
                Kameleoon.API.Goals.processConversion(goals['[T17] Icon click_BM']);
                console.log('[T17] Icon click_BM');
            }

            if (target.closest(selectors.loginbutton) || target.closest(selectors.controlLoginBtn)) {
                Kameleoon.API.Goals.processConversion(goals['[T17] Step 1 Login_BM']);
                console.log('[T17] Step 1 Login_BM');
            }

            if (target.closest(selectors.controlRegistartionBtn)) {
                Kameleoon.API.Goals.processConversion(goals['[T17] Step 1 Registration_BM']);
                console.log('[T17] Step 1 Registration_BM');
            }

        });

    }, 200);

}