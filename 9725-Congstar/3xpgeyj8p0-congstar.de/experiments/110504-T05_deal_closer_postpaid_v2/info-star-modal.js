const modal = `
    <div class="modal modal--footnote show kam-footnote" id="footnote" tabindex="-1" role="dialog" aria-labelledby="Footnote text" aria-modal="true" style="padding-right: 15px;display: block;">
        <div class="modal-dialog" role="document">
            <div class="modal-content background-color--bright">
                <div class="modal-header">
                    <a class="close icon--close kam_close" data-dismiss="modal" aria-label="Close"></a>
                    <h4 class="modal-title" id="myModalLabel">Allnet Flat M</h4>
                </div>
                <div class="modal-body" ng-bind-html="descriptionWithHtml">Preis: 19,50 €/ Monat bei Abschluss eines Vertrags mit 24 Monaten Mindestvertragslaufzeit. Dieser Preis berechnet sich gemäß eines Mehrwertsteuersatzes von 16% und gilt vom 01.07.- voraussichtlich 31.12.2020. Die Mehrwertsteuer ändert sich voraussichtlich ab dem 01.01.2021 auf 19%. Der monatliche Grundpreis erhöht sich in diesem Fall auf 20 €/ Monat. Einmaliger Bereitstellungspreis: 14,63 €. Das Paket enthält eine Telefonie-Flat und SMS-Flat in alle dt. Netze; im EU-Ausland sind die Inklusivleistungen ohne Zusatzkosten nutzbar. Preise für Sonder- und Servicerufnummern abweichend. Surfen gilt für die Datennutzung innerhalb Deutschlands und im EU-Ausland. Bei Buchung über www.congstar.de bis zum 15.09.2020 wird die Bandbreite ab einem Datenvolumen von 8 GB statt 5 GB im jeweiligen Monat von max. 25 Mbit/s im Download und 5 Mbit/s im Upload auf max. 32 Kbit/s im Download und Upload beschränkt.</div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop show"></div>`;
export const dispalyFootnote = () => {
    document.querySelector('body').insertAdjacentHTML('beforeend', modal);
    const footnote = document.getElementById('footnote');
    const footnoteClose = document.querySelector('#footnote .close.icon--close');
    const footnoteBackdrop = document.querySelector('.modal-backdrop.show');
    footnote.addEventListener('click', ({target})=> {
        if (target === footnoteClose || !target.closest('.modal-dialog')) {
            footnote.remove();
            footnoteBackdrop.remove();
        }
    });
};
