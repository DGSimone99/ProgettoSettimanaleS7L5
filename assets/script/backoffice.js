let params = new URLSearchParams(window.location.search);
let productId = params.get("productId");

let URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";

let form = document.querySelector("#productForm");
let productBtn = document.querySelector("#product-btn");
let productDelete = document.querySelector("#delete-btn");

let popup = document.querySelector(".popup");

window.addEventListener("DOMContentLoaded", () => {
  if (productId) {
    productBtn.innerText = "Modifica Prodotto";
    productDelete.classList.remove("d-none");

    productDelete.onclick = deletePopup;

    fetch(URL, {
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
        form.elements.name.value = product.name;
        form.elements.description.value = product.description;
        form.elements.brand.value = product.brand;
        form.elements.imageURL.value = product.imageUrl;
        form.elements.price.value = product.price;
      })
      .catch((error) => {
        console.error("Errore durante il caricamento del prodotto", error);
      });
  } else {
    productBtn.innerText = "Aggiungi Prodotto";
  }
});

form.onsubmit = function (event) {
  event.preventDefault();

  let newProduct = {
    name: form.elements.name.value,
    description: form.elements.description.value,
    brand: form.elements.brand.value,
    imageUrl: form.elements.imageURL.value,
    price: parseFloat(form.elements.price.value),
  };

  fetch(URL, {
    method: productId ? "PUT" : "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTc4NWI3NDcwMTAwMTU4YjJhZTkiLCJpYXQiOjE3Mzc3MDk0NDUsImV4cCI6MTczODkxOTA0NX0.excpFazjYy4zdQMMvgIwZY9IRuyXdLldQIQisskRiCw",
    },
  })
    .then((reponse) => {
      if (reponse.ok) {
        return reponse.json();
      } else {
        throw new Error("Errore nell'aggiunta del prodotto");
      }
    })
    .then((createdProduct) => {
      let alertTitle = document.querySelector(".alert-title");
      let alertMessage = document.querySelector(".alert-message");
      let close = document.querySelector("#close");

      alertTitle.innerText = "";
      popup.classList.remove("d-none");
      close.classList.remove("d-none");

      if (productId) {
        alertMessage.innerText =
          "Il prodotto " + createdProduct.name + " (" + createdProduct._id + ") " + "è stato modificato";
      } else {
        alertMessage.innerText =
          "Il prodotto " + createdProduct.name + " (" + createdProduct._id + ") " + "è stato aggiunto";
      }

      close.addEventListener("click", () => {
        popup.classList.add("d-none");
        close.classList.add("d-none");
      });
    })
    .catch((error) => {
      if (productId) {
        console.error("Errore nella modifica del prodotto", error);
      } else {
        console.error("Errore nell'aggiunta del prodotto", error);
      }
    });
};

function deletePopup() {
  popup.classList.remove("d-none");
  let confirmDelete = document.querySelector("#confirmDelete");
  confirmDelete.classList.remove("d-none");
  let cancelDelete = document.querySelector("#cancelDelete");
  cancelDelete.classList.remove("d-none");

  let close = document.querySelector("#close");
  let alertTitle = document.querySelector(".alert-title");
  let alertMessage = document.querySelector(".alert-message");

  alertTitle.innerText = "Attenzione!";
  alertMessage.innerText = "Sei sicuro di voler eliminare il prodotto?";

  confirmDelete.addEventListener("click", (event) => {
    event.preventDefault();
    fetch(URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTc4NWI3NDcwMTAwMTU4YjJhZTkiLCJpYXQiOjE3Mzc3MDk0NDUsImV4cCI6MTczODkxOTA0NX0.excpFazjYy4zdQMMvgIwZY9IRuyXdLldQIQisskRiCw",
      },
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((deletedProduct) => {
        alertTitle.innerText = "";
        alertMessage.innerText = deletedProduct.name + " (" + deletedProduct._id + ")" + " eliminato con successo.";
        close.classList.remove("d-none");
        confirmDelete.classList.add("d-none");
        cancelDelete.classList.add("d-none");

        close.addEventListener("click", () => {
          window.location.assign("./index.html");
        });
      })
      .catch((error) => {
        console.error("Errore durante la cancellazione del prodotto", error);
      });
  });

  cancelDelete.addEventListener("click", (event) => {
    event.preventDefault();

    popup.classList.add("d-none");
    close.classList.add("d-none");
    confirmDelete.classList.add("d-none");
    cancelDelete.classList.add("d-none");
  });
}
