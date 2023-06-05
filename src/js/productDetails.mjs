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
    const loadingOverlay = document.querySelector(".loading-overlay");
    const loadingText = loadingOverlay.querySelector(".loading-text");
    loadingOverlay.style.display = "flex";


    setTimeout(() => {
        const cart = getLocalStorage("so-cart") || [];
        const updatedCart = [...cart, product];
        setLocalStorage("so-cart", updatedCart);
        loadingText.textContent = "Added to Cart";
        const backpackIcon = document.querySelector(".cart");
        backpackIcon.style.animation = "backpackAnimation 0.5s";

        // Update the cart count
        const cartCountElement = document.querySelector(".item-count");
        cartCountElement.textContent = updatedCart.length;

        setTimeout(() => {
            backpackIcon.style.animation = "";
            loadingOverlay.style.display = "none";
        }, 500);
    }, 1000);
}



function renderProductDetails() {
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText =
        product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Images.PrimaryLarge;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productFinalPrice").innerText = "$" + product.FinalPrice;

    // discount percentage
    const productSuggestedRetailPrice = product.SuggestedRetailPrice;
    const productFinalPrice = product.FinalPrice;
    const productDiscount = (productSuggestedRetailPrice - productFinalPrice);
    if (productDiscount > 0) {
        const productDiscountPercent = ((productDiscount / productSuggestedRetailPrice) * 100).toFixed(0);
        document.querySelector(".discount-indicator").innerText = productDiscountPercent + "% off";
        document.querySelector(".discount-indicator").classList.remove("hide");
    }

    document.querySelector("#productColorName").innerText =
        product.Colors[0].ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML =
        product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
}