const fs = require('fs');
const path = require('path');
const args = require('yargs').argv;
const fetch = require('node-fetch');
const credentialsFileName = '.credentials';
const authTokenUrl = 'https://api.kameleoon.com/oauth/token';
const liveStatus = 'active';
const twoYears = 63072000000;
const baseUrl = `https://api.kameleoon.com`;

let bearerToken;
let siteId;

const foreignSymbols = {
    'É': 'E',
    'é': 'e',
    'Â': 'A',
    'â': 'a',
    'Ê': 'E',
    'ê': 'e',
    'Î': 'I',
    'î': 'i',
    'Ô': 'O',
    'ô': 'o',
    'Ö': 'O',
    'ö': 'o',
    'Û': 'U',
    'û': 'u',
    'À': 'A',
    'à': 'a',
    'È': 'E',
    'è': 'e',
    'Ù': 'U',
    'ù': 'u',
    'Ë': 'E',
    'ë': 'e',
    'Ï': 'I',
    'ï': 'i',
    'Ü': 'U',
    'ü': 'u',
    'Ÿ': 'Y',
    'ÿ': 'y',
    'Ç': 'C',
    'ç': 'c;',
    '€': 'euro',
    'ß': 'ss',
};

const getVariationURL = (variationId) => {
    return `${baseUrl}/variations/${variationId}`;
};

const getExperimentUrl = (experimentId) => {
    return `${baseUrl}/experiments/${experimentId}`;
};

const getPersonalizationUrl = (persoId) => {
    return  `${baseUrl}/personalizations/${persoId}`;
};


const getDirectory = (dir, contains, errorString, deploy) => {
    const files = fs.readdirSync(dir);
    const folder = files.find((file) => {
        return new RegExp(`${contains}`).test(file);
    });
    if (folder || deploy) {
        return  folder ? path.join(dir, folder) : folder;
    } else {
        throw new Error(`No directory found for ${errorString}: ${contains}`);
    }
};

const getAccessToken = (clientCredentials) => {
    const {'client_id': clientId, 'client_secret': clientSecret} = JSON.parse(clientCredentials);
    const postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    };
    return fetch(authTokenUrl, postOptions)
        .then(postResponse => postResponse.json());
};

const getActualPosition = (position, id, token) => {
    const URLs = {
        experiments: getExperimentUrl(id),
        personalizations: getPersonalizationUrl(id),
        variations: getVariationURL(id),
    };

    return fetch(URLs[position], { headers: { 'Authorization': token } })
        .then((getResponse) => {
            if (getResponse.ok) {
                return getResponse.json();
            } else {
                throw new Error(`statusText: ${getResponse.statusText}, status: ${getResponse.status}`);
            }
        });
};

const getAllFromPlatform = (position, token) => {
    const URLs = {
        experiments: `${baseUrl}/experiments?perPage=-1`,
        personalizations: `${baseUrl}/personalizations?perPage=-1`,
        sites: `${baseUrl}/sites`
    };

    return fetch(URLs[position], { headers: { 'Authorization': token } })
        .then((getResponse) => {
            if (getResponse.ok) {
                return getResponse.json();
            } else {
                throw new Error(`statusText: ${getResponse.statusText}, status: ${getResponse.status}`);
            }
        });
};


const compareByName = (a, b) => {
    const  nameA = a.name, nameB = b.name;
    if (nameA < nameB)
        return -1;
    if (nameA > nameB)
        return 1;
    return 0;
};

const checkRemovability = (today, experiment) => {
    const timeLastChange = experiment.dateModified ? experiment.dateModified : experiment.dateCreated;
    const timePassed = today - Date.parse(timeLastChange);
    let isRemovable = false;

    if (timePassed > twoYears && experiment.status !== liveStatus) {
        isRemovable = true;
    }
    return isRemovable;
};

const getSimbolsString = (dictionary) => {
    return Object.keys(dictionary).join('|');
};

const symbolsRegExp = new RegExp(`${getSimbolsString(foreignSymbols)}`);

const setUpperCase = (matchGroup) => {
    return matchGroup.toUpperCase();
};

const foreignSymbolsReplacer = (match) => {
    return foreignSymbols[match];
};

const getStructureName = (name) => {
    return name.replace(/(^|\s|-)\S/g, setUpperCase)
        .replace(/(\s-\s|\s|-|\|)/g, '_')
        .replace(symbolsRegExp, foreignSymbolsReplacer)
        .replace(/[^a-zA-Z0-9_-]/g, '');
};

