export const P07CongstarXTryBuy = () => {
    const goals = {
        '[GG] Daten all': 230952,
        '[GG] Homespot all': 230953,
    };
    
    const productsId = [300, 301, 302, 303, 304, 305, 414, 415, 418, 416, 417, 419, 6213, 6214, 6215, 6216, 6219, 6220];
    
    let currentId;
    
    function findProductId(data) {
        const basketItems = data && data.basketItems;
        if (basketItems) {
            for (let i = 0; i < basketItems.length; i++) {
                const tarrifId = basketItems[i].id;
                if (productsId.includes(tarrifId)) {
                    currentId = tarrifId;
                    return true;
                }
            }
        }
    }
    
    function checkBoughtProduct(cb) {
        if (dataLayer) {
            return dataLayer.find(cb);
        }
    }
    
    if (/\/checkout\/bestaetigung/.test(location.href)) {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => checkBoughtProduct(findProductId),
            () => {
                if (String(currentId)[0] <= '4') {
                    Kameleoon.API.Goals.processConversion(goals['[GG] Daten all']);
                } else {
                    Kameleoon.API.Goals.processConversion(goals['[GG] Homespot all']);
                }
            }
        );
    }

    function emulateClick() {
        Kameleoon.API.Core.runWhenElementPresent(
            '.comp-configurator-tabs-button.configurator-tab',
            ([button]) => {
                button.nextElementSibling.click();
            }
        );
    }
    
    if (location.href === 'https://www.congstar.de/congstar-x/congstar-x-tarif/') {
        Kameleoon.API.Core.runWhenConditionTrue(
            () => sessionStorage.getItem('KamDev-promoURL'),
            () => {
                emulateClick();
            }
        );
    }
};
