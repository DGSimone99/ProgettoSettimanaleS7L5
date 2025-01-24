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
    let container = document.querySelector(".container");
    container.innerHTML = `
                    <div class="card col">
                            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text">${product.price}</p>
                                <a href="backoffice.html?productId=${product._id}" class="btn btn-primary">Modifica</a>
                                <a href="details.html?productId=${product._id}" class="btn">Dettagli</a>
                            </div>
                        </div>`;

    document.querySelector("title").innerText = product.name;
  });
