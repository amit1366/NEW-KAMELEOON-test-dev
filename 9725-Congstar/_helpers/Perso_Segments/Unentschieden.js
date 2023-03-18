import goals from './goals';
import { localData, tabOpenBehaviour } from './utils';

export default class Unentschieden {
    constructor() {
        this.cdName = 'Unentschieden Tarif Segment';
        this.goalCdName = 'Perso Segments Goals';

        this.url = window.location.href;
        this.names = ['tarifPlanPage', 'tarifTimePage', 'tarifCurrentPage', 'tarifWithIcon', 'tarifTabBehaviour'];
        this.init();
    }

    conditionOne() {
        const isTarifPage = /\/(handytarife|prepaid)\/\w+\//;
        if (isTarifPage.test(this.url)) {
            const pathName = 'tarifPage';
            const isUser = localData.usedUrl(this.cdName, pathName, this.url);
            if (isUser) return;
            localData.updateVisitedUrl(this.cdName, pathName, this.url);
            const data = localData.get(this.cdName);
            if (data[pathName] && data[pathName].length > 3) {
                localData.successCondition(this.cdName, 'tarifPlanPage');
            }
        }
    }

    conditionTwo() {
        const tarifPrepaid = /\/prepaid\/\w+\//;
        const tarifHandy = /\/handytarife\/\w+\//;
        if (tarifPrepaid.test(this.url) || tarifHandy.test(this.url)) {
            const usedGoal = localData.get(this.goalCdName).tarifTimePage;
            if (usedGoal) return;
            const calcTime = 1180 * 60 * 3;
            const dateStart = Date.now();
            const dateEnd = dateStart + calcTime;
            const timerId = setInterval(() => {
                if (dateEnd <= Date.now()) {
                    Kameleoon.API.Goals.processConversion(goals['[GG] Time spent >3,6 Min Tarifseiten']);
                    localData.successCondition(this.goalCdName, 'tarifTimePage');
                    localData.successCondition(this.cdName, 'tarifTimePage');
                    clearInterval(timerId);
                }
            }, 1000 * 5);
        }
    }

    conditionThree() {
        const smartphoneTarifeUrl = 'https://www.congstar.de/handytarife/smartphone-tarife-im-vergleich/';
        const prepaiTarifedUrl = 'https://www.congstar.de/prepaid/prepaid-tarife-vergleich/';
        if (smartphoneTarifeUrl === this.url || prepaiTarifedUrl === this.url) {
            localData.successCondition(this.cdName, 'tarifCurrentPage');
        }
    }

    conditionFour() {
        const accessUrl = 'https://www.congstar.de/handytarife/smartphone-tarife-im-vergleich';
        if (!this.url.includes(accessUrl)) return;
        const options = {
            'allnet-flat': {
                selector: '.btn-primary--postpaid[href*="allnet-flat"]',
                selectorMobile: ['#c6857464', '#c6857304', '#c6857144'],
                maxVisited: 2,
                list: [],
                goalActive: false,
            },
            'prepaid-allnet': {
                selector: '.btn-primary--prepaid[href*="prepaid-wie-ich-will"]',
                selectorMobile: ['#c6859664', '#c6859344', '#c6859024', '#c6858764'],
                maxVisited: 3,
                list: [],
                goalActive: false,
            },
            datentarife: {
                selector: '.btn-primary--postpaid[href*="datentarife/daten"]',
                selectorMobile: ['#c6861124', '#c6860824', '#c6860524'],
                maxVisited: 2,
                list: [],
                goalActive: false,
            },
        };

        function clickTarifBehaviour(btn, maxVisited, key, id) {
            Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
                const isUsedId = options[key].list.filter((elementId) => elementId === id).length;
                if (isUsedId) return;
                options[key].list.push(id);
                if (options[key].list.length >= maxVisited && !options[key].goalActive) {
                    Kameleoon.API.Goals.processConversion(goals['[GG] Starttext clicked in one level']);
                    options[key].goalActive = true;
                    localData.successCondition(this.cdName, 'tarifWithIcon');
                }
            });
        }

        function btnsTarifBehaviour({ selector, maxVisited }, key) {
            Kameleoon.API.Core.runWhenElementPresent(selector, (btns) => {
                btns.forEach((btn) => {
                    const btnId = btn.closest('[id]');
                    const icons = [...btnId.querySelectorAll('.footnote__icon')];
                    if (!icons.length) return;

                    icons.forEach((iconWrap) => {
                        const clickBorder = iconWrap.closest('td');

                        if (!clickBorder) return;
                        const productId = btnId.getAttribute('id');
                        clickTarifBehaviour.call(this, clickBorder, maxVisited, key, productId);
                    });
                });
            });
        }

        function mobileBtnBehaviour({ selectorMobile, maxVisited }, key) {
            selectorMobile.forEach((selector) => {
                Kameleoon.API.Core.runWhenElementPresent(selector, ([product]) => {
                    const icons = [...product.querySelectorAll('.footnote__icon')];
                    const productId = product.getAttribute('id');

                    icons.forEach((icon) => {
                        const iconWrapper = icon.closest('li') || icon.closest('div.ce-text');
                        if (!iconWrapper) return;
                        clickTarifBehaviour.call(this, iconWrapper, maxVisited, key, productId);
                    });
                });
            });
        }

        // eslint-disable-next-line guard-for-in
        for (const key in options) {
            btnsTarifBehaviour.call(this, options[key], key);
            mobileBtnBehaviour.call(this, options[key], key);
        }

    }

    conditionFive() {
        if (!/handytarife|prepaid/.test(window.location.href)) return;
        tabOpenBehaviour({
            filt: [/fair-flat\/$/, /handytarife\/$/, /handytarife\/allnet-flat-(l|m|s)\/$/, /\/prepaid\//],
            dataPath: this.cdName,
            goalName: '',
            folder: 'tarifTabNavigation',
            tabActiveFolder: 'tarifTabBehaviour',
            maxTab: 3,
        });
        tabOpenBehaviour({
            filt: [/handytarife\//],
            dataPath: this.goalCdName,
            goalName: '[GG] >3 tabs open with plan-related content',
            folder: 'foldForGoalTabTarif',
            tabActiveFolder: 'foldForGoalTabTarifActive',
            maxTab: 3,
        });
    }

    check() {
        const data = localData.get(this.cdName);
        const isActiveSegment = this.names.some((name) => data[name]);
        return isActiveSegment ? this.cdName : false;
    }

    init() {
        this.conditionOne();
        this.conditionTwo();
        this.conditionThree();
        this.conditionFour();
        this.conditionFive();
    }
}
