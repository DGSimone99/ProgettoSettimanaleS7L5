let params = new URLSearchParams(window.location.search);
let productId = params.get("productId");

let URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";

let form = document.querySelector("#productForm");
let productBtn = document.querySelector("#product-btn");
let productDelete = document.querySelector("#delete-btn");

let popup = document.querySelector(".popup");
let closeBtn = document.querySelector("#close");

let alertTitle = document.querySelector(".alert-title");
let alertMessage = document.querySelector(".alert-message");

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
        console.error("Errore: Impossibile caricare i prodotti", error);
        showPopup("Errore", "Impossibile caricare i prodotti. Riprovare più tardi.");
        closePopup();
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
      showPopup("", "");

      if (productId) {
        alertMessage.innerText =
          "Il prodotto " + createdProduct.name + " (" + createdProduct._id + ") " + "è stato modificato";
      } else {
        alertMessage.innerText =
          "Il prodotto " + createdProduct.name + " (" + createdProduct._id + ") " + "è stato aggiunto";
      }

      closePopup();
    })
    .catch((error) => {
      if (productId) {
        console.error("Errore nella modifica del prodotto", error);
        showPopup("Errore", "Impossibile caricare i prodotti. Riprovare più tardi.");
        closePopup();
      } else {
        console.error("Errore nell'aggiunta del prodotto", error);
        showPopup("Errore", "Impossibile caricare i prodotti. Riprovare più tardi.");
        closePopup();
      }
    });
};

let resetBtn = document.querySelector(".reset");

resetBtn.addEventListener("click", () => {
  resetButton();
});

//FUNCTIONS
function showPopup(textTitle, textMessage, x = 0) {
  popup.classList.remove("d-none");
  let alertTitle = document.querySelector(".alert-title");
  let alertMessage = document.querySelector(".alert-message");

  alertTitle.innerText = textTitle;
  alertMessage.innerText = textMessage;

  if (x === 1) {
    let confirmDelete = document.querySelector("#confirmDelete");
    confirmDelete.classList.remove("d-none");

    let cancelDelete = document.querySelector("#cancelDelete");
    cancelDelete.classList.remove("d-none");
  }
}

function deletePopup() {
  showPopup("Attenzione!", "Sei sicuro di voler cancellare il prodotto?", 1);
  let alertTitle = document.querySelector(".alert-title");
  let alertMessage = document.querySelector(".alert-message");

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
        cancelDelete.classList.add("d-none");
        confirmDelete.classList.add("d-none");
        alertTitle.innerText = "";
        alertMessage.innerText = deletedProduct.name + " (" + deletedProduct._id + ")" + " eliminato con successo.";

        closeBtn.classList.remove("d-none");

        closeBtn.addEventListener("click", () => {
          window.location.assign("./index.html");
        });
      })
      .catch((error) => {
        console.error("Errore: Impossibile caricare i prodotti", error);
        showPopup("Errore", "Impossibile caricare i prodotti. Riprovare più tardi.");
        closePopup();
      });
  });

  cancelDelete.addEventListener("click", (event) => {
    event.preventDefault();

    removePopup();
  });
}

function resetButton() {
  showPopup("Attenzione!", "Sei sicuro di voler resettare il form?", 1);

  confirmDelete.addEventListener("click", (event) => {
    event.preventDefault();
    form.reset();
    removePopup();
  });

  cancelDelete.addEventListener("click", (event) => {
    event.preventDefault();
    removePopup();
  });
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
  confirmDelete.classList.add("d-none");
  cancelDelete.classList.add("d-none");
}

/* Ho tentato di raggruppare in funzioni per snellire il codice MA non potevo
provarlo efficacemente per via del fatto che il server api ha smesso di funzionare, 
nel caso va bene pure il commit del reset button o quello delle 5 
(piccoli cambi di style e la richiesta di conferma sul reset sono state le uniche modifiche da allora) */
