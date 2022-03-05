                    //AUTOCOMPLETE
const autocomplete_url = "https://api.giphy.com/v1/gifs/search/tags?";
const mainContent_search = document.querySelector('.mainContent-search');
const suggestions_container = document.querySelector('.search-container')
const inputBox = document.getElementById('search-box');
// let result = [];
// for(let i = 0; i <= 4; i++) {
//     let p = document.createElement('p');
//     p.setAttribute('class', 'auto');
//     result.push(p);
// }
inputBox.addEventListener('input', () => {
    async function autocomplete() {
        let boxValue = inputBox.value;
        console.log(boxValue);
        let autocomplete_fetch = `${autocomplete_url}&api_key=${apiKey}&limit=5&q=${boxValue}`;
        console.log(autocomplete_fetch);
        const response = await fetch(autocomplete_fetch);
        const data = await response.json();
        console.log(data);
        return data;
    }
    
    autocomplete().then(response => {
        if (response.data.length <= 0) {
            console.log('Theres no data man');
            const box = document.getElementById('autocomplete-container');
            box.remove();
            response = false;
        } else if(response.data.length > 0) {
            const autocompleteContainer = document.createElement('div');
            autocompleteContainer.setAttribute('id', 'autocomplete-container');
            mainContent_search.appendChild(autocompleteContainer);
            // result[i].textContent = response.data[i].name;
            console.log(response.data[0].name);
            let result = [];
            for(let i = 0; i <= response.data.length; i++) {
                const container = document.getElementById('autocomplete-container');
                const a = document.createElement('a');
                a.setAttribute('class', 'auto');
                result.push(a)
                result[i].textContent = response.data[i].name;
                container.appendChild(result);
            }
        }  
    })
    .catch(err => {
        console.error('something went wrong :/', err);
    })
});
