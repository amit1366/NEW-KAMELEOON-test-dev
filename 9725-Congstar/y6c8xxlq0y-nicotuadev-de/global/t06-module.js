/* eslint-disable max-len */
export function t06module() {
    // T06
    const goals = {
        '[GG] VVL  in CSC': 211883,
        '[T06] Delete databoost from the cart': 211873
    };

    if (document.referrer.match('https://www.nicotuadev.de/login') && location.href.match('https://www.nicotuadev.de/meincongstar')) {
        Kameleoon.API.Data.setCustomData('Login', true);
    }

    if (document.referrer.match('https://www.nicotuadev.de/meincongstar') && location.href.match('https://www.nicotuadev.de/login')) {
        Kameleoon.API.Data.setCustomData('Login', false);
    }

    if (location.href.match('https://www.nicotuadev.de/meincongstar/vertragsverlaengerung/bestaetigung')) {
        Kameleoon.API.Goals.processConversion(goals['[GG] VVL  in CSC']);
    }

    if (location.href.match('/checkout/warenkorb')) {
        Kameleoon.API.Core.runWhenConditionTrue(() => {
            const checkedProducts = Kameleoon.API.Utils.querySelectorAll('p[data-test-option-id]');
            return checkedProducts.some((product) => product.textContent.match('Extra-Daten'));
        }, () => {
            // console.log('Ready to delete');
            const checkedProducts = Kameleoon.API.Utils.querySelectorAll('p[data-test-option-id]');
            const extraDataProduct = checkedProducts.filter((product) => product.textContent.match('Extra-Daten'))[0];
            const extraDataCard = extraDataProduct.parentNode.parentNode;
            const removeButton = extraDataCard.querySelector('.cart-item__link');
            Kameleoon.API.Utils.addEventListener(removeButton, 'mousedown', () => {
                // console.log('Deleted', goals['[T06] Delete databoost from the cart']);
                Kameleoon.API.Goals.processConversion(goals['[T06] Delete databoost from the cart']);
            });
        });
    }
}
