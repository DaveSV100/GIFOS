//                     //TRENDING
const trending = document.getElementById('trending-gifos');
const trendingUrl = "https://api.giphy.com/v1/gifs/trending?";
async function getGif() {
    let fetch_url = `${trendingUrl}&api_key=${apiKey}&limit=10&offset=0`;
    const response = await fetch(fetch_url);
    const data = await response.json();
    return data;
}
getGif().then(response => {
    for (var i = 0; i < response.data.length; i++) {
        let gif = document.createElement('img');
        gif.setAttribute('src', response.data[i].images.original.url);
        console.log(response.data[0].images.original.url);
        trending.appendChild(gif);
        // gif.style.width = '300px';
    }
}).catch(err => {
    console.error('something went wrong :/', err);
})


