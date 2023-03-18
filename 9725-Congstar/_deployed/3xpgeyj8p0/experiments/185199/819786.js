"use strict";

/* eslint-disable max-len */
const logic = (campaignParameter, addtionalFootnoteText, promotionListText) => {
  const currentURL = document.location.href;
  const splitAtHostEnd = currentURL.includes('handytarife') ? currentURL.split(/(?=\/handytarife\/)/) : currentURL.split(/(?=\/geraete\/)/);
  const newURL = currentURL.includes('?') ? `${splitAtHostEnd[0]}/portal${splitAtHostEnd[1]}&${campaignParameter}` : `${splitAtHostEnd[0]}/portal${splitAtHostEnd[1]}?${campaignParameter}`;
  if (!currentURL.includes(campaignParameter)) {
    document.location = newURL;
  }
  Kameleoon.API.Core.runWhenElementPresent('[data-testid="promotion"] ul', ([promotionList]) => {
    promotionList.insertAdjacentHTML('afterbegin', `
        <li class="kam-t32 list-item">
            <span class="checkmark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="currentColor" stroke="currentColor" stroke-width="0" width="1em" height="1em">
                <path fill-rule="evenodd" d="M5.9 21c1.7-1.4 7.5 3.4 7.5 3.4s5.2-6.1 9.6-9.8c4.4-3.7 8.9-5.6 9.5-5.2.6.4-6 6.3-9.4 10.8-3.1 4.2-5.3 7.5-6.7 9.3-1.1 1.4-2.2 1.2-4.7-1.2-2.2-2-7.8-5.7-5.8-7.3z" clip-rule="evenodd"></path>
            </svg>
            </span>
            <span>
                ${promotionListText}
                <span class="footnote">
                    <button data-testid="footnote-icon-button" type="button" aria-label="Fußnote" class="footnote-icon-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="currentColor" stroke="currentColor" stroke-width="0" width="1em" height="1em">
                        <path fill-rule="evenodd" d="M20 7C12.8 7 7 12.8 7 20s5.8 13 13 13 13-5.8 13-13S27.2 7 20 7zm0 24.1c-6.1 0-11-4.9-11-11S13.9 9 20 9s11 4.9 11 11-4.9 11.1-11 11.1z" clip-rule="evenodd"></path>
                        <path fill-rule="evenodd" d="M21.1 13l.3 5.4 5.3-1.3c1.2-.1 1.7 1.4.7 2L22.2 21l3 4.7c.5 1.1-.8 2-1.7 1.3L20 22.6 16.5 27c-.9.7-2.2-.2-1.7-1.3l3-4.7-5.2-1.8c-1-.6-.5-2.2.7-2l5.3 1.3.3-5.4c.3-1.2 1.9-1.2 2.2-.1z" clip-rule="evenodd"></path>
                    </svg>
                    </button>
                </span>
            </span>
        </li>
        `);
    Kameleoon.API.Core.runWhenElementPresent('[class*="styles__PriceWrapper"] [data-testid="footnote-modal"]', ([footnoteBtnOrig]) => {
      const footnoteBtn = document.querySelector('.kam-t32 .footnote-icon-button');
      footnoteBtn.addEventListener('click', () => {
        footnoteBtnOrig.click();
      });
    });
  });
  const config = {
    attributes: true,
    childList: true,
    subtree: true
  };
  const callback = mutationList => {
    for (const mutation of mutationList) {
      if (mutation.addedNodes.length === 1 && mutation.addedNodes[0].classList && mutation.addedNodes[0].classList.contains('ReactModal__Overlay') && mutation.addedNodes[0].querySelector('[data-testid*="comp-footnote-modal-footnoteItemId-"]') && mutation.addedNodes[0].querySelector('header h4').innerText.includes('Allnet Flat')) {
        const textElem = mutation.addedNodes[0].querySelector('[data-testid*="comp-footnote-modal-footnoteItemId-"] > div');
        textElem.innerText = `${textElem.innerText} ${addtionalFootnoteText}`;
      }
    }
  };
  const observer = new MutationObserver(callback);
  observer.observe(document.body, config);
};
const campaignParameter = 'sp=cweb&cc=bsp-19bdgf';
const promotionListText = '15 € Bereitstellungspreis sparen bei Buchung bis zum 28.2.2023.';
const addtionalFootnoteText = 'Aktion: Einmaliger Bereitstellungspreis entfällt bei Buchung eines Vertrages mit 24-monatiger Mindestvertragslaufzeit und 20€ statt 35€ bei Buchung eines Vertrages ohne Mindestvertragslaufzeit.';
logic(campaignParameter, addtionalFootnoteText, promotionListText);