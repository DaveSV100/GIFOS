                    //SEARCH
const apiKey = "efARnSmXUsXz3XqFvbyykWkVyNi3IIuQ";
const searchUrl = "https://api.giphy.com/v1/gifs/search?";
let gifs = document.getElementById('result-gifs');
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
            //Gifs container
            let foundGif = document.createElement('img');
            foundGif.setAttribute('src', response.data[i].images.original.url);
            gifs.appendChild(foundGif);
            foundGif.style.width = '300px';
        }
    }).catch(err => {
        console.error('something went wrong :/', err);
    })
}
s();