const configData = {
    'kameleoon-deal-closer-1': {
        kamId: 'WHpuUUdCSVg3a1hTdEN0S2hhdkVQQT09', 
        domElementSelector: '#kameleoon-deal-closer-1',
        insertElement: 'beforeend'
    },
    'kameleoon-deal-closer-2': {
        kamId: 'WHpuUUdCSVg3a1hTdEN0S2hhdkVQQT09',
        domElementSelector: '#kameleoon-deal-closer-2',
        insertElement: 'beforeend'
    }
};

function changeElement(response, containerID) {
    const wrapperDiv = document.createElement('div'); 
    wrapperDiv.innerHTML = response; 
    const container = document.getElementById(containerID);
    container.insertAdjacentElement(configData[`${containerID}`].insertElement, wrapperDiv); 
}

function performRequestSelectId(id, containerID) {
    const url = encodeURI(`https://web-api.nicotuadev.de/cms/content/elements/${id}`);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('x-api-key', 'Kameleoon');
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            changeElement(xhr.response, containerID);
        }
    });
    xhr.send();
}

if (!window.kameleoon_dealcloser_ready) {
    window.addEventListener('kameleoon.dealcloser.ready', (evt) => {
        evt.detail.areas.forEach((item) => {
            // configData['kameleoon-deal-closer-1'].kamId
            performRequestSelectId(configData[`${item}`].kamId, item);
        });
    });
} else {
    const detailAreas = ['kameleoon-deal-closer-1', 'kameleoon-deal-closer-2'];

    detailAreas.forEach((item) => {
        performRequestSelectId(configData[`${item}`].kamId, item);
    });
}

function run() {
    const event = new CustomEvent('kameleoon.dealcloser.ready', {
        detail: {
            areas: ['kameleoon-deal-closer-1', 'kameleoon-deal-closer-2']
        }
    });

    // To trigger the Event
    window.dispatchEvent(event);
}

function prerun() {
    // site: https://www.congstar.de/handytarife/allnet-flat-l/
    const selector = '.eft-shop-plan-configurator_promotion';

    const template1 = `<div id='kameleoon-deal-closer-1'></div>`;
    const template2 = `<div id='kameleoon-deal-closer-2'></div>`;

    const tpl1 = document.createElement('div'); 
    tpl1.innerHTML = template1; 

    const tpl2 = document.createElement('div'); 
    tpl2.innerHTML = template2; 

    document.querySelector(selector).insertAdjacentElement('afterbegin', tpl1);
    document.querySelector(selector).insertAdjacentElement('beforeend', tpl2);
}

prerun();
run();
