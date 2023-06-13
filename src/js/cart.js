// import { getLocalStorage } from "./utils.mjs";

// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart");
//   if (cartItems && cartItems.length > 0) {
//     const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//     document.querySelector(".product-list").innerHTML = htmlItems.join("");

//     var cartTotalContainer = document.querySelector(".cart-footer");
//     cartTotalContainer.classList.remove("hide");

//     var cartTotalPrice = cartItems.reduce(function (accumulator, currentItem) {
//       return accumulator + currentItem.FinalPrice;
//     }, 0);

//     var cartTotal = document.querySelector(".cart-total");
//     cartTotal.textContent = "Total: " + cartTotalPrice;
//   } else {
//     document.querySelector(".product-list").innerHTML =
//       "<p>Your cart is empty.</p>";
//     cartTotalContainer = document.querySelector(".cart-footer");
//     cartTotalContainer.classList.add("hide");
//   }
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

// renderCartContents();

import { loadHeaderFooter } from "./utils.mjs";
import { renderCartContents, removeItem } from "./shoppingCart.mjs";

loadHeaderFooter();
renderCartContents();

var cartItems = document.querySelectorAll(".cart-card span[data-id]");
cartItems.forEach(function (span) {
    span.addEventListener("click", function () {
        var itemId = this.getAttribute("data-id");
        console.log("Span clicked for item ID: " + itemId);
        removeItem(itemId);
        loadHeaderFooter();
        renderCartContents();
    });
});
