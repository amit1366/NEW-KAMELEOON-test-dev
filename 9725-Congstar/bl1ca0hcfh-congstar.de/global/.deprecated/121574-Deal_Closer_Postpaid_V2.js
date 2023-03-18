export default (function () {

    const goals = {
        '[T09] AddToCart L': 226431,
        '[T09] Order and Revenue L': 226432,
        '[T09] Order and Revenue M+L': 226433,
    };

    const tarifLId = 394;
    const maxProductInOrder = 2;
    const addToCartEventName = 'ee.addToCart';
    const orderEventName = 'checkout.purchase';
    const URLCartCheck = 'https://www.congstar.de/checkout/api/cart-state';
    const typeDevice = Kameleoon.API.CurrentVisit.device.type;

    const currentLink = window.location.href;
    if (currentLink.match('https://www.congstar.de/handytarife/allnet-flat-m/')) {
        Kameleoon.API.Data.setCustomData('Plan PDP', 'Plan M');
        Kameleoon.API.Data.setCustomData('Last seen plan PDP', 'Plan M');
    } else if (currentLink.match('https://www.congstar.de/handytarife/allnet-flat-s/')) {
        Kameleoon.API.Data.setCustomData('Plan PDP', 'Plan S');
        Kameleoon.API.Data.setCustomData('Last seen plan PDP', 'Plan S');
    } else if (currentLink.match('https://www.congstar.de/handytarife/allnet-flat-l/')) {
        Kameleoon.API.Data.setCustomData('Plan PDP', 'Plan L');
        Kameleoon.API.Data.setCustomData('Last seen plan PDP', 'Plan L');
    }

    const findTariff = (arr, tarifId) => {
        return arr.find((it) => {
            return it.id === tarifId;
        });
    };

    const findEvent = (eventName) => {
        const eventRegExp = new RegExp(`${eventName}`);
        return dataLayer.find(item => item.event && item.event.match(eventRegExp));
    };

    const checkEmptyCart = (response) => {
        const cartStatus = response;
        if (cartStatus && !cartStatus.isCartFilled) {
            Kameleoon.API.Data.writeLocalData('KameleoonDev__TarifLAdded', false);
        }
    };

    if (Kameleoon.API.Data.readLocalData('KameleoonDev__TarifLAdded')) {
        fetch(URLCartCheck)
            .then(response => response.json())
            .then(response => checkEmptyCart(response));
    }

    if (!Kameleoon.API.Data.readLocalData('KameleoonDev__TarifLAdded') &&
        !Kameleoon.API.Data.readLocalData('KameleoonDev__TarifLOrdered') &&
        (+Kameleoon.API.Data.readLocalData('KameleoonDev__quantityOfVisits') < 2)) {

        if (typeDevice !== 'Desktop') {
            const setTimeout = function () {
                const myTimeout = Kameleoon.API.Utils.setTimeout(function () {
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
        Kameleoon.API.Core.runWhenConditionTrue(() => {
            return window.dataLayer && findEvent(addToCartEventName);
        }, () => {
            const addToCartProducts = findEvent(addToCartEventName);
            const addProducts = addToCartProducts.ecommerce.add.products;
            const isTarifL = findTariff(addProducts, tarifLId);

            if (isTarifL) {
                Kameleoon.API.Data.writeLocalData('KameleoonDev__TarifLAdded', true);
                Kameleoon.API.Goals.processConversion(goals['[T09] AddToCart L']);
            }

        });

        Kameleoon.API.Core.runWhenConditionTrue(() => {
            return window.dataLayer && findEvent(orderEventName);
        }, () => {
            const orderProducts = findEvent(orderEventName).transactionProducts;
            if (orderProducts.length < maxProductInOrder) {
                const tarifLInOrder = findTariff(orderProducts, tarifLId);

                if (tarifLInOrder && tarifLInOrder.productMonthlyPrice) {
                    
                    const revenue = +tarifLInOrder.productMonthlyPrice * 24;
                    
                    Kameleoon.API.Goals.processConversion(goals['[T09] Order and Revenue L'], revenue);
                    Kameleoon.API.Goals.processConversion(goals['[T09] Order and Revenue M+L'], revenue);
                    Kameleoon.API.Data.writeLocalData('KameleoonDev__TarifLOrdered', true);

                }
            }
        });
    }
}());
