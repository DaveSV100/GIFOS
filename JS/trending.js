//                     //TRENDING
const apiKey = "efARnSmXUsXz3XqFvbyykWkVyNi3IIuQ";
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
                if (document.URL.includes('index.html')) {
                    background.remove();
                    gifContainer.remove();
                    body.style.overflow = 'scroll';
                } else if (document.URL.includes('favorites.html')) {
                    location.reload();
                } else {
                    background.remove();
                    gifContainer.remove();
                    body.style.overflow = 'scroll';
                }
            })
            //Gif image
            let gifContainer_img = document.createElement('img');
            gifContainer_img.setAttribute('src', gif.src)
            gifContainer_img.setAttribute('class', 'card-image');
            gifContainer.appendChild(gifContainer_img);
            //Favorite icon
            let favIcon = document.createElement('button');
            favIcon.setAttribute('class', 'favorite-icon');
            let favImage = document.createElement('img');
            favImage.setAttribute('src', 'assets/icon-fav-active.svg');
            favIcon.appendChild(favImage);
            gifContainer.appendChild(favIcon);
              //Local Storage
              
            favIcon.addEventListener('click', () => {
                console.log('Favorite button');
                let new_data = gif.src;
                if(localStorage.getItem('data') == null) {
                    localStorage.setItem('data', '[]');
                }
                let old_data = JSON.parse(localStorage.getItem('data'));
                old_data.push(new_data);
                localStorage.setItem('data', JSON.stringify(old_data));
                    // let items = [];
                    // let source = gif.src;
                    // items.push(source);
                    // localStorage.setItem('gifImg', items);
                    // console.log(items);
            });
            //Donwload icon 
            let downloadIcon = document.createElement('a');
            downloadIcon.setAttribute('class', 'donwload-icon');
            let downloadImage = document.createElement('img');
            downloadImage.setAttribute('src', 'assets/icon-download.svg');
            downloadIcon.appendChild(downloadImage);
            gifContainer.appendChild(downloadIcon);
            downloadIcon.addEventListener('click', () => {
                downloadIcon.setAttribute('download', gif.alt);
                downloadIcon.setAttribute('href', gif.src);
            });
            //Title
            let title = document.createElement('p');
            title.setAttribute('class', 'gif-title');
            let titleContent = gif.alt;
            title.textContent = titleContent;
            gifContainer.appendChild(title);
        });   
    }
}).catch(err => {
    console.error('something went wrong :/', err);
})


