const favContainer = document.getElementById('favoritePage');
const favGifs = document.getElementById('favorite-gifs_imgs');
const gifContainer = document.querySelector('.favorite-gifs_empty');
const btnContainer = document.getElementById('favorite-gifs_btn');
// const favorite = (src, name) => {
//     // let favorites = [];
//     let gifObj = {
//         src: src,
//         name: name,
//     };
//     //
//     // let src = source;
//     if(localStorage.getItem('data') == null) {
//         localStorage.setItem('data', '[]');
//     }
//     let favData = JSON.parse(localStorage.getItem('data'));
//     favData.push(gifObj);
//     localStorage.setItem('data', JSON.stringify(favData));
//     //
//     // favorites.push(gifObj);
//     // localStorage.setItem("data", JSON.stringify(favorites));
//     saveData();
// }

const saveData = () => {
    // const getFav = {}
    // Object.keys(localStorage).forEach(element => {
    //     element.startsWith("data") ? (getFav[element] = localStorage.getItem(element)) : null;
    //     return getFav;
    // });
    // JSON.parse(localStorage.getItem('data'));
    // const getFav = JSON.parse(localStorage.getItem('data'));
    // console.log(getFav);
    // localStorage.removeItem('data');
    // If there are no gifs added to favorites
    const getFav = JSON.parse(localStorage.getItem('data'));
    console.log(getFav);
    if (localStorage.getItem('data') == null) {
        localStorage.removeItem('data');
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

        if (getFav.length <= 12) {
            console.log("--------There are less than 12 ---------")
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
                let bodyPlus = 90 + counter;
                let bodyHeight = bodyPlus.toString();
                let containerPlus = 40 + counter;
                let containerHeight = containerPlus.toString();
                console.log(getFav.length);
                document.body.style.gridTemplateRows = `10vh ${bodyHeight}vh 20vh`;
                favContainer.style.gridTemplateRows = `${containerHeight}vh 50vh`;
            }

        } 
        else if (getFav.length > 12) {
            console.log("--------There are more than 12 ---------")
            filter.forEach(element => {
                let fav = document.createElement('img');
                fav.setAttribute('src', element.src);
                fav.setAttribute('alt', element.name);
                favGifs.appendChild(fav);
                fav.addEventListener("click", () => {gifCard(fav.src, fav.alt)});
            });
            for (var i = 0; i < filter.length; i++) {
                let counter = filter.length * 7;
                let bodyPlus = 120 + counter;
                let bodyHeight = bodyPlus.toString();
                let containerPlus = 70 + counter;
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
                    fav.addEventListener("click", () => {gifCard(fav.src, fav.alt)});
                });
                for (var i = 0; i < getFav.length; i++) {
                    let counter = getFav.length * 7;
                    let bodyPlus = 170 + counter;
                    let bodyHeight = bodyPlus.toString();
                    let containerPlus = 120 + counter;
                    let containerHeight = containerPlus.toString();
                    console.log(getFav.length);
                    document.body.style.gridTemplateRows = `10vh ${bodyHeight}vh 20vh`;
                    favContainer.style.gridTemplateRows = `${containerHeight}vh 50vh`;
                }
            });
        } 
        else if (getFav.length > 25) {
            console.log("More than 25 gifs");
        }
    }
}
saveData();








































// const favContainer = document.getElementById('favoritePage');
// const favGifs = document.getElementById('favorite-gifs_imgs');
// const gifContainer = document.querySelector('.favorite-gifs_empty');
// const btnContainer = document.getElementById('favorite-gifs_btn');

// function saveData() {
//     // const getFav = {}
//     // Object.keys(localStorage).forEach(element => {
//     //     element.startsWith("data") ? (getFav[element] = localStorage.getItem(element)) : null;
//     //     return getFav;
//     // });
//     // JSON.parse(localStorage.getItem('data'));
//     const getFav = JSON.parse(localStorage.getItem('data'));

