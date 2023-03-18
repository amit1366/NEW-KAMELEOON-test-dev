import { goals } from './goals';

export const commonGoals = () => {
    if (document.location.pathname.includes('/congstar-for-friends')) {
        Kameleoon.API.Utils.addEventListener(document, 'click', ({ target }) => {
            if (target.closest('.benefit[data-voucher-type="1"]')) {
                Kameleoon.API.Goals.processConversion(goals['[T26] Select 2GB Friends LP']);
            } else if (target.closest('.benefit[data-voucher-type="2"]')) {
                Kameleoon.API.Goals.processConversion(goals['[T26] Select 35€ Friends LP']);
            } else if (target.closest('.benefit[data-voucher-type="3"]')) {
                Kameleoon.API.Goals.processConversion(goals['[T26] Select 10 % Friends LP']);
            } else if (target.closest('button.copy-code')) {
                Kameleoon.API.Goals.processConversion(goals['[T26] Copy Friends code']);
            }
        });
    }
};
