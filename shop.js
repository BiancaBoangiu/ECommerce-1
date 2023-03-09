let productNumbers = 0;
let totalCost = 0;
const hasProductsInLocalStorage = localStorage.getItem("products");
const shopProducts = hasProductsInLocalStorage
  ? JSON.parse(hasProductsInLocalStorage)
  : [];

function updateTotalCost() {
  const totalPrice = document.querySelector(".total-price");
  totalPrice.innerText = `Total $${totalCost}`;
}

function numberOfProducts() {
  const emptyCartMessage = document.querySelector(".empty-cart");
  const numberOfProducts = document.querySelector(".total-products");
  numberOfProducts.innerText = `Total number of products ${productNumbers}`;
  if (productNumbers === 0) {
    emptyCartMessage.style.display = "block";
    numberOfProducts.style.display = "none";
  } else if (productNumbers >= 1) {
    emptyCartMessage.style.display = "none";
    numberOfProducts.style.display = "block";
  }
}

function addToCart(e) {
  const itemPrice =
    +e.target.parentElement.parentElement.querySelector(".product-price")
      .innerText;
  const itemImage =
    e.target.parentElement.parentElement.querySelector(".clothes-options");
  const srcImage = itemImage.getAttribute("src");
  const itemName = e.target.previousElementSibling;
  const productId =
    e.target.parentElement.parentElement.getAttribute("data-id");

  const product = {
    id: productId,
    image: srcImage,
    price: itemPrice,
    name: itemName.innerText,
  };

  shopProducts.push(product);
  localStorage.setItem("products", JSON.stringify(shopProducts));

  buildShoppingCartItem(product);
}

function buildShoppingCartItem(item) {
  const productAdded = document.createElement("span");
  productAdded.classList.add("added-to-cart");
  productAdded.innerText = "Added";
  productAdded.style.color = "green";

  const productFromList = document.querySelector(
    `.product-item[data-id="${item.id}"]`
  );
  const productContainer = productFromList.querySelector(
    ".product-name-container"
  );
  productContainer.appendChild(productAdded);
  const productAddedToCart = productContainer.querySelector(".added-to-cart");
  if (productContainer.contains(productAddedToCart)) {
    const addProductToCart = productContainer.querySelector(".add-cart");
    productContainer.removeChild(addProductToCart);
  }
  const ul = document.querySelector(".dropdown-menu ul");
  const li = document.createElement("li");
  li.classList.add("d-flex");
  const img = document.createElement("img");
  img.setAttribute("src", item.image);
  img.classList.add("product-image", "m-2");
  const divDetails = document.createElement("div");
  const productName = document.createElement("p");
  productName.classList.add("product-name");
  productName.innerText = item.name;
  const productPrice = item.price;
  const dollarSpan = document.createElement("span");
  dollarSpan.innerText = "$";
  const spanPrice = document.createElement("span");
  spanPrice.classList.add("product-price");
  spanPrice.innerText = productPrice;
  const removeProduct = document.createElement("button");
  removeProduct.innerText = "Remove";
  removeProduct.classList.add("remove-product");
  const newAddCartButton = document.createElement("button");
  newAddCartButton.classList.add("bi", "bi-bag", "add-cart");
  newAddCartButton.addEventListener("click", (e) => {
    addToCart(e);
  });

  li.appendChild(img);
  li.appendChild(divDetails);
  divDetails.appendChild(productName);
  divDetails.appendChild(dollarSpan);
  divDetails.appendChild(spanPrice);
  divDetails.appendChild(removeProduct);
  ul.appendChild(li);

  productNumbers++;
  totalCost += item.price;
  updateTotalCost();
  numberOfProducts();

  removeProduct.addEventListener("click", (e) => {
    productFromList
      .querySelector(".product-name-container .added-to-cart")
      .remove();
    productFromList
      .querySelector(".product-name-container")
      .appendChild(newAddCartButton);
    e.target.parentElement.parentElement.remove();
    productNumbers--;
    numberOfProducts();
    totalCost -= item.price;
    updateTotalCost();

    const productsFromLocalStorage = JSON.parse(
      localStorage.getItem("products")
    );
    const productIndex = productsFromLocalStorage.findIndex((product) => {
      return product.id === item.id;
    });
    productsFromLocalStorage.splice(productIndex, 1);
    localStorage.setItem("products", JSON.stringify(productsFromLocalStorage));

    shopProducts.splice(productIndex, 1);
  });
}

function localStorageToCart() {
  const allProducts = JSON.parse(localStorage.getItem("products"));

  allProducts.forEach((product) => {
    buildShoppingCartItem(product);
  });
}

localStorageToCart();

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => {
    const username = document.querySelector(".navbar-brand");
    username.innerText = users[0].username;
    const teamSection = document.createElement("div");
    const container = document.querySelector(".info");
    const teamMembers = document.createElement("h3");
    teamMembers.innerText = "OUR TEAM";
    teamMembers.classList.add("text-center", "py-2");
    teamSection.appendChild(teamMembers);
    teamSection.classList.add("row");
    users.forEach((user) => {
      const userCol = document.createElement("div");
      userCol.classList.add("col-md-4", "col-6", "mb-3");
      const userName = document.createElement("p");
      userName.innerText = user.username;
      userName.classList.add("mb-1");
      const userEmail = document.createElement("p");
      userEmail.innerText = user.email;
      const userIcon = document.createElement("i");
      userIcon.classList.add("fa-solid", "fa-user", "mb-2");
      userIcon.style.color = "blue";
      userIcon.style.fontSize = "22px";
      userCol.appendChild(userIcon);
      userCol.appendChild(userName);
      userCol.appendChild(userEmail);
      teamSection.appendChild(userCol);
      container.appendChild(teamSection);
    });
  });

const sendMessageButton = document.querySelector(".send-message");
const message = document.querySelector(".message");
function showInputValues() {
  const inputNameValue = document.querySelector(".contact-name").value;
  const inputEmailValue = document.querySelector(".contact-email").value;
  const inputPhoneNumberValue = document.querySelector(
    ".contact-phone-number"
  ).value;
  const inputMessageValue = document.querySelector(".contact-message").value;
  const inputName = document.createElement("p");
  inputName.innerText = `Name : ${inputNameValue}`;
  const inputEmail = document.createElement("p");
  inputEmail.innerText = `Email: ${inputEmailValue}`;
  const inputPhoneNumber = document.createElement("p");
  inputPhoneNumber.innerText = `Phone number: ${inputPhoneNumberValue}`;
  const inputMessage = document.createElement("p");
  inputMessage.innerText = `Message: ${inputMessageValue}`;
  message.appendChild(inputName);
  message.appendChild(inputEmail);
  message.appendChild(inputPhoneNumber);
  message.appendChild(inputMessage);
  clearMessage();
}

function clearMessage() {
  setTimeout(() => {
    message.innerHTML = "";
  }, 10000);
}

sendMessageButton.addEventListener("click", showInputValues);

let swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((users) => {
    users.forEach((user) => {
      const swiper = document.querySelector(".swiper-wrapper");
      const userPost = document.createElement("p");
      userPost.innerText = user.title;
      userPost.style.padding = "15px";
      const userPhoto = document.createElement("img");
      userPhoto.setAttribute("src", "photos/person.jpg");
      userPhoto.classList.add("post-image");
      const postContainer = document.createElement("div");
      postContainer.classList.add(
        "d-flex",
        "justify-content-center",
        "swiper-slide",
        "align-items-center"
      );
      postContainer.appendChild(userPhoto);
      postContainer.appendChild(userPost);
      swiper.appendChild(postContainer);
    });
  });
