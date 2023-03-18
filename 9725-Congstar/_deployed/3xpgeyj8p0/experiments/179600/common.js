"use strict";

const goals = {
  '[T15] Click Weiter zur Kasse': 293486,
  '[T15] Access Persönliche Daten': 293485
};
Kameleoon.API.Core.runWhenElementPresent('form button[type="submit"]', ([button]) => {
  Kameleoon.API.Utils.addEventListener(button, 'click', () => {
    Kameleoon.API.Goals.processConversion(goals['[T15] Click Weiter zur Kasse']);
  });
});