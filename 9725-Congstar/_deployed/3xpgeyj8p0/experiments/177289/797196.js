"use strict";

/* eslint-disable max-len */
const selectors = [{
  url: '/allnet-flat-tarife-im-vergleich/',
  selector: '.ce-spacer.ce-space-2',
  position: 'beforebegin',
  margin: false,
  width: 'kam-width-66'
}, {
  url: '/smartphone-tarife-im-vergleich',
  selector: '.ge-style-container .ce-spacer.ce-space-1',
  position: 'beforebegin',
  margin: false,
  width: 'kam-width-66'
}, {
  url: '/smartphone-tarife-im-vergleich',
  selector: '.ge-style-container .row--bucket ~ .ce-spacer.ce-space-1',
  position: 'beforebegin',
  margin: false,
  width: 'kam-width-66'
}, {
  url: '/allnet-flat-',
  selector: 'form[data-testid="planSelectionWrapper"]',
  position: 'afterend',
  margin: false,
  width: 'kam-width-100'
}, {
  url: '/fair-flat',
  selector: '.ce-spacer.ce-space-5',
  position: 'beforebegin',
  margin: true,
  width: 'kam-width-50'
}, {
  url: '/datentarife/daten-',
  selector: '[data-test-section="eft-shop-plan-configuration--PlanConfiguratorModule"] ~ div.row--relative',
  position: 'afterend',
  margin: true,
  width: 'kam-width-50'
}, {
  url: '/datentarife-vergleich',
  selector: '.ce-spacer.ce-space-5',
  position: 'beforebegin',
  margin: false,
  width: 'kam-width-66'
}];
const images = {
  generic: 'https://storage.kameleoon.com/congstar/mdm-deep-sell/Testimonials_MGM_generisch.png',
  genericMobile: 'https://storage.kameleoon.com/congstar/mdm-deep-sell/Testimonials_MGM_generisch_mobile.png',
  only10: 'https://storage.kameleoon.com/congstar/mdm-deep-sell/Testimonials_MGM_nur10.png',
  only10Mobile: 'https://storage.kameleoon.com/congstar/mdm-deep-sell/Testimonials_MGM_nur10_mobile.png',
  taschenCheckout: 'https://storage.kameleoon.com/congstar/t26/taschen_TY.png',
  bgDesktop: 'https://storage.kameleoon.com/congstar/mdm-deep-sell/background_desktop.png',
  bgDesktopLong: 'https://storage.kameleoon.com/congstar/t26/background_desktop_long.png',
  bgMobile: 'https://storage.kameleoon.com/congstar/mdm-deep-sell/backgrond_mobile.png',
  bgCheckout: 'https://storage.kameleoon.com/congstar/mdm-deep-sell/background_checkout.png'
};
const newBubble = `
<svg xmlns="http://www.w3.org/2000/svg" width="89.709" height="88.806" viewBox="0 0 89.709 88.806">
  <g id="Gruppe_19" data-name="Gruppe 19" transform="matrix(0.996, -0.087, 0.087, 0.996, 0, 7.224)">
    <g id="stoerer-rund-online" transform="translate(0 0)">
      <g id="stoerer-rund-online-2" data-name="stoerer-rund-online" transform="translate(0 0)">
        <g id="störer_-_rund_1_">
          <path id="Pfad_1303" data-name="Pfad 1303" 
            d="M33.583,3.965c2.773-.4,5.712-4.147,8.295-3.958,2.56.19,4.527,
            3.152,6.707,3.555s5.712-1.967,8.082-1c2.37,1,3.152,5.332,4.93,
            6.707s6.3.19,8.485,2.56,1.588,5.925,2.56,7.489,4.93,3.555,6.3,
            5.522-1,5.925-.593,8.082,4.148,5.119,4.527,7.892c.19,1.778-3.365,
            5.333-3.958,7.11s1.967,6.115.592,8.485-5.925,3.555-6.707,5.332-.782,
            6.517-2.18,8.082S62.544,72.6,62.544,72.6s-2.962,5.522-5.332,
            6.3-6.115-1.588-8.082-1-5.712,
            4.337-8.082,3.958c-2.37-.4-4.93-3.555-7.3-3.958-2.773.782-5.332,
            1.777-7.7.782s-2.56-4.93-4.74-6.3-7.489-.19-9.267-2.56-.782-5.332-1.967-7.489c-1.185-2.18-5.332-2.18-6.517-4.93,
            0-1.375.782-5.925.592-7.892C4.55,46.364,0,43.8,0,41.221c0-2.56,3.958-4.74,
            4.337-6.9S2.37,27.617,3.152,25.65s6.3-3.365,7.11-5.332.19-7.11,1.967-8.674,
            6.115-.592,8.082-1.967,1.375-4.74,4.527-6.3S30.81,4.368,33.583,3.965Z" fill="#fff"/>
        </g>
      </g>
    </g>
    <text id="Jetzt_neu_" data-name="Jetzt neu!" 
    transform="translate(41.443 37.947)" font-size="16" 
    font-family="Interstate-Bold, Interstate" font-weight="700">
    <tspan x="-21" y="0">Jetzt</tspan><tspan x="-16" y="18">neu!</tspan></text>
  </g>
</svg>
`;
const newLabel = `
<svg xmlns="http://www.w3.org/2000/svg" id="Smartphone_-_Promotion_label" data-name="Smartphone - Promotion label" width="77" height="20" viewBox="0 0 77 20">
  <path id="Background" d="M0,0H77V20H0Z" fill="#fff"/>
  <text id="Jetzt_neu_" data-name="Jetzt neu!" transform="translate(8 14)" 
  font-size="12" font-family="Interstate-Bold, Interstate" font-weight="700" 
  letter-spacing="0.01em"><tspan x="0" y="0">Jetzt neu!</tspan></text>
</svg>
`;

