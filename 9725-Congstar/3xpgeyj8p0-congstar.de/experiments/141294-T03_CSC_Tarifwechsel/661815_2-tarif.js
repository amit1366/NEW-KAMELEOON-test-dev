/* eslint-disable no-console */
/* eslint-disable max-len */
const goals = {
    '[T03|CSC] - Klick CTA - Zum Tarif - 1st tile': 242867,
    '[T03|CSC] - Klick CTA - Zum Tarif - 2nd tile': 242869,
    '[T03|CSC] - Click CTA - Weitere Tarife': 242871,
    '[T03|CSC] - Click CTA any tile': 242864
};

const tarif1 = String(Kameleoon.API.CurrentVisit.customData['CSC T03 Tarif 1']); // 408
const tarif2 = String(Kameleoon.API.CurrentVisit.customData['CSC T03 Tarif 2']); // 394

const goalSelectors = [
    `.kamMobileElements plan-teaser-bucket[data-test-kameleoon-planteaserbucket="${tarif1}"] .btn-primary`, 
    `.kamMobileElements plan-teaser-bucket[data-test-kameleoon-planteaserbucket="${tarif2}"] .btn-primary`
];

const buttonFurther = `
<div id="kamTarif2">
    <a title="Weitere Tarife anzeigen" class="btn-secondary btn-secondary--arrow-right">
        Weitere Tarife anzeigen
    </a>
</div>`;

const buttonBackToVariant = `
<div id="kamBackTo">
    <a title="Empfohlene Tarife anzeigen" class="btn-secondary btn-secondary--arrow-right">
        Empfohlene Tarife anzeigen
    </a>
</div>`;

function addGoalListener() {
    Kameleoon.API.Core.runWhenElementPresent(goalSelectors[0], ([elements]) => {
        elements.classList.add('1sttile');
        elements.addEventListener('click', (evt) => {
            Kameleoon.API.Goals.processConversion(goals['[T03|CSC] - Click CTA any tile']);
            Kameleoon.API.Goals.processConversion(goals['[T03|CSC] - Klick CTA - Zum Tarif - 1st tile']);
            Kameleoon.API.Data.setCustomData('CSC T03 Tarifgroesse', evt.target.closest('a').getAttribute('title'));
        });
    });

    Kameleoon.API.Core.runWhenElementPresent(goalSelectors[1], ([elements]) => {
        elements.classList.add('2ndtile');
        elements.addEventListener('click', (evt) => {
            Kameleoon.API.Goals.processConversion(goals['[T03|CSC] - Click CTA any tile']);
            Kameleoon.API.Goals.processConversion(goals['[T03|CSC] - Klick CTA - Zum Tarif - 2nd tile']);
            Kameleoon.API.Data.setCustomData('CSC T03 Tarifgroesse', evt.target.closest('a').getAttribute('title'));
        });
    });
}

function showFinalVariation() {
    Kameleoon.API.Core.runWhenElementPresent('.slider-nav', ([elements]) => {
        elements.classList.add('kamHide');
    });
    Kameleoon.API.Core.runWhenElementPresent('plan-bucket-slider', ([elements]) => {
        elements.insertAdjacentHTML('afterend', buttonFurther);

        document.querySelector('#kamTarif2').addEventListener('click', () => {
            Kameleoon.API.Goals.processConversion(
                goals['[T03|CSC] - Click CTA - Weitere Tarife']
            );
            // eslint-disable-next-line no-use-before-define
            showAll();
            document.getElementById('kamTarif2').remove();
            document.querySelectorAll('.kamMobileElements').forEach((item) => item.remove());
        });
    });
    document.querySelector('plan-bucket-slider').style.visibility = 'visible';

    addGoalListener();
}

function initVariation() {
    Kameleoon.API.Core.runWhenElementPresent('plan-teaser-bucket', (currentPlanTeaserList) => {
        document.querySelector('div.plan-bucket-slider').classList.add('kamHide');
        document.querySelector('div.plan-bucket-slider').style.height = 'auto';
        document.querySelector('div.plan-bucket-slider').style.overflowY = 'visible';

        function createElement(element) {
            const newTariff1 = element.parentElement;
            const newElement = document.createElement('div');
            newElement.classList.add('kamMobileElements');
            newElement.innerHTML = newTariff1.outerHTML;
            return newElement.outerHTML;
        }

        function getTarifElement1(element) {
            const newElement = createElement(element);
            if (element.getAttribute('data-test-kameleoon-planteaserbucket') === tarif1) {
                console.log('return element1');
                return document.querySelector('div.slider-nav').insertAdjacentHTML('beforebegin', newElement);
            }
        }
        function getTarifElement2(element) {
            const newElement = createElement(element);
            if (element.getAttribute('data-test-kameleoon-planteaserbucket') === tarif2) {
                console.log('return element2');
                return document.querySelector('div.slider-nav').insertAdjacentHTML('beforebegin', newElement);
            }
        }

        currentPlanTeaserList.some(getTarifElement1);
        currentPlanTeaserList.some(getTarifElement2);

        showFinalVariation();
    });
}

function showAll() {
    Kameleoon.API.Core.runWhenElementPresent('.kamHide', (elements) => {
        elements.forEach((item) => {
            item.classList.remove('kamHide');
        });
        document.querySelector('plan-bucket-slider').insertAdjacentHTML('afterend', buttonBackToVariant);

        document.querySelector('#kamBackTo').addEventListener('click', () => {
            initVariation();
            document.getElementById('kamBackTo').remove();
        });
    });
}

initVariation();
