console.log('Sticky Add2Cart');
import { stickybanner } from "./function";
// import { checktargeting } from "./custom";
// import { triggergial } from "./common";

// checktargeting()
// triggergial()
function init() {
    if (window.screen.width < 900) {
        stickybanner()
    }

}

Kameleoon.API.Core.runWhenElementPresent("button.btn-buy", () => {
    init();
}, 200);
Kameleoon.API.Core.runWhenElementPresent(".buybox__actions button", () => {
    window.reload()
    init();
}, 200);