const getNameIdList = (positionName, actualList) => {
    const today = new Date();

    switch (positionName) {
        case 'experiments':
            return actualList.map((it) => {
                const isRemovable = checkRemovability(today, it);
                const structureName = getStructureName(it.name);
                return {
                    name: it.name,
                    id: it.id,
                    folderName: `${it.id}-${structureName}`,
                    isRemovable
                };
            });
        case 'personalizations':
            return actualList.map((it) => {
                const isRemovable = checkRemovability(today, it);
                const uppercaseName = getStructureName(it.name);
                return {
                    name: it.name,
                    id: it.id, 
                    variation: it.variationId,
                    folderName: `${it.id}-${uppercaseName}`,
                    isRemovable
                };
            });
        case 'variations':
            return actualList.map((it) => {
                const uppercaseName = getStructureName(it.name);
                return {
                    name: it.name,
                    id: it.id,
                    fileName: `${it.id}-${uppercaseName}`,
                };
            });
    }
};

const waitingVariations = (id) => {
    return new Promise((resolve) => {
        resolve(getActualPosition('variations', id, bearerToken));
    });
};

const writeActualGlobal = (siteCodePath, actualGlobalCode, siteCode) => {
    const siteCodeGlobalDir = getDirectory(siteCodePath, 'global');
    !fs.existsSync(siteCodeGlobalDir) && fs.mkdirSync(path.join(siteCodePath, 'global'));
    const previousGlobalFile = path.join(siteCodeGlobalDir, `Previous.js`);
    fs.writeFileSync(previousGlobalFile, actualGlobalCode);
    return `Global code of ${siteCode} in file: ${previousGlobalFile}`;
};

function find(done) {
    //args
    const clientId = args['customer-id'];
    const experimentID = args['experiment-id'];
    const personalizationId = args['personalization-id'];
    const siteCode = args['sitecode'];
    const isExperiment = args['exp'];
    const isGlobal = args['global'];
    const isPerso = args['perso'];
    const expName = args['name'];

    //paths
    const mainDirectory =  path.dirname(__dirname);
    const clientDirectory = getDirectory(mainDirectory, clientId, 'Client Id');
    const siteCodePath = getDirectory(clientDirectory, siteCode);

    //credentials
    const clientCredentialsFile = path.join(clientDirectory, credentialsFileName);
    if (!fs.existsSync(clientCredentialsFile)) {
        throw new Error(`No credentials files found in ${clientCredentialsFile}`);
    }
    const clientCredentials = fs.readFileSync(clientCredentialsFile);

    if (clientCredentials) {
        getAccessToken(clientCredentials)
            .then((token) => {
                bearerToken = `Bearer ${token.access_token}`;
                const positionName = isExperiment ? 'experiments' : 'personalizations';
                const idPositionName = experimentID ? 'experiments' : 'personalizations';

                if (siteCode && !personalizationId && !experimentID  && !isGlobal) {
                    return getAllFromPlatform('sites', bearerToken)
                        .then((siteList) => {
                            const actualSite = siteList.find((site) => site.code === siteCode);
                            siteId = actualSite.id;
                            return getAllFromPlatform(positionName, bearerToken);
                        })
                        .then((allPlatformData) => {
                            const actualSitePlatformList = allPlatformData.filter((position) => position.siteId === siteId);
                            const nameIdList = getNameIdList(positionName, actualSitePlatformList);
                            nameIdList.sort(compareByName);
                            const title = positionName[0].toUpperCase() + positionName.slice(1);
                            let finalText = `${title} of site ${siteCode}`;
                            if (expName) {
                                finalText = `${title} of site ${siteCode} сontaining the "${expName}"`;
                                const nameIdListByExpName = nameIdList.filter((experiment) => new RegExp(`${expName}`).test(experiment.name));
                                console.log(finalText, nameIdListByExpName);
                            } else {
                                console.log(finalText);
                                console.dir(nameIdList, {'maxArrayLength': null});
                            }
                        });
                }

                if (isGlobal) {
                    return getAllFromPlatform('sites', bearerToken)
                        .then((siteList) => {
                            const actualSite = siteList.find((site) => site.code === siteCode);
                            if (!actualSite.trackingScript) {
                                return `Global code of ${siteCode} is empty in BO`;
                            } else {
                                return writeActualGlobal(siteCodePath, actualSite.trackingScript, siteCode);
                            }
                        })
                        .then((finalText) => {
                            console.log(finalText);
                            return true;
                        });
                }  
                
                if (experimentID || personalizationId) {
                    const positionId = experimentID ? experimentID : personalizationId;
                    return getActualPosition(idPositionName, positionId, bearerToken)
                        .then((actualPosition) => {
                            if (idPositionName === 'experiments') {
                                const variationsPromise = actualPosition.variationsId.map(waitingVariations);
                                return Promise.all(variationsPromise);
                            } else if (idPositionName === 'personalizations') {
                                return [actualPosition];
                            }
                        })
                        .then((variations) => {
                            const variationList = getNameIdList('variations', variations);
                            variationList.sort(compareByName);
                            const finalText = idPositionName === `personalizations` ? `Personalization: ` : `Variations of Experiment ${experimentID}:`;
                            console.log(finalText, variationList);
                        });
                }
            })
            .then(() => {
                done();
            })
            .catch((error) => {
                done();
                console.log(error);
            });
    }
}

exports.find = find;
