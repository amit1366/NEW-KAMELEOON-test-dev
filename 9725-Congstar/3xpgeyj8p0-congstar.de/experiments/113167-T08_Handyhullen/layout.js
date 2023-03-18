import { play, close, thankyouLinkSvg } from './svg';
const segments = {
    android: 'Schutz und Zubehör für dein neues Handy',
    iphone: 'Schutz und Zubehör für dein neues iPhone',
};
export const bannerReccomend = (segmentName) => {
    return `
<div class="kam-banner-rec">
    <div class="kam-banner-rec__description">
      <h3>${segments[segmentName]}?</h3>
      <p>Nach deiner Bestellung kannst du dich in aller Ruhe im Zubehörshop umsehen.</p>
    </div>
    <div class="kam-banner-rec__img-wrap">
      <img src="https://storage.kameleoon.eu/congstar/handyhullen/banner1.png" alt="accessories">
      <img src="https://storage.kameleoon.eu/congstar/handyhullen/banner_${segmentName}.png" alt="accessories">
      <img src="https://storage.kameleoon.eu/congstar/handyhullen/banner_acces_${segmentName}.png" alt="accessories">
    </div>
    <div class="kam-banner-rec__more-info">
    ${play}
      <span>Mehr Infos</span>
    </div>
  </div>

<div class='kam-banner-overlay kam-hide'> 
  <div class="kam-banner-overlay__wrapper"></div>
  <div class="kam-banner-overlay__container">
    <button class='kam-banner-overlay__close'>${close}</button>
    <div class='kam-banner-overlay__title'>
    <h4>${segments[segmentName]}
    </h4>
    </div>
    <div class="kam-banner-overlay__description">
      <p>Handyhüllen, Displayschutz und Zubehör kannst du nach deiner Bestellung bequem im Zubehörshop von unserem
        Partner Icon Foto auswählen.
        Dazu findest du auf der Bestellbestätigungsseite einen Link.</p>
      <img src="https://storage.kameleoon.eu/congstar/handyhullen/${segmentName}_popup.png" alt="accessories" class='kam-banner-overlay__img--${segmentName}'>
    </div>
  </div>
  </div>
`;
};
export const thankyouBanner = (segment, link) => {
    
    return `
<div class="kam-thankyou-banner">
    <a href="${link}" target="_blank">
      <div class="kam-thankyou-banner__title">
        <h2>${segments[segment]}?</h2>
      </div>
      <div class="kam-thankyou-banner__container">
        <p>Schau doch mal bei unserem Partner Icon Foto vorbei! Hier findest du Handyüllen,
          <br>Displayschutz und Zubehör – auch mit deinem Wunschmotiv!</p>
        <div class="kam-thankyou-banner__img-container">
          <div class="kam-thankyou-banner__img-main">
            <div class="kam-thankyou-banner__img-wrap">
              <img src="https://storage.kameleoon.eu/congstar/handyhullen/banner1.png" alt="accessories">
            </div>
            <div class="kam-thankyou-banner__img-wrap">
              <img src="https://storage.kameleoon.eu/congstar/handyhullen/banner_${segment}.png" alt="accessories">
            </div>
            <div class="kam-thankyou-banner__img-wrap">
              <img src="https://storage.kameleoon.eu/congstar/handyhullen/banner_acces_${segment}.png" alt="accessories">
            </div>
            <div class="kam-thankyou-banner__img-wrap">
              <img src="https://storage.kameleoon.eu/congstar/handyhullen/banner_thankyou.png" alt="accessories">
             ${segment === 'iphone' ? `<div class="kam-thankyou-banner__img-storer">Individuell gestalten!</div>` : ''} 
            </div>
          </div>
          <img src="https://storage.kameleoon.eu/congstar/handyhullen/logo_icon_foto.png" alt="accessories" class='kam-icon-foto'>
        </div>
        <div class="kam-thankyou-banner__link">
          ${thankyouLinkSvg}
          <span>Zum Zubehörshop</span>
        </div>
      </div>
    </a>
  </div>
`;
};
