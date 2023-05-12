import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}

export default async function productList(selector, category) {
    // get the element we will insert the list into from the selector
    const el = document.querySelector(selector);
    // get the list of products
    const products = await getData(category);

    // remove some items
    let product1Index = products.findIndex(obj => obj.Id === "989CG");
    if (product1Index !== -1) {
        products.splice(product1Index, 1);
    }
    let product2Index = products.findIndex(obj => obj.Id === "880RT");
    if (product2Index !== -1) {
        products.splice(product2Index, 1);
    }

    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, el, products);
}