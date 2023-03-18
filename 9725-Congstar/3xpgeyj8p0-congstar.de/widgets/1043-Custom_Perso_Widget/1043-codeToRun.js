/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

/* LIVE code */
function triggerEventLoadingHTMLDone() {
    const loadingKamWidgetDone = new CustomEvent('kameleoon_perso_loading_done');
    document.dispatchEvent(loadingKamWidgetDone);
}

function changeElement(response) {
    Kameleoon.API.Core.runWhenElementPresent(UserData.domElementSelector, ([contentLoader]) => {
        if (contentLoader.getAttribute('changeable') !== 'false') {
            contentLoader.setAttribute('changeable', 'false');
            Kameleoon.API.Core.runWhenConditionTrue(
                () => window.congstar
                    && window.congstar.contentLoader
                    && window.congstar.contentLoader.kameleoon
                    && window.congstar.contentLoader.kameleoon.createElementFromHtmlContent,
                () => {
                    contentLoader.insertAdjacentElement(
                        'beforeend',
                        window.congstar.contentLoader.kameleoon
                            .createElementFromHtmlContent(`<div>${response}</div>`)
                    );
                    const loadingIndicator = contentLoader.querySelector('.loading-indicator');
                    if (loadingIndicator) contentLoader.removeChild(loadingIndicator);
                    contentLoader.addEventListener(`click`, () => {
                        Kameleoon.API.Goals.processConversion(UserData.clickElementGoalId);
                    });
                    triggerEventLoadingHTMLDone();
                }
            );
        } else {
            Kameleoon.API.Goals.processConversion(UserData.fetchGoalId);
        }
    });
}

function performRequestSelectId(id) {
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

const _contentLoader = document.querySelector(UserData.domElementSelector);
if (!_contentLoader || (_contentLoader && _contentLoader.getAttribute('changeable') !== 'false')) {
    performRequestSelectId(UserData.kamId);
} else {
    Kameleoon.API.Goals.processConversion(UserData.fetchGoalId);
}