//     // localStorage.removeItem('data');
//     // If there are no gifs added to favorites
//     if (localStorage.getItem('data') == null) {
//         localStorage.removeItem('data');
//         //Body grid
//         document.body.style.gridTemplateRows = '10vh 90vh 20vh';
//         //No favorite content icon
//         let noFav = document.createElement('img');
//         noFav.setAttribute('src', 'assets/icon-fav-sin-contenido.svg')
//         noFav.setAttribute('class', 'favorite-gifs_icon');
//         favGifs.appendChild(noFav);
//         //No favorite content paragraph
//         let noGif = document.createElement('p');
//         noGif.setAttribute('class', 'favorite-gifs_text');
//         noGif.textContent = '¡Guarda tu primer GIF en Favoritos para que se muestre aquí!';
//         favGifs.appendChild(noGif);
//     }
//     //If there are gifs added to favorites 
//     else {
//         let filter = getFav.slice(0, 12);
//         gifContainer.classList.toggle('favorite-gifs_result');

//         if (getFav.length <= 12) {
//             console.log("--------There are less than 12 ---------")
//             getFav.forEach(element => {
//                 let fav = document.createElement('img');
//                 fav.setAttribute('src', element);
//                 favGifs.appendChild(fav);
//             });
//             for (var i = 0; i < getFav.length; i++) {
//                 let counter = getFav.length * 10;
//                 let bodyPlus = 90 + counter;
//                 let bodyHeight = bodyPlus.toString();
//                 let containerPlus = 40 + counter;
//                 let containerHeight = containerPlus.toString();
//                 console.log(getFav.length);
//                 document.body.style.gridTemplateRows = `10vh ${bodyHeight}vh 20vh`;
//                 favContainer.style.gridTemplateRows = `${containerHeight}vh 50vh`;
//             }

//         } 
//         else if (getFav.length > 12) {
//             console.log("--------There are more than 12 ---------")
//             // Set rows according to the 12 gifs already added
//             getFav.forEach(element => {
//                 let fav = document.createElement('img');
//                 fav.setAttribute('src', element);
//                 favGifs.appendChild(fav);
//             });
//             for (var i = 0; i < getFav.length; i++) {
//                 let counter = getFav.length * 10;
//                 let height = counter.toString();
//                 let bodyPlus = 90 + counter;
//                 let bodyHeight = bodyPlus.toString();
//                 let containerPlus = 40 + counter;
//                 let containerHeight = containerPlus.toString();
//                 console.log(getFav.length);
//                 document.body.style.gridTemplateRows = `10vh ${bodyHeight}vh 20vh`;
//                 favContainer.style.gridTemplateRows = `${containerHeight}vh 50vh`;
//             }
//         } 
//         else if (getFav.length > 12) {
            
//             filter.forEach(element => {
//                 let fav = document.createElement('img');
//                 fav.setAttribute('src', element);
//                 favGifs.appendChild(fav);
//             });
//             for (var i = 0; i < filter.length; i++) {
//                 let counter = filter.length * 7;
//                 let bodyPlus = 90 + counter;
//                 let bodyHeight = bodyPlus.toString();
//                 let containerPlus = 40 + counter;
//                 let containerHeight = containerPlus.toString();
//                 console.log(getFav.length);
//                 document.body.style.gridTemplateRows = `10vh ${bodyHeight}vh 20vh`;
//                 favContainer.style.gridTemplateRows = `${containerHeight}vh 50vh`;
//             }
//             console.log(getFav.length);
//             console.log(filter);
//             let btn = document.createElement('button');
//             btn.setAttribute('id', 'moreGifs-btn');
//             btn.setAttribute('class', 'see-more_btn');
//             btn.setAttribute('type', 'submit');
//             btn.setAttribute('name', 'More gifs');
//             btn.textContent = 'Ver más';
//             btnContainer.appendChild(btn);
//             btn.addEventListener('click', () => {
//                 btn.remove();
//                 filter = getFav.slice(13, 25);
//                 filter.forEach(element => {
//                     let fav = document.createElement('img');
//                     fav.setAttribute('src', element);
//                     favGifs.appendChild(fav);
//                 });
//                 for (var i = 0; i < getFav.length; i++) {
//                     let counter = getFav.length * 7;
//                     let bodyPlus = 90 + counter;
//                     let bodyHeight = bodyPlus.toString();
//                     let containerPlus = 40 + counter;
//                     let containerHeight = containerPlus.toString();
//                     console.log(getFav.length);
//                     document.body.style.gridTemplateRows = `10vh ${bodyHeight}vh 20vh`;
//                     favContainer.style.gridTemplateRows = `${containerHeight}vh 50vh`;
//                 }
//             })
//         }
//     }
// }
// saveData();