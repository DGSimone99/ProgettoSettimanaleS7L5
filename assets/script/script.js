fetch("https://striveschool-api.herokuapp.com/api/product/", {
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
  .then((products) => {
    console.log(products);

    products.forEach((product) => {
      let productList = document.querySelector(".productList");

      let card = document.createElement("div");
      card.classList.add("card", "col-lg-3", "col-md-4", "col-sm-6", "mb-4", "p-0");

      let img = document.createElement("img");
      img.classList.add("card-img-top");
      img.src = product.imageUrl;
      img.alt = product.name;

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      let name = document.createElement("h5");
      name.classList.add("card-title");
      name.innerText = product.name;

      let description = document.createElement("p");
      description.classList.add("card-text");
      description.innerText = product.description;

      let price = document.createElement("small");
      price.classList.add("card-text", "fs-3");
      price.innerText = product.price + ",99 €";

      let buttons = document.createElement("div");
      buttons.classList.add("d-flex", "justify-content-between", "mt-3", "buttons");

      let modify = document.createElement("a");
      modify.classList.add("btn", "btn-primary");
      modify.href = "backoffice.html?productId=" + product._id;
      modify.innerText = "Modifica";

      let details = document.createElement("a");
      details.classList.add("btn", "btn-link");
      details.href = "details.html?productId=" + product._id;
      details.innerText = "Dettagli";

      buttons.append(modify, details);
      cardBody.append(name, description, price, buttons);
      card.append(img, cardBody);
      productList.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Errore: Impossibile caricare i prodotti", error);
    showPopup("Errore", "Impossibile caricare i prodotti. Riprovare più tardi.");
    closePopup();
  })
  .finally(() => {
    document.querySelector(".spinner-border").classList.add("d-none");
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
