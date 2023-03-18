import { $ref } from "@bm-js";
import { $refs } from "./core";
interface ICallback {
  callback?: () => void;
}

/**
 * Add classes in all targeted DOM elements
 *
 * @param selector
 * @param {string | Array} classes 'className' or ['class1', 'class2']
 */

export const $addClass = (
  selector: string,
  classes: string | Array<string>
) => {
  if (!classes) {
    console.error("Atleast one class is required!");
    return;
  }

  let elements = $refs(selector);
  if (!elements) return;

  if (Array.isArray(classes)) {
    elements.forEach((el) => {
      el.classList.add(...classes);
    });

    return;
  }

  if (typeof classes === "string") {
    elements.forEach((el) => {
      el.classList.add(classes);
    });

    return;
  }
};

/**
 * Remove class or classList from selected DOM Elements
 *
 * @param {string} selector '.className | #id | or any selector'
 * @param {string} classes 'className' or ['class1', 'class2']
 */

export const $removeClass = (
  selector: string,
  classes: string | Array<string>
) => {
  if (!classes) {
    console.error("Atleast one class is required!");
    return;
  }

  let elements = $refs(selector);
  if (!elements) return;

  if (Array.isArray(classes)) {
    elements.forEach((el) => {
      el.classList.remove(...classes);
    });

    return;
  }

  if (typeof classes === "string") {
    elements.forEach((el) => {
      if (el.classList) {
        el.classList.remove(classes);
      } else {
        el.className = el.className.replace(
          new RegExp("\\b" + classes + "\\b", "g"),
          ""
        );
      }
    });

    return;
  }
};

/**
 * Added attrs element in targeted dom
 *
 * @param {string} selector Selector
 * @param {object} atrrs Attributes ex: {id: 'IdName', class: 'class-name'}
 */
export const $attr = (selector, atrrs) => {
  if (!atrrs) {
    console.error("Atleast one attribute is required!");
    return;
  }

  let el = $ref(selector);
  if (!el) return;

  Object.keys(atrrs).forEach(function (attr) {
    el.setAttribute(attr, atrrs[attr]);
  });
};
/**
 *  Remove attribute(es) from target element(s)
 * ex: $removeAttr('.selector', ['data', 'class', 'id'])
 *
 * @param selector
 * @param atrrs
 */
export const $removeAttr = (
  selector: string,
  attrs: Array<string> | string
) => {
  if (!attrs) {
    console.error("Atleast one attribute name is required!");
    return;
  }

  const element = $ref(selector);
  if (!element) return;

  if (typeof attrs === "string") {
    element.removeAttribute(attrs);
  } else {
    attrs.forEach((attr: string) => {
      element.removeAttribute(attr);
    });
  }
};

/**
 * Get attribute value 
 * ex: $getAttr('.selector', 'data')
 * 
 * @param selector 
 * @param attrName 
 * @returns 
 */

export const $getAttr = (selector: string, attrName: string) => {
  const element = $ref(selector);
  if (!element) return;

  return element.getAttribute(attrName)
}

/**
 * Append element in target dom
 *
 * @param {string} selector Selector
 * @param {HTMLElement} element HMTL elements strings
 * @param {string} position Append position default: "beforeend". Enums: ["beforebegin" | "afterbegin" | "beforeend" | "afterend"]
 * @returns {void}
 */
export const $append = (
  selector: string,
  element: string,
  position = "beforeend"
) => {
  let elements = $refs(selector);
  if (!elements) return;

  elements.forEach((el) => {
    if (position === "beforebegin") {
      el.insertAdjacentHTML("beforebegin", element);
    } else if (position === "afterbegin") {
      el.insertAdjacentHTML("afterbegin", element);
    } else if (position === "afterend") {
      el.insertAdjacentHTML("afterend", element);
    } else {
      el.insertAdjacentHTML("beforeend", element);
    }
  });
};

/**
 * Check has target class contain or not
 *
 * @param {string} selector Selector
 * @param {string} className
 * @returns {boolean}
 */

export const hasClass = (selector: string, className: string): boolean => {
  if (!className) {
    console.error("ClassName is required!");
    return;
  }

  let el = $ref(selector);
  if (!el) return;

  return el.classList.contains(className);
};

/**
 * Add css in targeted dom
 * Ex: $css('.selector', {color: "#f20", backgroundColor: 'blue'})
 * @param selector
 * @param properties
 * @param value
 * @param options
 * @returns
 */

export const $css = (
  selector: string,
  properties?: { [key: string]: string | number } | string,
  value?: string | number,
  options?: ICallback
): any => {
  const element = $ref(selector);
  if (!element) return;

  if (!properties) {
    return getComputedStyle(element);
  }

  if (typeof properties === "string" && value === undefined) {
    return getComputedStyle(element)[properties];
  }

  if (typeof properties === "string") {
    element.style[properties as string] = value as string;
  } else {
    for (let key in properties) {
      element.style[key] = properties[key] as string;
    }
  }

  if (options?.callback) options.callback();
};

