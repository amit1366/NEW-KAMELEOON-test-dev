"use strict";

const bottomText = `
    GB+: Das monatliche Datenvolumen erhöht sich alle 12 Monate automatisch um jeweils 5 GB. Bei 
    Tarifwechsel entfällt die jährliche Erhöhung des Datenvolumens und das angesammelte, 
    zusätzliche Datenvolumen wird nicht auf den neuen Tarif übertragen. 
    Es gelten dann die Konditionen des neuen Tarifs.
    Bei Buchung im Aktionszeitraum ist die LTE 50 Option inklusive statt 5€/Monat. Der 
    Preisvorteil entfällt bei Tarifwechsel. Die LTE 50 Option ermöglicht das Surfen im LTE 
    Netz und erhöht die Übertragungsgeschwindigkeit auf geschätzte max. 50 Mbit/s im 
    Download und 25 Mbit/s im Upload.
`;
const bulletPoint = `
    <li class="sc-cOFTSb bRunba">
        <span class="sc-BeQoi bGHjXT">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="currentColor" 
                stroke="currentColor" stroke-width="0" width="1em" height="1em">
                <path fill-rule="evenodd" d="M5.9 21c1.7-1.4 7.5 3.4 7.5 3.4s5.2-6.1 
                    9.6-9.8c4.4-3.7 8.9-5.6 9.5-5.2.6.4-6 6.3-9.4 10.8-3.1 4.2-5.3 7.5-6.7 
                    9.3-1.1 1.4-2.2 1.2-4.7-1.2-2.2-2-7.8-5.7-5.8-7.3z" clip-rule="evenodd">
                </path>
            </svg>
        </span>
        <span class="sc-kgUAyh jiqxCW kam-normal">
            Jetzt sparen! Einmaliger Bereitstellungspreis geschenkt.
            <span class="sc-fctJkW bSFyat" id="kam-icon-left">
                <button type="button" class="sc-fvNpTx caqUBg sc-bWXABl ksdDov">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="currentColor" stroke="currentColor" stroke-width="0" width="1em" height="1em"><path fill-rule="evenodd" d="M20 7C12.8 7 7 12.8 7 20s5.8 13 13 13 13-5.8 13-13S27.2 7 20 7zm0 24.1c-6.1 0-11-4.9-11-11S13.9 9 20 9s11 4.9 11 11-4.9 11.1-11 11.1z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M21.1 13l.3 5.4 5.3-1.3c1.2-.1 1.7 1.4.7 2L22.2 21l3 4.7c.5 1.1-.8 2-1.7 1.3L20 22.6 16.5 27c-.9.7-2.2-.2-1.7-1.3l3-4.7-5.2-1.8c-1-.6-.5-2.2.7-2l5.3 1.3.3-5.4c.3-1.2 1.9-1.2 2.2-.1z" clip-rule="evenodd"></path></svg>
                </button>
            </span>
        </span>
        <span class="sc-kgUAyh jiqxCW kam-flex kam-hidden">
            Jetzt sparen! 10 € statt 35 € einmaliger Bereitstellungspreis.
            <span class="sc-fctJkW bSFyat" id="kam-icon-right">
                <button type="button" class="sc-fvNpTx caqUBg sc-bWXABl ksdDov">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="currentColor" stroke="currentColor" stroke-width="0" width="1em" height="1em"><path fill-rule="evenodd" d="M20 7C12.8 7 7 12.8 7 20s5.8 13 13 13 13-5.8 13-13S27.2 7 20 7zm0 24.1c-6.1 0-11-4.9-11-11S13.9 9 20 9s11 4.9 11 11-4.9 11.1-11 11.1z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M21.1 13l.3 5.4 5.3-1.3c1.2-.1 1.7 1.4.7 2L22.2 21l3 4.7c.5 1.1-.8 2-1.7 1.3L20 22.6 16.5 27c-.9.7-2.2-.2-1.7-1.3l3-4.7-5.2-1.8c-1-.6-.5-2.2.7-2l5.3 1.3.3-5.4c.3-1.2 1.9-1.2 2.2-.1z" clip-rule="evenodd"></path></svg>
                </button>
            </span>
        </span>
    </li>
`;
const starTextMNormal = `
    Aktion für Neukunden bei Buchung über 
    <a rel="nofollow" href="http://congstar.de" target="_blank" class="sc-fEOsli jlobqD">
        congstar.de
    </a>
    bis zum 10.01.2023:
    Die congstar Allnet Flat M mit GB+ kostet monatlich 22 €. Mindestvertragslaufzeit 24 Monate.
    Einmaliger Bereitstellungspreis 0 € statt 15 €. Im Rahmen der Aktion wird die Bandbreite ab
    einem Datenvolumen von 18 GB statt 10 GB im jeweiligen Monat auf max. 32 Kbit/s im
    Download und Upload beschränkt.
    ${bottomText}
`;
const starTextMFlex = `
    Aktion für Neukunden bei Buchung über 
    <a rel="nofollow" href="http://congstar.de" target="_blank" class="sc-fEOsli jlobqD">
        congstar.de
    </a>
    bis zum 10.01.2023:
    Die congstar Allnet Flat M Flex mit GB+ kostet monatlich 22 €. Einmaliger
    Bereitstellungspreis 10 € statt 35 €. Im Rahmen der Aktion wird die Bandbreite ab
    einem Datenvolumen von 18 GB statt 10 GB im jeweiligen Monat auf max. 32 Kbit/s im
    Download und Upload beschränkt.
    ${bottomText}
`;
const starTextLNormal = `
    Aktion für Neukunden bei Buchung über 
    <a rel="nofollow" href="http://congstar.de" target="_blank" class="sc-fEOsli jlobqD">
        congstar.de
    </a>
    bis 10.01.2023:
    Die congstar Allnet Flat L mit GB+ kostet monatlich 27 € statt 30 €.
    Mindestvertragslaufzeit 24 Monate. Einmaliger Bereitstellungspreis 0 € statt 15 €. Im
    Rahmen der Aktion wird die Bandbreite ab einem Datenvolumen von 25 GB statt 15 GB
    im jeweiligen Monat auf max. 32 Kbit/s im Download und Upload beschränkt.
    ${bottomText}
`;
const starTextLFlex = `
    Aktion für Neukunden bei Buchung über 
    <a rel="nofollow" href="http://congstar.de" target="_blank" class="sc-fEOsli jlobqD">
        congstar.de
    </a>
    bis 10.01.2023:
    Die congstar Allnet Flat L Flex mit GB+ kostet monatlich 27 € statt 30 €. Einmaliger
    Bereitstellungspreis 10 € statt 35 €. Im Rahmen der Aktion wird die Bandbreite ab
    einem Datenvolumen von 25 GB statt 15 GB im jeweiligen Monat auf max. 32 Kbit/s im
    Download und Upload beschränkt.
    ${bottomText}
`;
const newPrices = `
<div class="kam-normal">
    <span>
        0,00 €
        <span> 
            statt 
        </span> 
        <span>
            15,00 €
        </span>
    </span>
    <span> 
        einmaliger Bereitstellungspreis
    </span> 
</div>
<div class="kam-flex kam-hidden">
    <span>
        10,00 €
        <span> 
            statt 
        </span> 
        <span>
            35,00 €
        </span>
    </span>
    <span> 
        einmaliger Bereitstellungspreis
    </span> 
</div>
`;
Kameleoon.API.Data.writeLocalData('kamP09IsMonthly', false);
const pageIsM = document.location.pathname.includes('/allnet-flat-m');
const datas = [{
  selector: '.styles__Prices-sc-15gmzq7-4.foyCHQ div:nth-child(2) span.eNfhZL',
  text: '0,00&nbsp;€ statt 15,00&nbsp;€'
}, {
  selector: '.styles__Prices-sc-15gmzq7-4.jkBXEC div:nth-child(2) span.eNfhZL',
  text: '10,00&nbsp;€ statt 35,00&nbsp;€'
}];
const htmls = [{
  selector: '.bRunba',
  html: bulletPoint
}, {
  selector: 'div[data-testid="activationPrice"]',
  html: newPrices
}];

