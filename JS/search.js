                            //SEARCH
const searchUrl = "https://api.giphy.com/v1/gifs/search?";
const searchIcon = document.getElementById('search-icon');
const searchContainer = document.getElementById('search');
const title = document.getElementById('result-title')
const searchedTitle = document.getElementsByClassName('mainContent-result');
const gifs = document.getElementById('result-gifs');
const gifsBtn = document.getElementById('result-button');
const searchedGifs = document.getElementsByClassName('mainContent-gifs');
const searchButton = document.getElementById('searchBtn');
const word = document.getElementById('search-box');
let searchHandler1 = false;
let searchHandler2 = false;

word.autocomplete = "off";
searchContainer.onkeyup = (e) => {
    if(e.keyCode == 13) {
        searchGif(word.value);
    }
}
searchButton.addEventListener('click', () => searchGif(word.value));

const searchGif = async (value) => {
    clean();
    changeIcon();
    console.log(value)
    let search = value;
    //request parameters: api_key and q (string)
    let search_fetch = `${searchUrl}&api_key=${apiKey}&q=${value}&limit=12&offset=0&rating=g`;
    const response = await fetch(search_fetch);
    const data = await response.json();

    try {
        //Change layout (the function is on the response.js file)
        searchHandler1 = true;
        layout1();
        for (var i = 0; i < data.data.length; i++) {
            // document.body.style.gridTemplateRows = '10vh 280vh 20vh';
            // searchContainer.style.gridTemplateRows = '20vh 30vh 30vh 10vh 110vh 10vh';
            //Gifs container
            let foundGif = document.createElement('img');
            foundGif.setAttribute('src', data.data[i].images.original.url);
            foundGif.setAttribute('alt', data.data[i].title);
            gifs.appendChild(foundGif);
            foundGif.addEventListener('click', () => {gifCard(foundGif.src, foundGif.alt)})   
        }
        //Gif result title
        let gifTitle = document.createElement('p');
        let titleName = search;
        gifTitle.textContent = titleName;
        title.appendChild(gifTitle);
        //Button to see more gifs
        if (search.length == 0) {
            //It won't fetch any gif because the input is empty and therefore the button will not be shown
        } else {
            let btn = document.createElement('button');
            btn.setAttribute('id', 'moreGifs-btn');
            btn.setAttribute('class', 'see-more_btn');
            btn.setAttribute('type', 'submit');
            btn.setAttribute('name', 'More gifs');
            btn.textContent = 'Ver más';
            gifsBtn.appendChild(btn);
                    //See more event listener
            btn.addEventListener('click', () => {
                async function searchMore() {
                    //request parameters: api_key and q (string)
                    let search_fetch = `${searchUrl}&api_key=${apiKey}&q=${search}&limit=12&offset=12`;
                    console.log(search_fetch);
                    const response = await fetch(search_fetch);
                    const data = await response.json();
                    console.log(data);
                    return data;
                }
                searchMore().then(response => {
                    //Change layout (the function on in the response.js file)
                    searchHandler1 = false;
                    searchHandler2 = true;
                    layout2();
                    for (var i = 0; i < response.data.length; i++) {
                        // document.body.style.gridTemplateRows = '10vh 340vh 20vh';
                        // searchContainer.style.gridTemplateRows = '20vh 20vh 20vh 10vh 210vh 0vh';
                        //Gifs container
                        let foundGif = document.createElement('img');
                        foundGif.setAttribute('src', response.data[i].images.original.url);
                        foundGif.setAttribute('alt', response.data[i].title);
                        gifs.appendChild(foundGif);
                        foundGif.addEventListener('click', () => {gifCard(foundGif.src, foundGif.alt)})   
                    }
                    //Remove button
                    gifsBtn.remove();
                }).catch(err => {
                    console.error('something went wrong :/', err);
                })
            });
        }
    } catch{}
}