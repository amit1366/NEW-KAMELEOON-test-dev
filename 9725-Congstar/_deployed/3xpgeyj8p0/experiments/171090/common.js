"use strict";

const goals = {
  '[T21] Klick auf Werben&Verdienen': 287759
};
Kameleoon.API.Core.runWhenElementPresent('header a[href*="/werben-und-verdienen"]', ([element]) => {
  element.addEventListener('click', () => {
    Kameleoon.API.Goals.processConversion(goals['[T21] Klick auf Werben&Verdienen']);
  });
});