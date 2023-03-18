/* eslint-disable max-len */
/* eslint-disable no-console */
function changingElement(configData, pushData) {

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

                Kameleoon.API.Core.runWhenConditionTrue(() => typeof window.congstar !== 'undefined' && typeof window.congstar.contentLoader !== 'undefined' && typeof window.congstar.contentLoader.kameleoon !== 'undefined', () => {

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

}

/* eslint-disable max-len */

const configData = {
    kamId: 'SmlraG10ak5IRlpDeVRUazVVQVU5Zz09', 
    insertElement: 'replace', // replace, beforebegin, afterbegin, beforeend, afterend
    clickElementGoalId: '238182',
    domElementSelector: 'microservice-include[microservice-key="customermessages"]'
};

const pushData = {
    view: {
        event: 'customerMessages.messageBoard.viewMessage', 
        id: 'MB1', 
        name: 'Einfach mehr für dich drin: Die Allnet Flat M',
        creative: 'messageboard',
        position: 'CSC Perso T02 Komplexe Bühne'
    },
    click: {
        event: 'customerMessages.messageBoard.callToAction', 
        id: 'MB1', 
        name: 'Einfach mehr für dich drin: Die Allnet Flat M',
        creative: 'messageboard',
        position: 'CSC Perso T02 Komplexe Bühne'
    }
};

changingElement(configData, pushData);
