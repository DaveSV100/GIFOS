const favContainer = document.getElementById('favoritePage');
const favGifs = document.getElementById('favorite-gifs_imgs');
const gifContainer = document.querySelector('.favorite-gifs_empty');
const btnContainer = document.getElementById('favorite-gifs_btn');

function saveData() {
    // localStorage.removeItem('data');
    // If there are no gifs added to favorites
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
        });
            //If there are 12 or less gifs
            if(getFav.length <= 12) {
                for (var i = 0; i < getFav.length; i++) {
                    let counter = getFav.length * 7;
                    let bodyPlus = 90 + counter;
                    let bodyHeight = bodyPlus.toString();
                    let containerPlus = 40 + counter;
                    let containerHeight = containerPlus.toString();
                    console.log(getFav.length);
                    document.body.style.gridTemplateRows = `10vh ${bodyHeight}vh 20vh`;
                    favContainer.style.gridTemplateRows = `${containerHeight}vh 50vh`;
                }
            //If there are more than 12 gifs
            } else if (getFav.length >= 13) {
                //Set rows according to the 12 gifs already added
                document.body.style.gridTemplateRows = '10vh 174vh 20vh';
                favContainer.style.gridTemplateRows = '124vh 50vh';
                // let div = document.createElement('button');
                let btn = document.createElement('button');
                btn.setAttribute('id', 'moreGifs-btn');
                btn.setAttribute('class', 'see-more_btn');
                btn.setAttribute('type', 'submit');
                btn.setAttribute('name', 'More gifs');
                btn.textContent = 'Ver más';
                btnContainer.appendChild(btn);
                      //See more event listener
                      btn.addEventListener('click', () => {
                        btn.remove();
                        for (var i = 0; i < getFav.length; i++) {
                            let counter = getFav.length * 8;
                            let bodyPlus = 90 + counter;
                            let bodyHeight = bodyPlus.toString();
                            let containerPlus = 40 + counter;
                            let containerHeight = containerPlus.toString();
                            console.log(getFav.length);
                            document.body.style.gridTemplateRows = `10vh ${bodyHeight}vh 20vh`;
                            favContainer.style.gridTemplateRows = `${containerHeight}vh 50vh`;
                        }
                      })
                    
            }
        
    }
}
saveData();