function setStarText() {
  Kameleoon.API.Core.runWhenElementPresent('#aria-description .sc-grREDI.fLwEK div:not([kam-p09-handled])', ([starElement]) => {
    const isMonthly = Kameleoon.API.Data.readLocalData('kamP09IsMonthly');

    if (pageIsM) {
      starElement.innerHTML = !isMonthly ? starTextMNormal : starTextMFlex;
    } else {
      starElement.innerHTML = !isMonthly ? starTextLNormal : starTextLFlex;
    }

    starElement.setAttribute('kam-p09-handled', true);
    setStarText();
  });
}

function setTarifText() {
  Kameleoon.API.Core.runWhenElementPresent('#aria-description div.sc-hKdnnL.dXodTF:not([kam-p09-handled])', ([tarifElement]) => {
    const childs = tarifElement.querySelectorAll('.sc-dIouRR.iiqzYB').length > 0 ? tarifElement.querySelectorAll('.sc-dIouRR.iiqzYB') : tarifElement.querySelectorAll('.sc-dIouRR.iXaxck');
    childs[7].innerText = '0 €';
    childs[9].innerText = '10 €';
    tarifElement.setAttribute('kam-p09-handled', true);
    setTarifText();
  });
}

function setNewPrice(selector, text) {
  Kameleoon.API.Core.runWhenElementPresent(selector, ([element]) => {
    element.innerHTML = text;
    element.classList.add('kam-text-end');
  });
}

