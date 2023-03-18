import { goals } from './helper/goals';
import { variationCode } from './helper/script';

if (window.location.pathname.includes('/festnetz-internet/homespot-200')
&& !window.location.search.includes('cc=hsp-18lkjgh')) {
    Kameleoon.API.Goals.cancelConversion(goals['[T30] Access PDP Homespot 200']);
    Kameleoon.API.Core.processRedirect('https://www.congstar.de/portal/festnetz-internet/homespot-200?cc=hsp-18lkjgh');
}
variationCode(2);
