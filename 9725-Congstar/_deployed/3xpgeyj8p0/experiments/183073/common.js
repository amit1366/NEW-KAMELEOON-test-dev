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
const goals = {
  '[T30] Access PDP Homespot 30': 295974,
  '[T30] Access PDP Homespot 100': 295975,
  '[T30] Access PDP Homespot 200': 295976
};
if (window.location.pathname === urls.homespot30) {
  Kameleoon.API.Goals.processConversion(goals['[T30] Access PDP Homespot 30']);
} else if (window.location.pathname === urls.homespot100) {
  Kameleoon.API.Goals.processConversion(goals['[T30] Access PDP Homespot 100']);
} else if (window.location.pathname.includes(urls.homespot200)) {
  Kameleoon.API.Goals.processConversion(goals['[T30] Access PDP Homespot 200']);
}