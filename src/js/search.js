'use strict';

//EVENTOS
//Función ejecutada cuando el usuario hace click en el botón "buscar".
button.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("La URL completa es: " + urlApi + inputSearch.value);

    //Creo fetch para llamar al servidor para recoger datos
    fetch(urlApi + inputSearch.value)
    .then(function (response) {
        return response.json();
    })
    .then(function (object) {
        console.log("esto es lo que tiene object: ",object);
        console.log("esto es lo que tiene object.data: ", object.data);

        //Recojo la sección de los resultados 
        const results = document.querySelector(".js-results");
        //Inicializo el contenedor de resultados y añado el titulo
        results.innerHTML = `<h2>Resultados:</h2>`;
        object.data.forEach(function(data) {
            //Recojo información de cada uno de los títulos 
            console.log("data", data)
            let imageUrl = data.images.webp.image_url;
            const title = data.title;
            const id = data.mal_id;

            //Creo esta condicional para las series que no tienen imágenes.
            if (imageUrl === imageTv){
                imageUrl = placeHolder;
            }
            console.log("esta es la imagen de la pelicula: ", imageUrl);
            console.log("este es el titulo de la pelicula: ", title);
            
            //Añado la información de la película al HTML.
            results.innerHTML += `<div class="js-series-card series-card" id="${id}"><img src="${imageUrl}"/><h3>${title}</h3></div>`
        });
        
        //Recojo todos los elementos HTML que tengan la clase "js-series-card" y a cada uno de ellos les añado el evento "click".
        const favoriteSeries = document.querySelectorAll(".js-series-card");
        for (const favoriteSerie of favoriteSeries) {
            favoriteSerie.addEventListener("click", handleClickSeries);
        }
    });
});


