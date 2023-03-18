(() => {
    const layer = window.dataLayer && dataLayer.find((el) => el.basketItems);
    if (layer) {
        const flatS = layer.basketItems.find((item) => item.name && item.name === 'AllnetFlatS');
        const fairflat = layer.basketItems.find((item) => item.name && item.name === 'FairFlat');
        const option = layer.basketItems.find((item) => item.name && item.name === 'Datenstufe2GB');
    
        if (flatS || (fairflat && option)) return true;
    }
})();
