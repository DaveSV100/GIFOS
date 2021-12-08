const favGifs = document.getElementById('favorite-gifs_imgs');

function saveData() {
    // localStorage.removeItem('data');
    //Create ForEach
    if (localStorage.getItem('data') == null) {
        localStorage.removeItem('data');
        let noFav = document.createElement('img');
        noFav.setAttribute('src', 'assets/icon-fav-sin-contenido.svg')
        favGifs.appendChild(noFav);
    } else {
        let getFav = JSON.parse(localStorage.getItem('data'));
        getFav.forEach(element => {
            let fav = document.createElement('img');
            fav.setAttribute('src', element);
            favGifs.appendChild(fav);
        });
    }
    
    // for(var i = 0; i < localStorage.length; i++) {
    //     let getFav = localStorage.getItem('data');
    //     let fav = document.createElement('img');
    //     fav.setAttribute('src', JSON.parse(getFav));
    //     favGifs.appendChild(fav);
    //     // localStorage.removeItem('data');
    //     console.log(getFav);
    // }
}
saveData();

// function favorite() {

//     let getFavorite = localStorage.getItem('gifImg');

//     console.log(localStorage);
    
//     let fav = document.createElement('img');
//     fav.setAttribute('src', getFavorite);
//     favGifs.appendChild(fav);
//     localStorage.removeItem('gifImg');
// }
// favorite();

