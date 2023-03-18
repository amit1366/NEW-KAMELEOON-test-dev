/**
 * Wait and look at target element load in DOM
 * @param {String} selector Any DOM element query selector
 * @param {Function} callback Callback function
 * @param {Number} interval Interval in ms default 50ms
 * @param {Number} timeout Timeout in ms default 5000ms
 *
 * @returns {void}
 */
export const useWaitForElement = function (
  selector,
  callback,
  interval = 50,
  timeout = 5000
) {
  const waitForElementInterval = setInterval(function () {
    if (
      document &&
      document.querySelector(selector) &&
      document.querySelectorAll(selector).length > 0
    ) {
      clearInterval(waitForElementInterval);
      callback();
    }
  }, interval);

  setTimeout(function () {
    clearInterval(waitForElementInterval);
  }, timeout);
};

/**
 *
 * @param {Function} callback Callback function
 * @param {Number} timeout Timeout in ms default 300ms
 * @returns
 */

export const useDebounce = function (callback, timeout = 300) {
  let debounceTimer;
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      callback.apply(this, args);
    }, timeout);
  };
};

/**
 * Detect change location
 *  ex: useListener((e) => {console.log(e)});
 *
 * @param callback
 */

export const useListener = (callback: Function) => {
  window.addEventListener("locationchange", function (e: any) {
    callback(e);
  });
  history.pushState = ((f) =>
    function pushState() {
      var ret = f.apply(this, arguments);
      window.dispatchEvent(new Event("pushstate"));
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    })(history.pushState);
  history.replaceState = ((f) =>
    function replaceState() {
      var ret = f.apply(this, arguments);
      window.dispatchEvent(new Event("replacestate"));
      window.dispatchEvent(new Event("locationchange"));
      return ret;
    })(history.replaceState);
  window.addEventListener("popstate", function () {
    window.dispatchEvent(new Event("locationchange"));
  });
};
