"use strict";
const theme = document.querySelector(".darkMode");
const trendingTitle = document.querySelector(".trending-text")
const logoIcon = document.querySelector(".logo");
const cam = document.querySelector("#cameraIcon");
const mov = document.querySelector("#movieIcon");

theme.addEventListener("click", () => {
    if(theme.textContent === "MODO NOCTURNO") {
        theme.textContent = "MODO DIURNO";
    } else {
        theme.textContent = "MODO NOCTURNO";
    }
    darkMode();
})

//Set local storage
//Dark theme class in on darkMode.scss
const darkMode = () => {
    document.body.classList.toggle("darkTheme");
    if(document.body.classList.contains("darkTheme")) {
        localStorage.setItem("dark-theme", true);
    } else {
        localStorage.setItem("dark-theme", false);
    }
}

const settings = () => {
    if (localStorage.getItem("dark-theme") == "true") {
        document.body.classList.add("darkTheme");
        theme.textContent = "MODO DIURNO";
    } else {
        document.body.classList.remove("darkTheme");
        theme.textContent = "MODO NOCTURNO";
    }
}
settings();
