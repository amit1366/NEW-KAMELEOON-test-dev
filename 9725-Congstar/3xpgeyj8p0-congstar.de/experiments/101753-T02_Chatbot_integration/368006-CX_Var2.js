import icon from './icon';

; (function (d, t) {
    const src = 'https://cdn.conversationalsdevelopment.nl/congstar/client/index.js';
    const g = d.createElement(t), s = d.getElementsByTagName(t)[0];
    g.src = src + '?v=' + (+new Date);
    g.async = true;
    s.parentNode.insertBefore(g, s);
}(document, 'script'));

window.cvva = window.cvva || [];

const fixedChatbotImage = () => {
    Kameleoon.API.Core.runWhenElementPresent('.cvco-divider__body p', elem => {
        const image = elem[0].textContent;
        elem[0].outerHTML = `<img src="${image}">`;
    });
};
fixedChatbotImage();

const clickInbentaBot = (elem) => {
    elem.addEventListener('click', () => {
        window.cvva.push(['openVA']);
    });
};

const timeForChatbot = () => {
    const button = document.querySelector('span.btn-primary.btn-primary--service');
    if (button && button.matches('ng-transclude ng-transclude:not(.ng-hide) span.btn-primary.btn-primary--service')) {
        return false;
    }
    return true;
};

//Servise
Kameleoon.API.Core.runWhenElementPresent('#kfirst-widget-menu #m10', widget => {
    const textFAQ = widget[0].querySelector('.activity-caption-container');
    if (textFAQ) textFAQ.textContent = 'Chatbot';

    widget[0].classList.add('kam-hide');
    widget[0].insertAdjacentHTML('afterend', icon);

    const chatbot = document.querySelector('.kam-list-chatbot');
    clickInbentaBot(chatbot);
});

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

    clickInbentaBot(serviceChatbot);
});

//search
Kameleoon.API.Core.runWhenElementPresent('#etva-wrapper', searchBlock => {
    const button = searchBlock[0].querySelector('.etsubmit');
    const input = document.querySelector('.etinputbox');

    if (!button || !input) return;

    const addMesage = () => {
        if (document.querySelector('.etinputbox').value === 'Suchbegriff eingeben' || document.querySelector('.etinputbox').value === '') return;
        window.cvva.push(['openVA', document.querySelector('.etinputbox').value]);
    };

    input.addEventListener('keydown', ({ keyCode }) => {
        if (keyCode === 13) addMesage();
    });
    button.addEventListener('mousedown', () => {
        addMesage();
    });
});