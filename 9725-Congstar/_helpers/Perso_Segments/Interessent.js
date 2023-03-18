import { elementClickBehaviour, localData, triggerValidate } from './utils';

export default class GooglePaid {
    constructor() {
        this.names = {
            clickLink: true,
            visitPage: true,
        };
        this.cdName = 'Interessent Segment';

        this.init();
    }

    conditionOne() {
        const selectors = ['#c6819287 .btn-primary--service', '#c5768507 a', 'footer .footer-benefit a'];
        Kameleoon.API.Core.runWhenElementPresent('#c6592487[data-tracking-title*="homepage"]', () => {
            selectors.forEach((selector) => elementClickBehaviour(selector, this.cdName, 'clickLink'));
        });
    }

    conditionTwo() {
        const visitPage = /https:\/\/www\.congstar\.de\/handytarife(\/?)(\?|#|$|lte-optionen)/;
        if (visitPage.test(window.location.href)) {
            localData.setSuccesCondition(this.cdName, 'visitPage');
        }
    }

    check() {
        return triggerValidate(this.names, this.cdName);
    }

    init() {
        this.conditionOne();
        this.conditionTwo();
    }
}
