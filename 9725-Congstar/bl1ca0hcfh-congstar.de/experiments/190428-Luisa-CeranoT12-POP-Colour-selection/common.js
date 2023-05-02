import { goals } from './goals';

    Kameleoon.API.Core.runWhenElementPresent('.listing--container .has--variants .area--product-info', () => {
        // console.log(' inside main function - common code');
        Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {

            // click on the control color bubble
            if (target.closest('.listing--container .product--variants--info')) {
                 Kameleoon.API.Goals.processConversion(goals['[T12] Klick colour Bubbles']);
                console.log('[T12] Klick colour Bubbles');
            }

        });

    }, 200);
