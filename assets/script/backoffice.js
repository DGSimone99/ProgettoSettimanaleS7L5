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
      if (!productId) {
        alert("Il prodotto " + createdProduct.name + "(" + createdProduct._id + ")" + " è stato aggiunto.");
        form.reset();
      } else {
        alert("Il prodotto " + createdProduct.name + "(" + createdProduct._id + ")" + " è stato modificato.");
      }
    });
};

function deletePopup() {
  popup.classList.remove("d-none");
  let confirmDelete = document.querySelector("#confirmDelete");
  let cancelDelete = document.querySelector("#cancelDelete");

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
        alert(deletedProduct.name + " eliminato con successo.");
        window.location.assign("./index.html");
      });
  });

  cancelDelete.addEventListener("click", (event) => {
    event.preventDefault();
    popup.classList.add("d-none");
  });
}
