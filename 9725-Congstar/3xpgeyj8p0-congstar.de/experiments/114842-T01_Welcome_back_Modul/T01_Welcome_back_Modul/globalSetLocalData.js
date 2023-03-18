let timeSpend = new Date();
const infoTilePlan = (id, name, url, img, price) => {
    return {
        'id': id,
        'name': name,
        'url': url,
        'badge': img,
        'price': price,
        'tarif': '',
        'description': '',
        'time_spent': 0,
        'PV': 1
    }
}

const infoTileDevice = (id, name, url, img, price) => {
    return {
        'id': id,
        'name': name,
        'url': url,
        'device_image': img,
        'price': price,
        'time_spent': 0,
        'PV': 1
    }
}

let localDataName = 'kam_list';
let tilePrice = '0.00';

Kameleoon.API.Core.runWhenElementPresent('.price--large', (price) => {
    price = price[0];
    let euro = '0';
    let cent = '00';
    if (price.querySelector('.price__euro')) euro = price.querySelector('.price__euro').textContent;
    if (price.querySelector('.price__cent')) cent = price.querySelector('.price__cent').textContent;
    tilePrice = `${euro}.${cent}`;
})

function resetLocalData(localDataName, tileItem, callback){
    let deviceList = JSON.parse(localStorage.getItem(localDataName));
    const repeateDevice = deviceList.filter(item => item.id === tileItem.id);
    if (repeateDevice.length) {
        deviceList.forEach(item => {
            if (item.id === tileItem.id) {
                callback(item);
                localStorage.setItem(localDataName, JSON.stringify(deviceList));
            }
        })
    }
}


function getPlanDescription(localDataName, tileItem) {
    let id = 0;
    Kameleoon.API.Core.runWhenConditionTrue(() => {
        return dataLayer.filter(item => item.productItem).length
    }, () => {
        const productItem = dataLayer.filter(item => item.productItem)[0].productItem;
        id = productItem.id;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://www.congstar.de/api/shop/plan-configuration/clients/1/plans/${id}`);
        xhr.send();
        xhr.onload = function () {
            if (xhr.status === 200) {
                if (JSON.parse(xhr.response).usps) {
                    const planTarif = JSON.parse(xhr.response).usps.slice(0, 3);
                    resetLocalData(localDataName, tileItem, (item)=>{
                        item['tarif'] = planTarif;
                    })
                }
                if (JSON.parse(xhr.response).footnotes[0] && JSON.parse(xhr.response).footnotes[0].description) {
                    const planDescription = JSON.parse(xhr.response).footnotes[0].description;
                    resetLocalData(localDataName, tileItem, (item)=>{
                        item['description'] = planDescription;
                    })
                }
            }
        };
    });
}

const nameDevice = (productItem) => {
    const name = productItem.name.split(' ');
    const url = productItem.url;
    let urlDevice = url.indexOf('details/') + 'details/'.length;
    let nameDevice = [];
    urlDevice = url.slice(urlDevice);
    urlDevice = urlDevice.slice(0, urlDevice.indexOf('/')).replace(/-/g, ' ');
    for (let i = 0; i < name.length; i++) {
        if (urlDevice.indexOf(name[i].toLowerCase()) !== -1) {
            nameDevice.push(name[i])
        }
    }
    return nameDevice.join(' ')
}

function pushInfoToLocalData(tileItem, localDataName, pageType) {
        tileItem['time_spent'] = 0;
        if (pageType === 'tarifauswahl') getPlanDescription(localDataName, tileItem);
        if (!localStorage.getItem(localDataName)) {
            localStorage.setItem(localDataName, `[${JSON.stringify(tileItem)}]`)
        } else {
            let deviceList = JSON.parse(localStorage.getItem(localDataName));
            const repeateDevice = deviceList.filter(item => item.id === tileItem.id);
            if (!repeateDevice.length) {
                deviceList.unshift(tileItem);
                localStorage.setItem(localDataName, JSON.stringify(deviceList));
            } else {
                deviceList.forEach(item => {
                    if (item.id === tileItem.id) {
                        item.PV += 1;
                        localStorage.setItem(localDataName, JSON.stringify(deviceList));
                    }
                })
            }
        }
    window.addEventListener('beforeunload', () => {
        tileItem['time_spent'] = new Date() - timeSpend;
        const timeSpent = tileItem['time_spent'];
        resetLocalData(localDataName, tileItem, (item) => {
            item['time_spent'] += timeSpent;
        });
    })
}

function getData() {
    const pageType = dataLayer.filter(item => item.pageStep)[0].pageStep;
    Kameleoon.API.Core.runWhenConditionTrue(() => {
        return dataLayer.filter(item => item.productItem).length
    }, () => {
        const productItem = dataLayer.filter(item => item.productItem)[0].productItem;
        let tile;
        if (pageType === 'tarifauswahl') {
            let planPrice = productItem.productMonthlyPrice;
            if (productItem.id === 370) {
                planPrice = tilePrice;
            }
            tile = infoTilePlan(productItem.id, productItem.name, productItem.url, productItem.image, planPrice);
            localDataName = 'kam_planList';
        } else {
            tile = infoTileDevice(productItem.id, nameDevice(productItem), productItem.url, productItem.image, tilePrice);
            localDataName = 'kam_deviceList';
        }
        pushInfoToLocalData(tile, localDataName, pageType);
    })
}

export default () => {
    Kameleoon.API.Core.runWhenConditionTrue(() => {
        return typeof dataLayer !== 'undefined'
            && dataLayer.filter(item => item.pageStep).length
            && (
                dataLayer.filter(item => item.pageStep)[0].pageStep === 'tarifauswahl'
                ||
                dataLayer.filter(item => item.pageStep)[0].pageStep === 'handydetails'
            )
    }, () => {
        getData();
    })
}
