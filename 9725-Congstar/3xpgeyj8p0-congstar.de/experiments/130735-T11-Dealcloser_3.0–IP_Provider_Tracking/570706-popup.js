const visitedPagesArray = Kameleoon.API.Data.readLocalData('visitedPagesNew') || [];
const visitedFlatS = visitedPagesArray
    .some((item) => item.visitedPage === '/handytarife/allnet-flat-s/');
const visitedFlatM = visitedPagesArray
    .some((item) => item.visitedPage === '/handytarife/allnet-flat-m/');
const visitedFlatL = visitedPagesArray
    .some((item) => item.visitedPage === '/handytarife/allnet-flat-l/');
const goals = {
    '[T11] Click on Popup CTA': 234171,
};
const visitedAmountValue = Kameleoon.API.Data.readLocalData('visitedAmount') || true;

const flat = {
    flatS: {
        name: 'Allnet Flat S',
        onlineAdvantage: '3 GB statt 2 GB',
        url: 'https://www.congstar.de/portal/handytarife/allnet-flat-s/?sp=cweb&cc=rb-12fskw',
        bonus: '25'
    },
    flatM: {
        name: 'Allnet Flat M',
        onlineAdvantage: '10 GB statt 6 GB',
        url: 'https://www.congstar.de/portal/handytarife/allnet-flat-m/?sp=cweb&cc=rb-12klzu',
        bonus: '50'
    },
    flatL: {
        name: 'Allnet Flat L',
        onlineAdvantage: '20 GB statt 10 GB',
        url: 'https://www.congstar.de/portal/handytarife/allnet-flat-l/?sp=cweb&cc=rb-12lzbs',
        bonus: '75'
    }
};

function offerMarkup(bonus) {
    return `
        <li>
            Wechselbonus: Rufnummer mitbringen und ${bonus} € sichern! 
            Weitere Informationen zum Angebot und der Rufnummernmitnahme findest du 
        </li>
    `;
}

function getCookie(name) {
    const regex = new RegExp(`${name}=([^;]+)`);
    const value = document.cookie.match(regex);
    return value ? value[1] : false;
}

