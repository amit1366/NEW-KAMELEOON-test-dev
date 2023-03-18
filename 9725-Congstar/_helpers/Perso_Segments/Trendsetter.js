import { localData, triggerValidate } from './utils';

export default class Trendsetter {
    constructor() {
        this.url = window.location.href;
        this.cdName = 'Trendsetter Segment';
        this.names = {
            technikNews: true,
            neuePhone: true,
        };
        this.init();
    }
    conditionOne() {
        const accessUrl = 'https://www.congstar.de/handys/technik-news-trends/';
        if (this.url === accessUrl) {
            localData.setSuccesCondition(this.cdName, 'technikNews');
        }
    }
    conditionTwo() {
        const accessUrl = 'https://www.congstar.de/handys/neue-handys-und-smartphones/';
        if (this.url === accessUrl) {
            localData.setSuccesCondition(this.cdName, 'neuePhone');
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

