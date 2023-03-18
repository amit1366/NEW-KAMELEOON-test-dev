/* eslint-disable max-len */
export default (configData, pushData) => {
    
    function addDataLayerPush(action) {
        if (action === 'view') {
            dataLayer.push({
                event: pushData.view.event,
                ecommerce: {
                    promoView: {
                        promotions: [{
                            id: pushData.view.id,
                            name: pushData.view.name,
                            creative: pushData.view.creative,
                            position: pushData.view.position
                        }]
                    }
                }
            });
        } else if (action === 'click') {
            dataLayer.push({
                event: pushData.click.event,
                ecommerce: {
                    promoClick: {
                        promotions: [{
                            id: pushData.click.id,
                            name: pushData.click.name,
                            creative: pushData.click.creative,
                            position: pushData.click.position
                        }]
                    }
                }
            });
        }
    } 

    function changeElement(response) { 
        Kameleoon.API.Core.runWhenElementPresent(configData.domElementSelector, 
            ([contentLoader]) => { 
                Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.congstar !== 'undefined' 
                && typeof window.congstar.contentLoader !== 'undefined' 
                && typeof window.congstar.contentLoader.kameleoon !== 'undefined'
                && typeof window.congstar.contentLoader.kameleoon.createElementFromHtmlContent !== 'undefined', () => {

                    const wrapperDiv = window.congstar.contentLoader.kameleoon.createElementFromHtmlContent(response);

                    if (configData.insertElement === 'replace') {
                        Kameleoon.API.Core.runWhenConditionTrue(() => !!document.querySelector('microservice-include[microservice-key="customermessages"] #message-board'), 
                            () => {
                                contentLoader.innerHTML = `<div>${wrapperDiv.outerHTML}</div>`;
                                addDataLayerPush('view');
                            }, 200);
                    } else {
                        contentLoader.insertAdjacentElement(configData.insertElement, wrapperDiv);
                        addDataLayerPush('view');
                    }
                    contentLoader.addEventListener('click', ({ target }) => { 
                        if (target.tagName === 'A') {
                            Kameleoon.API.Goals.processConversion(configData.clickElementGoalId);
                            addDataLayerPush('click');
                        }
                    }); 

                }, 200);

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
        
    performRequestSelectId(configData.kamId);
        
};
