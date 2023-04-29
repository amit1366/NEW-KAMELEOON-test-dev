import { commongoals } from "./common"

commongoals()
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

Kameleoon.API.Core.runWhenElementPresent('.listing--container .has--variants .area--product-info', () => {
    init();
}, 500);