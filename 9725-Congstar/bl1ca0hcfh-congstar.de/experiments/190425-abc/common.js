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

            // let login = document.querySelector(selectors.loginbutton);
            // if (target.closest(login)) {
            //     console.log('click login btn user');
            // }

            let signupform = document.querySelector(selectors.bmloginButton);
            if (target.closest(signupform)) {
                console.log('signup form');
            } 

        });


    }, 200);

}
