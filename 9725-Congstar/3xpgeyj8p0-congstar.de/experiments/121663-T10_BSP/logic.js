export default ((priceNew, url) => {
    const priceOld1 = '29,25';
    const priceOld2 = '30,00';
    const priceOld3 = '15,00';
    const priceOld4 = '1,00';
    const urlOld1 = 'https://www.congstar.de/handytarife/fair-flat';
    const urlOld2 = 'https://www.congstar.de/handytarife/fair-flat/';
    
    const selectors = {
        price: '.price-listing .col-12',
        table: '.align-left.table--plan-details',
        priceVertragsdetails: '.align-left.table--plan-details td',
        button: '.configurator-selection__actions .btn-icon.btn-icon--large.btn-icon--block.btn-icon--dark-transparent.btn-icon--multiline.icon--add-to-basket',
    };

    const changePrice = (price) => {
        const priceString = price.firstChild.textContent;
        if (priceString.includes(priceOld1) || priceString.includes(priceOld2) || priceString.includes(priceOld3)) {
            price.firstChild.textContent = priceNew;
        } else if (priceString.includes(priceOld4)) {
            price.firstChild.textContent = priceNew;
        }
    };

    Kameleoon.API.Core.runWhenElementPresent(selectors.price, ([price]) => {
        changePrice(price);
    });

    Kameleoon.API.Core.runWhenElementPresent(selectors.table, () => {
        const prices = document.querySelectorAll(selectors.priceVertragsdetails);
        prices.forEach(changePrice);
    });
    
    if (location.href === urlOld1 || location.href === urlOld2) {
        fetch(url);
    }
});