/* eslint-disable max-len */

const rentalDivMarkup = ({ url, duration }, [euro, cent]) => `
<div class="kam-info">
<div class="kam-info configurator-selection background-color--phones">
    <div class="configurator-selection__costs configurator-selection__costs--tablet-modification">
        ${url ? `<div class="price price--large">
                <span class="price__euro">${euro}</span>
                <span class="price__cent">${cent}</span>
                <span class="price__rate">€ mtl.</span>
                <div class="price__duration">Für ${duration} Monate mieten</div>
            </div>` 
        : `<div class="price price--large not-available">
                Nicht verfügbar
            </div>`}
        <div class="price-listing">
            <div class="row">
                <div class="col-8">
                    <div class="kam-span">Empfehlung</div>
                </div>
                <div class="col-4 price-listing__price"></div>
            </div>
            <div class="row">
                <div class="col-7">AppleCare+ optional zubuchen!</div>
                <div class="col-5 price-listing__price"></div>
            </div>
        </div>
    </div>
    <div
        class="configurator-selection__actions configurator-selection__actions--tablet-modification">
        <div class="kam-rental-popup">
            <p class="text-small icon--info ${url ? '' : 'kam-not-available'}">
            <span>Mehr Infos zum Mietmodell</span>
            </p>
        </div>
        <button
            data-role="button"
            data-theme="hybrid"
            class="kam-btn btn-icon btn-icon--large btn-icon--block btn-icon--dark icon--options"
            onclick="${url ? `window.location.href = '${url}'` : `javascript:void(0)`}">
            <svg xmlns="http://www.w3.org/2000/svg" id="externer_Absprung" data-name="externer Absprung" viewBox="0 0 26.86 26.94"><title>externer_absprung_</title><path d="M27.54,21.66v9H9.38V12.38h8.77V9.53H9.38a2.85,2.85,0,0,0-2.85,2.85V30.62a2.85,2.85,0,0,0,2.85,2.85H27.54a2.87,2.87,0,0,0,2.85-2.85v-9Z" transform="translate(-6.53 -6.53)"/><path d="M33.39,8a1.5,1.5,0,0,0-1.5-1.5H22.16c-.82,0-1,.48-.44,1.06L32.33,18.2c.58.58,1.06.39,1.06-.44Z" transform="translate(-6.53 -6.53)"/><rect x="20.56" y="11.26" width="6" height="10.2" transform="translate(11.94 -18.4) rotate(45)"/></svg>
            ${url ? 'Weiter zur Miete' : 'Nicht verfügbar'}
        </button>
        </div>
        </div>
        <span class="kam-legal-text"> *Über „Weiter zur Miete“ kannst du über <a href="https://www.c2-circle.com/" target="_blank">c2-circle.com</a> beim Vertragspartner C2 Circle GmbH, Sonnenstraße 31, 80331 München einen Mietvertrag für Apple-Produkte bestellen. Zusätzlich hast du dort die Möglichkeit einen congstar Mobilfunkvertrag abzuschließen. Der congstar Mobilfunkvertrag kommt erst im Rahmen der Aktivierung zwischen dir und der Telekom Deutschland GmbH, Landgrabenweg 151, 53227 Bonn zustande.</span>
        </div> 
        `;

const tabMarkup = (duration) => `
    <span class="configurator-tab configurator-tab--tablet is-inactive kamTab" href="" ng-if="" ng-click="" ng-class="" ng-attr-data-test-state="" data-test-action="" data-test-state="isDeselected">
        <span class="configurator-tab__title">
            Miete
            <footnote model="" ng-if="" class="footnote footnote__link kam-footnote">
                <span class="footnote__index"></span>
                <span class="footnote__icon kam_star"></span>
            </footnote>
            <span class="configurator-tab__subtitle kam-span">
                ${duration ? `Für ${duration} Monate mieten` : `Nicht verfügbar`}      
            </span>
        </span>
    </span>
    `;

const deliveryMarkup = `
    <div class="status-indicator kam-status-indicator">
        <div class="kam-info kam-delivery"></div>
    </div>
`;

