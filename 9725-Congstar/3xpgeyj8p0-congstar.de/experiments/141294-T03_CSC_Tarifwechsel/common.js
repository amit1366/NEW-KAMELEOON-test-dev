/* eslint-disable max-len */
const goals = {
    '[T03|CSC] - Click CTA any tile': 242864,
};

Kameleoon.API.Core
    .runWhenElementPresent(`.slick-track > .plan-bucket-slide > plan-teaser-bucket .btn-primary`,
        (elements) => {
            elements.forEach((item) => {
                item.addEventListener('click', (evt) => {
                    Kameleoon.API.Goals.processConversion(
                        goals['[T03|CSC] - Click CTA any tile']
                    );
                    Kameleoon.API.Data.setCustomData('CSC T03 Tarifgroesse', evt.target.closest('a').getAttribute('title'));
                });
            });
        });