/**
 * It removes all the child elements of the provided element
 * ex: $empty('.selector') or $empty('.selector', callback)
 *
 * @param element
 * @param options
 */

export const $empty = (selector: string, options?: ICallback): void => {
  let element = $ref(selector);
  if (!element) return;

  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  if (options?.callback) options.callback();
};

/**
 *
 * @param elements
 */
export const $remove = (selector: string): void => {
  const elements = $refs(selector);
  if (!elements) return;

  for (let i = 0; i < elements.length; i++) {
    elements[i].parentNode.removeChild(elements[i]);
  }
};

/**
 * Set heigh and get height of targeted element
 *
 * Ex:
 * @param selector
 * @param height
 * @param options
 * @returns
 */

export const $height = (
  selector: string,
  height?: number | string,
  options?: ICallback
): number | string => {
  const element = $ref(selector);
  if (!element) return;

  if (!height) {
    return parseFloat(getComputedStyle(element).height);
  }
  const { callback } = options || {};
  element.style.height = typeof height === "number" ? height + "px" : height;
  if (callback) callback();
  return height;
};
/**
 * Set heigh and get width of targeted element
 *
 * Ex:
 * @param selector
 * @param width
 * @param options
 * @returns
 */

export const $width = (
  selector: string,
  width?: number | string,
  options?: ICallback
): number | string => {
  const element = $ref(selector);
  if (!element) return;

  if (!width) {
    return parseFloat(getComputedStyle(element).width);
  }
  const { callback } = options || {};
  element.style.width = typeof width === "number" ? width + "px" : width;
  if (callback) callback();
  return width;
};

/**
 * Set text or return selected DOM
 * ex: $text("h1", "Hello! BM.js")
 *
 * @param selector
 * @param text
 * @returns
 */

export const $text = (selector: string, text?: string): string => {
  const element = $ref(selector);
  if (!element) return;

  if (text) {
    element.textContent = text;
    return text;
  }
  return element.textContent || "";
};

/**
 * Add toggle class in target DOM
 * ex: $toggleClass("h1", "toggleClass");
 *
 * @param selector
 * @param className
 * @returns
 */

export const $toggleClass = (selector: string, className: string) => {
  const elements = $refs(selector);
  if (!elements) return;

  elements.forEach((element) => {
    element.classList.toggle(className);
  });
};

/**
 * Get siblings in target DOM
 * ex: $getSiblings('.selector')
 *
 * @param selector
 * @returns
 */

export const $siblings = (selector: string): HTMLElement[] => {
  const element = $ref(selector);
  if (!element) return;

  const siblings = [];
  let sibling = element.parentNode?.firstChild;
  while (sibling) {
    if (sibling.nodeType === Node.ELEMENT_NODE && sibling !== element) {
      siblings.push(sibling as HTMLElement);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

/**
 * Get parent element of target DOM
 * ex: $parent('.selector')
 *
 * @param selector
 * @returns
 */

export const $parent = (selector: string): HTMLElement | null => {
  const element = $ref(selector);
  if (!element) return;

  return element.parentElement;
};

/**
 * Replace with content
 *
 * @param selector
 * @param replacement
 * @returns
 */
export const $replaceWith = (
  selector: string,
  replacement: HTMLElement | string
): void => {
  const element = $ref(selector);
  if (!element) return;

  if (typeof replacement === "string") {
    element.outerHTML = replacement;
  } else {
    element.parentNode.replaceChild(replacement, element);
  }
};

/**
 * Unwrap the parent element
 * ex: $unwrap('.selector')
 *
 * @param element
 * @returns
 */

export const $unwrap = (selector: string) => {
  const element = $ref(selector);
  if (!element) return;

  const parent = element.parentNode;
  if (!parent) {
    return;
  }
  while (element.firstChild) {
    parent.insertBefore(element.firstChild, element);
  }
  parent.removeChild(element);
};

/**
 * Get the position of a selected DOM 
 * ex: $position('.selector')
 * 
 * @param selector 
 * @returns 
 */
export const $position = (selector: string) => {
  const element = $ref(selector);
  if (!element) return;

  let postion = {
    top: 0,
    left: 0,
  };

  postion.top = element.offsetTop;
  postion.left = element.offsetLeft;
  return postion;
};

/**
 * Get the offset value of target dom element
 * ex: $offset('.selector')
 * 
 * @param selector 
 * @returns 
 */

export const $offset = (selector: string): { top: number, left: number } => {
  const element = $ref(selector);
  if (!element) return;

  const rect = element.getBoundingClientRect();
  return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
  };
}
