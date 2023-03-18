export const T15GlueckwunschbannerWK2Iteration = () => {
    const goals = {
        '[T15] Access Persönliche Daten': 293485,
    };

    if (document.location.pathname.includes('/checkout/persoenliche-daten')) {
        Kameleoon.API.Goals.processConversion(goals['[T15] Access Persönliche Daten']);
    }
};
