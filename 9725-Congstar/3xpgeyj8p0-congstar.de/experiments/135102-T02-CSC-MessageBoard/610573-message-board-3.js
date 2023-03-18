import { changingElement } from './module';

const configData = {
    kamId: 'WFZxRHZEcTNFYWdrQ2JhMFBjTkYrdz09', 
    insertElement: 'replace', // replace, beforebegin, afterbegin, beforeend, afterend
    clickElementGoalId: '238182',
    domElementSelector: 'microservice-include[microservice-key="customermessages"]'
};

const pushData = {
    view: {
        event: 'customerMessages.messageBoard.viewMessage', 
        id: 'MB3', 
        name: 'Wechsle jetzt in die Allnet Flat M!',
        creative: 'messageboard',
        position: 'CSC Perso T02 Komplexe Bühne'
    },
    click: {
        event: 'customerMessages.messageBoard.callToAction', 
        id: 'MB3', 
        name: 'Wechsle jetzt in die Allnet Flat M!',
        creative: 'messageboard',
        position: 'CSC Perso T02 Komplexe Bühne'
    }
};

changingElement(configData, pushData);
