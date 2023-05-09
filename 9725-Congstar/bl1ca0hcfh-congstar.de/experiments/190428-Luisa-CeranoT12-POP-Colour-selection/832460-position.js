console.log('Sticky Add2Cart');
import { stickybanner } from "./function";
// import { checktargeting } from "./custom";
import { triggergial } from "./common";

// checktargeting()
triggergial()
function init() {
    if (window.screen.width < 900) {
        stickybanner()
    }

}

Kameleoon.API.Core.runWhenElementPresent("button.btn-buy, .buybox__actions button", () => {
    init();
}, 200);
