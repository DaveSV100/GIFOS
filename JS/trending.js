// const apiKey = "efARnSmXUsXz3XqFvbyykWkVyNi3IIuQ";
//                     //TRENDING
const trending = document.getElementById('trending-gifos');
// const carouselImages = document.querySelectorAll('#trending-gifos img');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

const trendingUrl = "https://api.giphy.com/v1/gifs/trending?";


async function getGif() {
    let fetch_url = `${trendingUrl}&api_key=${apiKey}&limit=10&offset=0`;
    const response = await fetch(fetch_url);
    const data = await response.json();
    return data;
}
getGif().then(response => {

    let pic2 = document.createElement('img');
    pic2.setAttribute('src', response.data[9].images.original.url);
    pic2.setAttribute('id', 'secondClone');
    trending.appendChild(pic2);
    // pic2.style.width = '300px';
    
    for (var i = 0; i < response.data.length; i++) {
        let gif = document.createElement('img');
        gif.setAttribute('src', response.data[i].images.original.url);
        console.log(response.data[0].images.original.url);
        trending.appendChild(gif);
        // gif.style.width = '300px';
    }

    let pic1 = document.createElement('img');
    pic1.setAttribute('src', response.data[0].images.original.url);
    pic1.setAttribute('id', 'firstClone');
    trending.appendChild(pic1);
    // pic1.style.width = '300px';

    //Counter
    let counter = 1;
    const size = trending.firstElementChild.clientWidth;
    // const size = carouselImages[0].getBoundingClientRect().width;
    console.log(size);
    trending.style.transform = 'translateX(' + (-size * counter) + 'px)';



}).catch(err => {
    console.error('something went wrong :/', err);
})


    //Button Listeners
    nextBtn.addEventListener('click', () => {
        alert("hey you");
        // trending.style.transition = "transform 0.4s ease-in-out";
        // counter++;
        // trending.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });