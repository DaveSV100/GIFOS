const resultContainer = document.querySelector("#search");

const layout1 = () => {
    console.log("***** Layout1 ****")
    console.log(searchHandler1);
    const width1 = window.innerWidth;
    if(width1 >= 300 && width1 < 450) {
        console.log("This is a phone");
        // document.classList.toggle("mobile-body");
        // resultContainer.classList.toggle("mobile-container");
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
        document.body.style.gridTemplateRows = '10vh 310vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 40vh 30vh 10vh 140vh 10vh';
    } else if(width1 >= 1400) {
        console.log("This is a larger laptop or a tv");
        document.body.style.gridTemplateRows = '10vh 280vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 40vh 30vh 10vh 110vh 10vh';
    }
}
const layout2 = () => {
    console.log("***** Layout2 ****")
    console.log(searchHandler1);
    console.log(searchHandler2);
    const width2 = window.innerWidth;
    if(width2 >= 300 && width2 < 425) {
        console.log("This is a phone2");
        document.body.style.gridTemplateRows = '10vh 420vh 20vh';
        searchContainer.style.gridTemplateRows = '20vh 30vh 30vh 10vh 260vh 0vh';
    } else if(width2 >= 425 && width2 < 768) {
        console.log("This is a large mobile2")
    } else if(width2 >=768 && width2 < 1020) {
        console.log("This is a tablet2");
    } else if(width2 >=1020 && width2 < 2560) {
        console.log("This is a laptop2");
    } else if(width2 >= 2560) {
        console.log("This is a larger laptop or a tv2");
    }
}
const selectLayout = () => {
    if(searchHandler1 == true && searchHandler2 == false) {
        layout1();
    } else if (searchHandler1 == false && searchHandler2 == true) {
        layout2();
    }
}

window.addEventListener("resize", selectLayout);
// window.onresize = sizeEventListener;