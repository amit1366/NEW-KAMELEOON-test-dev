const selectors = {
    header: '.hero'
};
const label = `
<div class="kam-label">
    <img src="https://storage.kameleoon.com/congstar/T15/ss1_icon.png" alt="label">
    <span>Gut und günstig. Du hast alles richtig gemacht! </span>
</div>
`;
Kameleoon.API.Core.runWhenElementPresent(selectors.header, ([header]) => {
    header.insertAdjacentHTML('beforeend', label);
});
