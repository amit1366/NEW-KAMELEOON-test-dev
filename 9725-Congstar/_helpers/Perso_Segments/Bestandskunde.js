import { localData, triggerValidate } from './utils';

export default class Bestandskunde {
    constructor() {
        this.names = {
            login: true,
            mail: true,
            goalOrder: true,
            app: true,
        };
        this.cdName = 'Bestandskunde Segment';
        this.url = window.location.href;

        this.init();
    }

    criteriaOne() {
        const isLogin = Kameleoon.API.CurrentVisit.customData['[AI]Login'];

        if (isLogin) {
            localData.setSuccesCondition(this.cdName, 'login');
        }
    }

    criteriaTwo() {
        const crmLink = 'congstar.de/?utm_source=crm&utm_medium=email';
        const systemMail = 'congstar.de/?utm_source=systemmail&utm_medium=email';
        if (this.url.includes(crmLink) || this.url.includes(systemMail)) {
            localData.setSuccesCondition(this.cdName, 'mail');
        }
    }

    criteriaThree() {
        const goalId = 200517;

        const conversionGoals = Kameleoon.API.CurrentVisit.conversions;
        if (conversionGoals[goalId]) {
            localData.setSuccesCondition(this.cdName, 'goalOrder');
        }
    }

    criteriaFour() {
        const regexCongstarApp = /\/utm_source=app-congstar\//;
        const regexMediumApp = /\/utm_medium=app\//;
        if (regexCongstarApp.test(this.url) && regexMediumApp.test(this.url)) {
            localData.setSuccesCondition(this.cdName, 'app');
        }
    }

    check() {
        return triggerValidate(this.names, this.cdName);
    }

    init() {
        this.criteriaOne();
        this.criteriaTwo();
        this.criteriaThree();
        this.criteriaFour();
    }
}
