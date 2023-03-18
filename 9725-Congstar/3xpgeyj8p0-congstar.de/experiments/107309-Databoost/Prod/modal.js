export const addListenerToStar = (cb) => {
    Kameleoon.API.Core.runWhenElementPresent(`.kam-footnote__icon`, (icon) => {
        Kameleoon.API.Utils.addEventListener(icon[0], `mousedown`, cb);
    });
};
