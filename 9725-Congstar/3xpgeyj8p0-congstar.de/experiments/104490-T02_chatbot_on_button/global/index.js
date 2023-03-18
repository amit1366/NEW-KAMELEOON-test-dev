const goals = {
    '[T02] AddToCart after - service button': 206518, //NEW
    '[T02] Exit after Chat/FAQ - service button': 206517, //NEW
};
//add2cart OLD
if (location.href.match('https://www.congstar.de/checkout') && Kameleoon.API.Data.readLocalData('Add to cart')) {
    if (Kameleoon.API.Data.readLocalData('click chatbot')) {
        Kameleoon.API.Goals.processConversion(goals['[T02] AddToCart after Chat/FAQ']);
    }
    //T02_chatbot-button
    if (Kameleoon.API.Data.readLocalData('click chatbot NEW')) {
        Kameleoon.API.Goals.processConversion(goals['[T02] AddToCart after - service button']);
    }
}
//T02_chatbot-button
if (Kameleoon.API.Data.readLocalData('click chatbot - goal NEW') && Kameleoon.API.Data.readLocalData('click chatbot - goal NEW') !== location.href) {
    Kameleoon.API.Data.writeLocalData('click chatbot - goal NEW', null);
    Kameleoon.API.Goals.cancelConversion(goals['[T02] Exit after Chat/FAQ - service button']);
}