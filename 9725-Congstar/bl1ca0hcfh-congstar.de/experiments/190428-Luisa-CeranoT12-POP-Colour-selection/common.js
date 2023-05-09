// import { goals } from './goals';

export function triggergial() {
    Kameleoon.API.Core.runWhenElementPresent('button.btn-buy, .buybox__actions button', () => {
        // console.log(' inside main function - common code');
        Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {
                console.log('click');
                if (target.closest('.bm-atc')) {
                    console.log('sticky btn clicked');
                }
            });

    }, 200);
}
