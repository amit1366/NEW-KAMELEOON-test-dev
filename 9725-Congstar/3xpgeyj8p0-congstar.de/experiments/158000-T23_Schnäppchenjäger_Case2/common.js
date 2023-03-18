import pages from './pages';
import regexComposer from './regexComposer';
import selectors from './selectors';

const goals = {
    '[T23] Klick ANF S / Startseite': 277219,
    '[T23] Klick ANF M / Startseite': 277220,
    '[T23] Klick on  Apple iPhone SE / Startseite': 277221,
    '[T23] Klick on ANF S, ANF M, Apple iPhone SE / Startseite': 277222,
    '[T23] Klick ANF S / Tarife Vergleich': 277223,
    '[T23] Klick ANF M / Tarife Vergleich': 277224,
    '[T23] Klick ANF S / ANF Vergleich': 277225,
    '[T23] Klick ANF M / ANF Vergleich': 277226,
    '[T23] A2C iPhone SE': 277227,
    '[T23] Klick iPhone SE': 277229,
};
const fireGoal = (name) => Kameleoon.API.Goals.processConversion(goals[name]);

const tarifS = /Allnet Flat S/;
const tarifM = /Allnet Flat M/;
const smartphone = /Apple iPhone SE .*2022.* Aktion$/;
const highlighted = regexComposer(tarifS, tarifM, smartphone);

let preventMultiClick = false;
if (pages.startPage.test(window.location.href)) {
    Kameleoon.API.Core.runWhenElementPresent(selectors.startPage, ([...headers]) => {
        const targetHeaders = headers.filter((header) => highlighted.test(header.innerText));
        targetHeaders.forEach((targetHeader) => {
            const targetBlock = targetHeader.closest('.slick-slide');
            const links = targetBlock.querySelectorAll(selectors.link);
            links.forEach((link) => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    fireGoal('[T23] Klick on ANF S, ANF M, Apple iPhone SE / Startseite');
                    if (tarifS.test(targetHeader.innerText)) {
                        fireGoal('[T23] Klick ANF S / Startseite');
                    }
                    if (tarifM.test(targetHeader.innerText)) {
                        fireGoal('[T23] Klick ANF M / Startseite');
                    }
                    if (smartphone.test(targetHeader.innerText)) {
                        fireGoal('[T23] Klick on  Apple iPhone SE / Startseite');
                    }
                    window.location = link.href;
                });
            });
        });
    }, 200);
}
if (pages.planComparisonSmartphonePage.test(window.location.href)) {
    Kameleoon.API.Core.runWhenElementPresent(selectors.planSmartphonePage, ([...headers]) => {
        const targetHeaders = headers.filter((header) => highlighted.test(header.innerText));
        targetHeaders.forEach((targetHeader) => {
            const targetBlock = targetHeader.closest('.col-12.col-md-6.col-lg-3');
            const links = targetBlock.querySelectorAll(selectors.link);
            links.forEach((link) => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (tarifS.test(targetHeader.innerText)) {
                        fireGoal('[T23] Klick ANF S / Tarife Vergleich');
                    }
                    if (tarifM.test(targetHeader.innerText)) {
                        fireGoal('[T23] Klick ANF M / Tarife Vergleich');
                    }
                    window.location = link.href;
                });
            });
        });
    }, 200);
}
if (pages.planComparisonAllnetPage.test(window.location.href)) {
    Kameleoon.API.Core.runWhenElementPresent(selectors.planAllnetPage, ([...headers]) => {
        let currentSelected = '';
        const targetHeaders = headers.filter((header) => highlighted.test(header.innerText));
        targetHeaders.forEach((targetHeader) => {
            const checkName = () => {
                if (tarifS.test(targetHeader.innerText)) {
                    return '[T23] Klick ANF S / ANF Vergleich';
                }
                if (tarifM.test(targetHeader.innerText)) {
                    return '[T23] Klick ANF M / ANF Vergleich';
                }
            };

            const targetBlock = targetHeader.closest('.cui-plan-selection-radio');
            if (/cui-plan-selection-radio--selected/.test(targetBlock.className)) {
                currentSelected = checkName();
            }
            targetBlock.addEventListener('click', () => { currentSelected = checkName(); });

            Kameleoon.API.Core.runWhenElementPresent(selectors.buttonCTA, ([buttonCTA]) => {
                buttonCTA.addEventListener('click', () => {
                    if (preventMultiClick) return;
                    fireGoal(currentSelected);
                    preventMultiClick = true;
                });
            });
        });
    }, 200);
}
if (pages.smartphoneOverview.test(window.location.href)) {
    Kameleoon.API.Core.runWhenElementPresent(selectors.smartphoneOverview, ([...headers]) => {
        const targetHeaders = headers.filter((header) => highlighted.test(header.innerText));
        targetHeaders.forEach((targetHeader) => {
            const targetBlock = targetHeader.closest('.device-teaser-tile');
            const links = targetBlock.querySelectorAll(selectors.link);
            links.forEach((link) => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    fireGoal('[T23] Klick iPhone SE');
                    window.location = link.href;
                });
            });
        });
    }, 200);
}
if (pages.cart.test(window.location.href)) {
    Kameleoon.API.Core.runWhenConditionTrue(
        () => window.dataLayer.find((item) => item && item.event === 'ee.addToCart'
            && item.ecommerce && item.ecommerce.add && item.ecommerce.add.products),
        () => {
            const data = window.dataLayer.find((item) => item.event === 'ee.addToCart');
            const { products } = data.ecommerce.add;
            const device = products.find((product) => product.category === 'Endgerät');
            if (device && smartphone.test(device.name)) fireGoal('[T23] A2C iPhone SE');
        }, 200
    );
}
