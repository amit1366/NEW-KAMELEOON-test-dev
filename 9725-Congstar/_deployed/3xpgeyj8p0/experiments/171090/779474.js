"use strict";

Kameleoon.API.Core.runWhenElementPresent('header a[href*="/werben-und-verdienen"] span', ([element]) => {
  element.innerText = 'Freunde einladen';
});