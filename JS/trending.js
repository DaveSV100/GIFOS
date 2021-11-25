//                     //TRENDING
const trending = document.getElementById('trending-gifos');
const trendingUrl = "https://api.giphy.com/v1/gifs/trending?";
async function getGif() {
    let fetch_url = `${trendingUrl}&api_key=${apiKey}&limit=10&offset=0`;
    const response = await fetch(fetch_url);
    const data = await response.json();
    console.log(fetch_url);
    return data;
}
getGif().then(response => {
    for (var i = 0; i < response.data.length; i++) {
        let gif = document.createElement('img');
        gif.setAttribute('src', response.data[i].images.original.url);
        gif.setAttribute('alt', response.data[i].title);
        trending.appendChild(gif);
        gif.addEventListener('click', () => {
            // window.onclick = e => {
            //     console.log(e.target);  // to get the element
            //     console.log(e.target.tagName);  // to get the element tag name alone
            // } 

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
            //Gif image
            gif.setAttribute('class', 'card-image');
            gifContainer.appendChild(gif);
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
            
            //Gif
            // gif.style.display = 'block';
            // gif.style.position = 'absolute';
            // gif.style.height = '70vw';
            // gif.style.width = '80vw';
            // gif.style.objectFit = 'cover';
            // gif.style.transform = 'translateY(-70vh)';
            // gif.style.zIndex = '4';

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
            let titleContent = gif.alt;
            title.textContent = titleContent;
            gifContainer.appendChild(title);
        })   
    }
}).catch(err => {
    console.error('something went wrong :/', err);
})