const buildBox = (bannerData, width) => `
    <div class="kam-T05-container ${width}">
        <a class="kam-link" href="${bannerData.link}">
            <div class="kam-content">
                <div class="kam-headline">${bannerData.headline}</div>
                <div class="kam-text">${bannerData.text}</div>
                <div class="kam-button">${bannerData.button}</div>
            </div>
            <div class="kam-desktop">
                ${newBubble}
                <img class="kam-desktop-img" src="${bannerData.images[0]}">
            </div>
            <img class="kam-mobile" src="${bannerData.images[1]}">
        </a>
        <div class="kam-mobile kam-new">
            ${newLabel}
        </div>
    </div>
`;

const buildBoxSvg = (bannerData, width) => `
    <div class="kam-T05-container ${width}">
        <a class="kam-link" href="${bannerData.link}">
            <div class="kam-content">
                <div class="kam-headline">${bannerData.headline}</div>
                <div class="kam-text">${bannerData.text}</div>
                <div class="kam-button">${bannerData.button}</div>
            </div>
            ${bannerData.images[0]}
        </a>
    </div>
`;

const buildBoxTY = (bannerData, svg) => `
<div class="kam-T05-container-TY">
  <div class="kam-left">
    <a class="kam-link" href="${bannerData.linkLeft}">  
      <div class="kam-content">
        <div class="kam-headline">${bannerData.headlineLeft}</div>
        <div class="kam-text">${bannerData.textLeft}</div>
        <div class="kam-button">${bannerData.buttonLeft}</div>
      </div>
      <div class="kam-desktop" style="position: relative;width: 100%;">
        ${newBubble}
        <img class="kam-desktop-image" src="${bannerData.images[0]}">
      </div>
      <img class="kam-mobile" src="${bannerData.images[1]}">
    </a>
    <div class="kam-mobile kam-new">
        ${newLabel}
    </div>
  </div>
  <div class="kam-right">
    <a class="kam-link" href="${bannerData.linkRight}">
      <div class="kam-content">
        <div class="kam-headline">${bannerData.headlineRight}</div>
        <div class="kam-text">${bannerData.textRight}</div>
        <div class="kam-button">${bannerData.buttonRight}</div>
      </div>
      ${svg ? bannerData.images[2] : `
        <img src="${bannerData.images[2]}"></img>
      `}
    </a>
  </div>
</div>
`;

