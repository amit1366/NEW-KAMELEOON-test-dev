console.log('Sticky Add2Cart');
import { giffstring } from "./html";



// viewport helper
function elementInViewport2(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
}




function init() {
    const kameleoon = Kameleoon.API.Utils


    const body = kameleoon.querySelectorAll('body')[0]
    body.classList.add('Sticky-Add2Cart');

    body.insertAdjacentHTML('afterbegin', giffstring)
 

   body.addEventListener("mousewheel", function (event) {
            // console.log('scroll');
          // match condition element available
          console.log();
			if (elementInViewport2(document.querySelector('button.btn-buy'))) {				
					body.classList.add("bm_inviewport");	
                    // console.log('body');			
			} else {
				    body.classList.remove("bm_inviewport");				
			}
          });

    
       document.querySelector('.bm-atc').addEventListener("click", function (event) {
            document.querySelector('button.btn-buy').click()
          })




}

Kameleoon.API.Core.runWhenElementPresent("body", () => {
    init();
}, 200);