const popupMarkup = `
<div class="modal show cart-popup kam-popup_t18" id="modal" tabindex="-1" role="dialog" aria-modal="true" style="display: block;">
    <div class="modal-dialog" role="document">
        <div class="modal-content background-color--bright">
            <div class="modal-header cart-popup__headline">
                <h2>Infos zum Mietmodell</h2>
                <div class="close__icon"></div>
            </div>
            <div class="cart-popup__content modal-body">
                <h3>Vorteile des Mietmodells mit dem congstar Abo für Apple Produkte
                </h3>
                <p class="content__text">
                Mit dem Mietmodell sparst du dir hohe Anschaffungskosten und zahlst nur für die Nutzung von iPhone, Apple Watch oder iPad und den optionalen Versicherungsschutz durch AppleCare+. Dadurch ist das Mietmodell eine besonders einfache, kostengünstige und nachhaltige Lösung. Passendes Zubehör kannst du übrigens auch gleich mit finanzieren.
                </p>
                <h3>Mehr Flexibilität – deine Optionen am Ende der Mietdauer</h3>
                <p>Du kannst am Ende der Mietlaufzeit selbst entscheiden, ob du:</p>
            <div class="kam-list content__text">
            <ul class="checklist">
            <!----><li ng-repeat="uspBullet in $ctrl.deviceDetails.uspBullets" class="" style="">
            <b>ein Upgrade auf ein neues Modell wünscht</b> – optional nach 2 Jahren für iPhone/Watch und nach 3 Jahren für iPad (frühzeitiges Upgrade für iPhone/Watch bereits nach 12 Monaten und für iPad nach 18 Monaten gegen Einmalzahlung möglich) 
                <!---->
            </li><!----><li ng-repeat="uspBullet in $ctrl.deviceDetails.uspBullets" class="">
            <b>von deiner Kaufoption gebrauch machst</b>
                <!---->
            </li><!----><li ng-repeat="uspBullet in $ctrl.deviceDetails.uspBullets" class="">
            <b>dein Mietgerät zurückgeben möchtest</b>
                <!---->
            </li><!---->
        </ul>
            </div>
            <p class="content__text">
            <b>Info:</b>  Du verpflichtest dich, das Mietgerät am Ende der Mietzeit in einem ordnungsgemäßen Zustand zurückzugeben. Natürlich genießt du für abonnierte Hardware die gesetzliche Gewährleistung. Für selbst verursachte Schäden empfehlen wir dir allerdings, zusätzlich AppleCare+ abzuschließen.
            </p>
            <p class="content__text">
            <b>Hinweis:</b> Das congstar Abo wird über unseren Partner C2 Circle GmbH abgewickelt. Deinen passenden congstar Mobilfunktarif kannst du später im Bestellprozess dazubuchen.
            </p>
            <p class="content__text"> <a class="kam-rental-link btn-secondary--arrow-right" href="https://www.c2-circle.com/" target="_blank"> Weiterführende Informationen zum congstar Abo</a>
            </p>
        </div>
        </div>
    </div>
</div>
`;

const goals = {
    'T18 Click CTA Abo banner (Primary)': 241671,
    'T18 Click Mehr Infos': 241752,
    'T18 Click Tab Miete': 241755,
    'T18 Open Tab Miete': 241756,
};

const referList = [
    'https://www.congstar.de/iphone-mieten-appleprodukte-abo/',
    'https://www.congstar.de/iphone-mieten-appleprodukte-abo/alle-produkte/', 
    'https://www.congstar.de/iphone-mieten-appleprodukte-abo/alle-produkte/', 
    'https://www.congstar.de/portal/iphone-mieten-appleprodukte-abo/?sp=gdbm&spfr=apple-mieten', 
];

const currentDomain = document.location.origin;
const mql = window.matchMedia(`(max-width: 1420px)`);

let productInfo = {};

let setRentalActive = referList.includes(document.referrer)
    || document.location.href.includes('#Miete');

if (setRentalActive) Kameleoon.API.Goals.processConversion(goals['T18 Click Tab Miete']);
const setMieteActive = () => {
    document.querySelector(
        '.configurator-tab.configurator-tab--tablet.kamTab'
    ).dispatchEvent(new Event(Kameleoon.API.Utils.mouseDownEvent));
};

