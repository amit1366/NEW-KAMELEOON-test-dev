const device = Kameleoon.API.CurrentVisit.device.type;

const bannerHTML = `<div class="kam-VATBanner">
    <div class="kam-VATBanner__container">   
        <div class="kam-VATBanner__container_text">
            <p class="kam-VATBanner__container_text--title">Zurück auf 19% Mehrwertsteuer</p>
            <p>Leistungen, die ab dem 01.01.2021 erbracht werden, enthalten statt 16% wieder 19% Mehrwertsteuer. Hierdurch ergibt sich ein neuer Bruttopreis. Mehr Informationen zum Thema Mehrwertsteuer findest du auch <a href="https://www.congstar.de/hilfe-service/mehrwertsteuer" target="_blank" rel="noopener noreferrer">hier</a>.</p>
        </div>     
        <div class="kam-VATBanner__container_close">
            <span class="icon--close"></span>
        </div>      
    </div>
</div>`;

export {bannerHTML, device};