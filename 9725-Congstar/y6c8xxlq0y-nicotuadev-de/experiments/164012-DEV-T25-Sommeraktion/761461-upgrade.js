/* eslint-disable no-console */
/* eslint-disable max-len */
const goals = {
    '[T25] Klick on Link ANF S': 282743,
    '[T25] Klick on Link ANF M': 282744,
    '[T25] Klick on Link ANF L': 282745,
    '[T25] Klick on Link ANF XL': 283481,
    '[T25] Klick on Link S,M,L,XL': 282747,
};

const configData = {
    environment: 'https://web-api.nicotuadev.de/cms/content/elements/', // LIVE: https://web-api.congstar.de/cms/content/elements/
};

const selectors = {
    tarifChange: 'li[data-testid*="planConfigurator-postpaidToPostpaid-uspList-item"]',
    tarifChange2: '.comp-usp-list-item__main',
    tarifChange3: '.customer-contract-prolongation-configurator__usps ul li',
    tarifChange4: '.customer-contract-change-configurator__usps.ng-scope ul li ng-bind-html',
    tarifChange4_1: '.customer-contract-change-configurator__usps.ng-scope ul li.icon--plus',
    tarifChange4_2: '.customer-contract-change-configurator__usps.ng-scope ul li.icon--plus:not(.kam-element-added)',
    tarifChange5: '[data-testid="planConfigurator-uspList"] li',
};

const listenerId = 'kam-sub-more-infos';
const template = `<div id="${listenerId}">mehr Infos</div>`;
const templateWhite = `<span id="${listenerId}White" class="icon-list__addition">mehr Infos</span>`;

function changeElement(response) {
    response = response.replaceAll('data-src', 'src');
    document.querySelector('body').insertAdjacentHTML('afterbegin', response);
}

function buildTemplate(congstarContent) {
    const element = `
        <div class="modal" id="kamModal" tabindex="-1" role="dialog"
         aria-modal="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content background-color--bright">
              <div class="modal-header">
                <span id="kamCloseModal" 
                    onClick="document.getElementById('kamModal').style.display = 'none';
                        document.getElementById('kam-backdrop').style.display = 'none'" 
                    class="close icon--close" data-dismiss="modal"
                    style="cursor:pointer">
                </span>
                <h4 class="modal-title">So funktioniert's</h4>
              </div>
              <div class="modal-body">
              ${congstarContent}
            <!--- content input  
                <div class="row row-template--1-col row--relative background-color--bright">
                    <div class="col-12 col-md-12 col-lg-12">
                        <div   id="c8423427"   data-content-id="8423427"   class="ce-text ">
                            <p>
                                <span style="white-space:pre-wrap">
                                In der neuen Allnet Flat M erhältst du <strong>jedes Jahr 
                                automatisch 5 GB mehr Datenvolumen</strong>. 
                                Im ersten Jahr stehen dir jeden Monat 15 GB zur Verfügung, 
                                im zweiten Jahr jeden Monat 20 GB,
                                im dritten Jahr jeden Monat 25 GB usw. <strong>Das Datenvolumen 
                                wächst so lange, wie du in dem Tarif bleibst. </strong>
                                </span>
                            </p>
                        </div>
                        <div id="c8423447"   data-content-id="8423447"   class="ce-image ">
                            <img class="ce-image__image responsive-image" data-aoe-imgix 
 data-src="/fileadmin/files_congstar_responsive/tarife/smart-und-allnet-tarifpakete/modal/2022-06-01-diagramm.svg"
                        src="/blank.gif" alt="" title=""/>
                        </div>
                        <div   id="c8423487"   data-content-id="8423487"   class="ce-text ">
                            <p><span class="icon--info"><span style="white-space:pre-wrap">
                            Bei einem Tarifwechsel wird das angesammelte, 
                            zusätzliche Datenvolumen nicht auf den neuen Tarif übertragen.
                            </span></span></p>
                        </div>
                    </div>
                </div>
                end content input --->
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop" id="kam-backdrop"></div>
        `;
    changeElement(element);
}

function performRequestSelectId(contentID) {
    const url = encodeURI(`${configData.environment}${contentID}`);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('x-api-key', 'Kameleoon');
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            // document.querySelector('body').insertAdjacentHTML('afterbegin', buildTemplate(xhr.responseText));
            buildTemplate(xhr.responseText);
        }
    });
    xhr.send();
}

const toggleKamModal = () => {
    Kameleoon.API.Core.runWhenElementPresent('#kamModal', ([modal]) => {
        modal.style.display = 'block';

        Kameleoon.API.Core.runWhenElementPresent('#kam-backdrop', ([bg]) => {
            bg.style.display = 'block';

            Kameleoon.API.Utils.addEventListener(modal, 'mousedown', (evt) => {
                if (evt.target.id === 'kamModal') {
                    modal.style.display = 'none';
                    bg.style.display = 'none';
                }
            });
        });
    });
};

