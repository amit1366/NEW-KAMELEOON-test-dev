
function init() {

    Kameleoon.API.Utils.querySelectorAll('body')[0].classList.add('bm-LC-t12')
    Kameleoon.API.Utils.querySelectorAll('.listing--container .has--variants .area--product-info').forEach(function(el){
        el.querySelectorAll('.product--variants--info').forEach(function(elem){
            if(el.querySelector('.bm-moreColor')) return
            if(elem.querySelector('.variant--option') !== null){
                if(window.location.href.indexOf('/de/de') > -1){

                   let url = el.querySelector('.product--title').getAttribute('href')
                    elem.insertAdjacentHTML('afterend', '<div class = "bm-moreColor"> <a href="'+url+'"> weitere Farben + </a> </div>')
                }
                if(window.location.href.indexOf('/de/en') > -1){
                    if(elem.querySelector('.bm-moreColor')) return

                    let url = el.querySelector('.product--title').getAttribute('href')
                    elem.insertAdjacentHTML('afterend', '<div class = "bm-moreColor"> <a href="'+url+'"> More Colors + </a> </div>') 
                }
            }
        })
            
        })

}

function goals(){
    Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {

        // click on bm color link
        if (target.closest('.bm-moreColor')) {
             Kameleoon.API.Goals.processConversion(goals['[T12] Klick weitere Farben']);
            console.log('[T12] Klick weitere Farben');
        }

        // click on product name
        if (target.closest('.listing--container .product--title')) {
             Kameleoon.API.Goals.processConversion(goals['[T12] Klick product name']);
            console.log('[T12] Klick product name');
        }

        // click on product image
        if (target.closest('.listing--container .product--image')) {
             Kameleoon.API.Goals.processConversion(goals['[T12] Klick product image']);
            console.log('[T12] Klick product image');
        }

    });
}

Kameleoon.API.Core.runWhenElementPresent('.listing--container .has--variants .area--product-info', () => {
    init();
    goals();
}, 500);