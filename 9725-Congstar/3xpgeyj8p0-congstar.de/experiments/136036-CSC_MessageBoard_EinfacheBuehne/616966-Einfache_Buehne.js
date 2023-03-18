import changingElement from './module-Einfache_Buehne';

const configData = {
    kamId: 'cWlMUUtmWmxRVjhjZEJJb0JmR1pUUT09', 
    insertElement: 'replace', // replace, beforebegin, afterbegin, beforeend, afterend
    clickElementGoalId: '238182',
    domElementSelector: 'microservice-include[microservice-key="customermessages"]'
};

const pushData = {
    view: {
        event: 'customerMessages.messageBoard.viewMessage', 
        id: 'MB4', 
        name: 'Sommer, Sonne, Daten: Die Allnet Flat M',
        creative: 'messageboard',
        position: 'CSC Perso T02 Einfache Bühne'
    },
    click: {
        event: 'customerMessages.messageBoard.callToAction', 
        id: 'MB4', 
        name: 'Sommer, Sonne, Daten: Die Allnet Flat M',
        creative: 'messageboard',
        position: 'CSC Perso T02 Einfache Bühne'
    }
};

changingElement(configData, pushData);
