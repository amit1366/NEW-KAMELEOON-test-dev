/* eslint-disable func-names */
import goalsT05 from './goals';

export default (function () {

    const maxProductInOrder = 2;
    const tarifMId = 392;
    const tarifSId = 390;
    const addToCartEventName = 'ee.addToCart';
    const orderEventName = 'checkout.purchase';
    const URLCartCheck = 'https://www.congstar.de/checkout/api/cart-state';
    const typeDevice = Kameleoon.API.CurrentVisit.device.type;

    const findTariff = (arr, tarifId) => arr.find((it) => it.id === tarifId);

    const findEvent = (eventName) => {
        const eventRegExp = new RegExp(`${eventName}`);
        return dataLayer.find((item) => item.event && item.event.match(eventRegExp));
    };

    const checkEmptyCart = (response) => {
        const cartStatus = response;
        if (cartStatus && !cartStatus.isCartFilled) {
            Kameleoon.API.Data.writeLocalData('KameleoonDev__TarifSAdded', false);
        }
    };

    if (Kameleoon.API.Data.readLocalData('KameleoonDev__TarifSAdded')) {
        fetch(URLCartCheck)
            .then((response) => response.json())
            .then((response) => checkEmptyCart(response));
    }

    if (window.location.href.match(/congstar.de\/handytarife\/(allnet-flat-s|allnet-flat-m)/)) {
        Kameleoon.API.Data.writeLocalData('KameleoonDev__ProductVisited', true);
    }

    if (!Kameleoon.API.Data.readLocalData('KameleoonDev__TarifSAdded')
        && !Kameleoon.API.Data.readLocalData('KameleoonDev__TarifSOrdered')
        && (+Kameleoon.API.Data.readLocalData('KameleoonDev__quantityOfVisits') < 2)) {

        if (typeDevice !== 'Desktop') {
            const setTimeout = function () {
                const myTimeout = Kameleoon.API.Utils.setTimeout(() => {
                    Kameleoon.API.Events.trigger('KameleoonDev__PhoneInactive');
                    document.removeEventListener('touchstart', clickHandler);
                }, 10000);

                const clickHandler = function () {
                    Kameleoon.API.Utils.clearTimeout(myTimeout);
                    setTimeout();
                    document.removeEventListener('touchstart', clickHandler);
                };

                document.addEventListener('touchstart', clickHandler);
            };
            setTimeout();
        }
    }

    if (/checkout/.test(window.location.href)) {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => window.dataLayer && findEvent(addToCartEventName),
            () => {
                const addToCartProducts = findEvent(addToCartEventName);
                const addProducts = addToCartProducts.ecommerce.add.products;
                const isTarifM = findTariff(addProducts, tarifMId);
                const isTarifS = findTariff(addProducts, tarifSId);

                if (isTarifM) {
                    Kameleoon.API.Goals.processConversion(goalsT05['[T05] AddToCart M']);
                }
                if (isTarifS) {
                    Kameleoon.API.Data.writeLocalData('KameleoonDev__TarifSAdded', true);
                }
            }
        );

        Kameleoon.API.Core.runWhenConditionTrue(
            () => window.dataLayer && findEvent(orderEventName),
            () => {
                const orderProducts = findEvent(orderEventName).transactionProducts;
                if (orderProducts.length < maxProductInOrder) {
                    const tarifMInOrder = findTariff(orderProducts, tarifMId);
                    const tarifSOrder = findTariff(orderProducts, tarifSId);

                    if (tarifMInOrder && tarifMInOrder.productMonthlyPrice) {
                        const revenue = +tarifMInOrder.productMonthlyPrice * 24;

                        Kameleoon.API.Goals.processConversion(
                            goalsT05['[T05] Order and Revenue M'],
                            revenue
                        );
                        Kameleoon.API.Goals.processConversion(
                            goalsT05['[T09] Order and Revenue M+L']
                        );
                        Kameleoon.API.Data.writeLocalData('KameleoonDev__TarifSOrdered', true);
                    }
                    if (tarifSOrder) {
                        Kameleoon.API.Data.writeLocalData('KameleoonDev__TarifSOrdered', true);
                    }
                }
            }
        );
    }
}());
