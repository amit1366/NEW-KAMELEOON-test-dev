import { goals } from './goals';

const targets = [
    {
        sel: [
            '.colorSelection .color',
            '[data-testid="color-selection"] button[data-testid="color-swatch"]',
        ],
        goal: goals['[T27] Klick Farbe'],
    },
    {
        sel: [
            '.memorySizeSelection .memorySize',
            '[data-testid="memory-size-selection"] button[data-testid="memory-size"]',
        ],
        goal: goals['[T27] Klick Speicher'],
    },
    {
        sel: ['[data-testid="availability-status"] + button'],
        goal: goals['[T27] Klick Details'],
    },
    {
        sel: [
            '.device-thumbnail-slider .device-thumbnail-slide',
            '[data-testid="device-stage"] button[data-testid^="device-thumbnail"]',
            '[data-testid="device-stage"] [data-testid^="device-slider-arrow"]',
            '[data-testid="device-stage"] [data-testid^="device-slider-dot"]',
            '.device-details--mobile button.icon--arrow-left',
            '.device-details--mobile button.icon--arrow-right',
            '.device-details--mobile ul.slick-dots',
        ],
        goal: goals['[T27] Klick thumbnails'],
    },
    {
        sel: [
            '.configurator-tabs .configurator-tab',
            '[data-testid="payment-selection"] [data-testid$="payment"]',
        ],
        goal: goals['[T27] Klick Payment'],
    },
    {
        sel: [
            '.device-details-tabs > ul > li:nth-of-type(2)',
            '.theme--phones .device-details-tabs__container .device-details-tab-content:nth-of-type(2)',
            '#device-details > div[data-testid$="Technische Daten"] h3 button',
        ],
        goal: goals['[T27] Klick Tech. Daten'],
    },
    {
        sel: [
            '#device-details > div[data-testid$="Versandinformationen"] h3 button',
        ],
        goal: goals['[T27] Klick Versandinformationen'],
    },
    {
        sel: [
            '#device-details > div[data-testid="accordion-item-Lieferumfang"] h3 button',
            '.device-details-tabs > ul > li:nth-of-type(3)',
            '.theme--phones .device-details-tabs__container .device-details-tab-content:nth-of-type(3)',

        ],
        goal: goals['[T27] Klick Lieferumfang'],
    },
    {
        sel: [
            '#device-details > div[data-testid="accordion-item-Highlights"] h3 button',
            '.device-details-tabs > ul > li:nth-of-type(1)',
            '.theme--phones .device-details-tabs__container .device-details-tab-content:nth-of-type(1)',

        ],
        goal: goals['[T27] Klick Highlights'],
    },
];

Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {
    for (let i = 0; i < targets.length; i++) {
        const { sel, goal } = targets[i];
        if (sel.some((selector) => target.closest(selector))) {
            Kameleoon.API.Goals.processConversion(goal);
            break;
        }
    }
});

const trackSlider = (slider, getPosition) => {
    let oldNum;
    slider.addEventListener('touchstart', () => {
        oldNum = getPosition();
    }, true);

    slider.addEventListener('touchend', () => {
        const newNum = getPosition();
        if (!newNum || Math.abs(oldNum - newNum) > 50) {
            Kameleoon.API.Goals.processConversion(goals['[T27] Klick thumbnails']);
        }
    });
};

const getHorisontalNumber = (string) => string?.match(/translate3d\(-?(\d+)(:?%|\.|px)/)?.[1];

Kameleoon.API.Core.runWhenElementPresent('[data-testid="device-stage"]', ([slider]) => {
    const getPosition = () => getHorisontalNumber(slider.firstChild?.firstChild?.getAttribute('style'));
    trackSlider(slider, getPosition);
});

Kameleoon.API.Core.runWhenElementPresent('.device-slider .draggable', ([slider]) => {
    const getPosition = () => getHorisontalNumber(slider.firstChild?.getAttribute('style'));
    trackSlider(slider, getPosition);
});
