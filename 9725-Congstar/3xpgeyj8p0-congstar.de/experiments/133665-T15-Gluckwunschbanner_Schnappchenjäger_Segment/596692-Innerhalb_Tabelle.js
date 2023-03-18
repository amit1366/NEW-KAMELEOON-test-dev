import { label } from '../../helpers/t15/svg';

const text = 'Bestes Preis-Leistungs-Angebot!'; 
const selectors = {
    productRow: '.product-price-table__row--product .cart-item'
};
Kameleoon.API.Core.runWhenElementPresent(selectors.productRow, ([row]) => {
    row.insertAdjacentHTML('afterbegin', label(text, false));    
});
