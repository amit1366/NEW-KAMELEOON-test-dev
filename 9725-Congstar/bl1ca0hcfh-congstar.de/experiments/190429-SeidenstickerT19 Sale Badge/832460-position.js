console.log('sale-badge');
import { discount } from "./html";








function init() {
    const kameleoon = Kameleoon.API.Utils



    const body = kameleoon.querySelectorAll('body')[0]
    body.classList.add('Sale-Badge');



    window.addEventListener("scroll", function () {


        var tile = kameleoon.querySelectorAll('.article-item')
        tile.forEach(function (el) {

            if(el.querySelector('.bm-discount-batch')) return

            if (el.querySelector('.article-item  .text-danger.pr-2')) {

                el.querySelector('.image-full-container .product-slider-wrapper').insertAdjacentHTML('beforeend', discount)

                var salePrice = el.querySelector('.text-danger.pr-2:nth-child(even)').textContent
                var priceNum = salePrice.replace(/[^\d.]/g, "");

                var strikePrice = el.querySelector('.text-danger.pr-2+ s').textContent
                var strikeNum = strikePrice.replace(/[^\d.]/g, "");

                var percentage = (100 - (priceNum / strikeNum * 100)).toFixed()

                el.querySelector('.bm-discount-batch p span').insertAdjacentHTML('beforeend', percentage)
            }

        })

    });




}

Kameleoon.API.Core.runWhenElementPresent(".article-item", () => {
    init();
}, 200);
