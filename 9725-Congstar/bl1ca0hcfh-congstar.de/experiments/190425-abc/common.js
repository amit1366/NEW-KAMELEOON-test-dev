// import { goals } from './goals';
import { selectors } from './selectors';

export const commongoals = () => {
    Kameleoon.API.Core.runWhenElementPresent('header', () => {
        // console.log(' inside main function - common code');
        Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {
            console.log('click goal');
            // let loginbutton = document.querySelector(selectors.headerLogindbtn)
            if (target.closest(selectors.headerLogindbtn)) {
                console.log('click login btn');
            }

            if (target.closest(selectors.loginbutton)) {
                console.log('click login btn user');
            }

            if (target.closest(selectors.bmloginButton)) {
                console.log('signup form');
            }

        });


    }, 200);

}