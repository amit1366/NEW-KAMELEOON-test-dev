import { bannerReccomend, thankyouBanner } from './layout';
import { goals, findCurrentGoals } from './goals';
export default (localStorageValue = '') => {
    const overlaySelectors = ['.kam-banner-overlay__wrapper', '.kam-banner-overlay__close'];
    const iphoneRegExp = [/apple-iphone-11(?!(-)pro)/i, 'apple-iphone-12'];
    const filterRegExp = iphoneRegExp.filter((regex) => window.location.href.match(regex));
    const segment = filterRegExp.length ? 'iphone' : 'android';
    const currentGoals = findCurrentGoals(window.location.href);

    Kameleoon.API.Core.runWhenElementPresent('.device-details__content', (section) => {
        if (segment) {
            localStorage.setItem('KamDev_Product_Viewed', localStorageValue);
            section[0].insertAdjacentHTML('beforeend', bannerReccomend(segment));
        }
    });

    Kameleoon.API.Core.runWhenElementPresent('checkout-progress-bar-page', (checkoutBanner) => {
        const findBasketItems = window.dataLayer && window.dataLayer.filter((data) => 'basketItems' in data);
        const isBasketData = findBasketItems && findBasketItems.length;
        const basketData = isBasketData && findBasketItems[0].basketItems.filter((item) => findCurrentGoals(item.name.toLowerCase()));
        const data = basketData.length && findCurrentGoals(basketData[0].name.toLowerCase());
        if (!document.querySelector('.kam-thankyou-banner')) {
            const thankyouSegment = data ? data.device : 'android';
            const thankyouLink = data ? data.link : 'https://iconfoto.de/congstar';
            checkoutBanner[0].insertAdjacentHTML('afterend', thankyouBanner(thankyouSegment, thankyouLink));
            Kameleoon.API.Core.runWhenElementPresent('.kam-thankyou-banner', (banner) => {
                banner[0].addEventListener('click', (e) => {
                    if (e.target.closest('.kam-thankyou-banner')) {
                        if (data && data.device !== 'iphone') {
                            Kameleoon.API.Goals.processConversion(goals['Click Banner Bestseller thankyou (SUM)']);
                        }
                        if (data && data.goalBanner) {
                            Kameleoon.API.Goals.processConversion(goals[data.goalBanner]);
                        }
                    }
                });
            });
        }
    });

    Kameleoon.API.Core.runWhenElementPresent('.kam-banner-overlay', (overlay) => {
        const showPopup = toggleOverlay(overlay[0]);

        overlaySelectors.forEach((selector) => {
            Kameleoon.API.Core.runWhenElementPresent(selector, (element) => {
                element[0].addEventListener('click', () => showPopup('add'));
            });
        });
        Kameleoon.API.Core.runWhenElementPresent('.kam-banner-rec', (banner) => {
            banner[0].addEventListener('click', () => {
                if (segment === 'android') {
                    Kameleoon.API.Goals.processConversion(goals['Click Banner Bestseller (SUM)']);
                }

                if (currentGoals && currentGoals.goal) {
                    Kameleoon.API.Goals.processConversion(goals[currentGoals.goal]);
                }
                showPopup('remove');
            });
        });
    });

    function toggleOverlay(overlay) {
        const popup = overlay;
        return (toggle) => {
            localStorage.setItem('KamDev_Product_Viewed', 'true');
            popup.classList[toggle]('kam-hide');
        };
    }
};
