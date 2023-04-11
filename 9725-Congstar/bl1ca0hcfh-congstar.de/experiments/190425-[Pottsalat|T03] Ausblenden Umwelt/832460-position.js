function init() {
    console.log('hello');
    Kameleoon.API.Utils.querySelectorAll('body')[0].classList.add('bmkameleoon-Pottsalat-T03')
}

Kameleoon.API.Core.runWhenElementPresent("body", function () {
    init()
}, 200) 