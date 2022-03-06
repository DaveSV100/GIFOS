//AUTOCOMPLETE
const autocomplete_url = "https://api.giphy.com/v1/gifs/search/tags?";
const mainContent_search = document.querySelector('.mainContent-search');
const suggestions_container = document.querySelector('.search-container')
const inputBox = document.getElementById('search-box');

inputBox.addEventListener("input", () => {
    const value = inputBox.value;
    autocomplete(value);
});

const autocomplete = async (value) => {
    let autocomplete_fetch = `${autocomplete_url}&api_key=${apiKey}&limit=5&q=${value}`;
    console.log(autocomplete_fetch);
    const response = await fetch(autocomplete_fetch);
    const data = await response.json();
    
    try {
        if(data.data.length > 0) {
            displaySuggestions(data);
        } else {
            console.log("You gotta type something dude")
            //remove items
            clean();
        };
    } catch (error) {
        console.log(error);
    }
}

const displaySuggestions = (data) => {
    clean()
    console.log(data);
    const container = document.createElement("div");
    container.setAttribute("class", "autocomplete-container")
    suggestions_container.appendChild(container);
    for (let i = 0; i < data.data.length; i++) {
        const suggestion = document.createElement("a");
        suggestion.textContent = data.data[i].name;
        // suggestion.addEventListener("click", () => search());
        console.log(suggestion);
        container.appendChild(suggestion);
        suggestion.addEventListener("click", () => {searchSuggestion(data.data[i].name)})
    }
    
}

const clean = () => {
    const container = suggestions_container.lastChild;
    container.remove();
}

