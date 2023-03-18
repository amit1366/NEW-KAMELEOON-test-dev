const goals = {
    '[P05] Click Download App overview': 212275,
    '[P05] Close App Banner': 212276,
    '[P05] Show App Banner': 212277,
    '[P05] Click Download App pages': 212278
};
const data = [{
    page: 'https://www.congstar.de/hilfe-service/mein-vertrag/zubuchbare-optionen-postpaid/',
    deeplink: 'https://congstar.page.link/optionen',
    textOfBanner: 'Jetzt zur Optionsverwaltung in der App.'
}, {
    page: 'https://www.congstar.de/hilfe-service/mein-vertrag/handy-tarifwechsel/',
    deeplink: 'https://congstar.page.link/tarifwechsel',
    textOfBanner: 'Jetzt zum Tarifwechsel in der App.'
}, {
    page: 'https://www.congstar.de/hilfe-service/mein-vertrag/vertrag-verlaengern/',
    deeplink: 'https://congstar.page.link/vertragsverlaengerung',
    textOfBanner: 'Jetzt zur Vertragsverlängerung in der App.'
}, {
    page: 'https://www.congstar.de/hilfe-service/rechnung/infos-zur-rechnung/',
    deeplink: 'https://congstar.page.link/rechnungen',
    textOfBanner: 'Jetzt zu deinen Rechnungen in der App.'
}, {
    page: 'https://www.congstar.de/prepaid/services/karte-aufladen/',
    deeplink: 'https://congstar.page.link/guthaben-aufladen',
    textOfBanner: 'Jetzt Guthaben Aufladen in der App.'
}];
const img = {
    forAndroid: 'https://storage.kameleoon.eu/congstar/P05SmartAppBanner/kontakt-congstar-app-download-android.png',
    forIOS: 'https://storage.kameleoon.eu/congstar/P05SmartAppBanner/kontakt-congstar-app-download-ios.png'
};
let imgApp;

if (Kameleoon.API.CurrentVisit.device.os === 'iOS') {
    imgApp = img.forIOS;
} else {
    imgApp = img.forAndroid;
    Kameleoon.API.Core.runWhenElementPresent('.kam-smart-banner_cta', (elem) => {
        elem[0].style = 'right: 15px';
    });
}

const kamBanner = "\n        <div class=\"kam-smart-banner\">\n            <div class=\"kam-smart-banner_cross\"></div>\n            <img src='https://storage.kameleoon.eu/congstar/P05SmartAppBanner/congstar-app-icon.png' class=\"kam-smart-banner_img-star\">\n            <div class=\"kam-smart-banner_text-block\">\n                <p class=\"kam-smart-banner_text-block__title\">congstar App</p>\n                <p class=\"kam-smart-banner_text-block__text\">Alle Funktionen bequem per App.</p>\n                <p class=\"kam-smart-banner_text-block__text\"> Jetzt gratis downloaden! </p>\n            </div>\n            <a class=\"kam-smart-banner_cta\" href=\"https://congstar.page.link/uebersicht\">\n                <img src=".concat(imgApp, ' class="kam-smart-banner_img-download">\n            </a>\n        </div>');

if (Kameleoon.API.Data.readLocalData('KamShowPopin') !== 'NotShow') {
    Kameleoon.API.Core.runWhenConditionTrue(() => document.querySelector('.container-fluid.wrapper') && document.querySelector('header'), () => {
        const body = document.querySelector('.container-fluid.wrapper');
        body.insertAdjacentHTML('beforebegin', kamBanner);
        body.classList.add('kam-show-banner');
        const selectors = {
            banner: document.querySelector('.kam-smart-banner'),
            crossOnBanner: document.querySelector('.kam-smart-banner_cross'),
            ctaOnBanner: document.querySelector('.kam-smart-banner_cta'),
            titleText: document.querySelector('.kam-smart-banner_text-block__title'),
            text: document.querySelector('.kam-smart-banner_text-block__text')
        };
        Kameleoon.API.Goals.processConversion(goals['[P05] Show App Banner']);
        selectors.ctaOnBanner.addEventListener('click', () => {
            Kameleoon.API.Goals.processConversion(goals['[P05] Click Download App overview']);
            selectors.banner.style.display = 'none';
            body.classList.remove('kam-show-banner');
            Kameleoon.API.Data.writeLocalData('KamShowPopin', 'NotShow');
        });

        const _loop = function _loop(index) {
            if (window.location.href === data[index].page) {
                body.classList.add('kam-show-banner__small');
                document.querySelector('.kam-smart-banner').classList.add('kam-smart-banner__small');
                selectors.ctaOnBanner.href = data[index].deeplink;
                selectors.text.textContent = data[index].textOfBanner;
                selectors.titleText.style.display = 'none';
                selectors.text.style = 'margin-left: 6px; width: 72%;';
                document.querySelectorAll('.kam-smart-banner_text-block__text')[1].style.display = 'none';
                selectors.ctaOnBanner.addEventListener('click', () => {
                    Kameleoon.API.Goals.processConversion(goals['[P05] Click Download App pages']);
                    selectors.banner.style.display = 'none';
                    body.classList.remove('kam-show-banner');
                    Kameleoon.API.Core.processRedirect(data[index].deeplink);
                    Kameleoon.API.Data.writeLocalData('KamShowPopin', 'NotShow');
                });
            }
        };

        for (let index = 0; index < data.length; index++) {
            _loop(index);
        }

        selectors.crossOnBanner.addEventListener('click', () => {
            Kameleoon.API.Goals.processConversion(goals['[P05] Close App Banner']);
            selectors.banner.style.display = 'none';
            body.classList.remove('kam-show-banner');
            Kameleoon.API.Data.writeLocalData('KamShowPopin', 'NotShow');
        });
    });
    Kameleoon.API.Core.runWhenConditionTrue(() => {
        const selectors = ['ul.main-nav.list-unstyled', '#header-nav__menu'];
        return selectors.every((selector) => document.querySelector(selector));
    }, () => {
        const burger = document.querySelector('#header-nav__menu');

        const calcHeight = function calcHeight() {
            if (document.querySelector('.kam-show-banner')) {
                const recalcHeight = function recalcHeight(height) {
                    const bannerHeight = 89;
                    const currentHeight = Number(height.match(/\d+/g)[0]);
                    return ''.concat(currentHeight - bannerHeight, 'px');
                };

                const menu = document.querySelector('ul.main-nav.list-unstyled');

                if (menu.style.height) {
                    const currentHeight = menu.style.height;
                    menu.style.height = recalcHeight(currentHeight);
                }
            }
        };

        burger.addEventListener('mousedown', () => {
            setTimeout(() => {
                calcHeight();
            }, 1500);
        });
    });
}
