const buyButtons = document.querySelectorAll(".buyButton");

buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const parentOfP = button.closest("p");
    const product = parentOfP.querySelector(".productPrice");
    const productPrice = Number(product.dataset.price);
    const quantityInput = document.querySelector(
      `.quantity[data-name="${name}"]`,
    );
    const itemQuantity = Number(quantityInput.value);
    addToCart(name, productPrice, itemQuantity);
    alert(`Added to cart: ${name} x ${itemQuantity}`);
    buildCart();
  });
});

const cartToggle = document.getElementById("cartToggle");
const shoppingCart = document.querySelector(".shopping-cart");

cartToggle.addEventListener("click", () => {
  shoppingCart.classList.toggle("shopping-cart-active");
});

const cart = [];

function addToCart(name, price, quantity) {
  const index = cart.findIndex((product) => product.name === name);

  if (index === -1) {
    cart.push({ name: name, price: price, quantity: quantity });
  } else {
    cart[index].quantity += quantity;
  }
}

const shoppingCartBuild = document.querySelector(".shopping-cart-build");

function buildCart() {
  shoppingCartBuild.innerHTML = "";

  cart.forEach((product) => {
    shoppingCartBuild.innerHTML += `<div>
      Product: ${product.name}, Quantity: ${product.quantity}, Price: ${product.price}kr
      </div>`;
  });
  const totalprice = totalPriceCalculation(cart);
  shoppingCartBuild.innerHTML += `Totalprice: ${totalprice}kr`;
}

function totalPriceCalculation(cart) {
  let totalprice = 0;

  cart.forEach((product) => {
    totalprice += product.price * product.quantity;
  });

  return totalprice;
}
