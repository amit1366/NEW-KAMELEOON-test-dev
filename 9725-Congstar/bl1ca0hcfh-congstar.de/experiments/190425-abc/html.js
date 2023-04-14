

// energie and bonus 
export const bmstring = `
<div id="bm-popup-overlay" class="bm-overlay">
   <div class="bm-popup">
     <a class="close" href="#">×</a>
     <div class="bm-content">
       <div class="bm-content-left">
         <div class="teaser" id="teaser1">
           <p>teaser1</p>
         </div>
         <div class="teaser" id="teaser2">
           <p>teaser2</p>
         </div>
       </div>
       <div class="bm-content-right">
         <div class="bm-content-right-previous">
           <h1>Jetzt Member werden</h1>
           <p>Als The Shirt Club Mitglied profitieren Sie von zahlreichen maßgeschneiderten Vorteilen, Services und
             Angeboten. Wir verwöhnen Sie und machen Ihren Einkauf zu einem echten Erlebnis. Melden Sie sich direkt an.
           </p>
           <input class="bm-email-input" type="email" name="email" placeholder="Email">
           <span class="bm-error">this field required</span>
           <div class="bm-cta-wrapper">
             <button type="button" id="open-registration-form" class="btn btn-primary w-100">Registrieren</button>
           </div>
           <div class="bm-cta-wrapper register">
             <span>Sie haben bereits ein Konto?</span>
             <a href="https://www.seidensticker.com/de/de/account/login"><button type="button" id="login-registration" class="btn btn-primary w-100">Anmelden</button></a>
           </div>
         </div>
         <div class="bm-login-fetch-data d-none">
           <div class="bm-iframe"><iframe src="https://www.seidensticker.com/de/de/account/login"
               title="description"></iframe></div>
         </div>
       </div>
     </div>
   </div>
 </div>`