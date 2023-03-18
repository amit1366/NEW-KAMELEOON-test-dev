
export const dispalyFootnote = (namePlan, price, tarif) => {

    const modal = `
    <div class="modal modal--footnote show kam-footnote" id="footnote" tabindex="-1" role="dialog" aria-labelledby="Footnote text" aria-modal="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content background-color--bright">
                <div class="modal-header">
                    <a class="close icon--close kam_close" data-dismiss="modal" aria-label="Close"></a>
                    <h4 class="modal-title" id="myModalLabel">${namePlan}</h4>
                </div>
                <div class="modal-body" ng-bind-html="descriptionWithHtml">Preis: ${price} €/Monat bei Abschluss eines Vertrags mit 24 Monaten Mindestvertragslaufzeit. Einmaliger Bereitstellungspreis: 15 €. Das Paket enthält eine Telefonie-Flat und SMS-Flat in alle dt. Netze; im EU-Ausland sind die Inklusivleistungen ohne Zusatzkosten nutzbar. Preise für Sonder- und Servicerufnummern abweichend. Surfen gilt für die Datennutzung innerhalb Deutschlands und im EU-Ausland. Aktion: Bei Buchung über www.congstar.de bis zum 30.06.2021 wird die Bandbreite ab einem Datenvolumen von ${tarif} im jeweiligen Monat von max. 25 Mbit/s im Download und 5 Mbit/s im Upload auf max. 32 Kbit/s im Download und Upload beschränkt.</div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop show"></div>`;
    
    document.querySelector('body').insertAdjacentHTML('beforeend', modal);
    const footnote = document.getElementById('footnote');
    const footnoteClose = document.querySelector('#footnote .close.icon--close');
    const footnoteBackdrop = document.querySelector('.modal-backdrop.show');
    footnote.addEventListener('click', ({target})=> {
        if (target === footnoteClose || !target.closest('.modal-dialog')) {
            footnote.style.display = 'none';
            footnoteBackdrop.style.display = 'none';
        }
    });
};
