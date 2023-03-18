export const hideElement = (element) => element.classList.add(`kam-visually-hidden`);
export const showElement = (element) => element.classList.remove(`kam-visually-hidden`);
export const removeElemet = (element) => element.parentNode.removeChild(element);

export const addOverlayToCtaButton = (button) => {
    const container = button.parentNode;
    const overlay = document.createElement(`div`);
    overlay.className = `kam-CTAbutton-overlay`;
    container.insertAdjacentElement(`afterbegin`, overlay);
};
