                    //AUTOCOMPLETE
const autocomplete_url = "https://api.giphy.com/v1/gifs/search/tags?";
const mainContent_search = document.querySelector('.mainContent-search');
const inputBox = document.getElementById('search-box');
let result = [];
for(let i = 0; i <= 4; i++) {
    let p = document.createElement('p');
    result.push(p);
}
inputBox.addEventListener('input', (ev) => {
    
            async function autocomplete() {
                let boxValue = ev.target.value;
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
                    response = false;
                } 
                else {
                        for(let i = 0; i <= result.length -1; i++) {
                            result[i].textContent = response.data[i].name;
                            let container = document.createElement('div');
                            container.setAttribute('class', 'mainContent-autocomplete');
                            container.appendChild(result[i]);
                            mainContent_search.appendChild(container);
                        }
                }  
            }).catch(err => {
                console.error('something went wrong :/', err);
            })
});