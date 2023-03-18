export const globalGoalsForSegments = () => {
    const goals = {
        '[GG] Order Prepaid L': 272886,
        '[GG] Order Prepaid M': 272887,
        '[GG] Order Prepaid S': 272888,
        '[GG] Order Prepaid Wie ich will': 272889,
        '[GG] Order Prepaid all': 272890,

        '[GG] FairFlat all': 272942,
        '[GG] Order FF 5 GB': 272943,
        '[GG] Order FF 8 GB': 272944,
        '[GG] Order FF 12 GB': 272945,
        '[GG] Order FF 18 GB': 272947,

        '[GG] Phone > 900€ Order and Revenue': 272891,
        '[GG] Phone < 500€ Order and Revenue': 272892,
        '[GG] Phone 500€ - 900€ Order and Revenue': 272893,
        '[GG] Phone Order': 223344,
    };

    const selectors = {
        btnPdp: 'button.btn-icon.btn-icon--large.btn-icon--block.btn-icon--dark',
    };

    const addToCartEventName = 'ee.addToCart';
    const orderEventName = 'checkout.purchase';
    const idsTarif = [367, 366, 365, 371, 420];

    const LOCAL_NAME_IDS_PRODUCT = 'Kameleoon-global-goals-for-segments';
    const LOCAL_NAME_PHONES = 'Kameleoon-global-goals-for-segments-add-basket-phone';
    const LOCAL_NAME_PRODUCTS = 'Kameleoon-global-goals-for-segments-add-basket';

    const isProducts = Kameleoon.API.Data.readLocalData(LOCAL_NAME_IDS_PRODUCT)
        ? Kameleoon.API.Data.readLocalData(LOCAL_NAME_IDS_PRODUCT)
        : [];

    const products = Kameleoon.API.Data.readLocalData(LOCAL_NAME_PRODUCTS)
        ? Kameleoon.API.Data.readLocalData(LOCAL_NAME_PRODUCTS)
        : [];

    const urlExclude = /(router|minirouter|watch|buds|airpods|ipad|airtag|homepod|fritzbox|tab)/i;

    const PhoneUrl = () => {
        const isPhonePdp = window.location.href.match(/handys\/details\/.+/);
        const isExcludeDevice = window.location.href.match(urlExclude);

        return isPhonePdp && !isExcludeDevice;
    };

    const findTarif = (arr) => arr.find((it) => idsTarif.some((id) => id === it.id));
    const findPhoneId = (arr, ids) => arr.find((it) => ids.some((id) => id === it.id));

    const findEvent = (eventName) => {
        const eventRegExp = new RegExp(`${eventName}`);
        return dataLayer.find((item) => item.event && item.event.match(eventRegExp));
    };

    const getPhones = (arr, ids) => arr.find((product) => ids.some((id) => product.id === id));
    const getPrice = (arr, id) => arr.find((product) => product.id === id);

    const writeProduct = (product) => {

        isProducts.push(product.id);
        products.push(product);

        Kameleoon.API.Data.writeLocalData(LOCAL_NAME_IDS_PRODUCT, isProducts, true);
        Kameleoon.API.Data.writeLocalData(LOCAL_NAME_PRODUCTS, products, true);
    };

    const findeProduct = () => {
        Kameleoon.API.Core.runWhenConditionTrue(() => window.dataLayer
        && window.dataLayer.find((it) => it.productItem), () => {

            const product = window.dataLayer.find((it) => it.productItem);
            product && writeProduct(product.productItem);
        });
    };

    const goalsTarif = {
        367: goals['[GG] Order Prepaid L'],
        366: goals['[GG] Order Prepaid M'],
        365: goals['[GG] Order Prepaid S'],
        371: goals['[GG] Order Prepaid Wie ich will'],

        420: {
            5: goals['[GG] Order FF 5 GB'],
            8: goals['[GG] Order FF 8 GB'],
            12: goals['[GG] Order FF 12 GB'],
            18: goals['[GG] Order FF 18 GB'],
            all: goals['[GG] FairFlat all'],
        },
    };

    const phoneFireGoal = (productsInfo, phones) => {
        const { productOnetimePrice } = getPrice(productsInfo, phones.id);

        Kameleoon.API.Goals.processConversion(goals['[GG] Phone Order']);

        if (productOnetimePrice) {

            if (+productOnetimePrice >= 900) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Phone > 900€ Order and Revenue'],
                    +productOnetimePrice);
            }

            if (+productOnetimePrice <= 500) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Phone < 500€ Order and Revenue'],
                    +productOnetimePrice);
            }

            if (+productOnetimePrice >= 501 && +productOnetimePrice <= 899) {
                // eslint-disable-next-line max-len
                Kameleoon.API.Goals.processConversion(goals['[GG] Phone 500€ - 900€ Order and Revenue'],
                    +productOnetimePrice);
            }

        }
    };

    const tarifFireGoal = (gb, price) => {
        // eslint-disable-next-line default-case
        switch (gb) {
            case 'Datenstufe5GB':
                Kameleoon.API.Goals.processConversion(goalsTarif[420][5],
                    price * 18);
                break;

            case 'Datenstufe8GB':
                Kameleoon.API.Goals.processConversion(goalsTarif[420][8],
                    price * 18);
                break;

            case 'Datenstufe12GB':
                Kameleoon.API.Goals.processConversion(goalsTarif[420][12],
                    price * 18);
                break;

            case 'Datenstufe18GB':
                Kameleoon.API.Goals.processConversion(goalsTarif[420][18],
                    price * 18);
                break;
        }
    };

    if (PhoneUrl()) {
        Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {

            if (target.closest(selectors.btnPdp)) {
                findeProduct();
            }
        });
    }

    if (/checkout\/warenkorb/.test(window.location.href)) {
        Kameleoon.API.Core.runWhenConditionTrue(() => window.dataLayer
        && findEvent(addToCartEventName), () => {

            const addToCartProducts = findEvent(addToCartEventName);
            const addProducts = addToCartProducts.ecommerce.add.products;

            const ids = Kameleoon.API.Data.readLocalData(LOCAL_NAME_IDS_PRODUCT);

            if (ids && ids.length) {
                const isPhone = findPhoneId(addProducts, ids);

                if (isPhone) {

                    let productsPhones = [isPhone];

                    if (Kameleoon.API.Data.readLocalData(LOCAL_NAME_PHONES)) {
                        productsPhones = [...Kameleoon.API.Data.readLocalData(LOCAL_NAME_PHONES),
                            isPhone];

                        Kameleoon.API.Data.writeLocalData(LOCAL_NAME_PHONES, productsPhones, true);
                        return;
                    }

                    Kameleoon.API.Data.writeLocalData(LOCAL_NAME_PHONES, productsPhones, true);
                }
            }
        });
    }

    if (/checkout/.test(window.location.href)) {

        Kameleoon.API.Core.runWhenConditionTrue(() => window.dataLayer
        && findEvent(orderEventName), () => {

            const orderProducts = findEvent(orderEventName).transactionProducts;
            const ids = Kameleoon.API.Data.readLocalData(LOCAL_NAME_IDS_PRODUCT);
            const productsInfo = Kameleoon.API.Data.readLocalData(LOCAL_NAME_PRODUCTS);
            const isTarif = orderProducts.some((product) => product.category === 'prepaid'
            || product.category === 'postpaid');

            if (ids && ids.length) {
                const phones = getPhones(orderProducts, ids);

                if (phones && productsInfo && productsInfo.length) {
                    phoneFireGoal(productsInfo, phones);
                }
            }

            if (isTarif) {

                const tarif = findTarif(orderProducts);
                const tarifOptions = orderProducts
                    .find((product) => (product.category === 'prepaid'
                    || product.category === 'postpaid') && product.id !== 420);

                if (tarif && tarifOptions) {
                    const { price, name } = tarifOptions;

                    if (tarif.id === 420) {

                        tarifFireGoal(name, price);

                        Kameleoon.API.Goals.processConversion(goalsTarif[420].all, price * 18);

                        return;
                    }

                    const finelyPrice = tarif.id === 371 ? 10 * 15 : price * 15;

                    Kameleoon.API.Goals.processConversion(goals['[GG] Order Prepaid all'],
                        finelyPrice);

                    Kameleoon.API.Goals.processConversion(goalsTarif[tarif.id], finelyPrice);
                }
            }
        });
    }
};
