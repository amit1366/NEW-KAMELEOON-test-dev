const goals = {
    '[GG] VVL  in CSC': 211883,
    '[T06] Delete databoost from the cart': 211873,
};

if (location.href.match(`https://www.nicotuadev.de/meincongstar/vertragsverlaengerung/bestaetigung`)) {
    Kameleoon.API.Goals.processConversion(goals['[GG] VVL  in CSC']);
}

if (location.href.match(`/checkout/warenkorb`)) {
    const possibleProductIDs = [`2569`, `2568`];
        
    Kameleoon.API.Core.runWhenConditionTrue(
        () => possibleProductIDs
            .some((id) => document.querySelector(`[data-test-option-id="${id}"]`)),
        () => {
            const currentExtraProductID = possibleProductIDs
                .filter((id) => document.querySelector(`[data-test-option-id="${id}"]`));
            const extraDataProduct = document.querySelector(`[data-test-option-id="${currentExtraProductID}"]`);

            const extraDataCard = extraDataProduct.parentNode.parentNode;

            const removeButton = extraDataCard.querySelector(`.cart-item__link`);

            Kameleoon.API.Utils.addEventListener(removeButton, `mousedown`, () => {
                Kameleoon.API.Goals.processConversion(goals['[T06] Delete databoost from the cart']);
            });
        });  
}