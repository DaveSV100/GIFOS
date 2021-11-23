                    //SEARCH
const apiKey = "efARnSmXUsXz3XqFvbyykWkVyNi3IIuQ";
const searchUrl = "https://api.giphy.com/v1/gifs/search?";
let searchContainer = document.getElementById('search');
let title = document.getElementById('result-title')
let searchedTitle = document.getElementsByClassName('mainContent-result');
let gifs = document.getElementById('result-gifs');
let searchedGifs = document.getElementsByClassName('mainContent-gifs');
let searchButton = document.getElementById('searchBtn');
let word = document.getElementById('search-box');
searchButton.addEventListener("click", s);
function s() {
    
    async function searchGif() {
        
        let search = word.value;
        console.log(search); 
        //request parameters: api_key and q (string)
        let search_fetch = `${searchUrl}&api_key=${apiKey}&q=${search}&limit=20&offset=0`;
        console.log(search_fetch);
        const response = await fetch(search_fetch);
        const data = await response.json();
        console.log(data);
        return data;
    }
    searchGif().then(response => {
        
        for (var i = 0; i < response.data.length; i++) {
            document.body.style.gridTemplateRows = '10vh 815vh 20vh';
            searchContainer.style.gridTemplateRows = '20vh 25vh 20vh 20vh 600vh';
            //Gifs container
            let foundGif = document.createElement('img');
            foundGif.setAttribute('src', response.data[i].images.original.url);
            gifs.appendChild(foundGif);
            foundGif.style.width = '300px';
        }
        // searchedTitle.style.height = '40vh';
        // searchedGifs.style.height = '50vh';
        //Gif result title
        let gifTitle = document.createElement('p');
        let titleName = word.value;
        gifTitle.textContent = titleName;
        title.appendChild(gifTitle);
        //Div height
        // gifs.style.height = '500vh';
    }).catch(err => {
        console.error('something went wrong :/', err);
    })
}
s();
