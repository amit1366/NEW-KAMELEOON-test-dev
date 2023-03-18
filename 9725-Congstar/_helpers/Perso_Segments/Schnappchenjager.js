import goals from './goals';
import {
    checkScoreForData, localData, pdpBehaviour, scrollFairFlatBehaviour
} from './utils';

export default class Schnappchenjager {
    constructor() {
        this.cdName = 'Schnappchenjager Segment';
        this.url = window.location.href;
        this.maxScoreValue = 6;
        this.prepraidSmallTarifUrl = 'https://www.congstar.de/prepaid/prepaid-wie-ich-will/basic-s/';
        this.tarifSmallTraifUrl = 'https://www.congstar.de/handytarife/allnet-flat-tarife/allnet-flat-s/';
        this.tarilLikeIWantUrl = 'https://www.congstar.de/prepaid/prepaid-wie-ich-will/prepaid-karte/';
        this.accessUrl = 'https://www.congstar.de/handytarife/fair-flat/';
        this.cartURL = 'https://www.congstar.de/checkout/warenkorb';
        this.init();
    }

    conditionOne() {
        const sumScore = 6;
        if (this.url.includes(this.prepraidSmallTarifUrl)
            || this.url.includes(this.tarifSmallTraifUrl)) {
            Kameleoon.API.Core.runWhenElementPresent(
                `a[data-testid="cart-button"], .configurator-selection__actions button`,
                ([btn]) => {
                    Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
                        localData.updateScore(this.cdName, sumScore);
                    });
                },
                500);

        } else if (window.location.href.includes(this.accessUrl)) {
            Kameleoon.API.Core.runWhenElementPresent('.configurator-selection__actions button', ([btn]) => {
                Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
                    const isActiveTarif = document.querySelector('.speedometer #segments g[data-test-state] g[id="5GB"]');
                    const isActiveTarifSelected = isActiveTarif && isActiveTarif.closest('[data-test-state="selected"]');
                    if (isActiveTarifSelected) {
                        localData.updateScore(this.cdName, sumScore);
                    }
                });
            });
        } else if (window.location.href.includes(this.cartURL)) {
            const [cartEvent] = window.dataLayer.filter(
                (data) => data.ecommerce && data.ecommerce.add
                        && data.ecommerce.add.products && data.ecommerce.add.products,
            );
            cartEvent.ecommerce.add.products.forEach((product) => {
                if (product.id === 371 // Prepaid wie ich will (2. Generation) (id: 371)
                    || product.id === 2603 // Datenstufe 5 GB" (id: 2603)
                    || product.id === 432) { // Prepaid ANF M (id=432)
                    localData.updateScore(this.cdName, sumScore);
                }
            });
        }
    }

    conditionTwo() {
        if (this.url === this.prepraidSmallTarifUrl
            || this.url === this.tarifSmallTraifUrl
            || this.url === this.tarilLikeIWantUrl) {
            const sumScore = 2;
            const listVisitedUrlName = 'tarifUrl';
            localData.updateScoreWithUrl(this.cdName, listVisitedUrlName, this.url, sumScore);
        }
    }

    conditionThree() {
        if (!pdpBehaviour.findUrl()) return;
        const listUrlName = 'visitedPdp';
        const maxSum = 2;
        Kameleoon.API.Core.runWhenConditionTrue(pdpBehaviour.conditionFindTotalPrice, () => {
            Kameleoon.API.Core.runWhenElementPresent('h1.device-details__title', ([titleElem]) => {
                const title = pdpBehaviour.getName(titleElem);
                const price = pdpBehaviour.getPrice();
                const maxPrice = 500;
                if (price <= maxPrice) {
                    localData.updateScoreWithUrl(this.cdName, listUrlName, title, maxSum);
                }
            });
        });
    }

    conditionFour() {
        if (!this.url.includes('handys')) return;
        const activeUrls = [
            'https://www.congstar.de/handys/handy-angebote/',
            'https://www.congstar.de/handys/handy-angebote/1-euro-anzahlung/',
            'https://www.congstar.de/handys/technik-news-trends/smartphones-unter-400-euro/',
            'https://www.congstar.de/handys/gebrauchte-handys/',
        ];
        const isActiveUrl = activeUrls.filter((url) => url === this.url).length;
        const maxSum = 2;
        const listHandysViewed = 'handysViewed';
        if (isActiveUrl) {
            Kameleoon.API.Goals.processConversion(goals['[GG] Angebote-Seiten']);
            localData.updateScoreWithUrl(this.cdName, listHandysViewed, this.url, maxSum);
        }
    }

    fiveConditionBehaviour() {
        const maxSum = 2;
        const sortActiveFolder = 'sortName';
        Kameleoon.API.Core.runWhenElementPresent('#sorting', (selects) => {
            const activeChange = 'priceAsc';
            selects.forEach((select) => {
                select.addEventListener('change', () => {
                    if (activeChange === select.value) {
                        Kameleoon.API.Goals.processConversion(goals['[GG] Sort by Preis aufsteigend']);
                        localData.updateScoreWithUrl(
                            this.cdName, sortActiveFolder, activeChange, maxSum
                        );
                    }
                });
            });
        });
        Kameleoon.API.Core.runWhenElementPresent('input[name="price"]', (inputs) => {
            const radioGoalsBehaviour = {
                addScore: (id) => {
                    localData.updateScoreWithUrl(this.cdName, 'rangeSlider', id, 2);
                },
                'radio-price-monthlyPrice': (num, id) => {
                    if (num < 20) {
                        Kameleoon.API.Goals.processConversion(goals['[GG] Filter monatlicher Preis <20€']);
                        this.addScore(id);
                    }
                },
                'radio-price-oneTimePrice': (num, id) => {
                    if (num < 500) {
                        Kameleoon.API.Goals.processConversion(goals['[GG] Click Filter Einmalpreis <500€']);
                        this.addScore(id);
                    }
                },
            };
            inputs.forEach((input) => {
                input.addEventListener('change', () => this.rangeSliderBehaviour(inputs, radioGoalsBehaviour));
            });
            this.rangeSliderBehaviour(inputs, radioGoalsBehaviour);
        });
        this.checkboxFilterBehaviour({
            selector: 'input[value="is_like_new"]',
            visitedPath: sortActiveFolder,
            goal: '[GG] Filter Artikelzustand=neuwertig',
            score: 2,
        });
        this.checkboxFilterBehaviour({
            selector: 'input[value="promotion"]',
            visitedPath: sortActiveFolder,
            goal: '[GG] Click filter Nur Aktionsangebote',
            score: 2,
            goalBehaviour: true,
        });
    }

    conditionFive() {
        const allPhone = 'https://www.congstar.de/handys/alle-handys/';
        const producerPhone = /\/handys\/\w+\/$\//;
        if (this.url === allPhone || this.url.match(producerPhone)) {
            this.fiveConditionBehaviour();
        }
    }

    rangeSliderBehaviour(inputs, goalOptions) {
        Kameleoon.API.Core.runWhenElementPresent('.range-facet', ([slider]) => {
            const value = document.querySelector('.rz-model-value');
            if (!value) return;
            let oldValue = value.innerText;
            slider.addEventListener('mouseup', () => {
                if (value.innerText !== oldValue) {
                    this.rangeSliderGoalBehaviour(inputs, value.innerText, goalOptions);
                }
                oldValue = value.innerText;
            });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    rangeSliderGoalBehaviour(inputs, value, goalOption) {
        const valueNum = parseInt(value, 10);
        const [currentInput] = inputs.filter((input) => input.checked);
        const inputId = currentInput.getAttribute('id');
        if (goalOption[inputId]) goalOption[inputId](valueNum, inputId);
    }

    checkboxFilterBehaviour({
        selector, visitedPath, goal, score, goalBehaviour = false,
    }) {
        Kameleoon.API.Core.runWhenElementPresent(selector, ([input]) => {
            input.addEventListener('change', () => {
                if (goalBehaviour) {
                    Kameleoon.API.Goals.processConversion(goals[goal]);
                } else if (input.checked) {
                    Kameleoon.API.Goals.processConversion(goals[goal]);
                }
                if (input.checked) {
                    localData.updateScoreWithUrl(this.cdName, visitedPath, selector, score);
                }
            });
        });
    }

    conditionSix() {
        const chooseTarif = /\/(5gb)\/gi\//;
        scrollFairFlatBehaviour.call(this, chooseTarif);
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
        this.conditionSix();
    }
}
