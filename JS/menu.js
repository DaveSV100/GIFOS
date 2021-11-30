const burger = document.querySelector('.hamburger');
const icon = document.querySelector('#burger');
const list = document.querySelector('.navBar-menu');
const body = document.querySelector('body');
const logo = document.querySelector('#logo-icon');

//Logo button
logo.addEventListener('click', () => {
    // window.scrollTo(0, 0);
    location.reload();
});

const navSlide = () => {
//     //Image tracker =
//     //h = Hamburger icon
//     //c = Close icon
    let image_tracker='h';
    burger.addEventListener('click', () => {
       
//         // minWidth.matches ? list.classList.add('navBar-menu_update') : list.classList.remove('navBar-menu_update');
        list.classList.toggle('navBar-menu_update');
        burger.classList.toggle('hidden');
//         //Change icon
        if(image_tracker=='h') {
            icon.src='assets/close.svg';
            image_tracker='c';
        } else {
            icon.src='assets/burger.svg';
            image_tracker='h';
        }
        //Stop scrolling
        if (!burger.classList.contains("hidden")) {
            // Disable scroll
            body.style.overflow = "hidden";
        } else {
            // Enable scroll
            body.style.overflow = "auto";
        }
    });
}
navSlide();