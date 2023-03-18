const querystring = require('querystring');
const http = require('http');
const https = require('https');
const url = require('url');

const urls = {
    devices: 'https://www.congstar.de/data-feed/kameleoon-devices.json',
    groups: 'https://www.congstar.de/data-feed/kameleoon-device-groups.json',
    plans: 'https://www.congstar.de/data-feed/kameleoon-plans.json'
};

const cache = {
    devices: {},
    groups: {},
    plans: {},
};

//set cache and update every 12h
const delay = 43200000;
cacheAllInfo();
setInterval(cacheAllInfo, delay);

http.createServer(async function (req, res) {

    const parameters = querystring.parse(url.parse(req.url).query);

    const resultObj = {
        device: {},
        plan: {}
    };

    res.writeHead(200, { 'Access-Control-Allow-Origin': '*', });
    if (!req.url.match(/product-data/) || (!parameters.product && !parameters.plan)) {
        res.writeHead(404, { 'Access-Control-Allow-Origin': '*', });
        return res.end();
    }

    parameters.product = parameters.product ? parameters.product.split(',') : false;
    parameters.plan = parameters.plan ? parameters.plan.split(',') : false;

    if (!cache.devices || !cache.groups || !cache.plans) await cacheAllInfo();

    findDevices(parameters.product, cache.devices, cache.groups, resultObj);
    findPlans(parameters.plan, cache.plans, resultObj);

    if (Object.keys(resultObj.device).length === 0 && Object.keys(resultObj.plan).length === 0) return res.end();

    if (Object.keys(resultObj.device).length === 0) {
        delete resultObj.device;
    } else if (Object.keys(resultObj.plan).length === 0) {
        delete resultObj.plan;
    }

    return res.end(JSON.stringify(resultObj));

}).listen(1376);

async function cacheAllInfo() {
    for (const url in urls) {
        try {
            cache[url] = await getInfo(urls[url]);
        } catch (error) {
            console.log(error);
        }
    }
}

function getInfo(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            const { statusCode } = resp;
            let data = '';
            let error;

            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`);
            }

            if (error) {
                console.error(error.message);
                reject(error.message);
            }

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (e) {
                    reject(e.message);
                }
            });


        }).on('error', (err) => {
            console.log('Error: ' + err.message);
        });
    });
}

function findDevices(ids, devices, groups, resultObj) {
    if (!ids || Object.keys(devices) ===  0 || Object.keys(groups) ===  0) return;
    for (const id of ids) {
        const foundDevice = devices.find(device => device.id === +id);
        if (!foundDevice) continue;
        const foundDeviceGroup =  groups.find(obj => {
            if (obj.devices.includes(+id)) {
                return obj;
            } else return false;
        });

        const objFromFoundDevice = {
            title: foundDeviceGroup.title,
            image: foundDeviceGroup.image,
            imageClean: foundDevice.imageClean,
            priceComplete: foundDevice.priceComplete,
            installmentPlanMonthly: foundDevice.installmentPlanMonthly,
            installmentPlanOnetime: foundDevice.installmentPlanOnetime,
            detailLink: foundDevice.detailLink
        };
        resultObj.device[id] = objFromFoundDevice;
    }
}

function findPlans(ids, plans, resultObj) {
    if (!ids || Object.keys(plans) === 0) return;
    for (const id  of ids) {
        const foundPlan = plans.find(plan => plan.id === +id);
        if (foundPlan) resultObj.plan[id] = foundPlan;
    }
}
