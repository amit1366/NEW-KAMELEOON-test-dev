const surveyContainer = `
<div class="modal show kam-P08__modal" id="modal" tabindex="-1" role="dialog" 
    aria-modal="true">
   <div class="modal-dialog kam-P08__wrapper" role="document">
      <div class="modal-content kam-P08__content">
         <div  class="close icon--close kam-P08__closeIcon" data-dismiss="modal"></div>
         <iframe class='kam-P08__iframe' 
         src='https://umfrage.congstar-special.de/congstar-x-evaluation/'></iframe>
      </div>
   </div>
   <div class="modal-backdrop show kam-P08__overlay"></div>
`;

const selectors = {
    kamCloseBtn: '.kam-P08__closeIcon',
    kamSurvey: '.kam-P08__modal',
    kamOverlay: '.kam-P08__overlay'
};

function closeSurvey(btn) {
    Kameleoon.API.Utils.addUniversalClickListener(btn, (event) => {
        event.preventDefault();
        const kamSurvey = document.querySelector(selectors.kamSurvey);
        const kamOverlay = document.querySelector(selectors.kamOverlay);
        kamOverlay.remove();
        kamSurvey.remove();
    });
}

Kameleoon.API.Core.runWhenElementPresent('body', () => {
    document.body.insertAdjacentHTML('beforeend', surveyContainer);
    const kamCloseBtn = document.querySelector(selectors.kamCloseBtn);
    const kamOverlay = document.querySelector(selectors.kamOverlay);

    closeSurvey(kamCloseBtn);
    closeSurvey(kamOverlay);
}); 
