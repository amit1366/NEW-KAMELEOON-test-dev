const goals = {
    'T22 A2C Prepaid M': 273873
};
if (/www.congstar.de\/prepaid\/prepaid-wie-ich-will\/allnet-m\//.test(window.location.href)) {
    Kameleoon.API.Core.runWhenElementPresent('button[data-test-action="addToCart"]', 
        ([elements]) => {
            elements.addEventListener('click', () => {
                Kameleoon.API.Goals.processConversion(goals['T22 A2C Prepaid M']);
            });
        });
}
