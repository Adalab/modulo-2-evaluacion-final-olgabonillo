'use strict';

//Creo botón de reset en el formulario 
const handleClickReset = (event) => {
    favorites = [];
    localStorage.setItem("favorites", JSON.stringify(favorites));
    favorites.innerHTML = "";
    console.log("esto es un botón de reset");
}

//Creo evento del botón de reset
buttonReset.addEventListener("click", handleClickReset);