const gifCard = (source, alt) => {
        //GIF CARD
    //The styles for the Gif Card are set on the master.scss file.
    body.style.overflow = 'hidden';
    //Gif card background. 
    let background = document.createElement('div');
    background.setAttribute('class', 'gifCard');
    body.appendChild(background);
    //Gif container
    let gifContainer = document.createElement('div');
    gifContainer.setAttribute('class', 'gifCard-container');
    background.appendChild(gifContainer);
    //Close icon
    let x = document.createElement('button');
    x.setAttribute('class', 'x-icon');
    x.setAttribute('type', 'submit');
    let xIcon = document.createElement('img');
    xIcon.setAttribute('src', 'assets/close.svg');
    xIcon.setAttribute('alt', 'Close card');
    x.appendChild(xIcon);
    gifContainer.appendChild(x);
    x.addEventListener('click', () => {
        background.remove();
        gifContainer.remove();
        body.style.overflow = 'scroll';
    })
    //Gif image
    let gifContainer_img = document.createElement('img');
    gifContainer_img.setAttribute('src', source);
    gifContainer_img.setAttribute('alt', alt);
    gifContainer_img.setAttribute('class', 'card-image');
    gifContainer.appendChild(gifContainer_img);
    //Favorite icon
    let favIcon = document.createElement('button');
    favIcon.setAttribute('class', 'favorite-icon');
    let favImage = document.createElement('img');
    favImage.setAttribute('src', 'assets/icon-fav-active.svg');
    favImage.setAttribute('alt', 'Ícono de añadir a favoritos');
    favIcon.appendChild(favImage);
    gifContainer.appendChild(favIcon);
    //Local Storage
    favIcon.addEventListener('click', () => {
        console.log('Favorite button');
        let gifObj = {
            src: source,
            name: alt,
        };

        if(localStorage.getItem('data') == null) {
            localStorage.setItem('data', '[]');
        }
        let favData = JSON.parse(localStorage.getItem('data'));
        favData.push(gifObj);
        localStorage.setItem('data', JSON.stringify(favData));
    });
    

    //Donwload icon 
    let downloadIcon = document.createElement('button');
    downloadIcon.setAttribute('class', 'donwload-icon');
    let downloadImage = document.createElement('img');
    downloadImage.setAttribute('src', 'assets/icon-download.svg');
    downloadIcon.appendChild(downloadImage);
    gifContainer.appendChild(downloadIcon);
    downloadIcon.addEventListener('click', () => {

        const downloadGif = async (src, name) => {
            let blob = await fetch(src).then((img) => img.blob());
            invokeSaveAsDialog(blob, name + '.gif');
        }
        downloadGif(source, alt);
    });
    //Title
    let title = document.createElement('p');
    title.setAttribute('class', 'gif-title');
    let titleContent = alt;
    title.textContent = titleContent;
    gifContainer.appendChild(title);
}