import icon from './icon';

if (!document.querySelector('.kam-chatbot-link')) {
    const createScript = (link) => {
        const scriptSDK = document.createElement('script');
        scriptSDK.setAttribute('src', link);
        scriptSDK.classList.add('kam-chatbot-link');
        document.querySelector('head').appendChild(scriptSDK);
    };

    const datesAreOnSameDay = (dateNow) =>
        dateNow.getFullYear() === 2020 &&
        dateNow.getMonth() === 3 &&
        (dateNow.getDate() === 10 || dateNow.getDate() === 13);

    let appId = '?appId=2';
    if (location.href.match(/(\/hilfe-service\/kontakt\/)|(\/meincongstar\/hilfe-service\/)/)) appId = '?appId=1';
    if (datesAreOnSameDay(new Date())) appId = '?appId=1';
    //  SDK initialization 

    console.log(appId);
    createScript(`https://www.congstar.de/fileadmin/files_congstar/inbenta/conf/inbenta-conf.js${appId}`);
}

const addInbentaAfterSearch = () => {
    //search
    Kameleoon.API.Core.runWhenElementPresent('#etva-wrapper', searchBlock => {
        const button = searchBlock[0].querySelector('.etsubmit');
        const input = document.querySelector('.etinputbox');

        if (!button || !input) return;

        const searchboxId = {
            'https://www.congstar.de/hilfe-service/kontakt/': 4,
            'https://www.congstar.de/hilfe-service/': 3,
        };

        const addMesage = () => {
            const initalText = document.querySelector('.etinputbox').value !== "Suchbegriff eingeben" ? document.querySelector('.etinputbox').value : false;
            if (window.Inbenta) window.Inbenta.openChatbot(initalText, searchboxId[location.href]);
        };

        input.addEventListener('keydown', ({ keyCode }) => {
            if (keyCode === 13) addMesage();
        });
        button.addEventListener('mousedown', () => {
            addMesage();
        });
    });
};

const addSersiveCode = () => {
    const clickInbentaBot = (elem, numb) => {
        elem.addEventListener('click', () => {
            if (window.Inbenta) window.Inbenta.openChatbot('', numb);
        });
    };
    //Servise
    Kameleoon.API.Core.runWhenElementPresent('.kam-list-chatbot', elem => clickInbentaBot(elem[0], 2));
};

//init chatbot
Kameleoon.API.Core.runWhenConditionTrue(
    () => typeof inbChatbotApp !== 'undefined',
    () => {
        addInbentaAfterSearch();
        addSersiveCode();

    }
);

if (!document.querySelector('#injector')) Kameleoon.API.Core.runWhenElementPresent('div.cxco-scrollable', el => el[0].insertAdjacentHTML('beforeend', `<div id='injector'></div>`));

Kameleoon.API.Core.runWhenElementPresent('#kfirst-widget-menu #m10', widget => {
    const textFAQ = widget[0].querySelector('.activity-caption-container');
    if (textFAQ) textFAQ.textContent = 'Chatbot';

    widget[0].classList.add('kam-hide');
    widget[0].insertAdjacentHTML('afterend', icon);
});