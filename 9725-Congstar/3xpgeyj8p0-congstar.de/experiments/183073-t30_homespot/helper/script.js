import {
    contentSelector, contentSelector200, menuSelector, texts, urls
} from './constants';

function hideTables() {
    Kameleoon.API.Core.runWhenElementPresent(contentSelector, (buttons) => {
        buttons.forEach((element) => {
            const parent = element.closest('.ge-style-container');
            parent.classList.add('kam-T30-table');
        });
    });
}

function setText(text) {
    Kameleoon.API.Core.runWhenElementPresent(contentSelector, ([link]) => {
        const parent = link.parentNode;
        parent.innerHTML = text;
    });
}

function setPrices() {
    Kameleoon.API.Core.runWhenElementPresent(contentSelector200, (links) => {
        links.forEach((link) => {
            const price = link.parentNode.querySelector('.price__euro')
            || link.closest('td')?.querySelector('.price__euro')
            || link.closest('.bucket__content')?.querySelector('.price__euro');

            if (price) {
                price.innerText = '35';

                const icon = link.parentNode.querySelector('footnote')
                || link.closest('td')?.querySelector('footnote')
                || link.closest('.bucket__content')?.querySelector('footnote');
                Kameleoon.API.Utils.addEventListener(icon, 'click', () => {
                    Kameleoon.API.Core.runWhenElementPresent('.modal--footnote .modal-body', ([text]) => {
                        text.innerHTML = text.innerText.replace(
                            'Preis 40 € statt bislang 55 € pro Monat. Angebot zunächst gültig bis zum 30.04.2023.',
                            '<p>Preis 35 € statt bislang 55 € pro Monat. Angebot zunächst gültig bis zum 28.02.2023.</p><br/>'
                        );
                    });
                });
            }
        });
    });
}

const removeElemFromSlick = (link) => {
    const parent = link.closest('.slick-slider');

    Kameleoon.API.Core.runWhenConditionTrue(
        () => window.jQuery,
        () => {
            // eslint-disable-next-line no-undef
            $(parent).slick('slickRemove', 1);
        });
};

export const variationCode = (variation) => {
    if (document.location.pathname === urls.homepage) {
        Kameleoon.API.Core.runWhenElementPresent(contentSelector, ([link]) => {
            removeElemFromSlick(link);
        });
        if (variation === 2) {
            setPrices();
        }
    } else if (document.location.href.includes(urls.handys)) {
        Kameleoon.API.Core.runWhenElementPresent(contentSelector, ([link]) => {
            if (window.innerWidth >= 768) {
                let slickItemRemoved = false;
                link.closest('.plan-bucket-slide').remove();

                window.addEventListener('resize', () => {
                    if (window.innerWidth < 768 && !slickItemRemoved) {
                        Kameleoon.API.Core.runWhenElementPresent(contentSelector, ([newLink]) => {
                            removeElemFromSlick(newLink);
                        });
                        slickItemRemoved = true;
                    }
                });
            } else {
                removeElemFromSlick(link);
            }
        });
        if (variation === 2) {
            setPrices();
        }
    } else if (document.location.pathname === urls.festnetz
        || document.location.pathname === urls.vergleich) {
        hideTables();
        if (variation === 2) {
            setPrices();
        }
    } else if (document.location.pathname === urls.homespot30) {
        setText(texts[30]);
    } else if (document.location.pathname.includes(urls.homespot200)) {
        setText(texts[200]);
        if (variation === 2) {
            Kameleoon.API.Core.runWhenElementPresent('#c6058804 td:nth-child(2)', ([cost]) => {
                cost.childNodes[0].textContent = cost.childNodes[0].textContent.replace('40', '35');
                const footnote = cost.querySelector('footnote');
                Kameleoon.API.Utils.addEventListener(footnote, 'click', () => {
                    Kameleoon.API.Core.runWhenElementPresent('.modal--footnote .modal-body', ([modal]) => {
                        modal.innerHTML = texts.footnoteNormal;
                    });
                });
            });
            Kameleoon.API.Utils.addEventListener(document, 'click', ({ target }) => {
                if (target.closest('.configurator-selection__costs footnote')) {
                    Kameleoon.API.Core.runWhenElementPresent('.modal--footnote .modal-body', ([modal]) => {
                        const selected = document.querySelector('[data-test-state="isSelected"]');
                        const type = selected.getAttribute('data-test-isflex');
                        modal.innerHTML = type === 'true' ? texts.footnoteFlex : texts.footnoteNormal;
                    });
                }
            });
        }
    }

    Kameleoon.API.Core.runWhenElementPresent(menuSelector, ([menuItems]) => {
        menuItems.parentNode.classList.add('kam-T30-hidden');
    }, 100);
};
