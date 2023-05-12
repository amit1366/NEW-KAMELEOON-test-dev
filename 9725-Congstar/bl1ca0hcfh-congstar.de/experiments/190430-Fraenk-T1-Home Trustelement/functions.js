

	

	// viewport helper
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


	/* Variation Init */

		console.log('hii');

		
		animationIsDone = false;
		alreadyFire = false;
		document.querySelector('body').addEventListener('mousewheel', function (e) {
			e.preventDefault();
			e.stopPropagation();

			// match condition element available
			if (elementInViewport2(document.querySelector('.button.btn-buy'))) {
				if (animationIsDone === false) {
					document.querySelector("body").classList.add("bm_inviewport");
					alreadyFire = true
				}
			} else {
				document.querySelector("body").classList.remove("bm_inviewport");
				// animationIsDone = true;
			}
		});


		

	

	

