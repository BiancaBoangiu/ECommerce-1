let productNumbers = 0;
let totalCost = 0;
let nameErrorStatus = true;
let messageErrorStatus = true;
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

//Input values

function showInputValues() {
  const inputNameValue = document.querySelector(".contact-name").value;
  const inputEmailValue = document.querySelector(".contact-email").value;
  const inputPhoneNumberValue = document.querySelector(
    ".contact-phone-number"
  ).value;
  const inputMessageValue = document.querySelector(".contact-message").value;
  const nameError = document.createElement("p");
  nameError.innerText = "Error: Fill the name field";
  nameError.style.color = "rgba(255, 0, 0, 0.6 )";
  nameError.classList.add("name-error");
  const messageError = document.createElement("p");
  messageError.innerText = "Fill the message field";
  messageError.style.color = "rgba(255, 0, 0, 0.6 )";
  messageError.classList.add("message-error");
  const nameInput = document.querySelector(".contact-name");
  const messageInput = document.querySelector(".contact-message");

  clearErrors();

  if (inputNameValue === "") {
    const nameContainer = document.querySelector(".name-info");
    nameInput.style.border = "2px solid rgba(255, 0, 0, 0.6 )";
    nameContainer.appendChild(nameError);
  }

  if (inputMessageValue === "") {
    const messageContainer = document.querySelector(".message-info");
    messageInput.style.border = "2px solid rgba(255, 0, 0, 0.6 )";
    messageContainer.appendChild(messageError);
  }

  if (inputMessageValue != "" && inputNameValue != "") {
    showLoadingIcon();
    const customerReviews = document.querySelector(".customer-reviews");
    const customerInfo = document.createElement("div");
    customerInfo.classList.add("customer-review-info", "col-2");
    const nameButtons = document.createElement("div");
    nameButtons.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    const customerMessage = document.createElement("div");
    customerMessage.classList.add("customer-message", "mb-4", "p-2");
    customerMessage.innerText = inputMessageValue;
    const customerName = document.createElement("div");
    customerName.classList.add("customer-name", "fw-bold", "p-2");
    customerName.innerText = inputNameValue;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-button");
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("edit-button");
    nameButtons.appendChild(customerName);
    nameButtons.appendChild(deleteButton);
    nameButtons.appendChild(editButton);
    customerInfo.appendChild(nameButtons);
    customerInfo.appendChild(customerMessage);
    customerReviews.appendChild(customerInfo);

    fetch("http://localhost:3000/messages", {
      method: "POST",
      body: JSON.stringify({
        name: inputNameValue,
        email: inputEmailValue,
        number: inputPhoneNumberValue,
        message: inputMessageValue,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const contactContainer = document.querySelector(".contact");
        const deleteLoadingButton = document.querySelector(".buttonload");
        const submitButton = document.createElement("input");
        submitButton.setAttribute("type", "submit");
        submitButton.classList.add("send-message");
        submitButton.setAttribute("onclick", "showInputValues()");
        deleteLoadingButton.remove();
        contactContainer.appendChild(submitButton);

        clearMessage();
      })
      .catch(() => alert("Error"));
  }
}

function clearErrors() {
  const nameInput = document.querySelector(".contact-name");
  const messageInput = document.querySelector(".contact-message");
  nameInput.style.border = "";
  messageInput.style.border = "";
  const nameError = document.querySelector(".name-error");
  const messageError = document.querySelector(".message-error");
  if (nameError) {
    nameError.remove();
  }
  if (messageError) {
    messageError.remove();
  }
}

function clearMessage() {
  const form = document.querySelector("form");
  form.reset();
}

function showLoadingIcon() {
  const messageButton = document.querySelector(".send-message");
  messageButton.remove();
  const loadingButton = document.createElement("button");
  loadingButton.classList.add("buttonload");
  const loadingIcon = document.createElement("i");
  loadingIcon.classList.add("fa", "fa-spinner", "fa-spin");
  const contactInfo = document.querySelector(".contact");
  loadingButton.appendChild(loadingIcon);
  contactInfo.appendChild(loadingButton);
}

window.addEventListener("DOMContentLoaded", showCustomerMessages);

function showCustomerMessages() {
  const container = document.querySelector(".customer-reviews");
  let template = "";

  fetch("http://localhost:3000/messages")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((customer) => {
        template += `
        <div class="customer-review-info col-2" data-id = "${customer.id}">
          <div class = "d-flex justify-content-between align-items-center">
            <div class="customer-name p-2">
            ${customer.name}</div>
            <button class = "delete-button">Delete</button>
            <button class = "edit-button">Edit</button>
          </div>
          <div class="customer-message fw-bold p-2">
          ${customer.message}
          </div>
        </div>`;
      });

      container.innerHTML = template;
      const deleteButtons = document.querySelectorAll(".delete-button");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          console.log(e);
          const id =
            e.target.parentElement.parentElement.getAttribute("data-id");
          console.log(id);
          fetch("http://localhost:3000/messages/" + id, {
            method: "DELETE",
          });
        });
      });
    });
}