const addModalClickListener = (sel) => {
    Kameleoon.API.Core.runWhenElementPresent(`#${sel}`, ([btn]) => {
        Kameleoon.API.Utils.addUniversalClickListener(btn, () => {
            toggleKamModal();
            Kameleoon.API.Goals.processConversion(goals['[T25] Klick on Link S,M,L,XL']);
            if (/planid=(423|424)/.test(window.location.href)
                || /handytarife\/allnet-flat-tarife\/allnet-flat-s/.test(window.location.href)) {
                Kameleoon.API.Goals.processConversion(goals['[T25] Klick on Link ANF S']);
            } else if (/planid=(425|426)/.test(window.location.href)
             || /handytarife\/allnet-flat-tarife\/allnet-flat-m/.test(window.location.href)) {
                Kameleoon.API.Goals.processConversion(goals['[T25] Klick on Link ANF M']);
            } else if (/planid=(427|428)/.test(window.location.href)
             || /handytarife\/allnet-flat-tarife\/allnet-flat-l/.test(window.location.href)) {
                Kameleoon.API.Goals.processConversion(goals['[T25] Klick on Link ANF L']);
            } else if (/planid=(429|430)/.test(window.location.href)
             || /handytarife\/allnet-flat-tarife\/allnet-flat-xl/.test(window.location.href)) {
                Kameleoon.API.Goals.processConversion(goals['[T25] Klick on Link ANF XL']);
            }
        });
    });
};

function insertMoreInfoTemplate(selector, templ) {
    selector.insertAdjacentHTML('beforeend', templ);
    addModalClickListener(`${listenerId}White`);
}

function addMoreInfoLink(sel, spa) {
    if (spa === 'spa') {

        Kameleoon.API.Core.runWhenElementPresent(selectors.tarifChange5, (selector) => {
            insertMoreInfoTemplate(selector[1], templateWhite);
        }, 100);

        Kameleoon.API.Core.runWhenElementPresent(selectors.tarifChange, (selector) => {
            insertMoreInfoTemplate(selector[1], templateWhite);
        }, 100);

        Kameleoon.API.Core.runWhenElementPresent(selectors.tarifChange3, (selector) => {
            insertMoreInfoTemplate(selector[1], templateWhite);
        }, 100);

        Kameleoon.API.Core.runWhenElementPresent(selectors.tarifChange4, (selector4) => {
            Kameleoon.API.Core.runWhenElementPresent(selectors.tarifChange4_1, ([selector41]) => {
                Kameleoon.API.Core.runWhenElementPresent(selectors.tarifChange4_2, () => {
                    selector41.classList.add('kam-element-added');
                    insertMoreInfoTemplate(selector4[1], templateWhite);
                    addMoreInfoLink(sel, spa);
                });
            });
        }, 100);
    }
}

function addElement(sel, customer, sendRequest) {
    if (customer === 'new') {
        if (sendRequest) {
            if (/handytarife\/allnet-flat-tarife\/allnet-flat-s/.test(window.location.href)) {
                performRequestSelectId('eVVhbFRuU21XRFdvRVVlVThlWUZ6UT09'); // Allnet Flat S TDS:
            } else if (/handytarife\/allnet-flat-tarife\/allnet-flat-m/.test(window.location.href)) {
                performRequestSelectId('TzcvNE03SjFjbVF4d3M3cXhscnRLZz09'); // Allnet Flat M TDS:
            } else if (/handytarife\/allnet-flat-tarife\/allnet-flat-l/.test(window.location.href)) {
                performRequestSelectId('TmFldkdwMmI3ajk1eGFlcjYxNS9NZz09'); // Allnet Flat L TDS:
            }
        }
        Kameleoon.API.Core.runWhenElementPresent(sel, (elements) => {
            elements[1].insertAdjacentHTML('beforeend', template);
            addModalClickListener(listenerId);
        });
    } else if (customer === 'tariffChange') {
        if (sendRequest) {
            if (/planid=(423|424|438|439)/.test(window.location.href)) {
                performRequestSelectId('MWVSeFVvclNER1lrQllNSXc0WEkrQT09');
                // Tarifwechsel +1 GB (Tarif-IDs 423, 424 = ANF S)
            } else if (/planid=(425|426|427|428|429|430)/.test(window.location.href)) {
                performRequestSelectId('MTdVNXN5MVVNTENTZDVUNXRHdWVwZz09');
                // Tarifwechsel +5 GB (Tarif-IDs 425, 426, 427, 428, 429, 430 = ANF M, ANF L & ANF XL)
            }
        }
        addMoreInfoLink(sel, 'spa');
    }
}

const init = (sendRequest) => {
    if (/handytarife\/allnet-flat-tarife/.test(window.location.href)) {
        addElement(selectors.tarifChange2, 'new', sendRequest);
    } else if (/meincongstar\/tarifwechsel\/tarifkonfigurator/.test(window.location.href)) {
        addElement('', 'tariffChange', sendRequest);
    } else if (/meincongstar\/vertragsverlaengerung\/tarifkonfigurator/.test(window.location.href)) {
        addElement(selectors.tarifChange3, 'tariffChange', sendRequest);
    }
};

init(true);

Kameleoon.API.Core.runWhenElementPresent('[data-testid="planConfigurator-uspList"]', ([targetNode]) => {
    const config = { childList: true, subtree: true };

    const callback = (mutationList, observer) => {
        observer.disconnect();
        init();
        observer.observe(targetNode, config);
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
});
