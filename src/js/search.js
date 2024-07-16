'use strict';

//VARIABLES GLOBALES
const inputSearch = document.querySelector(".js-tittle-search");
const button = document.querySelector(".js-button");
const urlApi = "https://api.jikan.moe/v4/anime?q="
const films = document.querySelector(".js-films");
const favoritas = []


//EVENTOS
//Función ejecutada cuando el usuario hace click en el botón
button.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("La URL completa es: " + urlApi + inputSearch.value);

    fetch(urlApi + inputSearch.value)
    .then(function (response) {
        //console.log("esto es lo que tiene el response.json: ",response.json());

        return response.json();
    })
    .then(function (object) {
        console.log("esto es lo que tiene object: ",object);
        console.log("esto es lo que tiene object.data: ", object.data);

        //Genero la sección films
        films.innerHTML = 
        `<div class="js-results"><h2>Resultados:</h2></div><div class="js-favorites-series"><h2>Series favoritas:</h2></div>`;
        //Genero una constante para las películas que no tienen imagen
        const imageTv = "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";
        const placeHolder = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        const favorites = document.querySelector(".js-favorites-series");
        const results = document.querySelector(".js-results");
        object.data.forEach(function(data) {
            //Recojo información de cada uno de los títulos 
            const imageUrl = data.images.webp.image_url;
            const title = data.title;
            const id = data.mal_id;
            if (imageUrl === imageTv){
                imageUrl = placeHolder;
            }
            console.log("esta es la imagen de la pelicula: ", imageUrl);
            console.log("este es el titulo de la pelicula: ", title);
            
            //Añado la información de la película al HTML
            results.innerHTML += `<div class="js-film-card" data-id="${id}"><img src="${imageUrl}"/><h3>${title}</h3></div>`
        });
        const favoriteSeries = document.querySelector(".js-film-card");
        //Función ejecutada cuando la usuaria hace click en la imagen de sus series favoritas
        const handleClickSeries = (event) => {
            event.preventDefault();
            console.log("esto es lo que contiene event: ", event );
            console.log("La película favorita de la usuaria es: ", event.currentTarget.getAttribute("data-id"));
            console.log("La película favorita de la usuaria es: ", event.target);
            // Añadir el currentTarget a la array de favoritos
            /* favoritas.push({
                'id': id,
                'title': title,
                'imageUrl': imageUrl
            }) */
           /* arraySeriesFavoritas = [
                {
                    'id': id,
                    'title': title,
                    'imageUrl': imageUrl
                }
            ]*/

        }
        favoriteSeries.addEventListener("click", handleClickSeries);
    });
});