let params = new URLSearchParams(window.location.search);
let productId = params.get("productId");

fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTc4NWI3NDcwMTAwMTU4YjJhZTkiLCJpYXQiOjE3Mzc3MDk0NDUsImV4cCI6MTczODkxOTA0NX0.excpFazjYy4zdQMMvgIwZY9IRuyXdLldQIQisskRiCw",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((product) => {
    let h1 = document.querySelector("h1");
    h1.innerText = product.name;

    let container = document.querySelector(".details");
    let imgDetails = document.querySelector(".img");
    imgDetails.innerHTML = `<img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">`;

    let infoDetails = document.querySelector(".info");

    let description = document.createElement("p");
    description.innerText = "DESCRIZIONE: " + product.description;

    let price = document.createElement("p");
    price.innerText = "PREZZO: " + product.price + ",99 €";

    let brand = document.createElement("p");
    brand.innerText = "BRAND: " + product.brand;

    let modify = document.createElement("a");
    modify.classList.add("btn", "btn-primary", "py-3");
    modify.href = "backoffice.html?productId=" + product._id;
    modify.innerText = "Modifica";

    infoDetails.append(description, price, brand, modify);
    container.append(imgDetails, infoDetails);

    document.querySelector("title").innerText = product.name;
  })
  .catch((error) => {
    console.error("Errore: Impossibile caricare i prodotti.", error);
    showPopup("Errore", "Impossibile caricare i prodotti. Riprovare più tardi.");
    closePopup();
  });

let popup = document.querySelector(".popup");
let closeBtn = document.querySelector("#close");

function showPopup(textTitle, textMessage) {
  popup.classList.remove("d-none");
  let alertTitle = document.querySelector(".alert-title");
  let alertMessage = document.querySelector(".alert-message");

  alertTitle.innerText = textTitle;
  alertMessage.innerText = textMessage;
}

function closePopup() {
  closeBtn.classList.remove("d-none");
  closeBtn.addEventListener("click", () => {
    removePopup();
  });
}

function removePopup() {
  popup.classList.add("d-none");
  closeBtn.classList.add("d-none");
}
