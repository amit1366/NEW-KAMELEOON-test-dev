import { changingElement } from './module';

const configData = {
    kamId: 'VmNwZHllWlFCZUxmSnpwWUErNlU2UT09', 
    insertElement: 'replace', // replace, beforebegin, afterbegin, beforeend, afterend
    clickElementGoalId: '238182',
    domElementSelector: 'microservice-include[microservice-key="customermessages"]'
};

const pushData = {
    view: {
        event: 'customerMessages.messageBoard.viewMessage', 
        id: 'MB2', 
        name: 'Die Allnet Flat M: Noch mehr Datenvolumen',
        creative: 'messageboard',
        position: 'CSC Perso T02 Komplexe Bühne'
    },
    click: {
        event: 'customerMessages.messageBoard.callToAction', 
        id: 'MB2', 
        name: 'Die Allnet Flat M: Noch mehr Datenvolumen',
        creative: 'messageboard',
        position: 'CSC Perso T02 Komplexe Bühne'
    }
};

changingElement(configData, pushData);
