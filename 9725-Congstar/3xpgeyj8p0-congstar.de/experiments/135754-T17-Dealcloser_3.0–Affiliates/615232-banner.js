const offerMarkup = `
    <li>
        Wechselbonus: Rufnummer mitbringen und 50 € sichern! 
        Weitere Informationen zum Angebot und der Rufnummernmitnahme findest du 
    </li>
`;

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
                textDescChecklist.insertAdjacentHTML('beforeEnd', offerMarkup);
                textDescChecklist.querySelector('li').appendChild(modalLink);

                modalLink.addEventListener('click', () => {
                    Kameleoon.API.Core.runWhenElementPresent('#c6821147', ([doneBox]) => {
                        doneBox.querySelectorAll('p strong')[1].innerText = ' 50€ Gutschrift ';
                    });
                });
            });

    Kameleoon.API.Core.runWhenElementPresent('#c5519167 .footnote', ([footnote]) => {
        const textElem = footnote.closest('p');

        if (textElem) {
            const text = textElem.innerText;
            const splittedText = text.split(/\d+/);

            textElem.innerText = `${splittedText[0]} 50 ${splittedText[1]}`;
        }
    });
}

function addCartPopup() {
    const popupMarkup = `
        <div class="cart-popup">
            <div class="cart-popup__container">
                <div class="cart-popup__headline">
                    <h2>Bitte Rufnummermitnahme im Warenkorb auswählen!</h2>
                    <div class="close__icon"></div>
                </div>
                <div class="cart-popup__content">
                    <p class="content__text">
                        Die Gutschrift in Höhe von 50 € erfolgt 
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
} else if (document.location.pathname.includes('/checkout/warenkorb')) {
    Kameleoon.API.Core
        .runWhenConditionTrue(() => dataLayer.some((item) => item.ecommerce 
            && item.ecommerce.add 
            && item.ecommerce.add.products), () => {
            const { 
                ecommerce: { 
                    add: { products }
                }
            } = window.dataLayer.find((item) => item.ecommerce 
                    && item.ecommerce.add 
                    && item.ecommerce.add.products);

            products.forEach((product) => {
                if (product.name.includes('Allnet Flat M')) {
                    Kameleoon.API.Core.runWhenElementPresent('.submit-panel .btn-primary', 
                        ([btn]) => {
                            const newNumberRadio = document
                                .querySelector('#newPhoneNumber');
                            const existingNumberRadio = document
                                .querySelector('#numberPortingSelectExistingNumber');
                            const newNumberRadioWrapper = newNumberRadio
                                .closest('.cart-item');
                            const existingNumberRadioWrapper = existingNumberRadio
                                .closest('.cart-item');
                            const existingNumberTextElem = document
                                .querySelector('#numberPortingSelectExistingNumber')
                                .nextSibling.nextSibling
                                .querySelector('.checklist.cart-item__checklist li');
                
                            const fakeBtn = btn.cloneNode();
                            fakeBtn.innerText = 'Weiter zur Kasse';
                            fakeBtn.classList.add('fakeBtn', 'hidden');
                            btn.insertAdjacentElement('afterEnd', fakeBtn);
                
                            if (existingNumberTextElem) {
                            // eslint-disable-next-line max-len
                                existingNumberTextElem.innerText = '50 € Gutschrift auf dein Kundenkonto sobald die Rufnummernmitnahme erfolgt ist';
                            }
                
                            if (newNumberRadio && newNumberRadio.checked) {
                                btn.classList.add('hidden');
                                fakeBtn.classList.remove('hidden');
                            }
                
                            newNumberRadioWrapper.addEventListener('click', () => {
                                if (document.querySelector('.fakeBtn')) {
                                    btn.classList.add('hidden');
                                    fakeBtn.classList.remove('hidden');
                                }
                            });
                
                            existingNumberRadioWrapper.addEventListener('click', () => {
                                btn.classList.remove('hidden');
                                fakeBtn.classList.add('hidden');
                            });
                
                            fakeBtn.addEventListener('click', () => {
                                if (newNumberRadio) {
                                    if (newNumberRadio.checked) {
                                        addCartPopup();
                                        fakeBtn.remove();
                                        btn.classList.remove('hidden');
                                    }
                                }
                            }, true);
                        });
                }
            });
        }, 200);

}
