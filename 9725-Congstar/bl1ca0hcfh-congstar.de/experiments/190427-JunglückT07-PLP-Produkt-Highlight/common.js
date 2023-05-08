

// scroll function
  function elementInViewport2(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  }

export const commongoals = () => {
    Kameleoon.API.Core.runWhenElementPresent('.card__container.block:nth-child(4)', () => {
        var alreadyFire = false;
    document.addEventListener('scroll', function () {
      if (elementInViewport2(document.querySelector('.giff-conatiner')) && !alreadyFire) {
        // Kameleoon.API.Goals.processConversion(goals['GIF seen']);
        console.log('GIF seen');
        alreadyFire = true
      }
    })

    }, 200);

}