const goals = {
    '[T02] AddToCart after Chat/FAQ': 199562,
    '[T02] Exit after Chat/FAQ' : 199565
};

if (document.referrer.match('https://www.congstar.de/login') && location.href.match('https://www.congstar.de/meincongstar')) {
    Kameleoon.API.Data.setCustomData('Login', true);
} 

if (document.referrer.match('https://www.congstar.de/meincongstar') && location.href.match('https://www.congstar.de/login')) {
    Kameleoon.API.Data.setCustomData('Login', false);
} 

//add2cart
if (location.href.match('https://www.congstar.de/checkout') && Kameleoon.API.Data.readLocalData('Add to cart')) {
    if (Kameleoon.API.Data.readLocalData('click chatbot')) {
        Kameleoon.API.Goals.processConversion(goals['[T02] AddToCart after Chat/FAQ']);
    }
}
Kameleoon.API.Data.writeLocalData('Add to cart', null);
Kameleoon.API.Core.runWhenConditionTrue(
    () => document.querySelector('[data-test-action*=goToShoppingCard]') || document.querySelector('[data-test-action*=addToCart]'),
    () => {
        const toCart = document.querySelector('[data-test-action*=addToCart]');
        const goToShoppingCard = document.querySelector('[data-test-action*=goToShoppingCard]');
        const addToCart = (button) => {
            button.addEventListener(Kameleoon.API.Utils.mouseDownEvent, () => {
                if (!Kameleoon.API.Utils.touchMoveEvent) {
                    Kameleoon.API.Data.writeLocalData('Add to cart', true);
                }
            });
        };
        toCart ? addToCart(toCart) : addToCart(goToShoppingCard);
    }
);
//end add2cart


if (Kameleoon.API.Data.readLocalData('click chatbot - goal') && Kameleoon.API.Data.readLocalData('click chatbot - goal') !== location.href) {
    Kameleoon.API.Data.writeLocalData('click chatbot - goal', null);
    Kameleoon.API.Goals.cancelConversion(goals['[T02] Exit after Chat/FAQ']);
}
