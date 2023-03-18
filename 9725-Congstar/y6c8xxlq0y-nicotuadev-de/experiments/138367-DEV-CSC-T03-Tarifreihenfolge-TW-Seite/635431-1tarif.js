/* eslint-disable max-len */
const goals = {
    '[DEV|T03|CSC] - Klick CTA - Zum Tarif - 1st tile': 241816,
    '[DEV|T03|CSC] - Click CTA - Weitere Tarife': 241821,
    '[DEV|T03|CSC] - Click CTA any tile': 241819
};

const tarif1 = String(Kameleoon.API.CurrentVisit.customData['[DEV] CSC T03 Tarif 1']); // 408

const goalSelectors = [`.kamMobileElements plan-teaser-bucket[data-test-kameleoon-planteaserbucket="${tarif1}"] .btn-primary`];

const buttonFurther = `
<div id="kamTarif2">
    <a title="Weitere Tarife anzeigen" class="btn-secondary btn-secondary--arrow-right">
        Weitere Tarife anzeigen
    </a>
</div>`;

const buttonBackToVariant = `
<div id="kamBackTo">
    <a title="Empfohlenen Tarif anzeigen" class="btn-secondary btn-secondary--arrow-right">
        Empfohlenen Tarif anzeigen
    </a>
</div>`;

function addGoalListener() {
    Kameleoon.API.Core.runWhenElementPresent(goalSelectors[0], ([elements]) => {
        elements.classList.add('1sttile');
        elements.addEventListener('click', (evt) => {
            Kameleoon.API.Goals.processConversion(goals['[DEV|T03|CSC] - Click CTA any tile']);
            Kameleoon.API.Goals.processConversion(goals['[DEV|T03|CSC] - Klick CTA - Zum Tarif - 1st tile']);
            Kameleoon.API.Data.setCustomData('[DEV] CSC T03 Tarifgroesse', evt.target.closest('a').getAttribute('title'));
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
                goals['[DEV|T03|CSC] - Click CTA - Weitere Tarife']
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

function showAll() {
    Kameleoon.API.Core.runWhenElementPresent('.kamHide', (elements) => {
        elements.forEach((item) => {
            item.classList.remove('kamHide');
        });
        document.querySelector('plan-bucket-slider').insertAdjacentHTML('afterend', buttonBackToVariant);

        document.querySelector('#kamBackTo').addEventListener('click', () => {
            // eslint-disable-next-line no-use-before-define
            initVariation();
            document.getElementById('kamBackTo').remove();
        });
    });
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
                return document.querySelector('div.slider-nav').insertAdjacentHTML('beforebegin', newElement);
            }
            // => soll 408 => 394
        }

        currentPlanTeaserList.some(getTarifElement1);
        showFinalVariation();
    });
}

initVariation();
