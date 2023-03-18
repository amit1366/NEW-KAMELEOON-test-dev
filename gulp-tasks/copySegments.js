/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable camelcase */
const gulp = require('gulp');
const path = require('path');
const args = require('yargs').argv;
const fetch = require('node-fetch');
const fs = require('fs');

const readCredentials = (clientFolder) => new Promise((resolve, reject) => {
    fs.readFile(`${clientFolder}/.credentials`, 'utf8', (err, data) => {
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

const updateExperiment = async (accessToken, experimentId, requestBody) => {
    try {
        return fetch(
            `https://api.kameleoon.com/experiments/${experimentId}`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            }).then((r) => r.json());
    } catch (error) {
        console.log(error);
    }
};

const getOneExperiment = async (accessToken, expierimentId) => {
    try {
        return fetch(`https://api.kameleoon.com/experiments/${expierimentId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }).then((r) => r.json());
    } catch (error) {
        console.log(error);
    }
};

const getOneSegment = async (accessToken, segmentId) => {
    try {
        return fetch(`https://api.kameleoon.com/segments/${segmentId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }).then((r) => r.json());
    } catch (error) {
        console.log(error);
    }
};

const createNewSegment = async (accessToken, requestBody) => {
    try {
        return fetch(`https://api.kameleoon.com/segments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        }).then((r) => r.json());

    } catch (error) {
        console.log(error);
    }
};

const cropIds = (srg) => srg?.split('-')?.[0];

const copySegments = async (done) => {
    const copyPaths = args.copyPath.split('/');
    const pastePaths = args.pastePath.split('/');
    const [copyClientFolder, copySiteCodeFolder, copyTypeFolder, copyProjectFolder] = copyPaths;
    const [pasetClientFolder, pasteSiteCodeFolder, pasteTypeFolder, pasteProjectFolder] = pastePaths;
    const copySiteCode = cropIds(copySiteCodeFolder);
    const pasteSiteCode = cropIds(pasteSiteCodeFolder);
    const copyExperimentIds = cropIds(copyProjectFolder);
    const pasteExperimentIds = cropIds(pasteProjectFolder);

    if (!copySiteCode) throw new Error(`No site code found in ${copyClientFolder}/${copySiteCodeFolder}`);
    if (!pasteSiteCode) throw new Error(`No site code found in ${pasetClientFolder}/${pasteSiteCode}`);
    if (!fs.existsSync(`${copyClientFolder}/.credentials`)) throw new Error(`No credentials files found in ${copyClientFolder}`);
    if (!fs.existsSync(`${pasetClientFolder}/.credentials`)) throw new Error(`No credentials files found in ${pasetClientFolder}`);

    const copyAccessToken = await getAccessToken(copyClientFolder);
    const pasteAccessToken = await getAccessToken(pasetClientFolder);

    const copyExperiment = await getOneExperiment(copyAccessToken, copyExperimentIds);
    const pasteExperiment = await getOneExperiment(pasteAccessToken, pasteExperimentIds);

    if (!copyExperiment.targetingSegmentId) throw new Error(`No segment found for experiement id ${copyExperimentIds} in ${copyClientFolder}/${copySiteCodeFolder}`);

    const copySegment = await getOneSegment(copyAccessToken, copyExperiment.targetingSegmentId);

    copySegment.conditionsData?.firstLevel.forEach(
        ({ conditions = [] }) => {
            conditions.forEach((condition) => {
                delete condition.id;
            });
        }
    );

    let segmentNumber = 1;
    const createSegment = async (name) => {
        const res = await createNewSegment(pasteAccessToken, {
            name,
            siteId: pasteExperiment.siteId,
            conditionsData: copySegment.conditionsData,
        });
        if (res.message) {
            if (res.message.includes('same name already exists')) {
                console.log(`${res.message}. Name: ${name}`);
                return createSegment(`${pasteExperiment.name} (${++segmentNumber})`);
            }
            throw new Error(`${res.message}. Name: ${name}`);

        }
        return res;
    };
    const pasteSegment = await createSegment(pasteExperiment.name);
    console.log(`Segment created. Name: ${pasteSegment.name}`);

    const updatedExperiment = await updateExperiment(pasteAccessToken, pasteExperiment.id, {
        targetingSegmentId: pasteSegment.id,
    });
    console.log(`Experiement updated. Name: ${updatedExperiment.name}`);

    done();
};

exports.copySegments = copySegments;
