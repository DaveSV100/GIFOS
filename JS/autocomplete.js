//AUTOCOMPLETE
const autocomplete_url = "https://api.giphy.com/v1/gifs/search/tags?";
const mainContent_search = document.querySelector('.mainContent-search');
const suggestions_container = document.querySelector('.search-container')

word.addEventListener("input", () => {
    const value = word.value;
    autocomplete(value);
});

const autocomplete = async (value) => {
    let autocomplete_fetch = `${autocomplete_url}&api_key=${apiKey}&limit=5&q=${value}`;
    const response = await fetch(autocomplete_fetch);
    const data = await response.json();
    
    try {
        if(data.data.length > 0) {
            displaySuggestions(data);
        } else {
            console.log("You gotta type something dude")
            //remove items
            clean();
        };
    } catch (error) {
        console.log(error);
    }
}

const displaySuggestions = (data) => {
    clean()
    const container = document.createElement("div");
    container.setAttribute("class", "autocomplete-container")
    suggestions_container.appendChild(container);
    for (let i = 0; i < data.data.length; i++) {
        const suggestion = document.createElement("a");
        suggestion.textContent = data.data[i].name;
        container.appendChild(suggestion);
        suggestion.addEventListener("click", () => {
            word.value = "";
            searchGif(data.data[i].name);
        })
    }
    
}

const clean = () => {
    const container = suggestions_container.lastChild;
    container.remove();
}
const changeIcon = () => {
    console.log("changing icon")
    searchIcon.src = "assets/close.svg";
    searchButton.addEventListener('click', () => {
        location.reload();
    })
}