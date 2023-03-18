/*eslint-disable */
const dispalyFootnote = (namePlan, price, tarif) => {

    const modal = `
    <div class="modal modal--footnote show kam-footnote" id="footnote" tabindex="-1" role="dialog" aria-labelledby="Footnote text" aria-modal="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content background-color--bright">
                <div class="modal-header">
                    <a class="close icon--close kam_close" data-dismiss="modal" aria-label="Close"></a>
                    <h4 class="modal-title" id="myModalLabel">${namePlan}</h4>
                </div>
                <div class="modal-body" ng-bind-html="descriptionWithHtml">Preis: ${price} €/Monat bei Abschluss eines Vertrags mit 24 Monaten Mindestvertragslaufzeit. Einmaliger Bereitstellungspreis: 15 €. Das Paket enthält eine Telefonie-Flat und SMS-Flat in alle dt. Netze; im EU-Ausland sind die Inklusivleistungen ohne Zusatzkosten nutzbar. Preise für Sonder- und Servicerufnummern abweichend. Surfen gilt für die Datennutzung innerhalb Deutschlands und im EU-Ausland. Aktion: Bei Buchung über www.congstar.de bis zum 30.06.2021 wird die Bandbreite ab einem Datenvolumen von ${tarif} im jeweiligen Monat von max. 25 Mbit/s im Download und 5 Mbit/s im Upload auf max. 32 Kbit/s im Download und Upload beschränkt.</div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop show"></div>`;
    
    document.querySelector('body').insertAdjacentHTML('beforeend', modal);
    const footnote = document.getElementById('footnote');
    const footnoteClose = document.querySelector('#footnote .close.icon--close');
    const footnoteBackdrop = document.querySelector('.modal-backdrop.show');
    footnote.addEventListener('click', ({target})=> {
        if (target === footnoteClose || !target.closest('.modal-dialog')) {
            footnote.style.display = 'none';
            footnoteBackdrop.style.display = 'none';
        }
    });
};

const goals = {
  '[T05] Click on Popup CTA': 215972,
  '[T09] Popup M displayed': 227173,
  '[T09] Popup L displayed': 226430,
  '[T09] Click on Popup CTA Plan L': 226428,
};


const getPopupTemplate = (namePlan, tarif, sale, mainPrice1, mainPrice2, oldPrice, linkOfTarif) => {
  return (`<section class="kam-popup">
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
};

const renderPopup = (element, template, nameGoalPopupShow) => {
  element.insertAdjacentHTML('afterbegin', template);
  Kameleoon.API.Goals.processConversion(goals[nameGoalPopupShow]);
};

const removePopUpOnClick = (handler, element) => {
  handler.addEventListener(Kameleoon.API.Utils.mouseDownEvent, () => {
    if (!Kameleoon.API.Utils.touchMoveEvent) {
      element.parentNode.removeChild(element);
      document.querySelector('.modal-backdrop.show').parentNode.removeChild(document.querySelector('.modal-backdrop.show'));
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
  Kameleoon.API.Core.runWhenElementPresent('.kam-tarif-info__price-block > div > footnote a', (star) => {
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

const initPopup = (typeBanner) => {
  Kameleoon.API.Core.runWhenElementPresent('body', (body) => {
    if (typeBanner === 'mBanner') {
      renderPopup(body[0], getPopupTemplate('Allnet Flat M', '8 GB Datenvolumen', '2,00', '18', '00', '20', 'https://www.congstar.de/portal/handytarife/allnet-flat-m/?sp=cweb&cc=rb-07ghjk'), '[T09] Popup M displayed');
      setPopupHandler(dispalyFootnote('Allnet Flat M', '20', '8 GB statt 5 GB'), '[T05] Click on Popup CTA');
    } else if (typeBanner === 'lBanner') {
      renderPopup(body[0], getPopupTemplate('Allnet Flat L', '15 GB Datenvolumen', '3,00', '27', '00', '30', 'https://www.congstar.de/portal/handytarife/allnet-flat-l/?sp=cweb&cc=rb-08ghjk'), '[T09] Popup L displayed');
      setPopupHandler(dispalyFootnote('Allnet Flat L', '30', '15 GB statt 10 GB'), '[T09] Click on Popup CTA Plan L');
    }
  });
};

let countOfVisit = +Kameleoon.API.Data.readLocalData('KameleoonDev__quantityOfVisits');

const initVariation = () => {
    countOfVisit++;

    if (Kameleoon.API.CurrentVisit.customData['Plan PDP']) {
        if ((Kameleoon.API.CurrentVisit.customData['Plan PDP'].some(item => item === 'Plan M' || item === 'Plan S')) &&
            !Kameleoon.API.CurrentVisit.customData['Plan PDP'].includes('Plan L')) {
            initPopup('mBanner');
            fetch('https://www.congstar.de/portal/handytarife/allnet-flat-m/?sp=cweb&cc=rb-07ghjk');
        } else if (Kameleoon.API.CurrentVisit.customData['Plan PDP'].some(item => item === 'Plan M' || item === 'Plan L') &&
            !Kameleoon.API.CurrentVisit.customData['Plan PDP'].includes('Plan S')) {
            initPopup('lBanner');
            fetch('https://www.congstar.de/portal/handytarife/allnet-flat-l/?sp=cweb&cc=rb-08ghjk');
        } else if (Kameleoon.API.CurrentVisit.customData['Plan PDP'].length === 3 && Kameleoon.API.CurrentVisit.customData['Last seen plan PDP']) {
            if (Kameleoon.API.CurrentVisit.customData['Last seen plan PDP'].includes('Plan L')) {
                initPopup('lBanner');
                fetch('https://www.congstar.de/portal/handytarife/allnet-flat-l/?sp=cweb&cc=rb-08ghjk');
            } else {
                initPopup('mBanner');
                fetch('https://www.congstar.de/portal/handytarife/allnet-flat-m/?sp=cweb&cc=rb-07ghjk');
            }
        }
    }

    if (!sessionStorage.getItem('KameleoonDev__curentVisit')) {
        sessionStorage.setItem('KameleoonDev__curentVisit', true);
        Kameleoon.API.Data.writeLocalData('KameleoonDev__quantityOfVisits', countOfVisit, true);
    }
};

initVariation();


/*eslint-disable */
