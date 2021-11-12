                    //AUTOCOMPLETE
// const autocomplete_url = "https://api.giphy.com/v1/gifs/search/tags?";
// let inputBox = document.getElementById('search-box');
// let matchList = document.getElementById('match-list');

// inputBox.addEventListener('input', auto);
// function auto() {
//     async function autocomplete() {
//         let boxValue = (inputBox).value;
//         console.log(boxValue);
//         let autocomplete_fetch = `${autocomplete_url}&api_key=${apiKey}&q=${boxValue}`;
//         console.log(autocomplete_fetch);
//         const response = await fetch(autocomplete_fetch);
//         const data = await response.json();
//         console.log(data);
//         return data;
//     }
//     autocomplete().then(response => {
//         for(var i = 0; i < 5; i++) {
//             let write_terms = document.createElement('p');
//             write_terms.textContent = response.data[i].name;
//             matchList.appendChild(write_terms);
//         }
//     }).catch(err => {
//         console.error('something went wrong :/', err);
//     })
// }