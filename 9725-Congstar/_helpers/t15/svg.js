/* eslint-disable max-len */

export const svg = `<svg xmlns="http://www.w3.org/2000/svg" id="kam-svg1"width="87" height="86" viewBox="0 0 87 86"><defs>
    <style>.a,.c,.d{fill:none;}.a{stroke:#464646;stroke-width:4px;}.b{fill:#008b78;}.c{stroke:#000;}.e{stroke:none;}</style>
    </defs><g transform="translate(-3616.293 459)"><g class="a" transform="translate(3617.293 -459)">
    <circle class="e" cx="43" cy="43" r="43"/><circle class="d" cx="43" cy="43" r="41"/></g>
    <circle class="b" cx="38" cy="38" r="38" transform="translate(3616.293 -450)"/><g class="c" transform="translate(3620.293 -448)">
    <circle class="e" cx="35" cy="35" r="35"/><circle class="d" cx="35" cy="35" r="34.5"/></g></g><g transform="translate(18 26.496)">
    <rect class="d" width="40" height="40.003"/>
    <path d="M33.306,38,25,29.4a15.837,15.837,0,0,0,7.742-5.811L39.976,31.1H33.308v6.908ZM6.67,38V31.09H0l7.264-7.525a15.83,15.83,0,0,0,7.731,5.821L6.672,38l0,0Zm0-24.178A13.6,13.6,0,0,1,20.008,0,13.6,13.6,0,0,1,33.347,13.818,13.6,13.6,0,0,1,20.008,27.635,13.6,13.6,0,0,1,6.67,13.818Zm12.791-8.19-1.679,4.987-5.145.161a.5.5,0,0,0-.519.39.522.522,0,0,0,.165.617l4.13,3.34-1.458,5.215a.506.506,0,0,0,.231.573.535.535,0,0,0,.31.115.465.465,0,0,0,.294-.115l4.241-3.044,4.241,3.044a.466.466,0,0,0,.288.111.553.553,0,0,0,.322-.123.518.518,0,0,0,.187-.63l-1.483-5.215,4.13-3.34a.551.551,0,0,0-.328-.984l-5.148-.183-1.7-4.962a.5.5,0,0,0-.5-.4h-.016A.613.613,0,0,0,19.461,5.628Z" transform="translate(0 2)"/>
    </g></svg>`;
const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24.005" viewBox="0 0 24 24.005"><defs>
<style>.a{fill:none;}.b{fill:#fff;}</style>
</defs><g transform="translate(-12 -1404)">
<rect class="a" width="24" height="24" transform="translate(12 1404)"/>
<path class="b" d="M-4790.024,22l-4.984-4.983a9.474,9.474,0,0,0,4.643-3.364l4.342,4.351h-4v4ZM-4806,22V18h-4l4.356-4.357a9.47,9.47,0,0,0,4.637,3.37L-4806,22v0Zm0-14a8.008,8.008,0,0,1,8-8,8.009,8.009,0,0,1,8,8,8.009,8.009,0,0,1-8,8A8.008,8.008,0,0,1-4806,8Zm7.671-4.742-1.007,2.888-3.085.093a.3.3,0,0,0-.312.226.3.3,0,0,0,.1.357l2.477,1.934-.874,3.019a.288.288,0,0,0,.139.332.328.328,0,0,0,.186.066.284.284,0,0,0,.176-.066l2.543-1.762,2.543,1.762a.285.285,0,0,0,.172.064.338.338,0,0,0,.193-.071.294.294,0,0,0,.112-.365l-.89-3.019,2.477-1.934a.287.287,0,0,0,.107-.357.3.3,0,0,0-.3-.212l-3.088-.106-1.02-2.873a.3.3,0,0,0-.3-.233h-.01A.366.366,0,0,0-4798.328,3.258Z" transform="translate(4822 1406)"/>
</g></svg>
`;
const symbol = `%`;
export const label = (text, flag) => `
<div class="kam-label">
    <div class="kam-wrapper">
        ${flag ? `<i>${icon}</i>` : `<i>${symbol}</i>`} <span>${text}<span>
    </div>
</div>`;
