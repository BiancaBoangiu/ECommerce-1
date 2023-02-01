let productsCartPrice = 0;
let appliedCode = 0;

const cartProductPrice = document.querySelectorAll(".product-price");
cartProductPrice.forEach((item) => {
  productsCartPrice += +item.innerText;
});

const cartTotalCost = document.querySelector(".products-price");
cartTotalCost.innerText = `$${productsCartPrice}`;

const couponButton = document.querySelector(".coupon-code-button");
couponButton.addEventListener("click", () => {
  const promoCode = document.querySelector(".coupon-code").value.toUpperCase();
  if (appliedCode === 0) {
    if (promoCode === "FREE100") {
      cartProductPrice.forEach((item) => {
        item.innerText = "0";
        cartTotalCost.innerText = "$0";
      });
      appliedCode = 1;
    }

    if (promoCode === "PROM50") {
      cartProductPrice.forEach((item) => {
        item.style.textDecoration = "line-through";
        const newPrice = document.createElement("span");
        newPrice.innerText = Math.round(0.5 * +item.innerText).toFixed(2);
        newPrice.classList.add("me-1");
        newPrice.style.color = "red";
        const dollarSign = item.previousElementSibling;
        dollarSign.style.color = "red";
        dollarSign.append(newPrice);
        const newTotalCost = Math.round(0.5 * productsCartPrice).toFixed(2);
        cartTotalCost.innerText = `$${newTotalCost}`;
      });
      appliedCode = 1;
    }

    if (promoCode === "PROM20") {
      cartProductPrice.forEach((item) => {
        item.style.textDecoration = "line-through";
        const newPrice = document.createElement("span");
        newPrice.innerText = Math.round(0.8 * +item.innerText).toFixed(2);
        newPrice.classList.add("me-1");
        newPrice.style.color = "red";
        const dollarSign = item.previousElementSibling;
        dollarSign.style.color = "red";
        dollarSign.append(newPrice);
        const newTotalCost = Math.round(0.8 * productsCartPrice).toFixed(2);
        cartTotalCost.innerText = `$${newTotalCost}`;
      });
      appliedCode = 1;
    }
  }
});