const searchSuggestion = async (value) => {
    console.log(value)
    let search = value;
    // console.log(search); 
    //request parameters: api_key and q (string)
    let search_fetch = `${searchUrl}&api_key=${apiKey}&q=${value}&limit=12&offset=0&rating=g`;
    console.log(search_fetch);
    const response = await fetch(search_fetch);
    const data = await response.json();
    console.log(data);
    return data;
}
// searchSuggestion(search).then(response => {
//     for (var i = 0; i < response.data.length; i++) {
//         document.body.style.gridTemplateRows = '10vh 280vh 20vh';
//         searchContainer.style.gridTemplateRows = '20vh 30vh 30vh 10vh 110vh 10vh';
//         //Gifs container
//         let foundGif = document.createElement('img');
//         foundGif.setAttribute('src', response.data[i].images.original.url);
//         foundGif.setAttribute('alt', response.data[i].title);
//         gifs.appendChild(foundGif);
//         foundGif.addEventListener('click', () => {
//                     //GIF CARD
//         //The styles for the Gif Card are set on the master.scss file.
//         //To go to the top and stop scroll
//         window.scrollTo(0, 0);
//         body.style.overflow = 'hidden';
//         //Gif card background. 
//         let background = document.createElement('div');
//         background.setAttribute('class', 'gifCard');
//         body.appendChild(background);
//         //Gif container
//         let gifContainer = document.createElement('div');
//         gifContainer.setAttribute('class', 'gifCard-container');
//         background.appendChild(gifContainer);
//         //Close icon
//         let x = document.createElement('button');
//         x.setAttribute('class', 'x-icon');
//         x.setAttribute('type', 'submit');
//         let xIcon = document.createElement('img');
//         xIcon.setAttribute('src', 'assets/close.svg');
//         xIcon.setAttribute('alt', 'Close card');
//         x.appendChild(xIcon);
//         gifContainer.appendChild(x);
//         x.addEventListener('click', () => {
//             background.remove();
//             gifContainer.remove();
//             body.style.overflow = 'scroll';
//         })
//         //Gif image
//         let gifContainer_img = document.createElement('img');
//         gifContainer_img.setAttribute('src', foundGif.src)
//         gifContainer_img.setAttribute('class', 'card-image');
//         gifContainer.appendChild(gifContainer_img);
//         //Favorite icon
//         let favIcon = document.createElement('button');
//         favIcon.setAttribute('class', 'favorite-icon');
//         let favImage = document.createElement('img');
//         favImage.setAttribute('src', 'assets/icon-fav-active.svg');
//         favIcon.appendChild(favImage);
//         gifContainer.appendChild(favIcon);
//         //Local Storage
//         favIcon.addEventListener('click', () => {
//             localStorage.setItem('gifImg', foundGif.src);
//             localStorage.setItem('gifTitle', foundGif.alt);
//             let favGif_url = localStorage.getItem('gifImg');
//             let favGif_title = localStorage.getItem('gifTitle');
//             console.log(favGif_url);
//             console.log(favGif_title);
//         });
//         //Donwload icon 
//         let downloadIcon = document.createElement('button');
//         downloadIcon.setAttribute('class', 'donwload-icon');
//         let downloadImage = document.createElement('img');
//         downloadImage.setAttribute('src', 'assets/icon-download.svg');
//         downloadIcon.appendChild(downloadImage);
//         gifContainer.appendChild(downloadIcon);
//         //Title
//         let title = document.createElement('p');
//         title.setAttribute('class', 'gif-title');
//         let titleContent = foundGif.alt;
//         title.textContent = titleContent;
//         gifContainer.appendChild(title);
//         })   
//     }
//     //Change icon from 'search'(icon == s) to 'close'(icon == c) to reload page and search something else
//     if (word.value.length == 0) {
//        //It won't fetch any gif because the input is empty and will not change the icon
//     } else {
//         let icon = 's';
//         if (icon =='s') {
//          searchIcon.src='assets/close.svg';
//          icon='c';
//          //Reload page
//          searchButton.addEventListener('click', () => {
//             location.reload();
//          })
//         } else {
//             searchIcon.src='assets/icon-search.svg';
//             icon='s';
//         }
//     }
//     //Gif result title
//     let gifTitle = document.createElement('p');
//     let titleName = word.value;
//     gifTitle.textContent = titleName;
//     title.appendChild(gifTitle);
//     //Button to see more gifs
//     if (word.value.length == 0) {
//         //It won't fetch any gif because the input is empty and therefore the button will not be shown
//     } else {
//         let btn = document.createElement('button');
//         btn.setAttribute('id', 'moreGifs-btn');
//         btn.setAttribute('class', 'see-more_btn');
//         btn.setAttribute('type', 'submit');
//         btn.setAttribute('name', 'More gifs');
//         btn.textContent = 'Ver más';
//         gifsBtn.appendChild(btn);
//                 //See more event listener
//         btn.addEventListener('click', () => {
//             async function searchGif() {
//                 let search = word.value;
//                 console.log(search); 
//                 //request parameters: api_key and q (string)
//                 let search_fetch = `${searchUrl}&api_key=${apiKey}&q=${search}&limit=12&offset=12`;
//                 console.log(search_fetch);
//                 const response = await fetch(search_fetch);
//                 const data = await response.json();
//                 console.log(data);
//                 return data;
//             }
//             searchGif().then(response => {
//                 for (var i = 0; i < response.data.length; i++) {
//                     document.body.style.gridTemplateRows = '10vh 340vh 20vh';
//                     searchContainer.style.gridTemplateRows = '20vh 20vh 20vh 10vh 210vh 0vh';
//                     //Gifs container
//                     let foundGif = document.createElement('img');
//                     foundGif.setAttribute('src', response.data[i].images.original.url);
//                     foundGif.setAttribute('alt', response.data[i].title);
//                     gifs.appendChild(foundGif);
//                     foundGif.addEventListener('click', () => {
//                                 //GIF CARD
//                     //The styles for the Gif Card are set on the master.scss file.
//                     //To go to the top and stop scroll
//                     window.scrollTo(0, 0);
//                     body.style.overflow = 'hidden';
//                     //Gif card background. 
//                     let background = document.createElement('div');
//                     background.setAttribute('class', 'gifCard');
//                     body.appendChild(background);
//                     //Gif container
//                     let gifContainer = document.createElement('div');
//                     gifContainer.setAttribute('class', 'gifCard-container');
//                     background.appendChild(gifContainer);
//                     //Close icon
//                     let x = document.createElement('button');
//                     x.setAttribute('class', 'x-icon');
//                     x.setAttribute('type', 'submit');
//                     let xIcon = document.createElement('img');
//                     xIcon.setAttribute('src', 'assets/close.svg');
//                     xIcon.setAttribute('alt', 'Close card');
//                     x.appendChild(xIcon);
//                     gifContainer.appendChild(x);
//                     x.addEventListener('click', () => {
//                         background.remove();
//                         gifContainer.remove();
//                         body.style.overflow = 'scroll';
//                     })
//                     //Gif image
//                     let gifContainer_img = document.createElement('img');
//                     gifContainer_img.setAttribute('src', foundGif.src)
//                     gifContainer_img.setAttribute('class', 'card-image');
//                     gifContainer.appendChild(gifContainer_img);
//                     //Favorite icon
//                     let favIcon = document.createElement('button');
//                     favIcon.setAttribute('class', 'favorite-icon');
//                     let favImage = document.createElement('img');
//                     favImage.setAttribute('src', 'assets/icon-fav-active.svg');
//                     favIcon.appendChild(favImage);
//                     gifContainer.appendChild(favIcon);
//                     //Local Storage
//                     favIcon.addEventListener('click', () => {
//                         localStorage.setItem('gifImg', foundGif.src);
//                         localStorage.setItem('gifTitle', foundGif.alt);
//                         let favGif_url = localStorage.getItem('gifImg');
//                         let favGif_title = localStorage.getItem('gifTitle');
//                         console.log(favGif_url);
//                         console.log(favGif_title);
//                     });
//                     //Donwload icon 
//                     let downloadIcon = document.createElement('button');
//                     downloadIcon.setAttribute('class', 'donwload-icon');
//                     let downloadImage = document.createElement('img');
//                     downloadImage.setAttribute('src', 'assets/icon-download.svg');
//                     downloadIcon.appendChild(downloadImage);
//                     gifContainer.appendChild(downloadIcon);
//                     //Title
//                     let title = document.createElement('p');
//                     title.setAttribute('class', 'gif-title');
//                     let titleContent = foundGif.alt;
//                     title.textContent = titleContent;
//                     gifContainer.appendChild(title);
//                     })   
//                         }
//                         //Remove button
//                         gifsBtn.remove();
//                     }).catch(err => {
//                         console.error('something went wrong :/', err);
//                     })
//         });
//     }
// }).catch(err => {
//     console.error('something went wrong :/', err);
// })




