document.addEventListener("DOMContentLoaded", () => {

  let nombre = "Películas";
  let categoria = "Acción";
  let numero = 2026;
  let activo = true;
  let nulo = null;
  let indefinido;

  console.log(nombre, categoria, numero, activo, nulo, indefinido);
  alert("Bienvenido al sistema de " + nombre);

  document.getElementById("cambiarTexto").addEventListener("click", () => {
    let titulo = document.getElementById("titulo");
    titulo.textContent = "Películas Populares";

    let nuevo = document.createElement("p");
    nuevo.textContent = "2026";
    titulo.appendChild(nuevo);
  });

  fetch("https://api.tvmaze.com/shows")
    .then(res => res.json())
    .then(data => {

      let contenedor = document.getElementById("cards");
      let tabla = document.querySelector("#tablaPeliculas tbody");

      data.slice(0, 10).forEach(peli => {

        let imagen = peli.image ? peli.image.medium : '';

        contenedor.innerHTML += `
          <div class="col-md-6 col-lg-4">
            <div class="card mb-3">
              <img src="${imagen}" class="card-img-top">
              <div class="card-body">
                <h5>${peli.name}</h5>
                <p>${peli.genres.join(", ")}</p>
               <a href="https://revista24cuadros.com/category/cine/resenas-de-peliculas/" target="_blank" class="btn btn-success">Ver más</a>
              </div>
            </div>
          </div>
        `;

        tabla.innerHTML += `
          <tr>
            <td>${peli.name}</td>
            <td>${peli.type}</td>
            <td>${peli.language}</td>
            <td>${peli.genres[1] || "N/A"}</td>
            <td>${peli.rating.average || "N/A"}</td>
            <td>${peli.network.country.name || "N/A"}</td>
            <td>${peli.runtime }</td>
            <td>${peli.summary }</td>
          </tr>
        `;
      });

      $('#tablaPeliculas').DataTable({
        pageLength: 5,
        destroy: true
      });

    })
    .catch(error => {
      console.error("Error:", error);
    });

});