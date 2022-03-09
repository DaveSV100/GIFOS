//                     //TRENDING SEARCH TERMS
const searches_url = "https://api.giphy.com/v1/trending/searches?";
let searches = document.getElementById("mainContent-terms_result");
// let activatedFunction = false;
function show_terms() {
    async function display() {
        let terms = `${searches_url}&api_key=${apiKey}&limit=5`
        const terms_response = await fetch(terms);
        const terms_data = await terms_response.json();
        return terms_data;
    }
    display().then(response => {
        let filter = response.data.slice(0, 5);
        let five = filter.forEach(product => {
            let a = document.createElement("a");
            // a.textContent = product + ",";
            a.textContent = product;
            searches.appendChild(a);
            a.addEventListener('click', () => {
                    async function searchGif() {
                        let search = a.text;
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
                            document.body.style.gridTemplateRows = '10vh 300vh 20vh';
                            searchContainer.style.gridTemplateRows = '20vh 30vh 30vh 10vh 130vh 10vh';
                            //Gifs container
                            let foundGif = document.createElement('img');
                            foundGif.setAttribute('src', response.data[i].images.original.url);
                            foundGif.setAttribute('alt', response.data[i].title);
                            gifs.appendChild(foundGif);
                            foundGif.addEventListener('click', () => {
                                    //GIF CARD
                                //The styles for the Gif Card are set on the master.scss file.
                                //To go to the top and stop scroll
                                // window.scrollTo(0, 0);
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
                                    background.remove();
                                    gifContainer.remove();
                                    body.style.overflow = 'scroll';
                                })
                                //Gif image
                                let gifContainer_img = document.createElement('img');
                                gifContainer_img.setAttribute('src', foundGif.src)
                                gifContainer_img.setAttribute('class', 'card-image');
                                gifContainer.appendChild(gifContainer_img);
                                //Favorite icon
                                let favIcon = document.createElement('a');
                                favIcon.setAttribute('class', 'favorite-icon');
                                let favImage = document.createElement('img');
                                favImage.setAttribute('src', 'assets/icon-fav-active.svg');
                                favIcon.appendChild(favImage);
                                gifContainer.appendChild(favIcon);
                                //Local Storage
                                favIcon.addEventListener('click', () => {
                                    localStorage.setItem('gifImg', foundGif.src);
                                    localStorage.setItem('gifTitle', foundGif.alt);
                                    let favGif_url = localStorage.getItem('gifImg');
                                    let favGif_title = localStorage.getItem('gifTitle');
                                    console.log(favGif_url);
                                    console.log(favGif_title);
                                });
                                //Donwload icon 
                                let downloadIcon = document.createElement('a');
                                downloadIcon.setAttribute('class', 'donwload-icon');
                                let downloadImage = document.createElement('img');
                                downloadImage.setAttribute('src', 'assets/icon-download.svg');
                                downloadIcon.appendChild(downloadImage);
                                gifContainer.appendChild(downloadIcon);
                                downloadIcon.addEventListener('click', () => {
                                    downloadFromGiphy(foundGif.src, foundGif.alt);
                                });
                                //Title
                                let title = document.createElement('p');
                                title.setAttribute('class', 'gif-title');
                                let titleContent = foundGif.alt;
                                title.textContent = titleContent;
                                gifContainer.appendChild(title);
                                })   
                            }
                        //Change icon from 'search'(icon == s) to 'close'(icon == c) to reload page and search something else
                        if (a.text.length == 0) {
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
                        let titleName = a.text;
                        gifTitle.textContent = titleName;
                        title.appendChild(gifTitle);
                        //Button to see more gifs
                        if (a.text.length == 0) {
                            //It won't fetch any gif because the input is empty and therefore will not show the button
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
                                async function searchGif() {
                                    let search = a.text;
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
                                        document.body.style.gridTemplateRows = '10vh 420vh 20vh';
                                        searchContainer.style.gridTemplateRows = '20vh 30vh 30vh 10vh 260vh 0vh';
                                        //Gifs container
                                        let foundGif = document.createElement('img');
                                        foundGif.setAttribute('src', response.data[i].images.original.url);
                                        foundGif.setAttribute('alt', response.data[i].title);
                                        gifs.appendChild(foundGif);
                                        foundGif.addEventListener('click', () => {
                                            //GIF CARD
                                        //The styles for the Gif Card are set on the master.scss file.
                                        //To go to the top and stop scroll
                                        // window.scrollTo(0, 0);
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
                                            background.remove();
                                            gifContainer.remove();
                                            body.style.overflow = 'scroll';
                                        })
                                        //Gif image
                                        let gifContainer_img = document.createElement('img');
                                        gifContainer_img.setAttribute('src', foundGif.src)
                                        gifContainer_img.setAttribute('class', 'card-image');
                                        gifContainer.appendChild(gifContainer_img);
                                        //Favorite icon
                                        let favIcon = document.createElement('a');
                                        favIcon.setAttribute('class', 'favorite-icon');
                                        let favImage = document.createElement('img');
                                        favImage.setAttribute('src', 'assets/icon-fav-active.svg');
                                        favIcon.appendChild(favImage);
                                        gifContainer.appendChild(favIcon);
                                        //Local Storage
                                        favIcon.addEventListener('click', () => {
                                            localStorage.setItem('gifImg', foundGif.src);
                                            localStorage.setItem('gifTitle', foundGif.alt);
                                            let favGif_url = localStorage.getItem('gifImg');
                                            let favGif_title = localStorage.getItem('gifTitle');
                                            console.log(favGif_url);
                                            console.log(favGif_title);
                                        });
                                        //Donwload icon 
                                        let downloadIcon = document.createElement('a');
                                        downloadIcon.setAttribute('class', 'donwload-icon');
                                        let downloadImage = document.createElement('img');
                                        downloadImage.setAttribute('src', 'assets/icon-download.svg');
                                        downloadIcon.appendChild(downloadImage);
                                        gifContainer.appendChild(downloadIcon);
                                        downloadIcon.addEventListener('click', () => {
                                            downloadFromGiphy(foundGif.src, foundGif.alt);
                                        });
                                        //Title
                                        let title = document.createElement('p');
                                        title.setAttribute('class', 'gif-title');
                                        let titleContent = foundGif.alt;
                                        title.textContent = titleContent;
                                        gifContainer.appendChild(title);
                                        })   
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
        });
    }).catch(err => {
        console.error('something went wrong :/', err);
    })
}
show_terms();