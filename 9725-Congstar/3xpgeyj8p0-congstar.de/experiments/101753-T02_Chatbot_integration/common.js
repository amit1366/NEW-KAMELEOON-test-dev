const goals = {
    '[T02] Click on FAQ service bar': 199558,
    '[T02] Click on FAQ service page': 199559,
    '[T02] Click on FAQ contact page': 199560,
    '[T02] Click on Service service bar': 199563,
    '[T02] Click on Kontakt service bar': 199564,
    '[T02] Exit after Chat/FAQ': 199565
};

const addGoalAndLocal = (goal, local) => {
    Kameleoon.API.Goals.processConversion(goal);
    if (local) {
        Kameleoon.API.Data.writeLocalData('click chatbot', true);
        if (Kameleoon.API.Data.readLocalData('click chatbot - goal') === location.href) return;
        Kameleoon.API.Goals.processConversion(goals['[T02] Exit after Chat/FAQ']);
        Kameleoon.API.Data.writeLocalData('click chatbot - goal', location.href);
    }
};

const addGoal = (elem, goal, local, search) => {
    Kameleoon.API.Core.runWhenElementPresent(elem, el => {
        el[0].addEventListener(Kameleoon.API.Utils.mouseDownEvent, () => {
            if (!Kameleoon.API.Utils.touchMoveEvent) {
                if (!search) {
                    return addGoalAndLocal(goal, local);
                }
                Kameleoon.API.Core.runWhenElementPresent('.etinputbox', input => {
                    if (input[0].value && input[0].value !== 'Suchbegriff eingeben') {
                        return addGoalAndLocal(goal, local);
                    }
                });
            }
        });
    });
};

addGoal('#m10', goals['[T02] Click on FAQ service bar'], true); //original
addGoal('#m11', goals['[T02] Click on Service service bar'], false); //original
addGoal('#m12', goals['[T02] Click on Kontakt service bar'], false); //original

addGoal('.kam-list-chatbot', goals['[T02] Click on FAQ service bar'], true); //var 1|2

const addGoalEnter = (goal, local) => {
    Kameleoon.API.Core.runWhenElementPresent('.etinputbox', input => {
        input[0].addEventListener('keydown', ({ keyCode }) => {
            if (keyCode === 13) addGoalAndLocal(goal, local);
        });
    });
}

if (location.href === 'https://www.congstar.de/hilfe-service/') {
    addGoal('.etsubmit', goals['[T02] Click on FAQ service page'], true, true); //original|var 1|2
    addGoalEnter(goals['[T02] Click on FAQ service page'], true);
}
if (location.href === 'https://www.congstar.de/hilfe-service/kontakt/') {
    addGoal('.etsubmit', goals['[T02] Click on FAQ contact page'], true, true); //original|var 1|2
    addGoalEnter(goals['[T02] Click on FAQ contact page'], true);
}
if (location.href === 'https://www.congstar.de/meincongstar/hilfe-service/') {
    addGoal('.etsubmit', goals['[T02] Click on FAQ service page'], true, true); //original|var 1|2
    addGoalEnter(goals['[T02] Click on FAQ service page'], true);
}