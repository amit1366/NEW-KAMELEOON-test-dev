"use strict";

const urls = {
  homepage: '/',
  festnetz: '/festnetz-internet/',
  vergleich: '/festnetz-internet/congstar-homespot-im-vergleich/',
  handys: '/handys/',
  homespot200: '/festnetz-internet/homespot-200',
  homespot100: '/festnetz-internet/homespot-100/',
  homespot30: '/festnetz-internet/homespot-30/'
};
const menuSelector = 'header [href*="/festnetz-internet/homespot-100/"]';
const contentSelector = '.content [href*="/festnetz-internet/homespot-100/"]';
const contentSelector200 = '.content [href*="/festnetz-internet/homespot-200/"]';
const texts = {
  30: 'Homespot <b>30</b> und <a href="/festnetz-internet/homespot-200/" title="Opens internal link in current window" class="internal-link"><b>200</b></a>? Wir zeigen dir, was du mit 30 GB alles machen kannst.',
  200: 'Homespot <a href="/festnetz-internet/homespot-30/"><strong>30</strong></a> und <strong>200</strong>? Wir zeigen dir, was du mit 200 GB alles machen kannst.',
  footnoteFlex: 'Preis 35 € statt bislang 55 € pro Monat. Angebot gültig bis zum 28.02.2023.<br><br>Datenvolumen pro Monat 200 GB. Einmaliger Bereitstellungspreis: 35 € in der monatlich kündbaren Variante. Der Tarif ermöglicht die Datennutzung über die Mobilfunktechnologie LTE nur an dem vom Kunden angegebenen Standort und dessen unmittelbaren Umkreis (sogenannter „Surfbereich“) innerhalb Deutschlands. Entgelt für Wechsel des „Surfbereiches“: 20€. Voraussetzung für die Nutzung ist die Verfügbarkeit der Mobilfunktechnologie LTE am angegebenen Standort sowie ein LTE-fähiges Endgerät. Ab einem Datenvolumen von 200 GB pro Monat wird die Bandbreite im jeweiligen Monat von geschätzten max. 50 Mbit/s im Download und geschätzten max. 25 Mbit/s im Upload auf max. 384 Kbit/s (Down- und Upload) beschränkt. GSM Sprachtelefonie ist ausgeschlossen.',
  footnoteNormal: 'Preis 35 € statt bislang 55 € pro Monat. Angebot zunächst gültig bis zum 28.02.2023.<br><br>Datenvolumen pro Monat 200 GB. Einmaliger Bereitstellungspreis 15 € bei Abschluss eines Vertrages mit 24 Monaten Mindestvertragslaufzeit. Der Tarif ermöglicht die Datennutzung über die Mobilfunktechnologie LTE nur an dem vom Kunden angegebenen Standort und dessen unmittelbaren Umkreis (sogenannter „Surfbereich“) innerhalb Deutschlands. Entgelt für Wechsel des „Surfbereiches“: 20€. Voraussetzung für die Nutzung ist die Verfügbarkeit der Mobilfunktechnologie LTE am angegebenen Standort sowie ein LTE-fähiges Endgerät. Ab einem Datenvolumen von 200 GB pro Monat wird die Bandbreite im jeweiligen Monat von geschätzten max. 50 Mbit/s im Download und geschätzten max. 25 Mbit/s im Upload auf max. 384 Kbit/s (Down- und Upload) beschränkt. GSM Sprachtelefonie ist ausgeschlossen.'
};
function hideTables() {
  Kameleoon.API.Core.runWhenElementPresent(contentSelector, buttons => {
    buttons.forEach(element => {
      const parent = element.closest('.ge-style-container');
      parent.classList.add('kam-T30-table');
    });
  });
}
function setText(text) {
  Kameleoon.API.Core.runWhenElementPresent(contentSelector, ([link]) => {
    const parent = link.parentNode;
    parent.innerHTML = text;
  });
}
function setPrices() {
  Kameleoon.API.Core.runWhenElementPresent(contentSelector200, links => {
    links.forEach(link => {
      var _link$closest, _link$closest2;
      const price = link.parentNode.querySelector('.price__euro') || ((_link$closest = link.closest('td')) === null || _link$closest === void 0 ? void 0 : _link$closest.querySelector('.price__euro')) || ((_link$closest2 = link.closest('.bucket__content')) === null || _link$closest2 === void 0 ? void 0 : _link$closest2.querySelector('.price__euro'));
      if (price) {
        var _link$closest3, _link$closest4;
        price.innerText = '35';
        const icon = link.parentNode.querySelector('footnote') || ((_link$closest3 = link.closest('td')) === null || _link$closest3 === void 0 ? void 0 : _link$closest3.querySelector('footnote')) || ((_link$closest4 = link.closest('.bucket__content')) === null || _link$closest4 === void 0 ? void 0 : _link$closest4.querySelector('footnote'));
        Kameleoon.API.Utils.addEventListener(icon, 'click', () => {
          Kameleoon.API.Core.runWhenElementPresent('.modal--footnote .modal-body', ([text]) => {
            text.innerHTML = text.innerText.replace('Preis 40 € statt bislang 55 € pro Monat. Angebot zunächst gültig bis zum 30.04.2023.', '<p>Preis 35 € statt bislang 55 € pro Monat. Angebot zunächst gültig bis zum 28.02.2023.</p><br/>');
          });
        });
      }
    });
  });
}
const removeElemFromSlick = link => {
  const parent = link.closest('.slick-slider');
  Kameleoon.API.Core.runWhenConditionTrue(() => window.jQuery, () => {
    // eslint-disable-next-line no-undef
    $(parent).slick('slickRemove', 1);
  });
};
const variationCode = variation => {
  if (document.location.pathname === urls.homepage) {
    Kameleoon.API.Core.runWhenElementPresent(contentSelector, ([link]) => {
      removeElemFromSlick(link);
    });
    if (variation === 2) {
      setPrices();
    }
  } else if (document.location.href.includes(urls.handys)) {
    Kameleoon.API.Core.runWhenElementPresent(contentSelector, ([link]) => {
      if (window.innerWidth >= 768) {
        let slickItemRemoved = false;
        link.closest('.plan-bucket-slide').remove();
        window.addEventListener('resize', () => {
          if (window.innerWidth < 768 && !slickItemRemoved) {
            Kameleoon.API.Core.runWhenElementPresent(contentSelector, ([newLink]) => {
              removeElemFromSlick(newLink);
            });
            slickItemRemoved = true;
          }
        });
      } else {
        removeElemFromSlick(link);
      }
    });
    if (variation === 2) {
      setPrices();
    }
  } else if (document.location.pathname === urls.festnetz || document.location.pathname === urls.vergleich) {
    hideTables();
    if (variation === 2) {
      setPrices();
    }
  } else if (document.location.pathname === urls.homespot30) {
    setText(texts[30]);
  } else if (document.location.pathname.includes(urls.homespot200)) {
    setText(texts[200]);
    if (variation === 2) {
      Kameleoon.API.Core.runWhenElementPresent('#c6058804 td:nth-child(2)', ([cost]) => {
        cost.childNodes[0].textContent = cost.childNodes[0].textContent.replace('40', '35');
        const footnote = cost.querySelector('footnote');
        Kameleoon.API.Utils.addEventListener(footnote, 'click', () => {
          Kameleoon.API.Core.runWhenElementPresent('.modal--footnote .modal-body', ([modal]) => {
            modal.innerHTML = texts.footnoteNormal;
          });
        });
      });
      Kameleoon.API.Utils.addEventListener(document, 'click', ({
        target
      }) => {
        if (target.closest('.configurator-selection__costs footnote')) {
          Kameleoon.API.Core.runWhenElementPresent('.modal--footnote .modal-body', ([modal]) => {
            const selected = document.querySelector('[data-test-state="isSelected"]');
            const type = selected.getAttribute('data-test-isflex');
            modal.innerHTML = type === 'true' ? texts.footnoteFlex : texts.footnoteNormal;
          });
        }
      });
    }
  }
  Kameleoon.API.Core.runWhenElementPresent(menuSelector, ([menuItems]) => {
    menuItems.parentNode.classList.add('kam-T30-hidden');
  }, 100);
};
variationCode(1);