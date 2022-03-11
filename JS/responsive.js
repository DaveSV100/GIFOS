"use strict";
//These two functions work when user is searching for gifs
const resultContainer = document.querySelector("#search");
const layout1 = () => {
    console.log("***** Layout1 ****")
    //Get window width
    const width1 = window.innerWidth;
    if(width1 >= 300 && width1 < 450) {
        console.log("This is a phone");
        document.body.style.gridTemplateRows = '10vh 300vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 30vh 30vh 10vh 140vh 10vh';
    } else if(width1 >= 450 && width1 < 600) {
        console.log("This is a large mobile");
        document.body.style.gridTemplateRows = '10vh 250vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 30vh 30vh 10vh 90vh 10vh';
    } else if(width1 >= 600 && width1 < 750) {
        console.log("This is a tablet");
        document.body.style.gridTemplateRows = '10vh 390vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 40vh 30vh 10vh 220vh 10vh';
    } else if(width1 >= 750 && width1 < 1000) {
        console.log("This is a tablet");
        document.body.style.gridTemplateRows = '10vh 320vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 40vh 30vh 10vh 150vh 10vh';
    } else if(width1 >=1000 && width1 < 1155) {
        console.log("This is a laptop");
        document.body.style.gridTemplateRows = '10vh 350vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 40vh 30vh 10vh 180vh 10vh';
    } else if(width1 >=1150 && width1 < 1400) {
        console.log("This is a laptop");
        document.body.style.gridTemplateRows = '10vh 320vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 40vh 30vh 10vh 160vh 10vh';
    } else if(width1 >= 1400) {
        console.log("This is a larger laptop or a tv");
        document.body.style.gridTemplateRows = '10vh 300vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 40vh 30vh 10vh 130vh 10vh';
    }
}
const layout2 = () => {
    console.log("***** Layout2 ****")
    console.log(searchHandler1);
    console.log(searchHandler2);
    const width2 = window.innerWidth;
    if(width2 >= 300 && width2 < 450) {
        console.log("This is a phone");
        document.body.style.gridTemplateRows = '10vh 410vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 30vh 30vh 10vh 250vh 10vh';
    } else if(width2 >= 450 && width2 < 600) {
        console.log("This is a large mobile");
        document.body.style.gridTemplateRows = '10vh 330vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 30vh 30vh 10vh 170vh 10vh';
    } else if(width2 >= 600 && width2 < 750) {
        console.log("This is a tablet");
        document.body.style.gridTemplateRows = '10vh 600vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 40vh 30vh 10vh 420vh 10vh';
    } else if(width2 >= 750 && width2 < 1000) {
        console.log("This is a tablet");
        document.body.style.gridTemplateRows = '10vh 450vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 40vh 30vh 10vh 280vh 10vh';
    } else if(width2 >=1000 && width2 < 1155) {
        console.log("This is a laptop");
        document.body.style.gridTemplateRows = '10vh 510vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 40vh 30vh 10vh 340vh 10vh';
    } else if(width2 >=1155 && width2 < 1400) {
        console.log("This is a laptop");
        document.body.style.gridTemplateRows = '10vh 490vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 40vh 30vh 10vh 320vh 10vh';
    } else if(width2 >= 1400) {
        console.log("This is a larger laptop or a tv");
        document.body.style.gridTemplateRows = '10vh 400vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 40vh 30vh 10vh 230vh 10vh';
    }
}
const selectLayout = () => {
    if(searchHandler1 == true && searchHandler2 == false) {
        layout1();
    } else if (searchHandler1 == false && searchHandler2 == true) {
        layout2();
    }
}
//This line of code listenes to every change in the screen size
window.addEventListener("resize", selectLayout);
