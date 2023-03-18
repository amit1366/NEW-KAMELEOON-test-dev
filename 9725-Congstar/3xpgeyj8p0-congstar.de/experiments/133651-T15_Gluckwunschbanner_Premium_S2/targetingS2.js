/* eslint-disable max-len */
(() => {
    const layer = window.dataLayer && dataLayer.find((el) => el.basketItems);
    if (layer) {
        const targetTariff = layer.basketItems.find((item) => item.type === 'tariff');
        const phone = layer.basketItems.find((item) => item.type === 'companion');
        const monthlyRate = layer.basketItems.find((item) => item.name === 'MonatlicheRate');
        const cost = (phone && +phone.productOnetimePrice) + (monthlyRate ? monthlyRate.productMonthlyPrice * 24 : 0);
        if (targetTariff && cost > 800) return true;
    }
})();