const chagneDeliveryNotice = () => {
    const { available_from: availableFrom, availibility } = productInfo;
    const changeClass = (elem, add, remove) => {
        elem.classList.add(add);
        elem.classList.remove(remove);
    };
    Kameleoon.API.Core.runWhenElementPresent(
        '.delivery-status-box',
        (statusBoxes) => {
            statusBoxes.forEach((originalStatusBox) => {
                let kamDeliveryInfoElementWrapper = originalStatusBox.querySelector('.kam-status-indicator');
                if (kamDeliveryInfoElementWrapper) kamDeliveryInfoElementWrapper.remove();
                originalStatusBox.insertAdjacentHTML('beforeEnd', deliveryMarkup);
                kamDeliveryInfoElementWrapper = originalStatusBox.querySelector('.kam-status-indicator');
                const kamDeliveryInfoElement = originalStatusBox.querySelector('.kam-status-indicator .kam-info.kam-delivery');
                if (setRentalActive) {
                    if (availibility === 'AVAILABLE') {
                        kamDeliveryInfoElement.innerHTML = `Lieferbar`;
                        changeClass(
                            kamDeliveryInfoElement,
                            'status-indicator--success',
                            'status-indicator--warning'
                        );
                    } else if (availableFrom) {
                        const apiDate = new Date(availableFrom);
                        const [yyyy, mm, dd] = availableFrom.split('-');
                        if ((+new Date()) > (+apiDate)) {
                            kamDeliveryInfoElement.innerHTML = `Lieferbar`;
                            changeClass(
                                kamDeliveryInfoElement.parentNode,
                                'status-indicator--success',
                                'status-indicator--warning'
                            );
                        } else {
                            kamDeliveryInfoElement.innerHTML = `Lieferbar ab ${dd}.${mm}.${yyyy}`;
                            changeClass(
                                kamDeliveryInfoElement.parentNode,
                                'status-indicator--warning',
                                'status-indicator--success'
                            );
                        }
                    } else {
                        kamDeliveryInfoElement.innerHTML = 'Zurzeit nicht lieferbar';
                        changeClass(
                            kamDeliveryInfoElement.parentNode,
                            'status-indicator--warning',
                            'status-indicator--success'
                        );
                    }
                    originalStatusBox.firstElementChild.style.display = 'none';
                    kamDeliveryInfoElementWrapper.style.display = 'block';
                } else {
                    originalStatusBox.firstElementChild.style.display = 'block';
                    kamDeliveryInfoElementWrapper.style.display = 'none';
                }
            });
        }
    );
};

const addDash = () => {
    Kameleoon.API.Core.runWhenElementPresent('.configurator-tabs', ([congstarTabs]) => {
        const spanRaten = congstarTabs
            .querySelector('.theme--phones div span:nth-child(1) span');
        const spanSinglePay = congstarTabs
            .querySelector('.theme--phones div span:nth-child(2) span');
    
        if (mql.matches) {
            spanRaten.innerHTML = `
                Raten- 
                <br>
                zahlung
                <span class="configurator-tab__subtitle">
                    In 24 Monatsraten bezahlen
                </span>
            `;
            spanSinglePay.innerHTML = `
                Einmal-
                <br>
                zahlung
                <span class="configurator-tab__subtitle">
                    Keine monatlichen Kosten
                </span>
            `;
        } else {
            spanRaten.innerHTML = `
                Ratenzahlung
                <span class="configurator-tab__subtitle">
                    In 24 Monatsraten bezahlen
                </span>
            `;
            spanSinglePay.innerHTML = `
                Einmalzahlung
                <span class="configurator-tab__subtitle">
                    Keine monatlichen Kosten
                </span>
            `;
        }
    });
};

const createPopUp = () => {
    document.body.insertAdjacentHTML('beforeEnd', popupMarkup);
    document.body.classList.add('kam-modal-open');
    const popup = document.querySelector('.kam-popup_t18');
    const rentalLink = document.querySelector('.kam-rental-link');
    rentalLink.setAttribute('href', `${currentDomain}/iphone-mieten-appleprodukte-abo/`);

    Kameleoon.API.Utils.addUniversalClickListener(popup, ({ target }) => {
        if (target.closest('.kam-rental-link')) {
            Kameleoon.API.Goals.processConversion(goals['T18 Click Mehr Infos']);
        } else if (target.closest('.kam-popup_t18 .close__icon')) {
            document.body.classList.remove('kam-modal-open');
            popup.remove();
        }
    });
};

