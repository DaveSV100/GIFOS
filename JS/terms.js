//                     //TRENDING SEARCH TERMS
const searches_url = "https://api.giphy.com/v1/trending/searches?";
let searches = document.getElementById("mainContent-terms_result");
function show_terms() {
    async function display() {
        let terms = `${searches_url}&api_key=${apiKey}&limit=5`
        const terms_response = await fetch(terms);
        const terms_data = await terms_response.json();
        console.log(terms_data);
        return terms_data;
    }
    display().then(response => {
        let filter = response.data.slice(0, 5);
        console.log(filter);
        let five = filter.forEach(product => {
            let a = document.createElement("a");
            a.textContent = product;
            searches.appendChild(a);
            console.log(product);
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
                        document.body.style.gridTemplateRows = '10vh 240vh 20vh';
                        searchContainer.style.gridTemplateRows = '20vh 20vh 20vh 10vh 110vh 10vh';
                        //Gifs container
                        let foundGif = document.createElement('img');
                        foundGif.setAttribute('src', response.data[i].images.original.url);
                        gifs.appendChild(foundGif);
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
                                    document.body.style.gridTemplateRows = '10vh 340vh 20vh';
                                    searchContainer.style.gridTemplateRows = '20vh 20vh 20vh 10vh 210vh 0vh';
                                    //Gifs container
                                    let foundGif = document.createElement('img');
                                    foundGif.setAttribute('src', response.data[i].images.original.url);
                                    gifs.appendChild(foundGif);
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

// function show_terms() {
//     async function display() {
//         let terms = `${searches_url}&api_key=${apiKey}&limit=5`
//         const terms_response = await fetch(terms);
//         const terms_data = await terms_response.json();
//         console.log(terms_data);
//         return terms_data;
//     }
//     display().then(response => {
//         let filter = response.data.slice(0, 5);
//         console.log(filter);
//          let five = filter.forEach(product => {
//              let a = document.createElement("a");
//              a.textContent = product;
//             searches.appendChild(a);
//             console.log(product);
//             a.addEventListener("click", () => {
//                 async function searchGif() {
//                     let search = a.text;
//                     console.log(search); 
//                     //request parameters: api_key and q (string)
//                     let search_fetch = `${searchUrl}&api_key=${apiKey}&q=${search}&limit=20&offset=0`;
//                     console.log(search_fetch);
//                     const response = await fetch(search_fetch);
//                     const data = await response.json();
//                     console.log(data);
//                     return data;
//                 }
//                 searchGif().then(response => {
//                     for (var i = 0; i < response.data.length; i++) {
//                         //Gifs container
//                         let foundGif = document.createElement('img');
//                         foundGif.setAttribute('src', response.data[i].images.original.url);
//                         gifs.appendChild(foundGif);
//                         foundGif.style.width = '300px';
//                     }
//                     let gifTitle = document.createElement('p');
//                     let titleName = a.text;
//                     gifTitle.textContent = titleName;
//                     console.log(search);
//                     title.appendChild(gifTitle);
//                 }).catch(err => {
//                     console.error('something went wrong :/', err);
//                 })
//             })
//          });

//     }).catch(err => {
//         console.error('something went wrong :/', err);
//     })
// }
// show_terms();