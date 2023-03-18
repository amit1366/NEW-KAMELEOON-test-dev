function removeModalDialog(selector) {
    Kameleoon.API.Core.runWhenElementPresent(selector, (modal) => {
        modal[0].parentNode.removeChild(modal[0])
    })
}

function closeDescription(e) {
    e.preventDefault();
    removeModalDialog('#footnote');
    removeModalDialog('.modal-backdrop');
    document.body.classList.remove('kam-modal-open');
}

export default function showDescription(e, tileMoreInfo) {
    e.preventDefault();
    document.body.insertAdjacentHTML('beforeend', tileMoreInfo);
    document.querySelector('#footnote').addEventListener('click', (e) => closeDescription(e));
    document.querySelector('.modal-backdrop').addEventListener('click', (e) => closeDescription(e));
    document.body.classList.add('kam-modal-open');
}
