/* eslint-disable func-names */
/* eslint-disable max-len */
import { popupMarkup, rentalDivMarkup, tabMarkup, deliveryMarkup, tabBreakpoint } from './markup';

const goals = {
    'T18 Click CTA Abo banner (Primary)': 244083,
    'T18 Click Mehr Infos': 244084,
    'T18 Click Tab Miete': 244085,
    'T18 Open Tab Miete': 244086,
};

const referList = [
    'https://www.congstar.de/iphone-mieten-appleprodukte-abo/',
    'https://www.congstar.de/iphone-mieten-appleprodukte-abo/alle-produkte/',
    'https://www.congstar.de/iphone-mieten-appleprodukte-abo/alle-produkte/',
    'https://www.congstar.de/portal/iphone-mieten-appleprodukte-abo/?sp=gdbm&spfr=apple-mieten',
];

const currentDomain = document.location.origin;

let productInfo = {};
let configuratorTabs;
let configuratorTabsWrapper;

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
                            kamDeliveryInfoElementWrapper,
                            'status-indicator--success',
                            'status-indicator--warning'
                        );
                    } else if (availableFrom) {
                        const apiDate = new Date(availableFrom);
                        const [yyyy, mm, dd] = availableFrom.split('-');
                        if ((+new Date()) > (+apiDate)) {
                            kamDeliveryInfoElement.innerHTML = `Lieferbar`;
                            changeClass(
                                kamDeliveryInfoElementWrapper,
                                'status-indicator--success',
                                'status-indicator--warning'
                            );
                        } else {
                            kamDeliveryInfoElement.innerHTML = `Lieferbar ab ${dd}.${mm}.${yyyy}`;
                            changeClass(
                                kamDeliveryInfoElementWrapper,
                                'status-indicator--warning',
                                'status-indicator--success'
                            );
                        }
                    } else {
                        kamDeliveryInfoElement.innerHTML = 'Zurzeit nicht lieferbar';
                        changeClass(
                            kamDeliveryInfoElementWrapper,
                            'status-indicator--alert',
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
    Kameleoon.API.Core.runWhenElementPresent(
        '.configurator-tabs span.configurator-tab span.configurator-tab__title',
        ([spanRaten, spanSinglePay]) => {
            spanRaten.innerHTML = tabBreakpoint(`Raten&shy;zahlung`, 'In 24 Monatsraten bezahlen');
            spanSinglePay.innerHTML = tabBreakpoint(`Einmal&shy;zahlung`, 'Keine monatlichen Kosten');
        }
    );
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

const tabClickListener = function tabClickListener({ target }) {
    const clickedTab = target.closest('span.configurator-tab');
    setState(clickedTab, configuratorTabs.filter((tb) => tb !== clickedTab));
};

const tabState = () => {
    Kameleoon.API.Core.runWhenElementPresent(
        '.configurator-tabs.configurator-tabs--themed > span',
        (tabs) => {
            if (configuratorTabsWrapper) {
                configuratorTabsWrapper.removeEventListener(
                    Kameleoon.API.Utils.mouseDownEvent,
                    tabClickListener,
                    true
                );
            }
            configuratorTabs = tabs;
            configuratorTabsWrapper = configuratorTabs[0].parentNode;
            configuratorTabsWrapper.addEventListener(
                Kameleoon.API.Utils.mouseDownEvent,
                tabClickListener,
                true
            );
        }
    );
};

const insertTab = () => {
    [...document.querySelectorAll('.kamTab, .kam-banner-message')].forEach((item) => item.remove());
    Kameleoon.API.Core.runWhenElementPresent(
        '.configurator-tabs.configurator-tabs--themed',
        ([tabs]) => {
            tabs.insertAdjacentHTML('beforebegin',
                `<div class="kam-banner-message">Jetzt neu!</div>`);
            tabs.insertAdjacentHTML('beforeend', tabMarkup(productInfo));
            tabState();
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

const handleFlicker = () => {
    Kameleoon.API.Core.runWhenElementPresent(
        'device-price-selection',
        ([priceSelection]) => {
            const config = {
                attributes: true,
                childList: true,
                subtree: true,
                attributeFilter: ['removedNodes']
            };
            const callback = function (mutationsList, obs) {
                mutationsList.forEach((mutation) => {
                    const [removedItem] = mutation.removedNodes;
                    if (removedItem instanceof Element && removedItem.classList.contains('kamTab')) {
                        obs.disconnect();
                        insertTab();
                    }
                });
            };
            const observer = new MutationObserver(callback);
            observer.observe(priceSelection, config);
        }
    );
};

insertTab();
addDash();

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
            insertTab();
            addDash();
            handleFlicker();
            if (setRentalActive) {
                changeTabInfo(document.querySelector('.kamTab'));
            }
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
                insertTab();
                getProdData(id);
            }
        });
        return oldPush.apply(this, args);
    };
    window.kameleoonDatalyerPush = true;
}
