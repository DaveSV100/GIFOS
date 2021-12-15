                    //AUTOCOMPLETE
const autocomplete_url = "https://api.giphy.com/v1/gifs/search/tags?";
const searchBox = document.querySelector('.search-container');
const inputBox = document.getElementById('search-box');

inputBox.addEventListener('input', auto);
function auto() {
    async function autocomplete() {
        let boxValue = (inputBox).value;
        console.log(boxValue);
        let autocomplete_fetch = `${autocomplete_url}&api_key=${apiKey}&q=${boxValue}`;
        console.log(autocomplete_fetch);
        const response = await fetch(autocomplete_fetch);
        const data = await response.json();
        console.log(data);
        return data;
    }
    autocomplete().then(response => {
        let show = data.forEach(word => {
            let write_terms = document.createElement('p');
            write_terms.textContent = response.data[word].name;
            let container = document.createElement('div');
            container.appendChild(write_terms);
            searchBox.appendChild(container);
        })
        // for(var i = 0; i < response.data.length; i++) {
        //     let write_terms = document.createElement('p');
        //     write_terms.textContent = response.data[i].name;
        //     let container = document.createElement('div');
        //     container.appendChild(write_terms);
        //     searchBox.appendChild(container);
        // }
    }).catch(err => {
        console.error('something went wrong :/', err);
    })
}