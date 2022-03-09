const resultContainer = document.querySelector("#search");

const layout1 = () => {
    console.log("***** Layout1 ****")
    console.log(searchHandler1);
    const width1 = window.innerWidth;
    if(width1 >= 300 && width1 < 425) {
        console.log("This is a phone");
        document.body.style.gridTemplateRows = '10vh 300vh 20vh';
        resultContainer.style.gridTemplateRows = '20vh 30vh 30vh 10vh 130vh 10vh';
    } else if(width1 >= 425 && width1 < 768) {
        console.log("This is a large mobile")
    } else if(width1 >=768 && width1 < 1020) {
        console.log("This is a tablet");
    } else if(width1 >=1020 && width1 < 2560) {
        console.log("This is a laptop");
    } else if(width1 >= 2560) {
        console.log("This is a larger laptop or a tv");
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