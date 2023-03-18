import { label } from '../../helpers/t15/svg';

const selectors = {
    productRow: 'checkout-product-table-device .cart-item__checklist'
};
const text = 'Unser Smartphone Highlight!';

Kameleoon.API.Core.runWhenElementPresent(selectors.productRow, ([row]) => {
    row.insertAdjacentHTML('afterend', label(text, true));    
});
