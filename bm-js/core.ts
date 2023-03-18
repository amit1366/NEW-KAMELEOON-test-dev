/**
 * Select DOM element by any type of dom selector
 *
 * @param {string} selector
 * @returns {HTMLElement}
 */
export const $ref = (selector: string): HTMLElement => {
  if (!selector) {
    console.error(`Invalid selector!`);
    return;
  }

  let el = document.querySelector(selector);
  if (!el) {
    console.error(`Selector ${selector} does not exist in DOM!`);
    return;
  }

  return el as HTMLElement;
};

/**
 * Select DOM element by any type of dom selector
 * ex: $replaceWith("h1", "<span>your replace text</span>");
 * 
 * @param {string} selector
 * @returns {HTMLElements}
 */
export const $refs = (selector: string): NodeListOf<HTMLElement> => {
  if (!selector) {
    console.error(`Invalid selector!`);
    return;
  }

  let els = document.querySelectorAll(selector);

  if (!els || !els.length) {
    console.error(`Selector ${selector} does not exist in DOM!`);
    return;
  }

  return els as NodeListOf<HTMLElement>;
};
