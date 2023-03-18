import { createPopupIE } from './popupIE';

const goals = {
    '[T03] Click on browser icons': 211827,
    '[T03] Click on close button': 211828,
    '[T03] Exit after closing': 211879,
    '[T03] More than 1 PV after closing': 211852,
    '[T03] Order and Revenue after interaction with banner': 211841,
};

const selectors = {
    mainContainer: '.wrapper',
    header: '.header',
    headerMenu: '.header-menu',
    headerNav: '.header-nav',
    popup_container: '.kam-popupIE__container',
    popup_closeBtn: '.kam-popupIE__closeBtn',
    popup_content: '.kam-popupIE__content',
    popup_content_short: '.kam-popupIE__content_short',
    popup_browserLink: '.kam-popupIE__browser__link',
    popup_browserLinkText: '.kam-popupIE__browser__name'
};

const popupIE = createPopupIE();
const mainContainer = document.querySelector(selectors.mainContainer);
mainContainer.insertAdjacentHTML('beforeBegin', popupIE);

document.querySelector(selectors.popup_container).style.position = 'fixed';
mainContainer.style.top = sessionStorage.getItem('KameleoonDev__popupIE_showed') ? '90px' : '240px';

//iteraction with header
Kameleoon.API.Core.runWhenElementPresent(selectors.header, () => {
    const header = document.querySelector(selectors.header);
    let headerMenus = document.querySelectorAll(selectors.headerMenu);
    headerMenus = [].slice.call(headerMenus);
    header.style.top = 'auto';
    header.style.position = 'absolute';
    headerMenus.forEach((menu) => (menu.style.top = 'auto'));

    document.addEventListener('scroll', () => {
        if (sessionStorage.getItem('KameleoonDev__popupIE_showed')) {
            if (document.documentElement.scrollTop === 0) {
                document.querySelector(selectors.popup_container).style.position = 'fixed';
                setParamsForHeader(`90px`,'fixed', `auto`);
            } else if (document.documentElement.scrollTop >= 90) {
                setParamsForHeader('90px','fixed', '150px');
            } 
            
        } else {
            if (document.documentElement.scrollTop === 0) {
                document.querySelector(selectors.popup_container).style.position = 'fixed';
                setParamsForHeader(`246px`,'fixed', `auto`);
            } else if (document.documentElement.scrollTop >= 250) {
                document.querySelector(selectors.popup_container).style.position = 'fixed';
                setParamsForHeader(`246px`,'fixed', `308px`);
            } else if (0 < document.documentElement.scrollTop < 250) {
                document.querySelector(selectors.popup_container).style.position = 'fixed';
                setParamsForHeader(`246px`,'fixed', `308px`);
            }
        }
    });

    function setParamsForHeader(top, position, menusTop) {
        header.style.top = top;
        header.style.position = position;
        headerMenus.forEach(menu => {
            menu.style.top = menusTop;
        });
    }
});

//close popup btn
document
    .querySelector(selectors.popup_closeBtn)
    .addEventListener('mousedown', () => {
        mainContainer.style.top = '90px';
        document.querySelector(selectors.popup_content).style.display = 'none';
        document.querySelector(selectors.popup_content_short).style.display =
            'block';
        Kameleoon.API.Goals.processConversion(
            goals['[T03] Click on close button']
        );
        sessionStorage.setItem('KameleoonDev__popupIE_showed', true);
        sessionStorage.setItem('KameleoonDev__popupIE_clicked', true);
        sessionStorage.setItem(
            'KameleoonDev__popupIE_pageViews',
            Kameleoon.API.CurrentVisit.pageViews
        );
        if (Kameleoon.API.CurrentVisit.conversions['200517']) {
            sessionStorage.setItem('KameleoonDev__popupIE_oreder',  Kameleoon.API.CurrentVisit.conversions['200517']);
        }
    });

//show short popup if closed
Kameleoon.API.Core.runWhenConditionTrue(
    () => {
        return (sessionStorage.getItem('KameleoonDev__popupIE_showed') && document.querySelector(selectors.popup_container));
    },
    () => {
        document.querySelector(selectors.popup_content).style.display = 'none';
        document.querySelector(selectors.popup_content_short).style.display =
            'block';
    }
);

//goals - click on Browser
document
    .querySelectorAll(selectors.popup_browserLink)
    .forEach((browserLinkText) => {
        browserLinkText.addEventListener('mousedown', () => {
            sessionStorage.setItem('KameleoonDev__popupIE_clicked', true);
            Kameleoon.API.Goals.processConversion(
                goals['[T03] Click on browser icons']
            );
        });
    });

//goals - click on Browser name
document
    .querySelectorAll(selectors.popup_browserLinkText)
    .forEach((browserLink) => {
        browserLink.addEventListener('mousedown', () => {
            sessionStorage.setItem('KameleoonDev__popupIE_clicked', true);
            Kameleoon.API.Goals.processConversion(
                goals['[T03] Click on browser icons']
            );
        });
    });

//goals - More than 1 PV after closing popup
Kameleoon.API.Core.runWhenConditionTrue(
    () => {
        return (
            sessionStorage.getItem('KameleoonDev__popupIE_pageViews') !==
                null &&
            Kameleoon.API.CurrentVisit.pageViews >
                +sessionStorage.getItem('KameleoonDev__popupIE_pageViews') +
                    1 &&
            sessionStorage.getItem('KameleoonDev__popupIE_showed') &&
            !Kameleoon.API.CurrentVisit.conversions[
                goals['[T03] More than 1 PV after closing']
            ]
        );
    },
    () => {
        Kameleoon.API.Goals.processConversion(
            goals['[T03] More than 1 PV after closing']
        );
    }
);

//goals - exit after closing popup
window.addEventListener('mousemove', function (event) {
    if (
        event.pageY < 10 &&
        !Kameleoon.API.CurrentVisit.conversions[goals['[T03] Exit after closing']] &&
        sessionStorage.getItem('KameleoonDev__popupIE_showed') &&
        +sessionStorage.getItem('KameleoonDev__popupIE_pageViews') ===
            Kameleoon.API.CurrentVisit.pageViews
    ) {
        event.preventDefault();
        Kameleoon.API.Goals.processConversion(
            goals['[T03] Exit after closing']
        );
    }
});

//goals - Order and Revenue after interaction with banner
Kameleoon.API.Core.runWhenConditionTrue(
    () => {
        return (
            Kameleoon.API.CurrentVisit.conversions['200517'] &&
            sessionStorage.getItem('KameleoonDev__popupIE_clicked') &&
            !sessionStorage.getItem('KameleoonDev__popupIE_oreder')
        );
    },
    () => {
        Kameleoon.API.Goals.processConversion(
            goals['[T03] Order and Revenue after interaction with banner']
        );
    }
);

