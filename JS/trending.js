"use strict";
//TRENDING
const apiKey = "efARnSmXUsXz3XqFvbyykWkVyNi3IIuQ";
const trending = document.getElementById('trending-gifos');
const trendingUrl = "https://api.giphy.com/v1/gifs/trending?";
async function getGif() {
    let fetch_url = `${trendingUrl}&api_key=${apiKey}&limit=30&offset=0`;
    const response = await fetch(fetch_url);
    const data = await response.json();
    return data;
}
getGif().then(response => {
    for (let i = 0; i < response.data.length; i++) {
        let gif = document.createElement('img');
        gif.setAttribute('src', response.data[i].images.original.url);
        gif.setAttribute('alt', response.data[i].title);
        trending.appendChild(gif);
        gif.addEventListener('click', () => {gifCard(gif.src, gif.alt)});   
        //Calling gif card function
    }
}).catch(err => {
    console.error('something went wrong :/', err);
})

const downloadFromGiphy = async (src, name) => {
    console.log(src)
    let blob = await fetch(src).then((img) => img.blob());
    invokeSaveAsDialog(blob, name + '.gif');
}

