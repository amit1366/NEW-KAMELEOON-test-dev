/* eslint-disable no-undef */
import sticker from './sticker';
import selectors from './selectors';

export default (highlighted, message, pages) => {
    if (pages.startPage.test(window.location.href)) {
        const addLabel = (targetHeader) => {
            targetHeader.insertAdjacentHTML('beforebegin', `
                <div class="KameleoonDev__showing-message KameleoonDev__homepage">
                    ${message}
                </div>
            `);
            targetHeader.closest('div').style.position = 'relative';
        };

        Kameleoon.API.Core.runWhenElementPresent(selectors.startPagePlan, ([...headers]) => {
            const targetHeaders = headers.filter((header) => highlighted.test(header.innerText));
            targetHeaders.forEach((targetHeader) => {
                addLabel(targetHeader);
            });
        }, 200);

        Kameleoon.API.Core.runWhenElementPresent(selectors.startPageMobile, ([...headers]) => {
            const targetHeaders = headers.filter((header) => highlighted.test(header.innerText));
            targetHeaders.forEach((targetHeader) => {
                addLabel(targetHeader);
            });
        }, 200);

        document.head.insertAdjacentHTML('beforeend', `
            <style>.slick-slide > * > div {margin-top: 20px;}</style>
        `);
    }
    if (pages.planComparisonSmartphonePage.test(window.location.href)) {
        Kameleoon.API.Core.runWhenElementPresent(selectors.planSmartphonePage, ([...headers]) => {
            const targetHeaders = headers.filter((header) => highlighted.test(header.innerText));
            targetHeaders.forEach((targetHeader) => {
                const target = targetHeader.closest('.col-12.col-md-6.col-lg-3');
                target.insertAdjacentHTML('afterbegin', `
                    <div class="KameleoonDev__showing-message KameleoonDev__tarife">
                        ${message}
                    </div>
                `);
            });
        }, 200);
    }
    if (pages.planPage.test(window.location.href)) {
        Kameleoon.API.Core.runWhenElementPresent(selectors.planPage, ([target]) => {
            target.insertAdjacentHTML('afterbegin', `
                <div class="KameleoonDev__showing-message KameleoonDev__plan">
                    ${sticker()}
                    <div class="KameleoonDev__message-container">${message}</div>
                </div>
            `);
            document.querySelector(selectors.container).classList.add('KameleoonDev__container');
        }, 200);
    }
    if (pages.planPageAdditional.test(window.location.href)) {
        Kameleoon.API.Core.runWhenElementPresent(selectors.planPageAdd, ([target]) => {
            target.insertAdjacentHTML('afterbegin', `
                <div class="KameleoonDev__showing-message KameleoonDev__plan-additional">
                    ${sticker()}
                    <div class="KameleoonDev__message-container">${message}</div>
                </div>
            `);
            document.querySelector(selectors.containerAdd).classList.add('KameleoonDev__container');

            const setTop = () => {
                const block = target.closest('.comp-plan-details__background-image');
                const stick = document.querySelector('.KameleoonDev__showing-message');
                let top = 360;
                if (block.offsetWidth > 1279) {
                    top = 360 * (block.offsetWidth / 1440);
                } else if (block.offsetWidth > 810) {
                    top = 350 * (block.offsetWidth / 1279);
                } else {
                    top = 110 * (block.offsetWidth / 810);
                }
                stick.style.top = `${top}px`;
            };
            setTop();
            window.addEventListener('resize', setTop);
        }, 200);
    }
    if (pages.planComparisonAllnetPage.test(window.location.href)) {
        Kameleoon.API.Core.runWhenElementPresent(selectors.planAllnetPage, ([...headers]) => {
            const targetHeader = headers.find((header) => highlighted.test(header.innerText));
            const target = targetHeader.closest('.cui-plan-selection-radio');
            target.insertAdjacentHTML('afterbegin', `
                <div class="KameleoonDev__showing-message KameleoonDev__allnet">
                    ${message}
                    <div class="KameleoonDev__showing-message__tail"
                </div>
            `);
            target.style.position = 'relative';
            target.closest('.cui-plan-selection__radios').classList.add('KameleoonDev__container');
        }, 200);
    }
    if (pages.smartphoneOverview.test(window.location.href)) {
        const makeChanges = () => {
            const changeOffer = (tile, reverse = false) => {
                const replaces = {
                    class: {
                        old: reverse ? '--phones' : '--experience',
                        new: !reverse ? '--phones' : '--experience',
                    },
                    ctaText: {
                        old: reverse ? 'Zum Handy' : 'congstar Tipp',
                        new: !reverse ? 'Zum Handy' : 'congstar Tipp',
                    },
                };
                const tileSelectors = [
                    '.device-teaser',
                    'a.btn-primary:not(.device-teaser__button)',
                    'a.device-teaser__button',
                ];
                tileSelectors.forEach((selector) => {
                    Kameleoon.API.Core.runWhenConditionTrue(
                        () => {
                            const item = tile.querySelector(selector);
                            return item && item.className;
                        }, () => {
                            const item = tile.querySelector(selector);
                            let { className } = item;
                            className = className.replace(replaces.class.old, replaces.class.new);
                            item.className = className;
                            if (item.innerText === replaces.ctaText.old) {
                                item.innerText = replaces.ctaText.new;
                            }
                        }
                    );
                });
            };
    
            Kameleoon.API.Core.runWhenElementPresent(
                selectors.smartphoneOverview, ([...headers]) => {
                    const targetHeaders = headers.filter(
                        (header) => highlighted.test(header.innerText)
                    );
                    targetHeaders.forEach((targetHeader) => {
                        const targetTile = targetHeader.closest('.device-teaser-tile');
                        targetTile.setAttribute('data-sort-order-price-asc', -1);
                        targetTile.setAttribute('data-sort-order-price-desc', -1);
                        targetTile.setAttribute('data-sort-order-popularity', -1);
                        targetTile.classList.add('KameleoonDev__target-tile');
                        Kameleoon.API.Core.runWhenElementPresent('#sorting', () => {
                            setTimeout(() => {
                                $('#sorting').val('priceAsc').change();
                                setTimeout(() => {
                                    $('#sorting').val('popularity').change();
                                }, 50);
                            }, 50);
                        }, 200);

                        const observer = new MutationObserver(() => changeOffer(targetTile, true));
                        observer.observe(targetTile, { childList: true, attributes: true, });
                        targetTile.insertAdjacentHTML('afterbegin', `
                            <div class="KameleoonDev__showing-message KameleoonDev__overview">
                                ${message}
                            </div>
                        `);
                    });
                }, 200
            );
        
            Kameleoon.API.Core.runWhenElementPresent(selectors.offered, (oldTiles) => {
                oldTiles.forEach((oldTile) => {
                    const header = oldTile.querySelector(selectors.smartphoneOverview);
                    if (highlighted.test(header.innerText)) return;
                    const observer = new MutationObserver(() => changeOffer(tile));
                    observer.observe(oldTile, { childList: true, attributes: true, });
                    changeOffer(oldTile);
                });
            }, 200);
        };
        makeChanges();
        window.onload = () => makeChanges();

        document.head.insertAdjacentHTML('beforeend', `
            <style>
                @media (max-width: 767px) {
                    .device-teaser-tile.KameleoonDev__target-tile {
                        margin-top: 10px;
                    }
                }
            </style>
        `);
    }
    if (pages.iphoneDetailPage.test(window.location.href)) {
        const insertCode = () => {
            Kameleoon.API.Core.runWhenElementPresent(selectors.iphonePage, ([image]) => {
                if (document.querySelector('.KameleoonDev__showing-message')) return;
                const slide = image.closest('.device-slide');
                image.insertAdjacentHTML('beforebegin', `
                    <div class="KameleoonDev__showing-message KameleoonDev__iphonepage">
                        ${sticker()}
                        <div class="KameleoonDev__message-container">${message}</div>
                    </div>
                `);
                slide.style.position = 'relative';
            }, 200);
        };
        insertCode();

        Kameleoon.API.Core.runWhenElementPresent(selectors.screenObserver, ([content]) => {
            new MutationObserver(insertCode).observe(content, { childList: true });
        }, 200);

        Kameleoon.API.Core.runWhenElementPresent(selectors.modificationObserver, ([content]) => {
            const observer = new MutationObserver(() => {
                if (content.classList.contains('destroyed')) return;
                insertCode();
            });
            observer.observe(content, { childList: true });
        }, 200);
    }
    if (pages.cart.test(window.location.href)) {
        Kameleoon.API.Core.runWhenElementPresent(selectors.cartItems, ([...headers]) => {
            const targetHeaders = headers.filter((header) => highlighted.test(header.innerText));
            targetHeaders.forEach((targetHeader) => {
                const target = targetHeader.closest('.cart-item');
                target.insertAdjacentHTML('beforebegin', `
                    <div class="KameleoonDev__showing-message KameleoonDev__cart">
                        ${message}
                    </div>
                `);
            });
        }, 200);
    }
};
