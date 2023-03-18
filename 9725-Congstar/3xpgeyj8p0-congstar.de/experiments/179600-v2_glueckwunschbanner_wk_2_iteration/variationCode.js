const image = `
<svg width="43" height="39" viewBox="0 0 43 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_1157)">
<circle cx="17.5638" cy="20.5021" r="16.0334" stroke="#464646" stroke-width="3.00627"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58655 16.3925C8.89462 14.5513 
16.6193 20.9953 16.6193 20.9953C20.5876 16.3898 24.8621 12.0573 29.4138 8.02738C35.2973 
3.10438 41.3277 0.556169 42.0481 1.0498C42.7685 1.54344 34.0432 9.41489 29.5739 
15.4319C25.4113 21.062 22.5029 25.4113 20.5951 27.8794C19.1542 29.7339 17.6866 
29.4938 14.3646 26.2918C11.4162 23.4501 3.98497 18.5138 6.58655 16.3925Z" fill="#008B78"/>
</g>
<defs>
<clipPath id="clip0_3_1157">
<rect width="43" height="39" fill="white"/>
</clipPath>
</defs>
</svg>`;

const banner = `
<div class="kam-T15-container">
    ${image}
    <div class="kam-content">
        <div class="kam-headline">Gute Wahl!</div>
        <div class="kam-text">Mit diesem Tarif machst du alles richtig!</div>
    </div>
</div>
`;

export const variationScript = (selector) => {
    Kameleoon.API.Core.runWhenElementPresent(selector,
        ([sibling]) => {
            sibling.insertAdjacentHTML('beforebegin', banner);
        },
        100);
};
