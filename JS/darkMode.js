const theme = document.querySelector(".darkMode");
const trendingTitle = document.querySelector(".trending-text")
const logoIcon = document.querySelector(".logo");
const cam = document.querySelector("#cameraIcon");
const mov = document.querySelector("#movieIcon");
let darkModeIsRunning = false;

theme.addEventListener("click", () => {darkMode()})

const darkMode = () => {
    document.body.classList.toggle("darkTheme");

    if(document.body.classList.contains("darkTheme")) {
        localStorage.setItem("dark-theme", true);
    } else {
        localStorage.setItem("dark-theme", false);
    }

    // if(document.URL.includes('create.html')) {
    //     cam.src = "/assets/camara-modo-noc.svg";
    //     mov.src = "/assets/pelicula-modo-noc.svg";
    // }
    
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

//Get the user preference system theme
// const prefersDarkScheme = window.matchMedia("(prefers-color-scheme:dark)");
// if (prefersDarkScheme.matches) {
//     darkMode();
// } 