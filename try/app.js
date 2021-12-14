const box = document.getElementById('box');
let gif = document.createElement('img');
gif.setAttribute('src', '/camera.jpg');
gif.setAttribute('alt', 'camera');
function down() {
    let downloadIcon = document.createElement('a');
    let downloadImage = document.createElement('img');
    downloadImage.setAttribute('src', 'icon-download.svg');
    downloadIcon.appendChild(downloadImage);
    box.appendChild(downloadIcon);
    downloadIcon.addEventListener('click', function hello(name, url){
        downloadIcon.setAttribute('href', gif.src);
        downloadIcon.setAttribute('donwload', 'file');
        downloadIcon.click();
        url = gif.src;
        name = gif.alt;
        download(name, url);
    })
}
down();