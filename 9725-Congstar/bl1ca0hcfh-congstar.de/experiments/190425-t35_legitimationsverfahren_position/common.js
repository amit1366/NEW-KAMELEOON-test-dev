import { goals } from './goals';
import { selectors } from './selectors';

export const commongoals = () => {
    Kameleoon.API.Core.runWhenElementPresent('#main-content', () => {
    // console.log(' inside main function - common code');
    Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {
        let accordianTab = target.closest(selectors.accordionTab);
        if (accordianTab) {
            console.log('click goal');
        }
    });


}, 200);

}
