import { commongoals } from "./common";
import { giffstring } from "./htmlV2";





commongoals()
function init() {
    const kameleoon = Kameleoon.API.Utils

    const body = kameleoon.querySelectorAll('body')[0]
    body.classList.add('bm-Junglück-T07');

//     let initialStage = window.location.href === 'https://junglueck.de/collections/produkte'
//     let backStage = window.location.href === 'https://junglueck.de/collections/produkte?page=1'
// console.log(initialStage || backStage, initialStage , backStage);
//     if (initialStage || backStage) {

        var targetBlock = Kameleoon.API.Utils.querySelectorAll('.card__container.block:nth-child(4)')[0];
        console.log(targetBlock)
        targetBlock.insertAdjacentHTML('afterend', giffstring)
    // }


Kameleoon.API.Utils.addUniversalClickListener(document, ({target}) =>{
    let gif = target.closest('.giff-conatiner .bm-submit-button')

    if(gif){
        // Kameleoon.API.Goals.processConversion(goals['Click CTA GIF']);
        console.log('Click CTA GIF');
    }
})


}

Kameleoon.API.Core.runWhenElementPresent(".card__container.block:nth-child(4)", () => {
    init();
}, 200);