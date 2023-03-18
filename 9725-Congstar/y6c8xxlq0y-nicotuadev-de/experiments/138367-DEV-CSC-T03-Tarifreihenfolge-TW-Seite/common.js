/* eslint-disable max-len */
const goals = {
    '[DEV|T03|CSC] - Click CTA any tile': 241819
};

Kameleoon.API.Core
    .runWhenElementPresent(`.slick-track > .plan-bucket-slide > plan-teaser-bucket .btn-primary`,
        (elements) => {
            elements.forEach((item) => {
                item.addEventListener('click', (evt) => {
                    Kameleoon.API.Goals.processConversion(
                        goals['[DEV|T03|CSC] - Click CTA any tile']
                    );
                    Kameleoon.API.Data.setCustomData('[DEV] CSC T03 Tarifgroesse', evt.target.closest('a').getAttribute('title'));
                });
            });
        });
