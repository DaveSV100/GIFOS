const favGifs = document.getElementById('favorite-gifs_imgs');

function favorite() {

    let getFavorite = localStorage.getItem('gifImg');

    console.log(localStorage);
    
    let fav = document.createElement('img');
    fav.setAttribute('src', getFavorite);
    favGifs.appendChild(fav);
}
favorite();

