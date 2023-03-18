"use strict";

// console.log('New2 SS variation code called');
function init() {
  // console.log('New2 SS variation inside init');
  Kameleoon.API.Utils.querySelectorAll('body')[0].classList.add('bm-Congstar-T35');

  // dhl
  var DHLIdentCheck = Kameleoon.API.Utils.querySelectorAll('.loading-overlay-wrapper .bucket__wrap #legitimationDHLIdentCheck')[0];

  // if dhl is present in step 3 then proceed further
  if (DHLIdentCheck) {
    DHLIdentCheck.closest('congstar-bucket').classList.add('bm-Congstar-T35-DHLIdentCheck');

    // idnow
    var idnow = Kameleoon.API.Utils.querySelectorAll('.loading-overlay-wrapper .bucket__wrap #idNow')[0];
    if (idnow) {
      idnow.closest('congstar-bucket').classList.add('bm-Congstar-T35-idnow');
    }

    // KlarnaIdent
    var KlarnaIdent = Kameleoon.API.Utils.querySelectorAll('.loading-overlay-wrapper .bucket__wrap #preOrderKlarnaIdent')[0];
    if (KlarnaIdent) {
      KlarnaIdent.closest('congstar-bucket').classList.add('bm-Congstar-T35-KlarnaIdent');
    }

    // recomended badge
    if (Kameleoon.API.Utils.querySelectorAll('.bm-Congstar-T35-DHLIdentCheck .bm-t35-recomandedBadge')[0]) return;
    var badge = Kameleoon.API.Utils.querySelectorAll('.bm-Congstar-T35-DHLIdentCheck .bucket--outlined')[0];
    var badgeContent = '<span _ngcontent-fws-c37="" class="bucket__promotion bucket__promotion--recommendation bm-t35-recomandedBadge">Unsere Empfehlung</span>';
    if (badge) {
      badge.insertAdjacentHTML('afterbegin', badgeContent);
    }
    if (sessionStorage.getItem('bm-DHL-clicked')) return;
    DHLIdentCheck.click();
    sessionStorage.setItem('bm-DHL-clicked', true);
  }
}
Kameleoon.API.Core.runWhenElementPresent(".loading-overlay-wrapper .bucket__wrap #legitimationDHLIdentCheck, [pagetitle='Deine Bestellübersicht'] .customer-data .row [data-test-identification-method]", function () {
  init();
}, 200);