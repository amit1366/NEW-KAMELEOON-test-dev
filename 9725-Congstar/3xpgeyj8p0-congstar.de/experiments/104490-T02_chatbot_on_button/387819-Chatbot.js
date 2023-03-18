if (!document.querySelector('.kam-chatbot-link')) {
    const createScript = (link) => {
        const scriptSDK = document.createElement('script');
        scriptSDK.setAttribute('src', link);
        scriptSDK.classList.add('kam-chatbot-link');
        document.querySelector('head').appendChild(scriptSDK);
    };

    let appId = '?appId=2';
    if (location.href.match(/(\/hilfe-service\/kontakt\/)|(\/meincongstar\/hilfe-service\/)/)) appId = '?appId=1';
    //  SDK initialization 

    createScript(`https://www.congstar.de/fileadmin/files_congstar/inbenta/conf/inbenta-conf.js${appId}`);
}

const timeForChatbot = () => {
    const button = document.querySelector('span.btn-primary.btn-primary--service');
    if (button && button.matches('ng-transclude ng-transclude:not(.ng-hide) span.btn-primary.btn-primary--service')) {
        return false;
    }
    return true;
};

const addSersiveCode = () => {
    const clickInbentaBot = (elem, numb) => {
        elem.addEventListener('click', () => {
            if (window.Inbenta) window.Inbenta.openChatbot('', numb);
        });
    };
    Kameleoon.API.Core.runWhenElementPresent('span.btn-primary.btn-primary--service', button => {
        button[0].outerHTML = `<div class="kam-chatbot-service btn-primary btn-primary--service">${timeForChatbot() ? 'Chatbot' : 'Service Chat'}</div>`;
        const serviceChatbot = document.querySelector('.kam-chatbot-service');
        // display chatbot during non service hours
        if (timeForChatbot()) {
            const serviceChatbotParent = serviceChatbot.closest('div.col-12.col-md-4.col-lg-4');
            Kameleoon.API.Core.runWhenConditionTrue(
                () => { return serviceChatbotParent.querySelector('ng-transclude ng-transclude:not(.ng-hide) .ce-external-content .btn-primary.btn-primary--dark') },
                () => {
                    const nonAvailableButton = serviceChatbotParent.querySelector('ng-transclude ng-transclude:not(.ng-hide) .ce-external-content .btn-primary.btn-primary--dark');
                    nonAvailableButton.insertAdjacentElement('beforebegin', serviceChatbot);
                    nonAvailableButton.style.display = 'none';
                    if (location.href.match(/\/meincongstar\/hilfe-service\//) && window.innerWidth >= 768) serviceChatbot.style.marginBottom = 'calc(1em + 6px)';
                }
            );
        }
        clickInbentaBot(serviceChatbot, 5);
    });
};

//init chatbot
Kameleoon.API.Core.runWhenConditionTrue(
    () => typeof inbChatbotApp !== 'undefined', 
    () => {
        addSersiveCode();
    }
);

if (!document.querySelector('#injector')) Kameleoon.API.Core.runWhenElementPresent('div.cxco-scrollable', el => el[0].insertAdjacentHTML('beforeend', `<div id='injector'></div>`));