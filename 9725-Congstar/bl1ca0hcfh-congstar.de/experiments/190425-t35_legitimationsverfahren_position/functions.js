


export const bmTogglefunction = () => {
    Kameleoon.API.Utils.addUniversalClickListener(document,  function ({ target }) {
        var alreadyClick = "";

        var goalCheckoutBtn = target.closest('.bm_accordion_item') 
        // var goalCheckoutContent = goalCheckoutBtn.nextElementSibling
        if (goalCheckoutBtn) {
           
            // console.log(goalCheckoutBtn)
            // console.log(goalCheckoutContent)
          
            var alreadyExist = document.querySelector('.bm_accordion .active');            
               
                if (alreadyExist && alreadyClick != goalCheckoutBtn ) {
                    alreadyExist.classList.remove('active')
                    // goalCheckoutContent.classList.remove('active')
                    // console.log("alreadyClick", goalCheckoutContent);
                }
                // setTimeout(function(){
                    goalCheckoutBtn.classList.toggle('active')
                    // goalCheckoutContent.classList.toggle('active')
                    alreadyClick = goalCheckoutBtn ;
                //     console.log('hello', goalCheckoutContent);
                // }, 500)
                
                
            
        }

    

         


    })
}
