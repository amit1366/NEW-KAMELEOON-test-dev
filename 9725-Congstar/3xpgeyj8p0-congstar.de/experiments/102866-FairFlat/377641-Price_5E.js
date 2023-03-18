const changePrice = (innerPrice, belowPrice, belowCent) => {
  const innerPriceContainer = document.querySelector(
    ".speedometer-inner__header span ~  .text-color--postpaid"
  );
  const largePrice = document.querySelector(".price--large .price__euro");
  const cents = document.querySelector(".price--large .price__cent");
  if (innerPriceContainer && largePrice) {
    innerPriceContainer.textContent = innerPrice;
    largePrice.textContent = belowPrice;
    cents.textContent = belowCent;
  }

  // eslint-disable-next-line no-unused-expressions
  document.querySelector(".price--dim-gray .price__euro")
    ? (document.querySelector(".price--dim-gray .price__euro").textContent =
        "12")
    : "";
  // eslint-disable-next-line no-unused-expressions
  document.querySelector(".price--dim-gray .price__cent")
    ? (document.querySelector(".price--dim-gray .price__cent").textContent =
        "19")
    : "";
};

Kameleoon.API.Core.runWhenConditionTrue(
  () => {
    return document.querySelector(
      '#available-option-2457[data-test-state="isSelected"]'
    );
  },
  () => changePrice("12,19 €", "12", "19"),
  100
);

Kameleoon.API.Core.runWhenConditionTrue(
  () => {
    return document.querySelector(
      '#available-option-2456[data-test-state="isSelected"]'
    );
  },
  () => changePrice("14,63 €", "14", "63"),
  100
);

Kameleoon.API.Core.runWhenConditionTrue(
  () => {
    return document.querySelector(
      '#available-option-2454[data-test-state="isSelected"]'
    );
  },
  () => changePrice("17,06 €", "17", "06"),
  100
);

Kameleoon.API.Core.runWhenConditionTrue(
  () => {
    return document.querySelector(
      '#available-option-2452[data-test-state="isSelected"]'
    );
  },
  () => {
    changePrice("21,94 €", "21", "94");
    Kameleoon.API.Core.runWhenConditionTrue(
      () => {
        return document.querySelector(
          '#available-option-2454[data-test-state="isSelected"]'
        );
      },
      () => changePrice("17,06 €", "17", "06"),
      100
    );
  },
  100
);

Kameleoon.API.Core.runWhenElementPresent("#available-option-2452", (select) => {
  select[0].addEventListener("click", () => {
    document.querySelector(".price--dim-gray .price__euro").textContent = "10";
    changePrice("21,94 €", "21", "94");
  });
});

Kameleoon.API.Core.runWhenElementPresent("#available-option-2451", (select) => {
  select[0].addEventListener("click", () => {
    changePrice("26,81 €", "26", "81");
  });
});

Kameleoon.API.Core.runWhenElementPresent("#available-option-2454", (select) => {
  select[0].addEventListener("click", () => {
    changePrice("17,06 €", "17", "06");
  });
});

Kameleoon.API.Core.runWhenElementPresent("#available-option-2456", (select) => {
  select[0].addEventListener("click", () => {
    document.querySelector(".price--dim-gray .price__euro").textContent = "10";
    changePrice("14,63 €", "14", "63");
  });
});

Kameleoon.API.Core.runWhenElementPresent("#available-option-2457", (select) => {
  select[0].addEventListener("click", () => {
    changePrice("12,19 €", "12", "19");
  });
});
