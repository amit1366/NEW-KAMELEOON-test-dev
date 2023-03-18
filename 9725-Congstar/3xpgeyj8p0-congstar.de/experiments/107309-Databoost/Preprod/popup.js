export const createPopup = (storageValue, priceValue) => `
<div class="kam-popup kam-visually-hidden">
  <div class="kam-popup__container">
    <button class="kam-popup__close-btn"></button>
    <h3 class="kam-popup__title">Noch mehr Datenvolumen gefällig?</h3>
    <div class="kam-popup__main-items">
      <div class="kam-value-proposition">
        <span class="kam-value-proposition__number">${storageValue}</span>
        <span class="kam-value-proposition__measure">gb</span>
        <span class="kam-value-proposition__index">extra</span>
      </div>
      <div class="kam-purchase-offer">
        <div class="kam-price">
          <span class="kam-price__eurs">${priceValue}</span>
          <span class="kam-price__cents">00</span>
          <span class="kam-price__per-month">€/mtl.</span>
          <span class="footnote__icon kam-footnote__icon"></span>
        </div>
        <button class="kam-purchase-offer__add2Cart-btn">Option zubuchen</button>
        <button
          class="kam-purchase-offer__cancel-offer-btn icon--arrow-right kam-icon--arrow-right"
        >
          <span class="kam-purchase-offer__cancel-offer-text">Weiter ohne Extra-Daten</span>
        </button>
      </div>
    </div>
    <div class="kam-popup__main-description">
      Du kannst diese Option
      <span class="kam-popup__main-description--bold">
        jederzeit zum Monatsende kündigen
      </span>
      oder neu hinzubuchen.
    </div>
  </div>
</div>
`;

export const createOverlay = () => `
    <div class="kam-popup__overlay kam-visually-hidden"></div>
`;