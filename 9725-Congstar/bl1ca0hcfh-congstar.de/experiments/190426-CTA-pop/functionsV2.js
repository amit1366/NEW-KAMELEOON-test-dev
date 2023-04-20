
import { selectors } from "./selectors";

function appendContent() {
  if (Kameleoon.API.Utils.querySelectorAll(selectors.bmSizeIframe)[0]) return;
  Kameleoon.API.Utils.querySelectorAll(selectors.body)[0].insertAdjacentHTML(
    "afterbegin",
    '<div class="bm--size-iframe"><iframe src="" width=100% height=400px></iframe></div>'
  );
  Kameleoon.API.Utils.querySelectorAll(selectors.body)[0].insertAdjacentHTML(
    "afterbegin",
    '<div class="bm-loader-container"><span class="bm-loader"></span></div>'
  );
}

function cickHandler() {
  if (!Kameleoon.API.Utils.querySelectorAll(selectors.sizeBtnClicked)[0]) {
    Kameleoon.API.Utils.querySelectorAll(selectors.body)[0].classList.add(
      selectors.sizeBtnClicked
    );
  }
}

function onSizeClick() {
  Kameleoon.API.Core.runWhenElementPresent(
    selectors.bmSize,
    (Sizes) => {
      let sizeTab = Sizes;
      let selectedSize;

      // click on size btn
      sizeTab.forEach(function (el) {
        el.addEventListener("click", function () {
          let fired = false;
          if (
            fired === false &&
            !Kameleoon.API.Utils.querySelectorAll(selectors.sizeBtnClicked)[0]
          ) {
            cickHandler();

            // get href form product whoses size btn is clicked
            let productUrl = el
              .closest(selectors.productBoxDetails)
              .querySelector(selectors.productBoxName)
              .getAttribute("href");
            fired = true;
            const url = productUrl;
            selectedSize = el.textContent.trim(" ");
            el.classList.add(selectors.bmSizeSelected);

            // set the href in the iframe
            Kameleoon.API.Utils.querySelectorAll(
              selectors.iframeElem
            )[0].setAttribute("src", productUrl);

            // show loader until the product addes to cart
            Kameleoon.API.Utils.querySelectorAll(
              selectors.bmLoaderContainer
            )[0].classList.add(selectors.showLoader);

            let iframe = Kameleoon.API.Utils.querySelectorAll(
              selectors.iframeElem
            )[0];
            iframe.addEventListener("load", function () {
              let iframeProductSize =
                iframe.contentWindow.document.querySelectorAll(
                  selectors.pdpSizeVariationsSize
                );
              let button = iframe.contentWindow.document.querySelector(
                selectors.saleBoxButton
              );

              iframeProductSize.forEach(function (el) {
                if (
                  iframe.contentWindow.document.querySelector(
                    '.'+selectors.pdpSizeVariationsSizeSelected
                  )
                ) {
                  el.classList.remove(selectors.pdpSizeVariationsSizeSelected);
                }
                if (selectedSize === el.textContent.trim(" ")) {
                  el.classList.add(selectors.pdpSizeVariationsSizeSelected);
                  el.click();

                  setTimeout(function () {
                    button.click();
                    window.location.reload();
                  }, 500);
                }
              });
            });
          }
        });
      });
    },
    500
  );
}

// setting the position of color icon
function setPosition() {
  let sizeHeight;
  let buttonhHeight;
  Kameleoon.API.Utils.querySelectorAll(
    selectors.productBoxElem
  ).forEach(function (el) {
    el.addEventListener("mouseleave", function () {
      el.querySelector(selectors.bmproductSizeContainer).classList.remove(
        selectors.showBmSize
      );
      el.querySelector(selectors.productBoxColors).style.top = "";
    });
    el.addEventListener("mouseover", function () {
      if (
        el
          .querySelector(selectors.bmproductSizeContainer)
          .classList.contains(selectors.showBmSize)
      ) {
        sizeHeight = el.querySelector(selectors.bmproductSizeContainer).clientHeight;
        buttonhHeight = el.querySelector(selectors.bmproductBtn).clientHeight;
        el.querySelector(selectors.productBoxColors).style.top =
          sizeHeight + buttonhHeight + 7 + "px";
      } else {
        el.querySelector(selectors.productBoxColors).style.top = "";
      }
    });
  });
}

// function to remove classes from size when clicked outside them
function removeClass(selector, classToRemove) {
  Kameleoon.API.Utils.querySelectorAll(selector).forEach(function (el) {
    if (Kameleoon.API.Utils.querySelectorAll("." + classToRemove)[0]) {
      el.classList.remove(classToRemove);
    }
  });
}

export function insertbtnel() {
  let productId;
  let size;
  let data;

  const productElements = Kameleoon.API.Utils.querySelectorAll(
    selectors.productsListElement
  );
  productElements.forEach((el) => {
    const productWrapper = el.querySelector(selectors.productBoxDetails);
    const productBox = el.querySelector(".product-box");

    if (productWrapper) {
      if (productWrapper.querySelector(selectors.bmproductBtn)) return;
      productWrapper.insertAdjacentHTML(
        "afterbegin",
        '<div class="bmproduct-btn"><span>In den Warenkorb</span></div>'
      );
      productWrapper.insertAdjacentHTML(
        "afterbegin",
        '<div class="bmproduct-size-container"></div>'
      );

      if (productBox && productWrapper != null) {
        let productBoxId = productBox.getAttribute("productid");

        // geting size , itemId, productId, categoryId
        __initialAppState.modules.productsListPage.productsList.forEach(
          function (elem) {
            if (elem.data.itemId != undefined) {
              productId = elem.data.id;

              if (elem["clickEventTrackingJson"] != undefined) {
                size = JSON.parse(
                  elem["clickEventTrackingJson"]
                ).product_size_availability;
              }

              // put all details in an object
              data = [
                {
                  productId: productId,
                  size: size,
                },
              ];

              // append the size tab
              data.forEach(function (ele) {
                if (productBoxId == ele.productId) {
                  size.forEach(function (breakSize) {
                    el.querySelector(
                      selectors.bmproductSizeContainer
                    ).insertAdjacentHTML(
                      "beforeend",
                      '<span class="bm-size" data-itemId = ' +
                        ele.itemId +
                        ">" +
                        breakSize +
                        "</span>"
                    );
                  });
                }
              });
            }
          }
        );
      }
    }
  });

  Kameleoon.API.Utils.addUniversalClickListener(document, ({ target }) => {
    // to show size on ATC cta click
    const buttonEl = target.closest(selectors.bmproductBtn);
    if (
      buttonEl &&
      buttonEl
        .closest(selectors.productBoxDetails)
        .querySelector(selectors.bmSize)
    ) {
      buttonEl
        .closest(selectors.productBoxDetails)
        .querySelector(selectors.bmproductSizeContainer)
        .classList.add(selectors.showBmSize);
    }

    // hide size
    if (!buttonEl && !target.closest(selectors.bmSize)) {
      removeClass(selectors.bmproductSizeContainer, selectors.showBmSize);
    }
  });

  appendContent();
  onSizeClick();
  setPosition();
}
