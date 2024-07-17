"use strict";

//Creo condicional para que si existen los favoritos en localStorage, me los almacene en la array "favorites" de JS
//si no, inicializo "favorites" a vacío y creo en localStorage "favorites".
if (localStorage.getItem("favorites")) {
  favorites = JSON.parse(localStorage.getItem("favorites"));
} else {
  favorites = [];
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

//Creo función arrow para eliminar pulsando al botón X la serie de favoritos.
const handleClickRemove = (event) => {
  const id = event.currentTarget.getAttribute("id");
  const positionOfId = favorites.indexOf(id);
  delete(favorites[positionOfId]);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  showFavoritesSeries();
}

//Esta es la función que devuelve el código HTML de una tarjeta pasandole el ID, para mostrarla en favoritos.
function showBoxSeriesById(id, container) {
  console.log("url de la api para recoger una carta: ", urlApiAnime + id);
  //Creo fetch para llamar al servidor para recoger datos
  fetch(urlApiAnime + id)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("esto es el data dentro de showBoxSeriesById: ", data);
      const imageUrl = data.data.images.webp.image_url;
      const title = data.data.title;
      const id = data.data.mal_id;

      //Creo esta condicional para las series que no tienen imágenes.
      if (imageUrl === imageTv) {
        imageUrl = placeHolder;
      }

      container.innerHTML += `<div class="js-series-card-favorite series-card-favorites" id="${id}"><img src="${imageUrl}"/><h3>${title}</h3><button id="${id}" class="js-remove-button">X</button></div>`;
      //Creo el evento para cuando el usuario de click en el botón X, se elimine la serie de favoritos que quiera eliminar
      const removeButton = document.querySelector(".js-remove-button");
      removeButton.addEventListener("click", handleClickRemove);
    });
}

//Esta es la función que se ejecuta cuando hacen clic en una serie (para añadirla en favoritos)
const handleClickSeries = (event) => {
  event.preventDefault();
  containerFatherFavorites.classList.remove('hidden');
  const dataId = event.currentTarget.getAttribute("id");
  console.log("data id:", dataId);
  const favoriteCard = document.getElementById(dataId);
  favoriteCard.classList.add("favorite");
  console.log("esto es lo que contiene event: ", event);

  //Creo una condicional negativa para no duplicar las películas en la lista de favoritos.
  if (!favorites.includes(dataId)) {
    favorites.push(dataId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    showFavoritesSeries();
  }
  console.log("esto son los id de las series favorites: ", favorites);
};

//Función para que recoja los favoritos en el localStorage y los pinte en el HTML.
function showFavoritesSeries() {
  console.log("tamaño de favorites: ",favorites.length, favorites);
  if (favorites.length){
    console.log("Estoy dentro de favortes.length");
    containerFatherFavorites.classList.remove('hidden');
    //Recojo la sección de los resultados
    const favorites = document.querySelector(".js-favorites-series");
    //Inicializo el contenedor de favoritos y añado el titulo
    favorites.innerHTML = `<h2 class="favorites-series-title">Series favoritas:</h2>`;

    //Recojo la información del localStorage para mostras las series que se han elegido como favoritas
    const localStorageFavorites = JSON.parse(localStorage.getItem("favorites"));
    for (const favoritesId of localStorageFavorites) {
      showBoxSeriesById(favoritesId, favorites);
    }
  } else {
    containerFatherFavorites.classList.add('hidden');
  }
}

showFavoritesSeries();