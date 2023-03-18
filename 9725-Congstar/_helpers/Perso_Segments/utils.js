/* eslint-disable no-use-before-define */
import goals from './goals';

const scoreSegments = ['Schnappchenjager Segment', 'Premium Segment'];
export function triggerValidate(values, cdName) {
    const data = localStorage.getItem(cdName);
    if (!data) return false;

    const dataParse = JSON.parse(data);
    // eslint-disable-next-line guard-for-in
    for (const key in values) {
        const currentKey = dataParse.find((value) => value === key);
        if (currentKey) return cdName;
    }
    return false;
}
function pushScoreSegment(cdname) {
    const data = localData.get('Group Segment Behaviour');
    if (data.groupTwo !== cdname) {
        const anotherSegment = scoreSegments.filter((name) => name !== cdname);
        Kameleoon.API.Data.setCustomData(cdname, true);
        Kameleoon.API.Data.resetCustomData(anotherSegment[0]);
        localStorage.removeItem(anotherSegment[0]);
        localData.set('Group Segment Behaviour', {
            ...data,
            groupTwo: cdname,
        });
    }
}
export function checkScoreForData(dataName, scoreValue) {
    const data = localStorage.getItem(dataName);
    if (!data) return false;
    const dataParse = JSON.parse(data);
    const isActiveSegment = dataParse.score >= scoreValue;
    return isActiveSegment ? dataName : false;
}
export const localData = {
    get: (name) => {
        const data = localStorage.getItem(name);
        const defaultData = {
            score: 0,
        };
        return data ? JSON.parse(data) : defaultData;
    },
    setSuccesCondition: (name, condition) => {
        const data = localStorage.getItem(name);
        const dataParse = data ? JSON.parse(data) : [];
        const findUsedCondition = dataParse.filter((term) => term === condition);
        if (findUsedCondition.length) return;
        dataParse.push(condition);
        localStorage.setItem(name, JSON.stringify(dataParse));
    },
    set: (name, data) => {
        localStorage.setItem(name, JSON.stringify(data));
    },
    updateScore(name, sumScore) {
        const oldData = this.get(name);
        this.set(name, {
            ...oldData,
            score: oldData.score + sumScore,
        });
        if (scoreSegments.includes(name) && this.get(name).score >= 6) {
            pushScoreSegment(name);
        }
    },
    updateScoreWithUrl(name, listName, url, score) {
        const isChecked = this.usedUrl(name, listName, url);
        if (isChecked) return;
        this.updateVisitedUrl(name, listName, url);
        this.updateScore(name, score);
    },
    updateVisitedUrl(name, listName, url) {
        const oldData = this.get(name);
        const list = oldData[listName] || [];
        const isUsed = this.usedUrl(name, listName, url);
        if (!isUsed) {
            list.push(url);
        }
        this.set(name, { ...oldData, [listName]: list });
        return this.get(name);
    },
    removeVisitedrUrl(name, listName) {
        const oldData = this.get(name);
        this.set(name, { ...oldData, [listName]: [] });
    },
    successCondition(name, condition) {
        const data = this.get(name);
        data[condition] = true;
        this.set(name, data);
    },
    usedUrl(name, listName, url) {
        const oldData = this.get(name);
        const list = oldData[listName] || [];
        return list.filter((listUrl) => listUrl === url).length;
    },
};

export const pdpBehaviour = {
    getName: (titleWrap = false) => {
        const title = titleWrap || document.querySelector('h1.device-details__title');
        if (!title) return;
        const titleName = title.innerText.toLowerCase();
        const convertTitle = titleName.split(' ').join('-');
        return convertTitle;
    },
    getPrice: () => {
        const [totalPriceInfo] = window.dataLayer.filter(
            (data) => data.ecommerce && data.ecommerce.detail
                && data.ecommerce.detail.products && data.ecommerce.detail.products.length,
        );
        const totalPrice = totalPriceInfo.ecommerce.detail.products[0].price;
        return totalPrice;
    },
    conditionFindTotalPrice: () => (
        window.dataLayer
            && window.dataLayer.filter((data) => data.ecommerce
            && data.ecommerce.detail && data.ecommerce.detail.products
            && data.ecommerce.detail.products.length).length
    ),
    findUrl: () => {
        const isPhonePdp = window.location.href.match(/handys\/details\/.+/);
        const isExcludeDevice = window.location.href.match(/(router|watch|buds|airpods)/i);
        return isPhonePdp && !isExcludeDevice;
    },
};
export function elementClickBehaviour(selector, cdName, trigger) {
    Kameleoon.API.Core.runWhenElementPresent(selector, (elements) => {
        elements.forEach((element) => {
            Kameleoon.API.Utils.addUniversalClickListener(element, () => {
                localData.setSuccesCondition(cdName, trigger);
            });
        });
    });
}
export function scrollFairFlatBehaviour(regex, goal = false) {
    const accessUrl = 'https://www.congstar.de/handytarife/fair-flat/';
    if (!window.location.href.includes(accessUrl)) return;
    Kameleoon.API.Core.runWhenElementPresent('.speedometer #segments', ([speedometerWrap]) => {
        let scoreBehaviour = false;
        let isSumScore = false;
        const observ = new MutationObserver(() => {
            const activeTarif = [...speedometerWrap.children].find((el) => el.getAttribute('data-test-state') === 'selected');
            const isAccessTarif = activeTarif.querySelector('.segment-text').getAttribute('id').match(regex);
            if (isAccessTarif) {
                isSumScore = true;
            } else {
                if (isSumScore && scoreBehaviour) {
                    localData.updateScore(this.cdName, -2);
                }
                isSumScore = false;
            }
            scoreBehaviour = false;
        });
        observ.observe(speedometerWrap, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['data-test-state'],
        });
        Kameleoon.API.Core.runWhenElementPresent('.configurator-selection__actions button', ([btn]) => {
            const windowHeight = window.innerHeight;
            window.addEventListener('scroll', () => {
                const btnTop = btn.getBoundingClientRect().top;
                if (btnTop <= windowHeight && isSumScore && !scoreBehaviour) {
                    localData.updateScore(this.cdName, 2);
                    if (goal) {
                        Kameleoon.API.Goals.processConversion(goals[goal]);
                    }
                    scoreBehaviour = true;
                }
            });
        });
    });
}

export function tabOpenBehaviour({
    filt, folder, maxTab, tabActiveFolder, goalName, dataPath,
}) {
    const accessUrls = filt;
    const url = window.location.href;
    const isAccessUrl = accessUrls.filter((regex) => url.match(regex));
    if (isAccessUrl.length && (window.history.length === 1 || !document.referrer)) {
        localData.updateVisitedUrl(dataPath, folder, url);
        const data = localData.get(dataPath);
        if (data[folder].length >= maxTab) {
            Kameleoon.API.Goals.processConversion(goals[goalName]);
            localData.successCondition(dataPath, tabActiveFolder);
            localData.removeVisitedrUrl(dataPath, folder);
        }
    } else {
        localData.removeVisitedrUrl(dataPath, folder);
    }
}