function createElement(bannerData, svg, goals, v3) {
  selectors.forEach(data => {
    if (document.location.pathname.includes(data.url)) {
      Kameleoon.API.Core.runWhenElementPresent(data.selector, ([element]) => {
        element.insertAdjacentHTML(data.position, svg ? buildBoxSvg(bannerData, data.width) : buildBox(bannerData, data.width));

        if (data.margin) {
          const banner = document.querySelector('.kam-T05-container');
          banner.classList.add('kam-margin-left');
        }
      });
    }
  });
  Kameleoon.API.Core.runWhenElementPresent('.kam-T05-container', ([banner]) => {
    Kameleoon.API.Utils.addEventListener(banner, 'click', () => {
      const {
        pathname
      } = document.location;
      Kameleoon.API.Goals.processConversion(goals['[T26] Banner click']);

      if (pathname.match(/\/(allnet-flat|smartphone)-tarife-im-vergleich/gm)) {
        if (!v3) {
          Kameleoon.API.Goals.processConversion(goals['[T26] Click Friends Vergleich']);
        } else {
          Kameleoon.API.Goals.processConversion(goals['[T26] Click Partnerkarte Vergleich']);
        }
      } else if (pathname.match(/\/((allnet-flat-(s|m|l))|(fair-flat))/gm)) {
        if (!v3) {
          Kameleoon.API.Goals.processConversion(goals['[T26] Click Friends Tarifseite']);
        } else {
          Kameleoon.API.Goals.processConversion(goals['[T26] Click Partnerkarte Tarifseite']);
        }
      } else if (pathname.match(/\/daten-(s|m|l)/gm)) {
        if (!v3) {
          Kameleoon.API.Goals.processConversion(goals['[T26] Click Friends Datentarif']);
        } else {
          Kameleoon.API.Goals.processConversion(goals['[T26] Click Partnerkarte Datentarif']);
        }
      } else if (pathname.match(/\/datentarife-vergleich/gm)) {
        if (!v3) {
          Kameleoon.API.Goals.processConversion(goals['[T26] Click Friends Vergleich Daten']);
        } else {
          Kameleoon.API.Goals.processConversion(goals['[T26] Click Partnerkarte Vergleich Daten']);
        }
      }
    });

    function setObserver() {
      const options = {
        rootMargin: '0px',
        threshold: 0.50
      };
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            Kameleoon.API.Goals.processConversion(goals['[T26] Banner view']);
            observer.disconnect();
          }
        });
      }, options);
      observer.observe(banner);
    }

    setObserver();
  });
}

function createElementTY(parent, bannerData, svg, goals, v3) {
  parent.insertAdjacentHTML('beforebegin', buildBoxTY(bannerData, svg));
  Kameleoon.API.Utils.addEventListener(document, 'click', ({
    target
  }) => {
    if (!v3 && target.closest('a[href="https://www.congstar.de/congstar-deals/"]')) {
      Kameleoon.API.Goals.processConversion(goals['[T26] Click Congstar Deals TY']);
    } else if (target.closest('a[href="https://www.congstar.de/for-friends"]')) {
      Kameleoon.API.Goals.processConversion(goals['[T26] Click Friends TY']);
    } else if (v3 && target.closest('a[href="https://www.congstar.de/meincongstar/angebote/partnerkarte/"]')) {
      Kameleoon.API.Goals.processConversion(goals['[T26] Click Partnerkarte TY']);
    }
  });
}

const goals = {
  '[T26] Banner click': 292242,
  '[T26] Banner view': 292244,
  '[T26] Click Friends Vergleich': 292237,
  '[T26] Click Friends Tarifseite': 292245,
  '[T26] Click Friends Datentarif': 292236,
  '[T26] Click Friends Vergleich Daten': 292249,
  '[T26] Click Partnerkarte Vergleich': 292231,
  '[T26] Click Partnerkarte Tarifseite': 292243,
  '[T26] Click Partnerkarte Datentarif': 292246,
  '[T26] Click Partnerkarte Vergleich Daten': 292235,
  '[T26] Click Friends TY': 292239,
  '[T26] Click Congstar Deals TY': 292238,
  '[T26] Click Partnerkarte TY': 292240,
  '[T26] Friends code generation': 292250,
  '[T26] Copy Friends code': 292248,
  '[T26] Select 10 % Friends LP': 292234,
  '[T26] Select 2GB Friends LP': 292233,
  '[T26] Select 35€ Friends LP': 292241
};

if (!document.location.pathname.includes('/checkout/bestaetigung')) {
  const bannerData = {
    headline: 'CONGSTAR FOR FRIENDS',
    text: 'Zufrieden mit congstar? Empfiehl uns weiter & sichere deinen Freunden und dir mit congstar for friends jeweils 10% Rabatt.',
    button: 'congstar empfehlen',
    link: 'https://www.congstar.de/for-friends',
    images: [images.only10, images.only10Mobile]
  };
  createElement(bannerData, false, goals, false);
} else {
  const bannerData = {
    headlineLeft: 'CONGSTAR FOR FRIENDS',
    textLeft: 'Herzlichen Glückwunsch, du bist nun congstar Kunde. Empfiehl uns weiter & sichere deinen Freunden und dir mit congstar for friends exklusive Vorteile!',
    buttonLeft: 'congstar empfehlen',
    linkLeft: 'https://www.congstar.de/for-friends',
    headlineRight: 'CONGSTAR DEALS',
    textRight: 'Shopping & mehr: Exklusive Gutscheine nur für congstar Kunden!',
    buttonRight: 'congstar Deals entdecken',
    linkRight: 'https://www.congstar.de/congstar-deals/',
    images: [images.generic, images.genericMobile, images.taschenCheckout]
  };
  Kameleoon.API.Core.runWhenElementPresent('.row.row-template--2-col.row--relative', ([element]) => {
    element.classList.add('kam-hidden');
    createElementTY(element, bannerData, false, goals, false);
  });
}