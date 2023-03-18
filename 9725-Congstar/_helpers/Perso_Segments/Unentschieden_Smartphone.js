import { localData, tabOpenBehaviour } from './utils';
import goals from './goals';

export default class UnentschiedenSmartphone {
    constructor() {
        this.cdName = 'Unentschieden Smartphone Segment';
        this.names = ['phoneTime', 'phonePage', 'phoneTabClick', 'phoneTabActive'];
        this.url = window.location.href;
        this.goalCdName = 'Perso Segments Goals';
        this.init();
    }

    conditionOne() {
        const isActiveUrl = 'https://www.congstar.de/handys/';
        if (!this.url.includes(isActiveUrl)) return;
        const threMins = 180;
        const startValue = 1;
        const isUsedGoal = localData.get(this.goalCdName).phoneTime;
        if (isUsedGoal) return;

        function comparingTime({ threeMins, timeBehaviour }, timerId) {
            if (timeBehaviour >= threeMins) {
                Kameleoon.API.Goals.processConversion(goals['[GG] Time spent >3 Min Handyseiten']);
                localData.successCondition(this.cdName, 'phoneTime');
                localData.successCondition(this.goalCdName, 'phoneTime');
                clearInterval(timerId);
            }
        }

        const timerId = setInterval(() => {
            const data = localData.get(this.goalCdName);
            const value = data.timeBehaviour || startValue;
            localData.set(this.goalCdName, {
                ...data,
                timeBehaviour: value + 1,
                threMins,
            });
            comparingTime.call(this, localData.get(this.goalCdName), timerId);
        }, 1000 * 1);
    }

    conditionTwo() {
        const isPhonePage = 'https://www.congstar.de/handys/';
        const isExcludeDevice = window.location.href.match(/(router|watch|buds|airpods)/i);
        if (!this.url.includes(isPhonePage) || isExcludeDevice) return;
        const phoneUrlsFolder = 'phonePageUrls';
        localData.updateVisitedUrl(this.cdName, phoneUrlsFolder, this.url);
        const data = localData.get(this.cdName);
        const usedGoal = localData.get(this.goalCdName).phonePdpPage;
        if (data[phoneUrlsFolder] && data[phoneUrlsFolder].length > 3 && !usedGoal) {
            localData.successCondition(this.cdName, 'phonePdpPage');
            localData.successCondition(this.goalCdName, 'phonePage');
            localData.removeVisitedrUrl(this.cdName, phoneUrlsFolder);
            Kameleoon.API.Goals.processConversion(goals['[GG] > 3 smartphone pages']);
        }
    }

    conditionThree() {
        const isPhonePage = 'https://www.congstar.de/handys/details/';
        if (!this.url.includes(isPhonePage)) return;
        let count = 0;
        const triggerCount = 3;
        let isActiveGoal = false;
        Kameleoon.API.Core.runWhenElementPresent('.device-detail-tab__title', (tabTitles) => {
            tabTitles.forEach((tabTitle) => {
                Kameleoon.API.Utils.addUniversalClickListener(tabTitle, () => {
                    count += 1;
                    if (count >= triggerCount && !isActiveGoal) {
                        isActiveGoal = true;
                        localData.successCondition(this.cdName, 'phoneTabClick');
                        Kameleoon.API.Goals.processConversion(goals['[GG] Extensive clicks tabs Handyseiten']);
                    }
                });
            });
        });
    }

    conditionFour() {
        tabOpenBehaviour({
            filt: [/handys\//],
            dataPath: this.cdName,
            goalName: '[GG] >3 tabs open with handy-related content',
            folder: 'phoneTabUrls',
            tabActiveFolder: 'phoneTabActive',
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
    }
}
