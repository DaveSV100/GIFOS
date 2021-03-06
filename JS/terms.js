"use strict";
//TRENDING SEARCH TERMS
const searches_url = "https://api.giphy.com/v1/trending/searches?";
let searches = document.getElementById("mainContent-terms_result");
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
            a.textContent = product;
            searches.appendChild(a);
            a.addEventListener('click', () => {
                let search = a.text;
                //Calling the searchGif function
                searchGif(search);
            });
        });
    }).catch(err => {
        console.error('something went wrong :/', err);
    })
}
show_terms();