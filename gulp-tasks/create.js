/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable camelcase */
const gulp = require('gulp');
const path = require('path');
const args = require('yargs').argv;
const fetch = require('node-fetch');
const fs = require('fs');

let accessToken;

const delay = (time) => new Promise((resolve) => { setTimeout(resolve, time); });

const readCredentials = (clientFolder) => new Promise((resolve, reject) => {
    fs.readFile(`${clientFolder}/.credentials`, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            reject();
        }
        resolve(JSON.parse(data));
    });
});

const readConfig = (projectFolder) => new Promise((resolve, reject) => {
    fs.readFile(`${projectFolder}/config.json`, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            reject();
        }
        resolve(JSON.parse(data));
    });
});

const getAccessToken = async (clientFolder) => {
    const { client_id, client_secret } = await readCredentials(clientFolder);
    const { access_token } = await fetch('https://api.kameleoon.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    }).then((r) => r.json());
    return access_token;
};

const getAllSites = async () => fetch(`https://api.kameleoon.com/sites?perPage=99`, {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    },
}).then((r) => r.json()).then((data) => data).catch(console.log);

const createNewExperiment = async (requestBody) => fetch(`https://api.kameleoon.com/experiments`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
}).then((r) => r.json()).then((data) => data).catch(console.log);

const createNewVariation = async (name, siteId, color) => fetch(`https://api.kameleoon.com/v1/graphql`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
                mutation createVariation($variation: VariationInput!) {
                    createVariation(variation: $variation) {
                        id
                        name
                    }
                }
            `,
        variables: {
            variation: {
                name,
                siteId,
                color,
            },
        },
    }),

}).then((r) => r.json()).then((data) => data).catch(console.log);

const createNewPersonalization = async (requestBody) => fetch(`https://api.kameleoon.com/personalizations`, {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
}).then((r) => r.json()).then((data) => data).catch(console.log);

const updatePersonalization = async (personalizationId, requestBody) => fetch(
    `https://api.kameleoon.com/personalizations/${personalizationId}`,
    {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    }).then((r) => r.json()).then((data) => data).catch(console.log);

const createNewGoal = async (requestBody, index) => {
    await delay(index * 200);
    return fetch(`https://api.kameleoon.com/goals`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    }).then((r) => r.json()).then((data) => data).catch(console.log);
};

const updateExperiment = async (experimentId, requestBody) => fetch(
    `https://api.kameleoon.com/experiments/${experimentId}`,
    {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    }).then((r) => r.json()).then((data) => data).catch(console.log);

const updateExperimentGQL = async (experimentId, requestBody) => fetch(`https://api.kameleoon.com/v1/graphql`,
    {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            mutation updateExperiment($id: ID!, $experiment: ExperimentInput!) {
                updateExperiment(id: $id, experiment: $experiment) {
                    id
                }
            }
            `,
            variables: {
                id: experimentId,
                experiment: requestBody,
            },
        }),
    }).then((r) => r.json()).then((data) => data).catch(console.log);

const updateVariation = async (variationId, requestBody, index) => {
    await delay(index * 500);
    return fetch(
        `https://api.kameleoon.com/variations/${variationId}`,
        {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        }
    ).then((r) => r.json()).then((data) => data).catch(console.log);
};

const deleteVariation = async (variationId) => fetch(`https://api.kameleoon.com/variations/${variationId}`, {
    method: 'DELETE',
    headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    },
}).then((r) => r.text()).then((data) => data).catch(console.log);

