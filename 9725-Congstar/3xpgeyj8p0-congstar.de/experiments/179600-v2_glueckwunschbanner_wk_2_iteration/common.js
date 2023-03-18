import { goals } from './goals';

Kameleoon.API.Core.runWhenElementPresent('form button[type="submit"]', ([button]) => {
    Kameleoon.API.Utils.addEventListener(button, 'click', () => {
        Kameleoon.API.Goals.processConversion(goals['[T15] Click Weiter zur Kasse']);
    });
});
