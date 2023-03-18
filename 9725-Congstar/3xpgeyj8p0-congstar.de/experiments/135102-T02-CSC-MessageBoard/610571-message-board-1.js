/* eslint-disable max-len */
import { changingElement } from './module';

const configData = {
    kamId: 'SmlraG10ak5IRlpDeVRUazVVQVU5Zz09', 
    insertElement: 'replace', // replace, beforebegin, afterbegin, beforeend, afterend
    clickElementGoalId: '238182',
    domElementSelector: 'microservice-include[microservice-key="customermessages"]'
};

const pushData = {
    view: {
        event: 'customerMessages.messageBoard.viewMessage', 
        id: 'MB1', 
        name: 'Einfach mehr für dich drin: Die Allnet Flat M',
        creative: 'messageboard',
        position: 'CSC Perso T02 Komplexe Bühne'
    },
    click: {
        event: 'customerMessages.messageBoard.callToAction', 
        id: 'MB1', 
        name: 'Einfach mehr für dich drin: Die Allnet Flat M',
        creative: 'messageboard',
        position: 'CSC Perso T02 Komplexe Bühne'
    }
};

changingElement(configData, pushData);
