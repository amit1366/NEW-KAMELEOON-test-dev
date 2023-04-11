import { selectors } from "./selectors";


let alreadyClick = "";
export const bmTogglefunction = () => {
    Kameleoon.API.Utils.addUniversalClickListener(document, function ({ target }) {
        let goalCheckoutBtn = target.closest(selectors.accordionTab)
        if(goalCheckoutBtn){
            let alreadyExist = document.querySelector(selectors.accordianExist)
            if (alreadyExist && alreadyClick != goalCheckoutBtn) {
                alreadyExist.classList.remove(selectors.accordionShow)
            }
            goalCheckoutBtn.classList.toggle(selectors.accordionShow)
            alreadyClick = goalCheckoutBtn;
        }
    })
}
