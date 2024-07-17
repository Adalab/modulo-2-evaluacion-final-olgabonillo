"use strict";

//VARIABLES GLOBALES
const inputSearch = document.querySelector(".js-tittle-search");
const button = document.querySelector(".js-button");
const urlApi = "https://api.jikan.moe/v4/anime?q=";
const urlApiAnime = "https://api.jikan.moe/v4/anime/";
const films = document.querySelector(".js-series");
const buttonReset = document.querySelector(".js-button-reset");
const containerFatherFavorites = document.querySelector(".js-container-father-favorites")

/* Constantes y variables globales usadas en search.js */
//Genero dos constantes para las películas que no tienen imagen
const imageTv =
  "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";
const placeHolder =
  "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";

/* Constantes y variables globales usadas en favorites.js */
//Creo una condicional para que me muestre los favoritos
let favorites;
