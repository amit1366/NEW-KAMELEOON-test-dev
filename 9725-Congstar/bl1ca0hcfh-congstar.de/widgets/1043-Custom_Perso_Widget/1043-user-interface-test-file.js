function insertHTMLcontent(response) {
    document.getElementById('html-area').value = response;
}

function userNewId(requestValue, responseFunction) {
    console.log('changeAll -> requestValue', requestValue);
    const previewButton = document.getElementById('previewButton');
    const hiddenInput = document.getElementById('finalId');
    performRequest(idURL, requestValue, false, responseFunction);
    previewButton.href = previewURL + requestValue;
    hiddenInput.value = requestValue;
}

function useTagResponse(responseOptions, initial, selectForTags) {
    responseOptions.forEach(function (item) {
        const option = document.createElement('option');
        option.textContent = item.name;
        // option.textContent = item.title;
        option.value = item.id;
        selectForTags.appendChild(option);
    });

    if (inputData.kamId && initial) {
        console.log('drawOptions -> Tag-inital');
        responseOptions.forEach( (item, index) => {
            if (item.id == inputData.kamId) {
                selectForTags.selectedIndex = index;
                userNewId(item.id, insertHTMLcontent);
            }
        });
    } else {
        console.log('drawOptions -> Tag-change');
        userNewId(responseOptions[0].id, insertHTMLcontent);
    }

    selectForTags.addEventListener('change', function (e) {
        console.log('drawOptions -> ID-change');
        userNewId(e.target.value, insertHTMLcontent);
    });
}

function drawOptions(response, initial) {
    const responseOptions = JSON.parse(response);
    const selectForTags = document.getElementById('select-tags');
    console.log('drawOptions -> responseOptions', responseOptions);

    while (selectForTags.firstChild) {
        selectForTags.removeChild(selectForTags.lastChild);
    }

    if (responseOptions.length) useTagResponse(responseOptions, initial, selectForTags);
}


function performRequest(requestURL, value, initial, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI(requestURL + value));
    xhr.setRequestHeader('x-api-key', 'Kameleoon');
    xhr.setRequestHeader('auth-token', 'RkDf4inJomeKgUccckTdBtwzN4LXpT9Y');
    xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
            callback(xhr.response, initial);
        }
    });
    xhr.send();
}

function checkValues(tagInput) {
    if (inputData.kamTag) {
        console.log('checkValues -> Tag-inital');
        performRequest(tagURL, inputData.kamTag, true, drawOptions);
    }
    tagInput.addEventListener('change', function () {
        console.log('checkValues -> Tag-change');
        if (tagInput.value) performRequest(tagURL, tagInput.value, false, drawOptions);
    });
}

const tagURL = 'https://jsonplaceholder.typicode.com/comments?postId=';
const idURL = 'https://jsonplaceholder.typicode.com/comments?postId=';
// const tagURL = 'https://web-api.congstar.de/cms/content/list?tags=';
// const idURL = 'https://web-api.congstar.de/cms/content/elements/';
const previewURL = 'https://www.congstar.de/?eID=congstar_cms_api_preview&encryptedContentId=';
const tagInput = document.getElementById('tags');
setTimeout(function () { checkValues(tagInput); }, 0);

window.inputData = {
    // kamTag: 'Hauptbuehne',
    kamTag: '3',
    // kamId: 'RHoycUtEc0lNcmNyVjVjdjRSeTNaUT09',
    kamId: '12',
    fetchGoalId: '1234',
    clickElementGoalId: '12345',
    domElementSelector: '',
    positionSelectorRelative: 'REPLACE',
    displayPluginConfiguration: 'DISPLAY_ALL_DEVICES',
    positionPluginConfiguration: 'INPAGE',
};
if (inputData.kamId) document.getElementById('finalId').value = inputData.kamId;
if (inputData.kamTag) tagInput.value = inputData.kamTag;