const homogenizeName = (originalString) => originalString
    .replace(/(?:\[.*\||\[)([a-zA-Z]{1,3}-?[\d]{1,3}).*\]/g, (match, projectCode) => `${projectCode}_`)
    .replace(/\s|\||_\s|-|\/|\(|\)/g, '_').toLowerCase();

const toCamleCase = (originalString) => originalString.replace(/([-_].)/g, (match) => match.slice(-1).toUpperCase());

const create = async (done) => {
    const paths = args.path.split('/');
    const [clientFolder, siteCodeFolder, typeFolder, projectFolder] = paths;
    const siteCode = siteCodeFolder?.split('-')?.[0];

    if (!siteCode) throw new Error(`No site code found in ${clientFolder}/${clientFolder}`);
    if (!fs.existsSync(`${clientFolder}/.credentials`)) {
        throw new Error(`No credentials files found in ${clientFolder}`);
    }
    if (!fs.existsSync(`${args.path}/config.json`)) {
        throw new Error(`No config files found in ${args.path}`);
    }
    const config = await readConfig(args.path);

    accessToken = await getAccessToken(clientFolder);
    const sites = await getAllSites();
    const site = sites.find(({ code }) => code === siteCode);
    if (!site) {
        throw new Error(`No matching site code found in account`);
    }
    const { id: siteId, url: baseURL } = site;

    const createdGoals = await Promise.all(config.goalsToCreate.map((name, index) => createNewGoal({
        name, siteId, type: 'CUSTOM', hasMultipleConversions: true,
    }, index)));
    const createdGoalsIds = createdGoals.map(({ id }) => id);
    createdGoals.forEach(({ id, name }) => console.log(`goals created: "${name}" (${id})`));

    const goalsObj = {};
    createdGoals.forEach(({ name, id }) => {
        goalsObj[name] = id;
    });

    const totalGoals = [...createdGoalsIds, ...config.goalsToAdd];
    const mainGoalId = config.primaryGoal || totalGoals[0];

    if (!config.variations?.length || !config.projectName?.length) {
        throw new Error(`No project or variation names found inside the config file`);
    }

    let createdProject;
    let intialVariation;
    let updatedVariations = [];

    if (/experiments/i.test(typeFolder)) {
        const createdExperiement = await createNewExperiment({
            siteId, name: config.projectName, siteCode, baseURL, type: 'DEVELOPER',
        });
        console.log(`experiment created: "${createdExperiement.name}" (${createdExperiement.id})`);
        createdProject = createdExperiement;

        intialVariation = await updateVariation(createdExperiement.variations[0], { experimentId: createdExperiement.id, name: config.variations.shift() });

        const additionalVariations = await Promise.all(config.variations.map((name, index) => createNewVariation(name, siteId, index + 2)));

        const additionalVariationsIds = additionalVariations.map(({ data: { createVariation: { id } } }) => id);
        updatedVariations = await Promise.all(additionalVariationsIds.map((id, index) => updateVariation(id, { experimentId: createdExperiement.id }, index)));

        const totalVariations = [intialVariation.id, ...additionalVariationsIds];
        [intialVariation, ...updatedVariations].forEach(({ id, name }) => console.log(`variation created: "${name}" (${id})`));

        const evenAllocation = (1 / (totalVariations.length + 1)).toFixed(8);
        const deviations = {
            origin: evenAllocation,
        };

        totalVariations.forEach((id) => {
            deviations[id] = evenAllocation;
        });

        await updateExperiment(createdExperiement.id, { deviations, goals: totalGoals, mainGoalId });
        // await updateExperiment(createdExperiement.id, { deviations });
        // await updateExperimentGQL(createdExperiement.id, { goals: totalGoals, mainGoalId });
    } else if (/personalizations/i.test(typeFolder)) {
        const createdPersonalization = await createNewPersonalization({
            siteId, name: config.projectName,
        });
        createdProject = createdPersonalization;
        intialVariation = {
            name: 'personalization',
            id: createdPersonalization.variationId,
        };
        await updatePersonalization(createdPersonalization.id, { goals: totalGoals, mainGoalId });
    } else {
        throw new Error(`Project needs to be inside the experiments or personalizations folder`);
    }

    try {
        if (config.goalsToCreate.length) {
            fs.writeFileSync(`${args.path}/goals.js`, `export const goals = ${JSON.stringify(goalsObj, null, 4)};`);
        }

        [intialVariation, ...updatedVariations].forEach(({ name, id }) => {
            fs.writeFileSync(`${args.path}/${id}-${homogenizeName(name)}.js`, ``);
            fs.writeFileSync(`${args.path}/${id}-${homogenizeName(name)}.scss`, ``);
        });

        fs.writeFileSync(`${args.path}/common.js`, ``);
        fs.writeFileSync(
            `${clientFolder}/${siteCodeFolder}/global/module-${createdProject.id}_${homogenizeName(createdProject.name)}.js`,
            `export const ${toCamleCase(homogenizeName(createdProject.name))} = {\n\n};\n`
        );

        fs.renameSync(args.path, `${clientFolder}/${siteCodeFolder}/${typeFolder}/${createdProject.id}-${homogenizeName(createdProject.name)}`);
    } catch (err) {
        console.error(err);
    }

    done();
};

exports.create = create;
