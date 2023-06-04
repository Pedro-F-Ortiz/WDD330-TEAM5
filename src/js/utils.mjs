// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  // wait what?  we are returning a new function? 
  // this is called currying and can be very helpful.
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export function loadHeaderFooter() {
  // Load the header and footer templates in from our partials.
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  // Grab the header and footer elements out of the DOM
  const headerElement = document.querySelector("header.divider");
  const footerElement = document.querySelector("footer");
  headerTemplateFn().then(html => {
    // cart data
    const cartData = getLocalStorage("so-cart");
    // obtained HTML content of the template
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    // element with class "item-count"
    const itemCountElement = doc.querySelector(".item-count");
    // Update the value of the element
    itemCountElement.textContent = cartData.length;
    // render the header
    const modifiedHeaderTemplate = doc.documentElement.outerHTML;
    renderWithTemplate(() => Promise.resolve(modifiedHeaderTemplate), headerElement);
  });
  // Render the header and footer (renderWithTemplate)
  // renderWithTemplate(headerTemplateFn, headerElement);
  renderWithTemplate(footerTemplateFn, footerElement);
}