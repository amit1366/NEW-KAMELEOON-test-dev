/* eslint-disable max-len */
/* eslint-disable no-undef */
export default (configData) => {
    
    function changeElement(response) { 
        Kameleoon.API.Core.runWhenElementPresent(configData.domElementSelector, 
            ([contentLoader]) => { 
                // let wrapperDiv = document.createElement('div'); 
                // eslint-disable-next-line max-len

                Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.congstar !== 'undefined' && typeof window.congstar.contentLoader !== 'undefined' && typeof window.congstar.contentLoader.kameleoon !== 'undefined', () => {

                    const wrapperDiv = window.congstar.contentLoader.kameleoon.createElementFromHtmlContent(response);

                    if (configData.insertElement === 'replace') {
                        contentLoader.innerHTML = wrapperDiv.innerHTML;
                    } else {
                        contentLoader.insertAdjacentElement(configData.insertElement, wrapperDiv); 
                    }
                    contentLoader.addEventListener('click', ({ target }) => { 
                        if (target.tagName === 'A') {
                            Kameleoon.API.Goals.processConversion(configData.clickElementGoalId); 
                        }
                    }); 

                }, 200);

            }); 
    }

    function performRequestSelectId(id) {
        const url = encodeURI(`https://web-api.nicotuadev.de/cms/content/elements/${id}`);
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

    performRequestSelectId(configData.kamId);

};
