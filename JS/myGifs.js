"use strict";
//My gifs (gifs that the user creats)
const favContainer = document.getElementById('favoritePage');
const favGifs = document.getElementById('favorite-gifs_imgs');
const gifContainer = document.querySelector('.favorite-gifs_empty');
const btnContainer = document.getElementById('favorite-gifs_btn');

const saveData = () => {
    const getFav = JSON.parse(localStorage.getItem('gifo'));
    console.log(getFav);
    if (localStorage.getItem('gifo') == null) {
        localStorage.removeItem('gifo');
        //Body grid
        document.body.style.gridTemplateRows = '10vh 90vh 20vh';
        //No favorite content icon
        let noFav = document.createElement('img');
        noFav.setAttribute('src', 'assets/icon-fav-sin-contenido.svg');
        noFav.setAttribute('class', 'favorite-gifs_icon');
        noFav.setAttribute('alt', 'Ícono de "no hay gifs"');
        favGifs.appendChild(noFav);
        //No favorite content paragraph
        let noGif = document.createElement('p');
        noGif.setAttribute('class', 'favorite-gifs_text');
        noGif.textContent = '¡Guarda tu primer GIF en Favoritos para que se muestre aquí!';
        favGifs.appendChild(noGif);
    }
    //If there are gifs added to favorites 
    else {
        let filter = getFav.slice(0, 12);
        gifContainer.classList.toggle('favorite-gifs_result');
        //Less than 12
        if (getFav.length <= 12) {
            getFav.forEach(element => {
                console.log(element.name)
                let fav = document.createElement('img');
                fav.setAttribute('src', element.src);
                fav.setAttribute('alt', element.name);
                console.log(fav);
                favGifs.appendChild(fav);
                fav.addEventListener("click", () => {gifCard(fav.src, fav.alt)});
            });
            for (var i = 0; i < getFav.length; i++) {
                let counter = getFav.length * 10;
                let bodyPlus = 100 + counter;
                let bodyHeight = bodyPlus.toString();
                let containerPlus = 50 + counter;
                let containerHeight = containerPlus.toString();
                console.log(getFav.length);
                document.body.style.gridTemplateRows = `10vh ${bodyHeight}vh 20vh`;
                favContainer.style.gridTemplateRows = `${containerHeight}vh 50vh`;
            }

        } else if (getFav.length > 12) {
            //More than 12
            filter.forEach(element => {
                let fav = document.createElement('img');
                fav.setAttribute('src', element.src);
                fav.setAttribute('alt', element.name);
                favGifs.appendChild(fav);
                fav.addEventListener("click", () => {gifCard(fav.src, fav.alt)});
            });
            for (var i = 0; i < filter.length; i++) {
                let counter = filter.length * 7;
                let bodyPlus = 130 + counter;
                let bodyHeight = bodyPlus.toString();
                let containerPlus = 80 + counter;
                let containerHeight = containerPlus.toString();
                console.log(getFav.length);
                document.body.style.gridTemplateRows = `10vh ${bodyHeight}vh 20vh`;
                favContainer.style.gridTemplateRows = `${containerHeight}vh 50vh`;
            }
            console.log(getFav.length);
            console.log(filter);
            let btn = document.createElement('button');
            btn.setAttribute('id', 'moreGifs-btn');
            btn.setAttribute('class', 'see-more_btn');
            btn.setAttribute('type', 'submit');
            btn.setAttribute('name', 'More gifs');
            btn.textContent = 'Ver más';
            btnContainer.appendChild(btn);
            btn.addEventListener('click', () => {
                btn.remove();
                console.log("***show more***")
                filter = getFav.slice(12, 25);
                filter.forEach(element => {
                    let fav = document.createElement('img');
                    fav.setAttribute('src', element.src);
                    fav.setAttribute('alt', element.name);
                    favGifs.appendChild(fav);
                    fav.addEventListener("click", () => {gifCard(fav.src, fav.alt, false)});
                });
                for (var i = 0; i < getFav.length; i++) {
                    let counter = getFav.length * 7;
                    let bodyPlus = 180 + counter;
                    let bodyHeight = bodyPlus.toString();
                    let containerPlus = 130 + counter;
                    let containerHeight = containerPlus.toString();
                    console.log(getFav.length);
                    document.body.style.gridTemplateRows = `10vh ${bodyHeight}vh 20vh`;
                    favContainer.style.gridTemplateRows = `${containerHeight}vh 50vh`;
                }
            });
        } else if (getFav.length > 25) {
            console.log("More than 25 gifs");
        }
    }
}
saveData();