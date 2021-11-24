                    //SEARCH
const apiKey = "efARnSmXUsXz3XqFvbyykWkVyNi3IIuQ";
const searchUrl = "https://api.giphy.com/v1/gifs/search?";
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
            gifs.appendChild(foundGif);
        }
        //Gif result title
        let gifTitle = document.createElement('p');
        let titleName = word.value;
        gifTitle.textContent = titleName;
        title.appendChild(gifTitle);
        //Button to see more gifs
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
                let search_fetch = `${searchUrl}&api_key=${apiKey}&q=${search}&limit=24&offset=12`;
                console.log(search_fetch);
                const response = await fetch(search_fetch);
                const data = await response.json();
                console.log(data);
                return data;
            }
            searchGif().then(response => {
                for (var i = 0; i < response.data.length; i++) {
                    document.body.style.gridTemplateRows = '10vh 440vh 20vh';
                    searchContainer.style.gridTemplateRows = '20vh 20vh 20vh 10vh 310vh 0vh';
                    //Gifs container
                    let foundGif = document.createElement('img');
                    foundGif.setAttribute('src', response.data[i].images.original.url);
                    gifs.appendChild(foundGif);
                }
                //Gif result title
                let gifTitle = document.createElement('p');
                let titleName = word.value;
                gifTitle.textContent = titleName;
                title.appendChild(gifTitle);
                //Remove button
                gifsBtn.remove();
            }).catch(err => {
                console.error('something went wrong :/', err);
            })
    });
    }).catch(err => {
        console.error('something went wrong :/', err);
    })
});