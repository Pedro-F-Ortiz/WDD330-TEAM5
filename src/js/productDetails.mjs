import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
    try {
        // get the details for the current product. findProductById will return a promise! use await or .then() to process it
        product = await findProductById(productId);

        // once we have the product details we can render out the HTML
        renderProductDetails();

        // once the HTML is rendered we can add a listener to Add to Cart button
        document.getElementById("addToCart").addEventListener("click", addToCart);
    } catch (error) {
        // Display a friendly error message to the user
        document.querySelector("#productName").innerText = "An error occurred while retrieving the product details. Please try again later.";
    }
}


function addToCart() {
    const cart = getLocalStorage("so-cart") || [];
    const updatedCart = [...cart, product];
    setLocalStorage("so-cart", updatedCart);
}

function renderProductDetails() {
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText =
        product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Images.PrimaryLarge;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
    document.querySelector("#productColorName").innerText =
        product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML =
        product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
}