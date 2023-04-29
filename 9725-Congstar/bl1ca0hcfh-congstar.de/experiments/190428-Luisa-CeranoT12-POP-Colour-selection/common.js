// import { goals } from './goals';

export const commongoals = () => {
    Kameleoon.API.Core.runWhenElementPresent('.listing--container .has--variants .area--product-info', () => {
        // console.log(' inside main function - common code');
        Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {

            if (target.closest('.bm-moreColor')) {
                 // Kameleoon.API.Goals.processConversion(goals['[T12] Klick weitere Farben']);
                console.log('[T12] Klick weitere Farben');
            }

            if (target.closest('.listing--container .product--variants--info')) {
                 // Kameleoon.API.Goals.processConversion(goals['[T12] Klick colour Bubbles']);
                console.log('[T12] Klick colour Bubbles');
            }

            if (target.closest('.listing--container .product--title')) {
                 // Kameleoon.API.Goals.processConversion(goals['[T12] Klick product name']);
                console.log('[T12] Klick product name');
            }

            if (target.closest('.listing--container .product--image')) {
                 // Kameleoon.API.Goals.processConversion(goals['[T12] Klick product image']);
                console.log('[T12] Klick product image');
            }

        });

    }, 200);

}