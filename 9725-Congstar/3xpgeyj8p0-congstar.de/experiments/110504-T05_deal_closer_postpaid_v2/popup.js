import goals from './goals';

const getPopupTemplate = () => {
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
                    <a class="kam-popup__image-link" href="https://www.congstar.de/portal/handytarife/allnet-flat-m/?sp=cweb&cc=rb-07ghjk"></a>
                  </div>
                  <div class="kam-popup__tarif-info kam-tarif-info">
                    <div class="kam-tarif-info__header">
                      <h5 class="kam-tarif-info__title">Allnet Flat M</h5>
                    </div>
                    <div class="kam-tarif-info__wrapper">
                      <ul class="kam-tarif-info__descrirption">
                        <li class="kam-tarif-info__internet icon--internet">
                          8 GB statt 5 GB inkl. LTE 25
                        </li>
                        <li class="kam-tarif-info__sms icon--phone-sms">
                          Allnet Flat & SMS Flat
                        </li>
                        <li class="kam-tarif-info__roaming icon--roaming-eu">
                          EU-Romaning inklusive
                        </li>
                      </ul>
                      <div class="kam-tarif-info__footer">
                      <hr>
                        <div class="kam-tarif-info__price-block">
                          <div class="price price--large kam-tarif-info__large-price ">
                            <span class="price__euro">17</span>
                            <span class="price__cent">00</span>
                            <span class="price__rate" ng-switch="$vm.pricing.totalPrice.monthlyPrice.billingPeriod">€
                              <span ng-switch-when="one-month">mtl.</span>
                            </span>
                            <footnote model="$vm.plan.footnotes[0]" ng-if="$vm.plan.footnotes[0]" class="footnote">
                              <a href="#" ng-click="showFootnote($event)" class="footnote__link">
                                <span class="footnote__icon"></span>
                              </a>
                            </footnote>
                            <span class="price__before">statt <span class="kam-tarif-info__crossed">19,50 &#8364</span>
                          </div>

                        </div>
                        <div class="kam-tarif-info__button-block">
                          <a class="kam-tarif-info__button btn-primary" href="https://www.congstar.de/portal/handytarife/allnet-flat-m/?sp=cweb&cc=rb-07ghjk">Zum Tarif</a>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>`);
};

const renderPopup = (element, template) => {
  element.insertAdjacentHTML('afterbegin', template);
  Kameleoon.API.Goals.processConversion(goals['[T05] Popup M displayed']);
};

const removePopUpOnClick = (handler, element) => {
  handler.addEventListener(Kameleoon.API.Utils.mouseDownEvent, () => {
    if (!Kameleoon.API.Utils.touchMoveEvent) {
      element.parentNode.removeChild(element);
      event.stopPropagation();
    }
  });
};

const setCustomDataAndGoalOnClick = (element) => {
  element.addEventListener(Kameleoon.API.Utils.mouseDownEvent, () => {
    if (!Kameleoon.API.Utils.touchMoveEvent) {
      Kameleoon.API.Goals.processConversion(goals['[T05] Click on Popup CTA']);
      Kameleoon.API.Data.setCustomData('KameleoonDev__Accepted The M Offer', true);
    }
  });
};

const setPopupHandler = (starHandler) => {
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
  Kameleoon.API.Core.runWhenElementPresent('.kam-tarif-info__price-block > div > footnote', (star) => {
    star[0].addEventListener(Kameleoon.API.Utils.mouseDownEvent, () => {
      if (!Kameleoon.API.Utils.touchMoveEvent) {
        starHandler();
      }
    });
  });

  Kameleoon.API.Core.runWhenElementPresent('.kam-tarif-info__button', (tarifBtn) => {
    setCustomDataAndGoalOnClick(tarifBtn[0]);
  });

  Kameleoon.API.Core.runWhenElementPresent('.kam-popup__image-link', (image) => {
    setCustomDataAndGoalOnClick(image[0]);
  });
};

export const initPopup = (starHandler) => {
  Kameleoon.API.Core.runWhenElementPresent('body', (body) => {
    renderPopup(body[0], getPopupTemplate());
    setPopupHandler(starHandler);
  });
};