function addPopup(selector, {
    name, onlineAdvantage, url, bonus 
}) {
    const popupMarkup = `
        <div class="deal-popup">
            <div class="deal-popup__container">
                <div class="deal-popup__close">
                    <div class="close__icon"></div>
                </div>
                <div class="deal-popup__headline">
                    <h2>Unser persönliches Vorteilsangebot für dich!</h2>
                </div>
                <div class="deal-popup__content">
                    <div class="content__header">
                        <h3 class="content__header__headline">${bonus}€ Wechselbonus</h3>
                    </div>
                    <div class="content__body">
                        <p class="body__text">
                            Wechsel jetzt zu congstar! 
                            Buche eine <b>${name}</b> 
                            und bekomme <b>${bonus}€ Wechselbonus</b> bei Rufnummernmitnahme.
                        </p>
                        <div class="row">
                            <div class="col-8">
                                <ul class="body__list">
                                    <li>Telefonie und SMS Flat</li>
                                    <li>
                                        Online Vorteil:<br/>
                                        <b>${onlineAdvantage}</b>
                                    </li>
                                    <li>Ohne Vertragslaufzeit wählbar</li>
                                </ul>
                            </div>
                            <div class="col-4">
                                <div class="d-netz">
                                    <div class="d-netz__icon">
                                        <img src="https://storage.kameleoon.com/congstar/dealcloser-ip-provider-tracking/D_Netz-Icon_mitText.png" alt="D-Netz Icon" />
                                    </div>
                                    <p class="d-netz__text">
                                        Beste<br/> 
                                        D-Netz<br/>
                                        Qualität
                                    </p>
                                </div>
                            </div>
                        </div>
                        <a class="body__cta" href=${url}>Zur ${name}</a>
                        <span class="body__hint">
                            Hinweis: Das Angebot ist personalisiert 
                            und nur auf diesem Smartphone buchbar.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;

    selector.insertAdjacentHTML('beforeEnd', popupMarkup);

    const popup = document.querySelector('.deal-popup');
    const popupCloseBtn = popup.querySelector('.deal-popup__close .close__icon');
    const popupCTA = popup.querySelector('.body__cta');

    popupCTA.addEventListener('click', () => {
        Kameleoon.API.Goals.processConversion(goals['[T11] Click on Popup CTA']);
    });

    popupCloseBtn.addEventListener('click', () => {
        popup.remove();
    });
}

function generatePopup() {
    if (visitedAmountValue === true || visitedAmountValue < Kameleoon.API.Visitor.numberOfVisits) {
        if (typeof visitedAmountValue === 'number') {
            Kameleoon.API.Data.writeLocalData('visitedAmount', 'capped');
        } else {
            Kameleoon.API.Data
                .writeLocalData('visitedAmount', Kameleoon.API.Visitor.numberOfVisits);
        }

        if (visitedFlatM && visitedFlatL && visitedFlatS) {
            const flatSObj = visitedPagesArray
                .find((item) => item.visitedPage === '/handytarife/allnet-flat-s/');
            const flatMObj = visitedPagesArray
                .find((item) => item.visitedPage === '/handytarife/allnet-flat-m/');
            const flatLObj = visitedPagesArray
                .find((item) => item.visitedPage === '/handytarife/allnet-flat-l/');

            if (flatSObj.timeSpend > flatMObj.timeSpend && flatSObj > flatLObj.timeSpend) {
                addPopup(document.querySelector('body'), flat.flatS);
            } else if (flatMObj.timeSpend > flatLObj.timeSpend 
                && flatMObj.timeSpend > flatSObj.timeSpend) {
                addPopup(document.querySelector('body'), flat.flatM);
            } else if (flatLObj.timeSpend >= flatMObj.timeSpend 
                && flatLObj.timeSpend >= flatSObj.timeSpend) {
                addPopup(document.querySelector('body'), flat.flatL);
            }
        } else if (visitedFlatM && visitedFlatL && !visitedFlatS) {
            const flatMObj = visitedPagesArray
                .find((item) => item.visitedPage === '/handytarife/allnet-flat-m/');
            const flatLObj = visitedPagesArray
                .find((item) => item.visitedPage === '/handytarife/allnet-flat-l/');

            if (flatMObj.timeSpend > flatLObj.timeSpend) {
                addPopup(document.querySelector('body'), flat.flatM);
            } else if (flatMObj.timeSpend <= flatLObj.timeSpend) {
                addPopup(document.querySelector('body'), flat.flatL);
            }
        } else if (visitedFlatS && visitedFlatL && !visitedFlatM) {
            const flatSObj = visitedPagesArray
                .find((item) => item.visitedPage === '/handytarife/allnet-flat-s/');
            const flatLObj = visitedPagesArray
                .find((item) => item.visitedPage === '/handytarife/allnet-flat-l/');

            if (flatSObj.timeSpend > flatLObj.timeSpend) {
                addPopup(document.querySelector('body'), flat.flatS);
            } else if (flatSObj.timeSpend <= flatLObj.timeSpend) {
                addPopup(document.querySelector('body'), flat.flatL);
            }
        } else if (visitedFlatS && visitedFlatM && !visitedFlatL) {
            const flatSObj = visitedPagesArray
                .find((item) => item.visitedPage === '/handytarife/allnet-flat-s/');
            const flatMObj = visitedPagesArray
                .find((item) => item.visitedPage === '/handytarife/allnet-flat-m/');

            if (flatSObj.timeSpend > flatMObj.timeSpend) {
                addPopup(document.querySelector('body'), flat.flatS);
            } else if (flatSObj.timeSpend <= flatMObj.timeSpend) {
                addPopup(document.querySelector('body'), flat.flatM);
            }
        } else if (visitedFlatS) {
            addPopup(document.querySelector('body'), flat.flatS);
        } else if (visitedFlatM) {
            addPopup(document.querySelector('body'), flat.flatM);
        } else if (visitedFlatL) {
            addPopup(document.querySelector('body'), flat.flatL);
        }
    }
}

function modalLinkClick(modalLink, bonus) {
    modalLink.addEventListener('click', () => {
        Kameleoon.API.Core.runWhenElementPresent('#c6821147', ([doneBox]) => {
            doneBox.querySelectorAll('p strong')[1].innerText = ` ${bonus}€ Gutschrift `;
        });
    });
}

function addPromoText() {
    Kameleoon.API.Core
        .runWhenElementPresent('.eft-shop-plan-configurator_promotion .promotion-text', 
            ([promoText]) => {
                const label = promoText.querySelector('.promotion-text__label');
                const textDesc = promoText.querySelector('.promotion-text__description');
                const textDescChecklist = textDesc.querySelector('.checklist');
                const modalLink = document.querySelector('a[href="https://www.congstar.de/hilfe-service/rufnummernmitnahme-so-gehts-kurz-mf/"]');
            
                label.textContent = 'Dein persönliches Angebot';

                textDescChecklist.querySelectorAll('li').forEach((item) => {
                    item.remove();
                });

                textDescChecklist.append(modalLink);

                if (document.location.pathname.includes('allnet-flat-s')) {
                    textDescChecklist.insertAdjacentHTML('beforeEnd', 
                        offerMarkup(flat.flatS.bonus));
                    modalLinkClick(modalLink, flat.flatS.bonus);
                } else if (document.location.pathname.includes('allnet-flat-m')) {
                    textDescChecklist.insertAdjacentHTML('beforeEnd', 
                        offerMarkup(flat.flatM.bonus));
                    modalLinkClick(modalLink, flat.flatM.bonus);
                } else if (document.location.pathname.includes('allnet-flat-l')) {
                    textDescChecklist.insertAdjacentHTML('beforeEnd', 
                        offerMarkup(flat.flatL.bonus));
                    modalLinkClick(modalLink, flat.flatL.bonus);
                }

                textDescChecklist.querySelector('li').appendChild(modalLink);
            });

    Kameleoon.API.Core.runWhenElementPresent('#c5519167 .footnote', ([footnote]) => {
        const textElem = footnote.closest('p');

        if (textElem) {
            const text = textElem.innerText;
            const splittedText = text.split(/\d+/);

            if (document.location.pathname.includes('allnet-flat-s')) {
                textElem.innerText = `${splittedText[0]} ${flat.flatS.bonus} ${splittedText[1]}`;
            } else if (document.location.pathname.includes('allnet-flat-m')) {
                textElem.innerText = `${splittedText[0]} ${flat.flatM.bonus} ${splittedText[1]}`;
            } else if (document.location.pathname.includes('allnet-flat-l')) {
                textElem.innerText = `${splittedText[0]} ${flat.flatL.bonus} ${splittedText[1]}`;
            }
        }
    });
}

function addCartPopup(bonus) {
    const popupMarkup = `
        <div class="cart-popup">
            <div class="cart-popup__container">
                <div class="cart-popup__headline">
                    <h2>Bitte Rufnummermitnahme im Warenkorb auswählen!</h2>
                    <div class="close__icon"></div>
                </div>
                <div class="cart-popup__content">
                    <p class="content__text">
                        Die Gutschrift in Höhe von ${bonus} € erfolgt 
                        nur beim Abschluss eines Neuvertrages 
                        und der gleichzeitigen erfolgreichen 
                        Beantragung der Rufnummernmitnahme. 
                        Voraussetzung für eine erfolgreiche Rufnummernmitnahme 
                        ist neben der Angabe der vollständigen und korrekten Kundendaten 
                        die erfolgte Kündigung des Vertrages bei dem bisherigen Anbieter.
                    </p>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeEnd', popupMarkup);

    const popup = document.querySelector('.cart-popup');
    const popupCloseBtn = popup.querySelector('.cart-popup .close__icon');

    popupCloseBtn.addEventListener('click', () => {
        popup.remove();
    });
}

