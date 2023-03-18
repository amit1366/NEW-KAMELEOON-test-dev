function targeting() {
    const element = document.getElementById('c7407907');

    if (element) {
        const elementPosition = {
            top: window.pageYOffset + element.getBoundingClientRect().top,
            bottom: window.pageYOffset + element.getBoundingClientRect().bottom
        };
        const windowPosition = {
            top: window.pageYOffset,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };
        if (elementPosition.bottom > windowPosition.top
            && elementPosition.top < windowPosition.bottom) {
            if (windowPosition.bottom > elementPosition.bottom
                && windowPosition.top + 150 < elementPosition.top) {
                return true;
            }
        }
    } else return undefined;

    const tariffsId = [406, 405, 300, 303, 301, 304, 302, 305, 6213, 6214, 6215, 6216, 6219, 6220];
    if (decodeURIComponent(document.cookie.match(/checkout_cart=([^;]+)/))) {
        const currentId = decodeURIComponent(document.cookie.match(/checkout_cart=([^;]+)/)[1]);
        return tariffsId.some((el) => el === JSON.parse(currentId).planId);
    }

    // eslint-disable-next-line max-len
    if (JSON.parse(decodeURIComponent(decodeURI(Kameleoon.Utils.readLocalData('campaignContext', 'COOKIE')))) === null) {
        return true;
        // eslint-disable-next-line max-len
    } if (JSON.parse(decodeURIComponent(decodeURI(Kameleoon.Utils.readLocalData('campaignContext', 'COOKIE')))).salesPartnerId) {
        return false;
    }
    return true;
}

targeting();
