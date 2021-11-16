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
            a.addEventListener("click", () => {
                async function searchGif() {
                    let search = a.text;
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
            })
         });

    }).catch(err => {
        console.error('something went wrong :/', err);
    })
}
show_terms();