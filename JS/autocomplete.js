                    //AUTOCOMPLETE
const autocomplete_url = "https://api.giphy.com/v1/gifs/search/tags?";
const mainContent_search = document.querySelector('.mainContent-search');
const suggestions_container = document.querySelector('.search-container')
const inputBox = document.getElementById('search-box');
let result = [];
for(let i = 0; i <= 4; i++) {
    let p = document.createElement('p');
    p.setAttribute('class', 'auto');
    result.push(p);
}
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
                // const container = document.getElementById('autocomplete-container');
                if (document.body.contains(document.getElementById('autocomplete-container')) === false) {
                    const autocompleteContainer = document.createElement('div');
                        autocompleteContainer.setAttribute('id', 'autocomplete-container');
                        mainContent_search.appendChild(autocompleteContainer);
                }
                    if (response.data.length <= 0) {
                        console.log('Theres no data man');
                        // for(let i = 0; i <= result.length -1; i++) {
                        //     result[i].textContent = '';
                        //     autocompleteContainer.removeChild(result[i]);
                        // }
                        // for(let i = 0; i <= result.length -1; i++) {
                            // result[i].textContent = '';
                            const box = document.getElementById('autocomplete-container');
                            box.remove();
                        // }
                        response = false;
                    } 
                    else {
                        const container = document.getElementById('autocomplete-container');
                        for(let i = 0; i <= result.length -1; i++) {
                            result[i].textContent = response.data[i].name;
                            container.appendChild(result[i]);
                        }
                    } 
                
            })
            .catch(err => {
                console.error('something went wrong :/', err);
            })
});



//             autocomplete().then(response => {
//                 // const container = document.getElementById('autocomplete-container');
//                 // if (document.body.contains(document.getElementById('autocomplete-container')) === false) {
//                     // const autocompleteContainer = document.createElement('div');
//                     //     autocompleteContainer.setAttribute('id', 'autocomplete-container');
//                     //     mainContent_search.appendChild(autocompleteContainer);
                    
//                     if (response.data.length <= 0) {
//                         console.log('Theres no data man');
//                         // for(let i = 0; i <= result.length -1; i++) {
//                         //     result[i].textContent = '';
//                         //     autocompleteContainer.removeChild(result[i]);
//                         // }
//                         for(let i = 0; i <= result.length -1; i++) {
//                             result[i].textContent = '';
//                             // autocompleteContainer.removeChild(result[i]);
//                         }
//                         response = false;
//                     } 
//                     else {
//                         for(let i = 0; i <= result.length -1; i++) {
//                             result[i].textContent = response.data[i].name;
//                             suggestions_container.appendChild(result[i]);
//                         }
//                     } 
//                 // }
//             })
//             .catch(err => {
//                 console.error('something went wrong :/', err);
//             })
// });