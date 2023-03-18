import showDescription from './module';
import setDevice from './device';
import setPlan from './plan';
//only 5 tiles//
Kameleoon.API.Data.writeLocalData('kam-number-of-tiles', 5);

//only 2 tiles// 
//Kameleoon.API.Data.writeLocalData('kam-number-of-tiles', 2);

const goals = {
    'Click on plan in welcome': 200363,
    'Click on device 1 in welcome': 200364,
    'Click inside welcome': 200365
};


if (!!localStorage.getItem('kam_planList') || !!localStorage.getItem('kam_deviceList')) {
    Kameleoon.API.Core.runWhenElementPresent('.content', (content) => {
        content[0].insertAdjacentHTML('afterbegin', `<div id="kam-come-back" class="kam-come-back">
            <h2 class="headline--h1 headline--skizzed headline--themed">Da bist du ja wieder!</h2>
            <p class="headline--h4 headline--skizzed headline--themed">Beim Einkaufswagenwettrennen aus dem Laden gerast? Diese Produkte warten noch auf dich:</p>
            <img class="kam-come-back__image" src="https://storage.kameleoon.eu/congstar/welcome_back_modul/welcome-image.png"/>
        <div class="kam-come-back__teasers"></div></div> `);
    });
    Kameleoon.API.Core.runWhenElementPresent('.kam-come-back__teasers', (block) => {
        block = block[0];
        Kameleoon.API.Core.runWhenElementPresent('dynamic-content-container[data-tracking-title="homepage – hauptbühne"]', (oldHeader) => {
            oldHeader[0].classList.add('kam-hide');
        });
        if (localStorage.getItem('kam_planList')) {
            setPlan(block, showDescription);
        } else block.parentNode.classList.add('only-device');
        if (localStorage.getItem('kam_deviceList')) setDevice(block, showDescription);
        showImage();
    });
    setGoals();
}


function showImage() {
    Kameleoon.API.Core.runWhenElementPresent('.kam-come-back .kam-tile', (tiles) => {
        const block = document.querySelector('.kam-come-back');
        if (tiles.length < 3) {
            tiles.length === 1 ? block.classList.add('bg-full') : block.classList.add('bg-hulf');
        }
        else {
            if (block.classList.contains('main-tiles')) block.classList.remove('main-tiles');
        }
    });
}

function fireGoal(elemSelector, goalName) {
    Kameleoon.API.Core.runWhenElementPresent(elemSelector, (elems) => {
        elems.forEach(elem => {
            elem.addEventListener(Kameleoon.API.Utils.mouseDownEvent, () => {
                if (!Kameleoon.API.Utils.touchMoveEvent) {
                    Kameleoon.API.Goals.processConversion(goals[goalName]);
                }
            });
        });
    });
}

function setGoals() {
    fireGoal('#kam-come-back .kam-plan-tile a', 'Click on plan in welcome');
    fireGoal('#kam-come-back .kam-device-tile a', 'Click on device 1 in welcome');
    fireGoal('#kam-come-back a', 'Click inside welcome');
}

Kameleoon.API.Core.runWhenElementPresent('.kam-come-back__teasers.slick-slider', () => {
    window.addEventListener('resize', () => {
        if (document.querySelector('.kam-come-back__teasers .slick-track')) {
            const slickTrack = document.querySelector('.kam-come-back__teasers .slick-track');
            const teaserWidth = slickTrack.clientWidth + 20;
            const teaser = document.querySelector('.kam-come-back__teasers');
            document.body.clientWidth > teaserWidth ? teaser.setAttribute('slider', 'not avilable') : teaser.setAttribute('slider', 'avilable');
        }
    });
});

if (jQuery) {
    $(document).ready(function () {
        if ($('.kam-come-back__teasers .kam-tile').length > 1) {
            const maxCountSlide = Math.floor($('body')[0].offsetWidth / $('.kam-come-back__teasers .kam-tile')[0].offsetWidth);
            $('.kam-come-back__teasers').slick({
                dots: true,
                infinite: false,
                slidesToScroll: maxCountSlide,
                slidesToShow: maxCountSlide,
                variableWidth: true,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 2200,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 5,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 1800,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 1400,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 1000,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 660,
                        settings: {
                            slidesToScroll: 1,
                            slidesToShow: 1,
                            dots: true
                        }
                    }
                ]
            });
        }
    });
}


