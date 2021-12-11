const favContainer = document.getElementById('favoritePage');
const favGifs = document.getElementById('favorite-gifs_imgs');
const gifContainer = document.querySelector('.favorite-gifs_empty');

function saveData() {
    // localStorage.removeItem('data');
    //If there are no gifs added to favorites
    if (localStorage.getItem('data') == null) {
        localStorage.removeItem('data');
        //Body grid
        document.body.style.gridTemplateRows = '10vh 90vh 20vh';
        //No favorite content icon
        let noFav = document.createElement('img');
        noFav.setAttribute('src', 'assets/icon-fav-sin-contenido.svg')
        noFav.setAttribute('class', 'favorite-gifs_icon');
        favGifs.appendChild(noFav);
        //No favorite content paragraph
        let noGif = document.createElement('p');
        noGif.setAttribute('class', 'favorite-gifs_text');
        noGif.textContent = '¡Guarda tu primer GIF en Favoritos para que se muestre aquí!';
        favGifs.appendChild(noGif);
    }
    //If there are gifs added to favorites 
    else {
        let getFav = JSON.parse(localStorage.getItem('data'));
        gifContainer.classList.toggle('favorite-gifs_result');
        getFav.forEach(element => {
            let fav = document.createElement('img');
            fav.setAttribute('src', element);
            favGifs.appendChild(fav);
            // console.log(element);
            // let counter = element.length * 10;
            // let plus = 90 + counter;
            // let height = plus.toString();
            // console.log(localStorage.length);
            // console.log(height);
            // document.body.style.gridTemplateRows = `'10vh ${height} 20vh'`;
            // favContainer.style.gridTemplateRows = `'${height} 50vh'`;
        });
        for (var i = 0; i < getFav.length; i++) {
            let counter = getFav.length * 10;
            let bodyPlus = 90 + counter;
            let bodyHeight = bodyPlus.toString();
            let containerPlus = 40 + counter;
            let containerHeight = containerPlus.toString();
            console.log(getFav.length);
            // console.log(plus);
            // console.log(height);
            document.body.style.gridTemplateRows = `10vh ${bodyHeight}vh 20vh`;
            favContainer.style.gridTemplateRows = `${containerHeight}vh 50vh`;
            // document.body.style.gridTemplateRows = '10vh 150vh 20vh';
            // favContainer.style.gridTemplateRows = '70vh 50vh';
        }
    }
}
saveData();

