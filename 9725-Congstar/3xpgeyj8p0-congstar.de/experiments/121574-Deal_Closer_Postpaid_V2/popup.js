import { dispalyFootnote } from './info-star-modal';

const goals = {
    '[T05] Click on Popup CTA': 215972,
    '[T09] Popup M displayed': 227173,
    '[T09] Popup L displayed': 226430,
    '[T09] Click on Popup CTA Plan L': 226428,
};
/*eslint-disable */
const getPopupTemplate = (namePlan, tarif, sale, mainPrice1, mainPrice2, oldPrice, linkOfTarif) => (`<section class="kam-popup">
              <div class="kam-popup__main">
                <div class="kam-popup__header">
                  <div class="kam-popup__title">
                    <p class="kam-popup__main-title">
                      MOMENT…
                    </p>
                    <p class="kam-popup__description">
                      Bevor du uns verlässt: <span class="kam-popup__break">Unser persönliches Vorteilsangebot für dich!</span>
                    </p>
                  </div>
                  <button class="kam-popup__close-btn icon--close" type="button">
                    
                  </button>
                </div>

                <div class="kam-popup__tarif-wrapper">
                  <div class="kam-popup__image">
                    <a class="kam-popup__image-link" href="${linkOfTarif}"></a>
                  </div>
                  <div class="kam-popup__tarif-info kam-tarif-info">
                    <div class="kam-tarif-info__header">
                      <h5 class="kam-tarif-info__title">${namePlan}</h5>
                    </div>
                    <div class="kam-tarif-info__wrapper">
                      <ul class="kam-tarif-info__descrirption">
                        <li class="kam-tarif-info__internet icon--internet">
                          ${tarif}
                        </li>
                        <li class="kam-tarif-info__sms icon--phone-sms">
                          Allnet Flat & SMS Flat
                        </li>
                        <li class="kam-tarif-info__roaming icon--roaming-eu">
                          EU-Roaming inklusive
                        </li>
                        <li class="kam-tarif-info__label">
                          Aktion
                        </li>
                        <li class="kam-tarif-info__text-sale">${sale} € monatlicher Rabatt für dich!</li>
                      </ul>
                      <div class="kam-tarif-info__footer">
                      <hr>
                        <div class="kam-tarif-info__price-block">
                          <div class="price price--large kam-tarif-info__large-price ">
                            <span class="price__euro">${mainPrice1}</span>
                            <span class="price__cent">${mainPrice2}</span>
                            <span class="price__rate" ng-switch="$vm.pricing.totalPrice.monthlyPrice.billingPeriod">€
                              <span ng-switch-when="one-month">mtl.</span>
                            </span>
                            <footnote class="footnote">
                              <a href="#" class="footnote__link">
                                <span class="footnote__icon"></span>
                              </a>
                            </footnote>
                            <span class="price__before">statt <span class="kam-tarif-info__crossed">${oldPrice} &#8364/mtl.</span>
                          </div>

                        </div>
                        <div class="kam-tarif-info__button-block">
                          <a class="kam-tarif-info__button btn-primary" href="${linkOfTarif}">Zum Tarif</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class='kam-popup-underfooter-text'>
                      Angebot auch nach Schließen des Popups gültig
                  </div>

                </div>
              </div>
            </section>`);
/* eslint-enable */

const renderPopup = (element, template, nameGoalPopupShow) => {
    element.insertAdjacentHTML('afterbegin', template);
    Kameleoon.API.Goals.processConversion(goals[nameGoalPopupShow]);
};

const removePopUpOnClick = (handler, element) => {
    handler.addEventListener(Kameleoon.API.Utils.mouseDownEvent, () => {
        if (!Kameleoon.API.Utils.touchMoveEvent) {
            element.parentNode.removeChild(element);
            document.querySelector('.modal-backdrop.show').parentNode
                .removeChild(document.querySelector('.modal-backdrop.show'));
            event.stopPropagation();
        }
    });
};

const setCustomDataAndGoalOnClick = (element, nameGoalForCliclPopup) => {
    element.addEventListener(Kameleoon.API.Utils.mouseDownEvent, () => {
        if (!Kameleoon.API.Utils.touchMoveEvent) {
            Kameleoon.API.Goals.processConversion(goals[nameGoalForCliclPopup]);
            Kameleoon.API.Data.setCustomData('KameleoonDev__Accepted The M Offer', true);
        }
    });
};

const setPopupHandler = (starHandler, nameGoal) => {
    Kameleoon.API.Core.runWhenElementPresent('.kam-popup', (popup) => {
        removePopUpOnClick(popup[0], popup[0]);
    });

    Kameleoon.API.Core.runWhenElementPresent('.kam-popup__close-btn', (closeBtn) => {
        const popup = document.querySelector('.kam-popup');
        removePopUpOnClick(closeBtn[0], popup);
    });

    Kameleoon.API.Core.runWhenElementPresent('.kam-popup__main', (main) => {
        main[0].addEventListener(Kameleoon.API.Utils.mouseDownEvent, () => {
            if (!Kameleoon.API.Utils.touchMoveEvent) {
                event.stopPropagation();
            }
        });
    });
    Kameleoon.API.Core.runWhenElementPresent('.kam-tarif-info__price-block > div > footnote a', 
        (star) => {
            star[0].addEventListener(Kameleoon.API.Utils.mouseDownEvent, () => {
                if (!Kameleoon.API.Utils.touchMoveEvent) {
                    document.querySelector('#footnote').style.display = 'block';
                }
            });
        });

    Kameleoon.API.Core.runWhenElementPresent('.kam-tarif-info__button', (tarifBtn) => {
        setCustomDataAndGoalOnClick(tarifBtn[0], nameGoal);
    });

    Kameleoon.API.Core.runWhenElementPresent('.kam-popup__image-link', (image) => {
        setCustomDataAndGoalOnClick(image[0], nameGoal);
    });
};

export const initPopup = (typeBanner) => {
    Kameleoon.API.Core.runWhenElementPresent('body', (body) => {
        if (typeBanner === 'mBanner') {
            renderPopup(body[0], getPopupTemplate('Allnet Flat M', '8 GB Datenvolumen', 
                '2,00', '18', '00', '20', 
                'https://www.congstar.de/portal/handytarife/allnet-flat-m/?sp=cweb&cc=rb-07ghjk'), 
            '[T09] Popup M displayed');
            setPopupHandler(dispalyFootnote('Allnet Flat M', '20', '8 GB statt 5 GB'), 
                '[T05] Click on Popup CTA');
        } else if (typeBanner === 'lBanner') {
            renderPopup(body[0], getPopupTemplate('Allnet Flat L', '15 GB Datenvolumen', 
                '3,00', '27', '00', '30', 
                'https://www.congstar.de/portal/handytarife/allnet-flat-l/?sp=cweb&cc=rb-08ghjk'), 
            '[T09] Popup L displayed');
            setPopupHandler(dispalyFootnote('Allnet Flat L', '30', '15 GB statt 10 GB'), 
                '[T09] Click on Popup CTA Plan L');
        }
    });
};
