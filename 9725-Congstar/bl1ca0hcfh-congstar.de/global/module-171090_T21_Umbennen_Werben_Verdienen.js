export const T21UmbennenWerbenVerdienen = () => {
    const goals = {
        '[T21] Klick auf Jetzt empfehlen CTA': 287760,
    };

    if (document.location.pathname === '/for-friends') {
        Kameleoon.API.Core.runWhenElementPresent('a[href="/for-friends/#login"]', ([element]) => {
            element.addEventListener('click', () => {
                Kameleoon.API.Goals.processConversion(goals['[T21] Klick auf Jetzt empfehlen CTA']);
            });
        });
    }

};
