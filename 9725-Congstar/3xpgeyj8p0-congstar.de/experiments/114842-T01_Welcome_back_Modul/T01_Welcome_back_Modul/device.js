let deviceList = !!localStorage.getItem('kam_deviceList') ? JSON.parse(localStorage.getItem('kam_deviceList')) : null;
let device;
let id = 0;
let name = '';
let pageUrl = 'https://www.congstar.de/';
let imgUrl = '';
let price = '0.00';

if (deviceList) {
    deviceList.sort((a,b) => {
        if (b.PV === a.PV) return b.time_spent - a.time_spent;
        return b.PV - a.PV;
    });
    device = deviceList[0];
}

if (!!device) {
    id = device.id,
        name = device.name,
        pageUrl = device.url,
        imgUrl = device.device_image,
        price = device.price
}

const deviceTile = `<div class="kam-tile kam-device-tile" device-id="${id}">
    <div class="device-teaser theme--phones">
        <header class="device-teaser__header background-color--themed">
        <a title="${name}" href="${pageUrl}" class="btn-primary btn-primary--phones">
            <h4 class="device-teaser__title text-wrapper">
                ${name}
            </h4>
        </a>
        </header>
        <div class="device-teaser__container background-color--bright">
            <a title="${name}" class="device-teaser__image-link" href="${pageUrl}">
                <img class="device-teaser__image responsive-image" src="${imgUrl}" alt="" data-src="${imgUrl}">
            </a>          
        </div>
        <footer class="device-teaser__footer">
            <hr>
            <div class="teaser-price">
                <div class="price price--large">
                    <span class="price__euro">${price.split('.')[0]}</span>
                    <span class="price__cent">${price.split('.')[1]}</span>
                    <span class="price__rate">€ mtl.</span>
                    <div  class="footnote">
                        <span class="footnote__icon"></span>
                    </div>
                    <div class="price__duration">24 Monate Laufzeit</div>
                </div>
            </div>
            <a title="${name}"  class="btn-primary btn-primary--phones device-teaser__button" href="${pageUrl}">Zum Handy</a>
        </footer>
    </div>
</div>`;

const deviceTileDescription = `<div class="modal modal--footnote show" id="footnote"  role="dialog" aria-labelledby="Footnote text" aria-modal="true" style="padding-right: 17px; display: block;">
<div class="modal-dialog" role="document">
    <div class="modal-content background-color--bright">
        <div class="modal-header">
            <a href="#" class="close icon--close" data-dismiss="modal" aria-label="Close"></a>
            <h4 class="modal-title" id="myModalLabel">congstar Monatliche Rate:</h4>
        </div>
        <div class="modal-body" >Genannter Betrag ist für 24 Monate zusätzlich zu den Kosten des gewählten Tarifs zu zahlen. Angebot gilt nur bei Abschluss eines congstar Mobilfunkvertrages mit einer Mindestvertragslaufzeit von 24 Monaten. Alle Preise inklusive Umsatzsteuer und zzgl. 4,99 € <a href="https://www.congstar.de/hilfe-service/auftrag-lieferung/" title="Opens internal link in current window" target="_blank" class="internal-link">Versandkosten</a>.</div>
    </div>
</div>
</div><div class="modal-backdrop show"></div>`;

function otherDevicesTiles(block) {
    let numDeviceNewTile = deviceList.slice(1).slice(0, 3);
    for (let i = 0; i < numDeviceNewTile.length; i++) {
        let id = numDeviceNewTile[i].id;
        let name = numDeviceNewTile[i].name;
        let pageUrl = numDeviceNewTile[i].url;
        let imgUrl = numDeviceNewTile[i].device_image;
        let newDeviceTile = `<div class="kam-tile kam-device-additional-tile" device-id="${id}" additional-tile="${i}">
            <div class="device-teaser theme--phones">
                <div class="device-teaser__container background-color--bright">
                    <a title="${name}" class="device-teaser__image-link" href="${pageUrl}">
                        <img class="device-teaser__image responsive-image" src="${imgUrl}" alt="" data-src="${imgUrl}">
                    </a>
                </div>
                <header class="device-teaser__header background-color--themed">
                <a title="${name}" href="${pageUrl}" class="btn-primary btn-primary--phones">
                    <p class="device-teaser__title text-wrapper">
                        ${name}
                    </p>
                </a>
                </header>
            </div>
        </div>`;
        block.insertAdjacentHTML('beforeend', newDeviceTile);
    }
}

export default (block, showDescription) => {
    if (deviceList) {
        block.insertAdjacentHTML('beforeend', deviceTile);
        const deviceDescription = document.querySelector(`.kam-device-tile[device-id="${id}"] .footnote`);
        deviceDescription.href = '';
        deviceDescription.addEventListener('click', (e) => showDescription(e, deviceTileDescription));
        if (Kameleoon.API.Data.readLocalData('kam-number-of-tiles') === 5) otherDevicesTiles(block);
    }
}

