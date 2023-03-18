import { label } from './svg';

export default (text, flag) => {
    const selectors = {
        productRow: '.product-price-table__row--product .cart-item'
    };
    
    Kameleoon.API.Core.runWhenElementPresent(selectors.productRow, ([row]) => {
        row.insertAdjacentHTML('beforeend', label(text, flag));    
    });
};
