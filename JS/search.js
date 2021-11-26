                    //SEARCH
const apiKey = "efARnSmXUsXz3XqFvbyykWkVyNi3IIuQ";
const searchUrl = "https://api.giphy.com/v1/gifs/search?";
let searchIcon = document.getElementById('search-icon');
let searchContainer = document.getElementById('search');
let title = document.getElementById('result-title')
let searchedTitle = document.getElementsByClassName('mainContent-result');
let gifs = document.getElementById('result-gifs');
let gifsBtn = document.getElementById('result-button');
let searchedGifs = document.getElementsByClassName('mainContent-gifs');
let searchButton = document.getElementById('searchBtn');
let word = document.getElementById('search-box');
searchButton.addEventListener('click', () => {
    async function searchGif() {
        let search = word.value;
        console.log(search); 
        //request parameters: api_key and q (string)
        let search_fetch = `${searchUrl}&api_key=${apiKey}&q=${search}&limit=12&offset=0`;
        console.log(search_fetch);
        const response = await fetch(search_fetch);
        const data = await response.json();
        console.log(data);
        return data;
    }
    searchGif().then(response => {
        for (var i = 0; i < response.data.length; i++) {
            document.body.style.gridTemplateRows = '10vh 240vh 20vh';
            searchContainer.style.gridTemplateRows = '20vh 20vh 20vh 10vh 110vh 10vh';
            //Gifs container
            let foundGif = document.createElement('img');
            foundGif.setAttribute('src', response.data[i].images.original.url);
            foundGif.setAttribute('alt', response.data[i].title);
            gifs.appendChild(foundGif);
            foundGif.addEventListener('click', () => {
                        //GIF CARD
            //The styles for the Gif Card are set on the master.scss file.
            //To go to the top and stop scroll
            window.scrollTo(0, 0);
            body.style.overflow = 'hidden';
            //Gif card background. 
            let background = document.createElement('div');
            background.setAttribute('class', 'gifCard');
            body.appendChild(background);
            //Gif container
            let gifContainer = document.createElement('div');
            gifContainer.setAttribute('class', 'gifCard-container');
            background.appendChild(gifContainer);
            //Close icon
            let x = document.createElement('button');
            x.setAttribute('class', 'x-icon');
            x.setAttribute('type', 'submit');
            let xIcon = document.createElement('img');
            xIcon.setAttribute('src', 'assets/close.svg');
            xIcon.setAttribute('alt', 'Close card');
            x.appendChild(xIcon);
            gifContainer.appendChild(x);
            x.addEventListener('click', () => {
            location.reload();
            })
            //Gif image
            foundGif.setAttribute('class', 'card-image');
            gifContainer.appendChild(foundGif);
            //Favorite icon
            let favIcon = document.createElement('a');
            favIcon.setAttribute('class', 'favorite-icon');
            let favImage = document.createElement('img');
            favImage.setAttribute('src', 'assets/icon-fav-active.svg');
            favIcon.appendChild(favImage);
            gifContainer.appendChild(favIcon);
            //Donwload icon 
            let downloadIcon = document.createElement('a');
            downloadIcon.setAttribute('class', 'donwload-icon');
            let downloadImage = document.createElement('img');
            downloadImage.setAttribute('src', 'assets/icon-download.svg');
            downloadIcon.appendChild(downloadImage);
            gifContainer.appendChild(downloadIcon);
            //Title
            let title = document.createElement('p');
            title.setAttribute('class', 'gif-title');
            let titleContent = foundGif.alt;
            title.textContent = titleContent;
            gifContainer.appendChild(title);
            })   
        }
        //Change icon from 'search'(icon == s) to 'close'(icon == c) to reload page and search something else
        if (word.value.length == 0) {
           //It won't fetch any gif because the input is empty and won't change the icon
        } else {
            let icon = 's';
            if (icon =='s') {
             searchIcon.src='assets/close.svg';
             icon='c';
             //Reload page
             searchButton.addEventListener('click', () => {
                location.reload();
             })
            } else {
                searchIcon.src='assets/icon-search.svg';
                icon='s';
            }
        }
        //Gif result title
        let gifTitle = document.createElement('p');
        let titleName = word.value;
        gifTitle.textContent = titleName;
        title.appendChild(gifTitle);
        //Button to see more gifs
        if (word.value.length == 0) {
            //It won't fetch any gif because the input is empty and therefore will not show the button
        } else {
            let btn = document.createElement('button');
            btn.setAttribute('id', 'moreGifs-btn');
            btn.setAttribute('type', 'submit');
            btn.setAttribute('name', 'More gifs');
            btn.textContent = 'Ver más';
            gifsBtn.appendChild(btn);
                    //See more event listener
            btn.addEventListener('click', () => {
                async function searchGif() {
                    let search = word.value;
                    console.log(search); 
                    //request parameters: api_key and q (string)
                    let search_fetch = `${searchUrl}&api_key=${apiKey}&q=${search}&limit=12&offset=12`;
                    console.log(search_fetch);
                    const response = await fetch(search_fetch);
                    const data = await response.json();
                    console.log(data);
                    return data;
                }
                searchGif().then(response => {
                    for (var i = 0; i < response.data.length; i++) {
                        document.body.style.gridTemplateRows = '10vh 340vh 20vh';
                        searchContainer.style.gridTemplateRows = '20vh 20vh 20vh 10vh 210vh 0vh';
                        //Gifs container
                        let foundGif = document.createElement('img');
                        foundGif.setAttribute('src', response.data[i].images.original.url);
                        gifs.appendChild(foundGif);
                    }
                    //Remove button
                    gifsBtn.remove();
                }).catch(err => {
                    console.error('something went wrong :/', err);
                })
            });
        }
    }).catch(err => {
        console.error('something went wrong :/', err);
    })
});