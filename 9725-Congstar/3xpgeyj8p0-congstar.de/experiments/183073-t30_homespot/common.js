import { urls } from './helper/constants';
import { goals } from './helper/goals';

if (window.location.pathname === urls.homespot30) {
    Kameleoon.API.Goals.processConversion(goals['[T30] Access PDP Homespot 30']);
} else if (window.location.pathname === urls.homespot100) {
    Kameleoon.API.Goals.processConversion(goals['[T30] Access PDP Homespot 100']);
} else if (window.location.pathname.includes(urls.homespot200)) {
    Kameleoon.API.Goals.processConversion(goals['[T30] Access PDP Homespot 200']);
}
