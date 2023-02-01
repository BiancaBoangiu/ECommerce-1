let productNumbers = 0;
let totalCost = 0;

function addToCart(e) {
  const itemPrice =
    +e.target.parentElement.querySelector(".product-price").innerText;
  const productImage = e.target.parentElement.querySelector(".clothes-options");
  const ul = document.querySelector(".dropdown-menu ul");
  const srcImage = productImage.getAttribute("src");
  const li = document.createElement("li");
  li.classList.add("d-flex");
  const img = document.createElement("img");
  img.setAttribute("src", srcImage);
  img.classList.add("product-image", "m-2");
  const productDetails = e.target.nextElementSibling;
  const divDetails = document.createElement("div");
  const productName = document.createElement("p");
  productName.classList.add("product-name");
  productName.innerText = productDetails.innerText;
  const productPrice =
    e.target.parentElement.querySelector(".product-price").innerText;
  const dollarSpan = document.createElement("span");
  dollarSpan.innerText = "$";
  const spanPrice = document.createElement("span");
  spanPrice.classList.add("product-price");
  spanPrice.innerText = productPrice;
  const productAdded = document.createElement("span");
  productAdded.classList.add("add-cart");
  productAdded.innerText = "Added";
  productAdded.style.color = "green";
  const removeProduct = document.createElement("button");
  removeProduct.innerText = "Remove";
  removeProduct.classList.add("remove-product");
  const newAddCartButton = document.createElement("i");
  newAddCartButton.classList.add("bi", "bi-bag", "add-cart");

  li.appendChild(img);
  li.appendChild(divDetails);
  divDetails.appendChild(productName);
  divDetails.appendChild(dollarSpan);
  divDetails.appendChild(spanPrice);
  divDetails.appendChild(removeProduct);
  ul.appendChild(li);
  e.target.remove();
  productNumbers++;
  totalCost += itemPrice;
  console.log(totalCost);
  updateTotalCost();
  numberOfProducts();

  newAddCartButton.addEventListener("click", (e) => {
    li.appendChild(img);
    li.appendChild(divDetails);
    divDetails.appendChild(productName);
    divDetails.appendChild(dollarSpan);
    divDetails.appendChild(spanPrice);
    console.log(spanPrice);
    divDetails.appendChild(removeProduct);
    ul.appendChild(li);
    e.target.remove();
    productImage.nextElementSibling.appendChild(productAdded);
    productNumbers++;
    totalCost += +spanPrice.innerText;
    console.log(totalCost);
    updateTotalCost();
    numberOfProducts();
  });

  productImage.nextElementSibling.appendChild(productAdded);

  removeProduct.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.remove();
    productAdded.remove();
    productImage.nextElementSibling.appendChild(newAddCartButton);
    productNumbers--;
    numberOfProducts();
    totalCost -=
      e.target.parentElement.querySelector(".product-price").innerText;
    updateTotalCost();
  });

  function updateTotalCost() {
    const totalPrice = document.querySelector(".total-price");
    totalPrice.innerText = `Total ${totalCost}`;
  }
}

function numberOfProducts() {
  const emptyCartMessage = document.querySelector(".empty-cart");
  const numberOfProducts = document.querySelector(".total-products");
  numberOfProducts.innerText = `Total number of products ${productNumbers}`;
  if (productNumbers === 0) {
    emptyCartMessage.style.display = "block";
  } else if (productNumbers >= 1) {
    emptyCartMessage.style.display = "none";
  }
}

numberOfProducts();