function initAddCartPopup(btn, radio, bonus) {
    btn.addEventListener('click', () => {
        if (radio) {
            if (radio.checked) {
                addCartPopup(bonus);
                btn.remove();
                btn.classList.remove('hidden');
            }
        }
    }, true);
}

if (!document.location.pathname.includes('/checkout/warenkorb')) {
    // set campaign
    if (document.location.pathname === '/handytarife/allnet-flat-s/') {
        fetch('https://www.congstar.de/portal/handytarife/allnet-flat-s/?sp=cweb&cc=rb-12fskw');
    } else if (document.location.pathname === '/handytarife/allnet-flat-m/') {
        fetch('https://www.congstar.de/portal/handytarife/allnet-flat-m/?sp=cweb&cc=rb-12klzu');
    } else if (document.location.pathname === '/handytarife/allnet-flat-l/') {
        fetch('https://www.congstar.de/portal/handytarife/allnet-flat-l/?sp=cweb&cc=rb-12lzbs');
    }
    
    // show popup
    const campaignCookie = getCookie('campaignContext');
    if (campaignCookie && campaignCookie.includes('campaignId%22%3A302255207')) {
        setTimeout(generatePopup, 40000);
    } else {
        generatePopup();
    }
    
    // show promo text
    if (document.location.pathname === '/handytarife/allnet-flat-s/'
        || document.location.pathname === '/handytarife/allnet-flat-m/' 
        || document.location.pathname === '/handytarife/allnet-flat-l/') {
        const priceText = document.querySelector('[ng-if="!$vm.plan.promotionPriceText"]');

        addPromoText();

        Kameleoon.API.Core.runWhenElementPresent('.configurator-tab', (tabs) => {
            tabs.forEach((tab) => {
                tab.addEventListener('click', () => {
                    addPromoText();
                });
            });
        });
    
        if (priceText) {
            priceText.insertAdjacentHTML('afterEnd', `
            <div class="provision col-12">
                <span class="provision__price">15,00</span>
                <span class="provision__text"> € einmaliger Bereitstellungspreis</span>
            </div>
        `);
            priceText.remove();
    
            const provisionPrice = document.querySelector('.provision__price');
            const flexTab = document.querySelector('[ng-if="$vm.showFlexTab()"]');
            const nonFlexTab = document.querySelector('[ng-if="$vm.showNonFlexTab()"]');
    
            if (flexTab) {
                flexTab.addEventListener('click', () => {
                    provisionPrice.innerText = '35,00';
                });
            }
    
            if (nonFlexTab) {
                nonFlexTab.addEventListener('click', () => {
                    provisionPrice.innerText = '15,00';
                });
            }
        }
    }
} else {
    Kameleoon.API.Core.runWhenElementPresent('.submit-panel .btn-primary', ([btn]) => {
        // const newNumberRadio = document.querySelector('#newPhoneNumber');
        // const existingNumberRadio = document.querySelector('#numberPortingSelectExistingNumber');
        // const newNumberRadioWrapper = newNumberRadio.closest('.cart-item');
        // const existingNumberRadioWrapper = existingNumberRadio.closest('.cart-item');
        const existingNumberTextElem = document.querySelector('#numberPortingSelectExistingNumber')
            .nextSibling.nextSibling.querySelector('.checklist.cart-item__checklist li');

        // const fakeBtn = btn.cloneNode();
        // fakeBtn.innerText = 'Weiter zur Kasse';
        // fakeBtn.classList.add('fakeBtn', 'hidden');
        // btn.insertAdjacentElement('afterEnd', fakeBtn);

        Kameleoon.API.Core
            .runWhenConditionTrue(() => dataLayer.some((item) => item.basketItems), () => {
                const { 
                    basketItems
                } = window.dataLayer.find((item) => item.basketItems);

                basketItems.forEach((product) => {
                    if (product.name.includes('AllnetFlatL')) {
                        // initAddCartPopup(fakeBtn, newNumberRadio, flat.flatL.bonus);

                        if (existingNumberTextElem) {
                            existingNumberTextElem.innerText = `
                                ${flat.flatL.bonus} € Gutschrift auf dein Kundenkonto 
                                sobald die Rufnummernmitnahme erfolgt ist
                            `;
                        }
                    } else if (product.name.includes('AllnetFlatM')) {
                        // initAddCartPopup(fakeBtn, newNumberRadio, flat.flatM.bonus);

                        if (existingNumberTextElem) {
                            existingNumberTextElem.innerText = `
                                ${flat.flatM.bonus} € Gutschrift auf dein Kundenkonto 
                                sobald die Rufnummernmitnahme erfolgt ist
                            `;
                        }
                    } else if (product.name.includes('AllnetFlatS')) {
                        // initAddCartPopup(fakeBtn, newNumberRadio, flat.flatS.bonus);

                        if (existingNumberTextElem) {
                            existingNumberTextElem.innerText = `
                                ${flat.flatS.bonus} € Gutschrift auf dein Kundenkonto 
                                sobald die Rufnummernmitnahme erfolgt ist
                            `;
                        }
                    }
                });
            }, 200);

        // if (newNumberRadio && newNumberRadio.checked) {
        //     btn.classList.add('hidden');
        //     fakeBtn.classList.remove('hidden');
        // }

        // newNumberRadioWrapper.addEventListener('click', () => {
        //     if (document.querySelector('.fakeBtn')) {
        //         btn.classList.add('hidden');
        //         fakeBtn.classList.remove('hidden');
        //     }
        // });

        // existingNumberRadioWrapper.addEventListener('click', () => {
        //     btn.classList.remove('hidden');
        //     fakeBtn.classList.add('hidden');
        // });
    });
}