// const search = async () => {
//     console.log("search for: ")
// }

// //AUTOCOMPLETE
// const autocomplete_url = "https://api.giphy.com/v1/gifs/search/tags?";
// const mainContent_search = document.querySelector('.mainContent-search');
// const suggestions_container = document.querySelector('.search-container')
// const inputBox = document.getElementById('search-box');
// let result = [];
// for(let i = 0; i <= 4; i++) {
//     let p = document.createElement('p');
//     p.setAttribute('class', 'auto');
//     result.push(p);
// }
// inputBox.addEventListener('input', () => {
//     async function autocomplete() {
//         let boxValue = inputBox.value;
//         console.log(boxValue);
//         let autocomplete_fetch = `${autocomplete_url}&api_key=${apiKey}&limit=5&q=${boxValue}`;
//         console.log(autocomplete_fetch);
//         const response = await fetch(autocomplete_fetch);
//         const data = await response.json();
//         console.log(data);
//         return data;
//     }
//     autocomplete().then(response => {
//         // const container = document.getElementById('autocomplete-container');
//         if (document.body.contains(document.getElementById('autocomplete-container')) === false) {
//             const autocompleteContainer = document.createElement('div');
//                 autocompleteContainer.setAttribute('id', 'autocomplete-container');
//                 mainContent_search.appendChild(autocompleteContainer);
//         }
//         if (response.data.length <= 0) {
//             console.log('Theres no data man');
//                 const box = document.getElementById('autocomplete-container');
//                 box.remove();
//             // }
//             response = false;
//         } 
//         else {
//             const container = document.getElementById('autocomplete-container');
//             for(let i = 0; i <= result.length -1; i++) {
//                 result[i].textContent = response.data[i].name;
//                 container.appendChild(result[i]);
//                 const word = result[i].textContent;
//                 result[i].addEventListener("click", () => {hey(word)})
//             }
//         } 
//         function hey (word) {
//             console.log("heeey", word);
            
//         }
//     })
//     .catch(err => {
//         console.error('something went wrong :/', err);
//     })
// });


