const configData = {
    'kameleoon-config-1': {
        kamId: 'QWN3cytrS1BvcWk3VXdYSVA3Mmo3dz09', 
        domElementSelector: 'body > div.container-fluid.wrapper > div',
        insertElement: 'beforebegin'
    }
};

const goals = {
    '[T04|CSC] - Klick CTA - "Weiter zur Kündigung"': 271575,
    '[T04|CSC] - Klick CTA - "Zum Tarifwechsel"': 271577
};

function furtherToTermination() {
    document.querySelector('div.kam-container.content').style.display = 'none';
    document.querySelector(
        'body > div.container-fluid.wrapper > div:not(.kam-container)'
    ).style.display = 'block';
}

function addGoal() {
    const selectorCancel = '#c8007127 a.btn-secondary--csc';

    Kameleoon.API.Core.runWhenElementPresent(selectorCancel, ([button]) => {
        button.href = '#';
        Kameleoon.API.Utils.addUniversalClickListener(button, () => {
            Kameleoon.API.Goals.processConversion(
                goals['[T04|CSC] - Klick CTA - "Weiter zur Kündigung"']
            );
            furtherToTermination();
        });
        
    }, 200);

    const selectorTariffChange = '#c8007087 a.btn-primary--csc';
    Kameleoon.API.Core.runWhenElementPresent(selectorTariffChange, ([button]) => {
        button.href = 'https://www.congstar.de/meincongstar/tarifwechsel';
        Kameleoon.API.Utils.addUniversalClickListener(button, () => {
            Kameleoon.API.Goals.processConversion(
                goals['[T04|CSC] - Klick CTA - "Zum Tarifwechsel"']
            );
        });
        
    }, 200);

} 

function changeElement(response) {
    const wrapperDiv = document.createElement('div'); 
    wrapperDiv.classList.add('kam-container');
    wrapperDiv.classList.add('content');
    wrapperDiv.innerHTML = response; 
    const container = document.querySelector(configData['kameleoon-config-1'].domElementSelector);
    container.insertAdjacentElement(configData['kameleoon-config-1'].insertElement, wrapperDiv); 
    addGoal();
}

function performRequestSelectId(id) {
    if (id !== '') {
        const url = encodeURI(`https://web-api.congstar.de/cms/content/elements/${id}`);
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.setRequestHeader('x-api-key', 'Kameleoon');
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                changeElement(xhr.response);
            }
        });
        xhr.send();
    }
}

performRequestSelectId(configData['kameleoon-config-1'].kamId);
