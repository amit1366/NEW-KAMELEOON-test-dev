if (window.location.href.match(/\/handytarife\/allnet-flat-vergleich\//)) {
    Kameleoon.API.Core.runWhenElementPresent('.cui-plan-selection-radio__data-volume', 
        (allnetFlats) => {
            allnetFlats.forEach((allnetFlat) => {
                if (allnetFlat.innerHTML.indexOf('15') > -1) {
                    allnetFlat.innerHTML = allnetFlat.innerHTML.replace('15', '25');
                } else if (allnetFlat.innerHTML.indexOf('10') > -1) {
                    allnetFlat.innerHTML = allnetFlat.innerHTML.replace('10', '15');
                }
            });
        });
        
    Kameleoon.API.Core.runWhenElementPresent('.cui-plan-selection-price', (price) => {
        const priceEuro = price[0].querySelector('.cui-plan-selection-price__euro');
        new MutationObserver(() => {
            const selectedTarif = document.querySelectorAll(
                '.cui-plan-selection-radio--selected .cui-plan-selection-radio__price'
            )[0];
            const newPrice = selectedTarif.textContent.split(',')[0];
            if (selectedTarif && newPrice) {
                priceEuro.innerText = newPrice;
            }
        })
            .observe(price[0], {
                subtree: true,
                characterData: true
            });
    });
}
