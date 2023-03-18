import { localData, triggerValidate } from './utils';

export default class GooglePaid {
    constructor() {
        this.names = {
            googleCondition: true,
        };
        this.cdName = 'Google Paid Segment';

        this.init();
    }

    conditionOne() {
        const url = window.location.href;
        const googleAdWordsCheckOne = /^.+\.google(\.com?)?\.[^/.]+\/aclk([\?&#].*|)$/;
        const googleAdWordsCheckTwo = /[?&#]gclid=/;
        const googleContentNetzwerk = /(\?gdnid=\d*)(&glid=\w*)?(&lpid=\d*)?(&dclid=.*)?/;
        if (url.match(googleAdWordsCheckOne)
            || url.match(googleAdWordsCheckTwo)
            || url.match(googleContentNetzwerk)) {
            localData.setSuccesCondition(this.cdName, 'googleCondition');
        }
    }

    check() {
        return triggerValidate(this.names, this.cdName);
    }

    init() {
        this.conditionOne();
    }
}