const changeTabInfo = (activeTab) => {
    const infoDiv = document.querySelector('div.configurator-selection.background-color--phones');
    [...document.querySelectorAll('.kam-info')].forEach((item) => item.remove());
    
    if (activeTab.classList.contains('kamTab')) {
        window.history.replaceState('', '', `${document.location.pathname}#Miete`);
        infoDiv.style.display = 'none';
        setRentalActive = true;

        const priceSplit = (+productInfo.price).toFixed(2).split('.');
        infoDiv.insertAdjacentHTML('afterEnd', rentalDivMarkup(productInfo, priceSplit));

        const aboButton = document.querySelector('.kam-info.configurator-selection button.kam-btn');
        Kameleoon.API.Utils.addUniversalClickListener(aboButton, () => {
            Kameleoon.API.Goals.processConversion(goals['T18 Click CTA Abo banner (Primary)']);
        });

        const openPopUp = document.querySelector('.kam-rental-popup');
        openPopUp.addEventListener('click', createPopUp);
        chagneDeliveryNotice();
    } else {
        infoDiv.style.display = 'flex';
        setRentalActive = false;
        chagneDeliveryNotice();
    }
};

const setState = (clickedTab, inactiveTabs) => {
    changeTabInfo(clickedTab);
    clickedTab.classList.remove('is-inactive');
    clickedTab.setAttribute('data-test-state', 'isSelected');
    inactiveTabs.forEach((tab) => {
        tab.classList.add('is-inactive');
        tab.setAttribute('data-test-state', 'isDeselected');
    });  
};

const tabState = () => {
    Kameleoon.API.Core.runWhenElementPresent(
        '.configurator-tabs.configurator-tabs--themed > span',
        (tabs) => {
            tabs.forEach((tab) => {
                Kameleoon.API.Utils.addUniversalClickListener(tab, () => {
                    setState(tab, tabs.filter((tb) => tb !== tab));
                });
            });
        }
    );
};

const insertTab = (duration) => {
    [...document.querySelectorAll('.kamTab, .kam-banner-message')].forEach((item) => item.remove());
    Kameleoon.API.Core.runWhenElementPresent(
        '.configurator-tabs.configurator-tabs--themed',
        ([tabs]) => {
            tabs.insertAdjacentHTML('beforebegin', 
                `<div class="kam-banner-message">Jetzt neu!</div>`);
            tabs.insertAdjacentHTML('beforeend', tabMarkup(duration));
            if (duration) tabState();
            if (setRentalActive) setMieteActive();
            document.querySelector('.kamTab')
                .addEventListener(Kameleoon.API.Utils.mouseDownEvent, function mieteGoal() {
                    if (
                        !Kameleoon.API.Utils.touchMoveEvent
                        && this.classList.contains('is-inactive')
                    ) {
                        Kameleoon.API.Goals.processConversion(goals['T18 Click Tab Miete']);
                    }
                }, true);
        }
    );
};
insertTab(false);

addDash();
mql.addEventListener('change', addDash);

const getProdData = (id) => {
    fetch(
        `${currentDomain}/cdp/productInfo?id=${id}`,
        {
            headers: {
                'Content-Type': 'application/json',
                charset: 'utf-8'
            }
        }
    ).then((res) => res.json())
        .then((response) => {
            productInfo = response;
            insertTab(productInfo.duration);
            if (setRentalActive) changeTabInfo(document.querySelector('.kamTab'));
        }); 
};

Kameleoon.API.Core.runWhenConditionTrue(
    () => window.dataLayer && window.dataLayer.some(
        (item) => item.ecommerce 
            && item.ecommerce.detail 
            && item.ecommerce.detail.products 
    ), () => {
        const {
            ecommerce: { 
                detail: { products: [{ id }], },
            },
        } = window.dataLayer.find(
            (item) => item.ecommerce
            && item.ecommerce.detail 
            && item.ecommerce.detail.products 
        );
        getProdData(id);
    }
);

if (!window.kameleoonDatalyerPush) {
    window.dataLayer = window.dataLayer || [];
    const oldPush = window.dataLayer.push;
    window.dataLayer.push = function patchedPush(...args) {
        args.forEach((item) => {
            if (item.event === 'ecc.productView') {
                const [{ id }] = item.ecommerce.detail.products;
                insertTab(false);
                getProdData(id);
            }
        });
        return oldPush.apply(this, args);
    };
    window.kameleoonDatalyerPush = true;
}
