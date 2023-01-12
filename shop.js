const addCartButton = document.querySelectorAll(".add-cart");
addCartButton.forEach((element) => {
  element.addEventListener("click", (e) => {
    const productImage =
      e.target.parentElement.querySelector(".clothes-options");
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
    const productPrice = productDetails.nextElementSibling;
    const spanPrice = document.createElement("span");
    spanPrice.classList.add("product-price");
    spanPrice.innerText = productPrice.innerText;
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
    divDetails.appendChild(spanPrice);
    divDetails.appendChild(removeProduct);
    ul.appendChild(li);
    e.target.remove();
    productImage.nextElementSibling.appendChild(productAdded);
    removeProduct.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove();
      productAdded.remove();
      productImage.nextElementSibling.appendChild(newAddCartButton);
      newAddCartButton.addEventListener("click", (e) => {
        li.appendChild(img);
        li.appendChild(divDetails);
        divDetails.appendChild(productName);
        divDetails.appendChild(spanPrice);
        divDetails.appendChild(removeProduct);
        ul.appendChild(li);
        e.target.remove();
        productImage.nextElementSibling.appendChild(productAdded);
      });
    });
  });
});
