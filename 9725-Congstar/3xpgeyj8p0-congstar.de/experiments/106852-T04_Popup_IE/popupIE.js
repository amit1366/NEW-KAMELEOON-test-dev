export const createPopupIE = () => {
    return `
        <div class='kam-popupIE__container'>
            <div class='kam-popupIE__content'>
                <p class='kam-popupIE__title'>Bitte aktualisiere deinen Browser.</p>
                <p class='kam-popupIE__text'>Dein Internetbrowser ist leider veraltet. Das kann dazu führen, dass diese Webseite nicht korrekt dargestellt wird. <br/> 
                Um mit den aktuellsten Sicherheitsstandards durchs Internet zu surfen, empfiehlt congstar einen der folgenden aktuellen Browser:</p>

                <a class='kam-popupIE__closeBtn' href='#' type='button'></a>

                <div class='kam-popupIE__browsers'>
                    <div class='kam-popupIE__browser'>
                        <a class='kam-popupIE__browser__link' target="_blank"  href='https://www.google.com/intl/de_de/chrome/'><img src='https://storage.kameleoon.eu/congstar/popup_IE/chrome.png'></a>
                        <a class='kam-popupIE__browser__name' target="_blank"  href='https://www.google.com/intl/de_de/chrome/'>Google Chrome</a>
                    </div>
                    <div class='kam-popupIE__browser'>
                        <a class='kam-popupIE__browser__link' href='https://www.mozilla.org/de/firefox/new/' target="_blank"><img src='https://storage.kameleoon.eu/congstar/popup_IE/ff.png'></a>
                        <a class='kam-popupIE__browser__name' href='https://www.mozilla.org/de/firefox/new/' target="_blank">Mozilla Firefox</a>
                    </div>
                    <div class='kam-popupIE__browser'>
                        <a class='kam-popupIE__browser__link' target="_blank"  href='https://www.microsoft.com/de-de/edge'><img src='https://storage.kameleoon.eu/congstar/popup_IE/edge.png'></a>
                        <a class='kam-popupIE__browser__name' target="_blank"  href='https://www.microsoft.com/de-de/edge'>Microsoft Edge</a>
                    </div>
                </div>
            </div>

            <div class='kam-popupIE__content_short kam-popupIE__content'>
                <div class='kam-popupIE__content_short__container'>
                    <img class='kam-popupIE__content_short__info' src='https://storage.kameleoon.eu/congstar/popup_IE/Info_icon.svg'>
                    <p class='kam-popupIE__title kam-popupIE__content_short__text'>Bitte aktualisiere deinen Browser.</p>
                </div>
            </div>
        </div>
    `;
};
