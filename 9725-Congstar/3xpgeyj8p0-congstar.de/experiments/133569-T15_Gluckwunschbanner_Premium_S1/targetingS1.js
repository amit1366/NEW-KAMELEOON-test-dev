/* eslint-disable max-len */
(() => {
    const layer = window.dataLayer && dataLayer.find((el) => el.basketItems);
    if (layer) {
        const targetTariff = layer.basketItems.find((item) => item.name && item.name === 'AllnetFlatL');
        const notTariff = layer.basketItems.find((item) => item.type && item.type === 'companion');
        if (targetTariff && !notTariff) return true;
    }
})();
