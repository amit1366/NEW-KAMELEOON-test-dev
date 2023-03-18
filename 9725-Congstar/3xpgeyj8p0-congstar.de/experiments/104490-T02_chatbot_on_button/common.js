const goals = {
    '[T02] Click on “Service-Chat” / “Chatbot” tile': 199561,
    '[T02] Exit after Chat/FAQ - service button': 206517, //NEW
};

const addGoalAndLocal = (goal, local) => {
    Kameleoon.API.Goals.processConversion(goal);
    if (local) {
        Kameleoon.API.Data.writeLocalData('click chatbot NEW', true);
        if (Kameleoon.API.Data.readLocalData('click chatbot - goal NEW') === location.href) return;
        Kameleoon.API.Goals.processConversion(goals['[T02] Exit after Chat/FAQ - service button']);
        Kameleoon.API.Data.writeLocalData('click chatbot - goal NEW', location.href);
    }
};

const addGoal = (elem, goal, local) => {
    Kameleoon.API.Core.runWhenElementPresent(elem, el => {
        el[0].addEventListener(Kameleoon.API.Utils.mouseDownEvent, () => {
            if (!Kameleoon.API.Utils.touchMoveEvent) {
                return addGoalAndLocal(goal, local);
            }
        });
    });
};


if (location.href === 'https://www.congstar.de/hilfe-service/kontakt/') {
    addGoal('span.btn-primary.btn-primary--service', goals['[T02] Click on “Service-Chat” / “Chatbot” tile'], true); //original
    addGoal('.kam-chatbot-service', goals['[T02] Click on “Service-Chat” / “Chatbot” tile'], true); //var 1|2
}
if (location.href === 'https://www.congstar.de/meincongstar/hilfe-service/') {
    addGoal('span.btn-primary.btn-primary--service', goals['[T02] Click on “Service-Chat” / “Chatbot” tile'], true); //original
    addGoal('.kam-chatbot-service', goals['[T02] Click on “Service-Chat” / “Chatbot” tile'], true); //var 1|2
}