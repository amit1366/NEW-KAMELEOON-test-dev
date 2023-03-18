/* eslint-disable max-len */
export const testID = 153515;

export const handledAttr = `kam-handled-${testID}`;
export const createdAttr = `kam-created-${testID}`;
export const storageNames = {
    PDPAddToCart: `KameleoonDev__PDPAddToCart-${testID}`,
    tarifAtCart: `KameleoonDev__tarifAtCart-${testID}`,
};
export const modalTargetText = 'Der Tarif congstar Daten L kostet monatlich 22 €. Einmaliger Bereitstellungspreis 35 €. Bei Abschluss eines Vertrages mit 24 Monaten Mindestvertragslaufzeit beträgt der einmalige Bereitstellungspreis 15 €. Ab einem Datenvolumen von 16 GB pro Monat wird die Bandbreite im jeweiligen Monat von max. 25 Mbit/s im Download und 10 Mbit/s im Upload auf max. 32 Kbit/s im Download und Upload beschränkt.';

export const selectors = {
    // PDP
    checkboxLTE: `.eft-shop-plan-configurator__options input.checkbox.checkbox--themed:not([${handledAttr}="true"])`,

    configurationDescriptionContainer: '.eft-shop-plan-configurator__description .eft-shop-plan-configurator__usps',
    configurationDescriptionItem: `.eft-shop-plan-configurator__description .eft-shop-plan-configurator__usps .icon-list.icon-list--themed:not([${createdAttr}="true"]`,

    priceWrapper: `.eft-shop-plan-configurator__selection .price.price--large:not([${handledAttr}="true"])`,
    priceEuro: '.price__euro',
    priceCent: '.price__cent',

    modalBody: `.modal.modal--footnote.show .modal-body:not([${handledAttr}="true"])`,

    PDPaddToCart: `.configurator-selection__actions .btn-icon.btn-icon--block.icon--add-to-basket:not([${handledAttr}="true"])`,
    // Cart and checkout
    planWrapper: 'checkout-cart common-product-table-plan, checkout-order-overview-page common-product-table-plan',
    itemsContainer: '.product-price-table.product-price-table--border-bottom',
    // Cart
    planName: 'common-product-table-plan .cart-item__subline',
    planOption: 'common-product-table-plan .cart-item__checklist li',
    basicMountlyPayment: 'common-product-table-plan span[data-test-price-recurring].price__value',
    deviceMountlyPayment: 'checkout-product-table-device [data-test-device-price-recurring].price__value',
    subtotalMountlyPayment: 'checkout-product-table-subtotal [data-cart-price-monthly] [data-test-subtotal-monthly-integer]',
    subtotalMountlyPaymentDisclaimer: 'checkout-product-table-subtotal [data-cart-price-monthly] .price__discount-iteration',
    totalMountlyPayment: 'common-total-price [data-cart-price-monthly] [data-test-subtotal-monthly-integer]',
    totalMountlyPaymentDisclaimer: 'common-total-price [data-cart-price-monthly] .price__discount-iteration',
};

const goals = {
    '[T20] A2C Daten L 30': 273719,
    '[T20] A2C Daten L 100': 273720,
    '[T20] A2C Daten L 200': 273721,
};

export const tarifSettings = {
    30: {
        name: 'Daten L 30',
        cartDescription: 'Datenflat 30 GB Datennutzung inklusive: LTE 50 mit max. 25 mBit/s',
        summaryDescription: 'Datenflat 30 GB Datennutzung inklusive: Übertragungsgeschwindigkeit im LTE Netz mit max. 50 mBit/s im Download und 25 Mbit/s im Upload. Ab 30 GB im jeweiligen Monat Beschränkung auf 32 Kbit/s (Download und Upload)',
        isIntersecting: () => location.pathname === '/angebote/daten-l-30',
        descriptions: [
            ['30 GB/Monat', 'mit max. 50 Mbit/s (LTE 50)'],
            ['Einstecken und lossurfen', '- ohne Techniker'],
            ['Ohne Standortbegrenzung']
        ],
        price: [25],
        modalText: 'Der Tarif congstar Daten L 30 kostet monatlich 25 €. Einmaliger Bereitstellungspreis 35 €. Bei Abschluss eines Vertrages mit 24 Monaten Mindestvertragslaufzeit beträgt der einmalige Bereitstellungspreis 15 €. Ab einem Datenvolumen von 30 GB pro Monat wird die Bandbreite im jeweiligen Monat von max. 50 Mbit/s im Download und 25 Mbit/s im Upload auf max. 32 Kbit/s im Download und Upload beschränkt. EU Roaming ist mit dem Vertrag nicht möglich.',
        addToCartGoal: goals['[T20] A2C Daten L 30'],
    },
    100: {
        name: 'Daten L 100',
        cartDescription: 'Datenflat 100 GB inkl. LTE 50 mit max. 50 mBit/s',
        summaryDescription: 'Datenflat 100 GB Datennutzung inklusive: Übertragungsgeschwindigkeit im LTE Netz mit max. 50 mBit/s im Download und 25 Mbit/s im Upload. Ab 100 GB im jeweiligen Monat Beschränkung auf 32 Kbit/s (Download und Upload)',
        isIntersecting: () => location.pathname === '/angebote/daten-l-100',
        descriptions: [
            ['100 GB/Monat', 'mit max. 50 Mbit/s (LTE 50)'],
            ['Einstecken und lossurfen', '- ohne Techniker'],
            ['Ohne Standortbegrenzung']
        ],
        price: [35],
        modalText: 'Der Tarif congstar Daten L 100 kostet monatlich 35 €. Einmaliger Bereitstellungspreis 35 €. Bei Abschluss eines Vertrages mit 24 Monaten Mindestvertragslaufzeit beträgt der einmalige Bereitstellungspreis 15 €. Ab einem Datenvolumen von 100 GB pro Monat wird die Bandbreite im jeweiligen Monat von max. 25 Mbit/s im Download und 10 Mbit/s im Upload auf max. 32 Kbit/s im Download und Upload beschränkt.',
        addToCartGoal: goals['[T20] A2C Daten L 100'],
    },
    200: {
        name: 'Daten L 200',
        cartDescription: 'Datenflat 200 GB inkl. LTE 50 mit max. 50 mBit/s',
        summaryDescription: 'Datenflat 200 GB Datennutzung inklusive: Übertragungsgeschwindigkeit im LTE Netz mit max. 50 mBit/s im Download und 25 Mbit/s im Upload. Ab 200 GB im jeweiligen Monat Beschränkung auf 32 Kbit/s (Download und Upload)',
        isIntersecting: () => location.pathname === '/angebote/daten-l-200',
        descriptions: [
            ['200 GB/Monat', 'mit max. 50 Mbit/s (LTE 50)'],
            ['Einstecken und lossurfen', '- ohne Techniker'],
            ['Ohne Standortbegrenzung']
        ],
        price: [45],
        modalText: 'Der Tarif congstar Daten L 200 kostet monatlich 45 €. Einmaliger Bereitstellungspreis 35 €. Bei Abschluss eines Vertrages mit 24 Monaten Mindestvertragslaufzeit beträgt der einmalige Bereitstellungspreis 15 €. Ab einem Datenvolumen von 200 GB pro Monat wird die Bandbreite im jeweiligen Monat von max. 50 Mbit/s im Download und 25 Mbit/s im Upload auf max. 32 Kbit/s im Download und Upload beschränkt. EU Roaming ist mit dem Vertrag nicht möglich.',
        addToCartGoal: goals['[T20] A2C Daten L 200'],
    },
};
