import { getLocalStorage, renderListWithTemplate, setLocalStorage } from "./utils.mjs";

export function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > 0) {
    // const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    // document.querySelector(".product-list").innerHTML = htmlItems.join("");
    const outputEl = document.querySelector(".product-list");
    renderListWithTemplate(cartItemTemplate, outputEl, cartItems);

    var cartTotalContainer = document.querySelector(".cart-footer");
    cartTotalContainer.classList.remove("hide");

    var cartTotalPrice = cartItems.reduce(function (accumulator, currentItem) {
      return accumulator + currentItem.FinalPrice;
    }, 0);

    var cartTotal = document.querySelector(".cart-total");
    cartTotal.textContent = "Total: $" + cartTotalPrice.toFixed(2);
  } else {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
    cartTotalContainer = document.querySelector(".cart-footer");
    cartTotalContainer.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="box"><p class="cart-card__quantity">qty: 1</p><span data-id="${item.Id}">-</span></div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export function removeItem(itemId) {
  let cartItems = getLocalStorage("so-cart");
  cartItems = cartItems.filter(function (item) {
    console.log(item.Id);
    return item.Id !== itemId;
  });
  setLocalStorage("so-cart", cartItems);
  console.log(cartItems);

}