function insertHTML(selector, html) {
  Kameleoon.API.Core.runWhenElementPresent(selector, ([element]) => {
    element.insertAdjacentHTML('beforebegin', html);
  });
}

function toggleElements(remove) {
  const flexes = document.querySelectorAll('.kam-flex');
  const normals = document.querySelectorAll('.kam-normal');

  if (remove) {
    normals.forEach(normal => {
      normal.classList.remove('kam-hidden');
    });
    flexes.forEach(flex => {
      flex.classList.add('kam-hidden');
    });
  } else {
    flexes.forEach(flex => {
      flex.classList.remove('kam-hidden');
    });
    normals.forEach(normal => {
      normal.classList.add('kam-hidden');
    });
  }
}

Kameleoon.API.Utils.addEventListener(document, 'click', ({
  target
}) => {
  const button = document.querySelector('a[data-testid="cart-button"]');
  button.pathname = `/portal${button.pathname}`;

  if (target.closest('[id="426"]') || target.closest('[id="428"]')) {
    Kameleoon.API.Data.writeLocalData('kamP09IsMonthly', false);
    button.search += `&cc=rb-13dhnr`;
    toggleElements(true);
  } else if (target.closest('[id="425"]') || target.closest('[id="427"]')) {
    Kameleoon.API.Data.writeLocalData('kamP09IsMonthly', true);
    button.search += `&cc=rb-13wbrt`;
    toggleElements(false);
  }
});
Kameleoon.API.Core.runWhenElementPresent('a[data-testid="cart-button"]', ([button]) => {
  button.pathname = `/portal${button.pathname}`;
  button.search += `&cc=rb-13dhnr`;
});
datas.forEach(data => {
  setNewPrice(data.selector, data.text);
});
htmls.forEach(data => {
  insertHTML(data.selector, data.html);
});
setStarText();
setTarifText();

function addClickEvent(iconSelector, popupSelector) {
  Kameleoon.API.Core.runWhenElementPresent(iconSelector, ([element]) => {
    const icon = document.querySelector(popupSelector);
    Kameleoon.API.Utils.addEventListener(element, 'click', () => {
      icon.click();
    });
  });
}

addClickEvent('#kam-icon-left', '[data-testid="total-price"] button');
addClickEvent('#kam-icon-right', '[data-testid="total-price"] button');