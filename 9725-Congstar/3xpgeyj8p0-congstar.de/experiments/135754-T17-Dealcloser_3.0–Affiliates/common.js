const experimentID = 135754;

if (Kameleoon.API.Experiments.getById(experimentID) 
    && Kameleoon.API.Experiments.getById(experimentID).active) {
    document.cookie = `kamCookieMultiTest=${experimentID}; path=/;max-age=31536000`;
}
