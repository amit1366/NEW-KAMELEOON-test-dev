const configData = {
    'kameleoon-deal-closer-1': {
        kamId: '', 
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
    if (id !== '') {
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
