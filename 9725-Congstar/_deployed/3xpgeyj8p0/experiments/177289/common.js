"use strict";

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

const commonGoals = () => {
  if (document.location.pathname.includes('/congstar-for-friends')) {
    Kameleoon.API.Utils.addEventListener(document, 'click', ({
      target
    }) => {
      if (target.closest('.benefit[data-voucher-type="1"]')) {
        Kameleoon.API.Goals.processConversion(goals['[T26] Select 2GB Friends LP']);
      } else if (target.closest('.benefit[data-voucher-type="2"]')) {
        Kameleoon.API.Goals.processConversion(goals['[T26] Select 35€ Friends LP']);
      } else if (target.closest('.benefit[data-voucher-type="3"]')) {
        Kameleoon.API.Goals.processConversion(goals['[T26] Select 10 % Friends LP']);
      } else if (target.closest('button.copy-code')) {
        Kameleoon.API.Goals.processConversion(goals['[T26] Copy Friends code']);
      }
    });
  }
};

commonGoals();