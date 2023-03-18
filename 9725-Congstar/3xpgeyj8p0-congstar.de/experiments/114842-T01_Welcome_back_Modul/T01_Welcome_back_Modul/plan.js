let planList = !!localStorage.getItem('kam_planList') ? JSON.parse(localStorage.getItem('kam_planList')) : null;
let plan = null;
let id = 0;
let name = '';
let pageUrl = 'https://www.congstar.de/';
let imgUrl = '';
let price = '0.00';
let description = '';
let tarif = '';

if (planList) {
    planList.sort((a,b) => {
        if (b.PV === a.PV) return b.time_spent - a.time_spent;
        return b.PV - a.PV;
    });
    plan = planList[0];
}


if (!!plan) {
    id = plan.id,
        name = plan.name,
        pageUrl = plan.url,
        imgUrl = plan.badge,
        price = plan.price,
        description = plan.description,
        tarif = plan.tarif
}

const planTileTarif = () => {
    let tarifHTML = '';
    if (tarif) {
        tarif.forEach(item => {
            let tarifType = item.type;
            const tarifName = item.description;
            switch (item.type) {
                case 'telephony': tarifType = 'phone'; break;
                case 'sms': tarifType = 'sms'; break;
                case 'data': tarifType = 'internet'; break;
                case 'telephony-and-sms': tarifType = 'phone-sms'; break;
                case 'roaming': tarifType = 'roaming-eu'; break;
                case 'fairConditions': tarifType = 'heart'; break;
                case 'contractDuration': tarifType = 'contract-duration'; break;
                case 'other': tarifType = 'check'; break;
            }
            tarifHTML += `<li class="icon--${tarifType}">${tarifName}</li>`;
        })
    }
    return tarifHTML
};

const tarifHTML = `<div class="plan-bucket__content">
<ul class="icon-list icon-list--themed">
   ${planTileTarif()}
 </ul>
</div>`;

let planContent = `${tarifHTML} <div class="plan-bucket__background-image responsive-image responsive-image-bg" data-src="${imgUrl}" style="background-image: url(${imgUrl});"></div>`;
if (id === 370) planContent = `<div class="plan-bucket__content">
        <a title="${name}" href="${pageUrl}" >
            <img class="plan-bucket__image responsive-image"  alt="" data-src="${imgUrl}" src="${imgUrl}">
        </a>
    </div>`

const planTile = `<div class="kam-tile kam-plan-tile theme--postpaid" plan-id="${id}">
    <div class="plan-bucket background-color--bright">
        <header class="plan-bucket__header">
    <h4 class="plan-bucket__title" >${name}</h4>
</header>
<div class="plan-bucket__container">
    ${planContent}
</div>
<footer class="plan-bucket__footer">
    <hr>
    <div class="teaser-price">
        <div class="price">
            <span class="price__euro">${price.split('.')[0]}</span>
            <span class="price__cent">${price.split('.')[1]}</span>
            <span class="price__rate">€ mtl.</span>
            <div class="footnote">
                <span class="footnote__icon"></span>
            </div>
        </div>
    </div>
    <a title="Allnet Flat" class="btn-primary btn-primary--themed" href="${pageUrl}" >Zum Tarif</a>
</footer>
</div>
</div>`;

const planTileMoreInfo = `<div class="modal modal--footnote show" id="footnote"  role="dialog" aria-labelledby="Footnote text" aria-modal="true" style="padding-right: 17px; display: block;">
<div class="modal-dialog" role="document">
    <div class="modal-content background-color--bright">
        <div class="modal-header">
            <a href="#" class="close icon--close" data-dismiss="modal" aria-label="Close"></a>
            <h4 class="modal-title" id="myModalLabel">${name}</h4>
        </div>
        <div class="modal-body" >${description}</div>
    </div>
</div>
</div><div class="modal-backdrop show"></div>`;



export default (block, showDescription) => {
    if (planList) {
        block.insertAdjacentHTML('beforeend', planTile);
        const planDescription = document.querySelector(`.kam-plan-tile[plan-id="${id}"] .footnote`);
        planDescription.href = '';
        planDescription.addEventListener('click', (e) => showDescription(e, planTileMoreInfo));
    }
}