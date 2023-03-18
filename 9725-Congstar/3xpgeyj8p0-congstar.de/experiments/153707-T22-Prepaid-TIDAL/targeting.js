(() => {
    const configuratorWrapper = document.querySelector('plan-configurator');
    const elems = document.querySelectorAll('plan-configurator label.checkbox-label');
    if (elems.length) {
        return [...elems].some((elem) => /Musik Option - TIDAL HiFi/.test(elem.innerText));
    }
    if (
        !configuratorWrapper
        || (configuratorWrapper && !configuratorWrapper.childElementCount)
    ) {
        return undefined;
    }
    return false;
})();
