const configData = [
    {
        kamId: 'ajF6bzZnNXluZHpuUjlGSVlWdlVHUT09', 
        domElementSelector: '.eft-shop-plan-configurator__contract-duration',
    },
    {
        kamId: 'ajF6bzZnNXluZHpuUjlGSVlWdlVHUT09',
        domElementSelector: '.eft-shop-plan-configurator_promotion'
    }
];

function changeElement(response, domElementSelector) {
    Kameleoon.API.Core.runWhenElementPresent(domElementSelector, (elements) => {
        elements[0].insertAdjacentHTML('afterend', `<div>${response}</div>`);
    });
}

function performRequestSelectId(id, selector) {
    const url = encodeURI(`https://web-api.congstar.de/cms/content/elements/${id}`);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('x-api-key', 'Kameleoon');
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            changeElement(xhr.response, selector);
        }
    });
    xhr.send();
}

configData.forEach((item) => {
    performRequestSelectId(item.kamId, item.domElementSelector);
});
