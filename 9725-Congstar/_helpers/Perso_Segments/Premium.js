import goals from './goals';
import {
    checkScoreForData, localData, pdpBehaviour, scrollFairFlatBehaviour
} from './utils';

export default class Premium {
    constructor() {
        this.cdName = 'Premium Segment';
        this.maxScoreValue = 6;
        this.init();
    }

    conditionOne() {
        const visitPage = 'https://www.congstar.de/handytarife/allnet-flat-tarife/allnet-flat-l/';
        if (window.location.href.includes(visitPage)) {
            const sumScore = 6;
            localData.updateScore(this.cdName, sumScore);
            Kameleoon.API.Core.runWhenElementPresent('a[data-testid="cart-button"]', ([btn]) => {
                Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
                    localData.updateScore(this.cdName, sumScore);
                });
            }, 500);
        }
    }

    conditionTwoBehaviour() {
        const fixedPrice = 800;
        const totalPrice = pdpBehaviour.getPrice();
        const sumScore = 2;
        Kameleoon.API.Core.runWhenElementPresent('.configurator-selection__actions button', ([btn]) => {
            const convertTitle = pdpBehaviour.getName();
            const visitedName = 'viewPdp';
            if (!convertTitle) return;

            if (totalPrice >= fixedPrice) {
                localData.updateScoreWithUrl(this.cdName, visitedName, convertTitle, sumScore);
            }
            if (totalPrice <= fixedPrice) {
                Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
                    localData.updateScoreWithUrl(this.cdName, visitedName, convertTitle, sumScore);
                });
            }
        });
    }

    conditionTwo() {
        const isPhonePdp = pdpBehaviour.findUrl();
        if (!isPhonePdp) return;
        // eslint-disable-next-line max-len
        Kameleoon.API.Core.runWhenConditionTrue(pdpBehaviour.conditionFindTotalPrice, () => this.conditionTwoBehaviour());
    }

    conditionThree() {
        const chooseTarif = /\/(18gb)\/gi/;
        scrollFairFlatBehaviour.call(this, chooseTarif, '[GG] FF 18 interested');
    }

    conditionFour() {
        const accessUrl = 'https://www.congstar.de/handytarife/fair-flat/';
        if (!window.location.href.includes(accessUrl)) return;
        Kameleoon.API.Core.runWhenElementPresent('.configurator-selection__actions button', ([btn]) => {
            Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
                const isActiveTarif = document.querySelector('.speedometer #segments g[data-test-state] g[id="18GB"]');
                const isActiveTarifSelected = isActiveTarif && isActiveTarif.closest('[data-test-state="selected"]');
                if (isActiveTarifSelected) {
                    Kameleoon.API.Goals.processConversion(goals['[GG] A2C FF 18 GB']);
                    localData.updateScore(this.cdName, 6);
                }
            });
        });
    }

    conditionFive() {
        if (!window.location.href.match(/handytarife\/\w+/)) return;
        const sumScore = 2;
        Kameleoon.API.Core.runWhenElementPresent('.configurator-selection__actions button', ([btn]) => {
            const checkboxLTE = document.querySelector('#available-option-2571')
            || document.querySelector('#available-option-2557')
            || document.querySelector('.comp-checkbox__input[id="2571"]');
            const checkboxExtraDaten = document.querySelector('#available-option-2568')
            || document.querySelector('#available-option-2569')
            || document.querySelector('.comp-checkbox__input[id="2568"]')
            || document.querySelector('.comp-checkbox__input[id="2569"]');
            const checkBoxVideo = document.querySelector('#available-option-3556')
            || document.querySelector('.comp-checkbox__input[id="3556"]');
            const checkboxMusic = document.querySelector('#available-option-2424')
            || document.querySelector('.comp-checkbox__input[id="2424"]');
            Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
                if (checkboxLTE && checkboxLTE.checked) {
                    localData.updateScore(this.cdName, sumScore);
                }
                if (checkboxExtraDaten && checkboxExtraDaten.checked) {
                    localData.updateScore(this.cdName, sumScore);
                }
                // eslint-disable-next-line no-use-before-define
                checkboxGoalBehaviour(checkboxLTE, checkBoxVideo, checkboxMusic);
            });
        });

        function checkboxGoalBehaviour(...checkboxs) {
            const isActive = checkboxs.some((checkbox) => checkbox && checkbox.checked);
            if (isActive) {
                Kameleoon.API.Goals.processConversion(goals['[GG] A2C Options']);
            }
        }
    }

    check() {
        return checkScoreForData(this.cdName, this.maxScoreValue);
    }

    init() {
        this.conditionOne();
        this.conditionTwo();
        this.conditionThree();
        this.conditionFour();
        this.conditionFive();
    }
}
