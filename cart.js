const productCart = JSON.parse(localStorage.getItem("products"));
const productContainer = document.querySelector(".cart-product");

function createCartProduct() {
  productCart.forEach((item) => {
    const divCartDetails = document.createElement("div");
    divCartDetails.classList.add("row", "cart-product-details", "py-3");
    const divImage = document.createElement("div");
    divImage.classList.add(
      "col-3",
      "cart-product-image",
      "d-flex",
      "justify-content-center"
    );
    const srcDivImage = document.createElement("img");
    srcDivImage.setAttribute("src", item.image);
    srcDivImage.classList.add("cart-clothes-options");
    divImage.appendChild(srcDivImage);
    const divName = document.createElement("div");
    divName.classList.add(
      "col-3",
      "cart-product-name",
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );
    const productDivName = document.createElement("p");
    productDivName.innerText = item.name;
    divName.appendChild(productDivName);
    const divPrice = document.createElement("div");
    divPrice.classList.add(
      "col-3",
      "cart-product-price",
      "d-flex",
      "align-items-center",
      "justify-content-center"
    );
    const spanDivPrice = document.createElement("span");
    spanDivPrice.classList.add("product-price");
    spanDivPrice.innerText = item.price;
    const spanDollarSign = document.createElement("span");
    spanDollarSign.innerText = "$";
    spanDollarSign.classList.add("dollar-sign");
    divPrice.appendChild(spanDollarSign);
    divPrice.appendChild(spanDivPrice);
    const divQuantity = document.createElement("div");
    divQuantity.classList.add(
      "col-3",
      "cart-product-quantity",
      "d-flex",
      "align-items-center",
      "justify-content-center"
    );
    const spanQuantity = document.createElement("span");
    spanQuantity.innerText = "1";
    divQuantity.appendChild(spanQuantity);
    divCartDetails.appendChild(divImage);
    divCartDetails.appendChild(divName);
    divCartDetails.appendChild(divPrice);
    divCartDetails.appendChild(divQuantity);
    productContainer.appendChild(divCartDetails);
  });
}

createCartProduct();

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
  let promoCode = document.querySelector(".coupon-code").value.toUpperCase();
  if (appliedCode === 0) {
    if (
      promoCode == "FREE100" ||
      promoCode == "PROM50" ||
      promoCode == "PROM20"
    ) {
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
    } else {
      const errorMessage = document.createElement("p");
      const couponDetails = document.querySelector(".coupon-details");
      errorMessage.innerText = "Invalid coupon";
      errorMessage.style.color = "red";
      errorMessage.classList.add("m-2");
      couponDetails.appendChild(errorMessage);
      const deleteCoupon = setTimeout(deleteInvalidCode, 5000);
      function deleteInvalidCode() {
        document.querySelector(".coupon-code").value = "";
        errorMessage.style.display = "none";
      }
    }
  }
});
