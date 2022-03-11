"use strict";
const container = document.querySelector(".create-actions");
const btn = document.getElementById('create-button');
const videoContainer = document.querySelector(".create-container");
const title = document.querySelector('.create-container_title');
const paragraph = document.querySelector('.create-container_paragraph');
const video = document.querySelector("#gifo");
const number1 = document.querySelector(".create-number1");
const number2 = document.querySelector(".create-number2");
const number3 = document.querySelector(".create-number3");
const api_key = "efARnSmXUsXz3XqFvbyykWkVyNi3IIuQ";
let totalTime = 0;
let newGifId = "";
let videoRecorder;
let gifRecorder;
let gifSrc;
let playing = false;

async function fetchURL(url, params = null) {
	try {
		const fetchData = await fetch(url, params);
		const response = await fetchData.json();
		return response;
	} catch (error) {
		if (error.name !== "AbortError") {
			console.log("Error al obtener resultados");
		}
		return error;
	}
}

let constraintObj = { 
    audio: false, 
    video: { 
        facingMode: "user", 
        width: 300, height: 250
        //   width: { min: 640, ideal: 1280, max: 1920 },
        //   height: { min: 480, ideal: 720, max: 1080 } 
        // width: 1280, height: 720  -- preference only
        // facingMode: {exact: "user"}
        // facingMode: "environment"
    } 
}; 

btn.addEventListener("click", () => {
    init();
})

async function init () {
    number1.style.backgroundColor = "#572EE5";
    number1.style.color = "#ffffff";
    const stream = await navigator.mediaDevices.getUserMedia(constraintObj);
    video.srcObject = stream;
    await video.play();
    if (!stream) {
        title.textContent = "¿Nos das acceso a tu cámara?";
        paragraph.textContent = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO."
    } else {
        title.textContent = "";
        paragraph.textContent = "";
    }
    record()
}

async function record() {
    console.log("Let's record")
    btn.remove();
    number1.style.backgroundColor = "#ffffff";
    number1.style.color = "#572EE5";
    number2.style.backgroundColor = "#572EE5";
    number2.style.color = "#ffffff";
    number3.style.backgroundColor = "#ffffff";
    number3.style.color = "#572EE5";
    const recordBtn = document.createElement("button");
    recordBtn.setAttribute("id", "recordBtn");
    recordBtn.setAttribute("class", "create-gifs_button");
    recordBtn.innerText = "Grabar";
    container.appendChild(recordBtn);
    recordBtn.addEventListener("click", () => {
        recordGif();
    })
}
async function recordGif() {
    const stream = video.srcObject;
    videoRecorder = new RecordRTCPromisesHandler(stream, {
        type: "video",
        mimeType: "video/webm; codecs=vp8",
        disableLogs: true,
        videoBitsPerSecond: 128000,
        frameRate: 30,
        quality: 10,
        width: 480,
        hidden: 240
    });
    gifRecorder = new RecordRTCPromisesHandler(stream, {
        disableLogs: true,
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240
    });
    await videoRecorder.startRecording();
    await gifRecorder.startRecording();
    videoRecorder.stream = stream;
    console.log("recording .....")
    const button = document.getElementById("recordBtn");
    button.remove()
    setTimeout(()=> {
        let stopBtn = document.createElement("button");
        stopBtn.innerText = "FINALIZAR";
        stopBtn.setAttribute("id", "stopBtn");
        stopBtn.setAttribute("class", "create-gifs_button");
        let container = document.querySelector(".create-actions");
        container.appendChild(stopBtn);
    stopBtn.addEventListener("click", () => {
        stop();
    })
    }, 500)
}

async function stop() {
    const button = document.getElementById("stopBtn");
    button.remove()
    console.log("stopping........")
    //Creating gifo advertisement
    const ad = document.createElement("div");
    ad.setAttribute("class", "video-ad");
    videoContainer.appendChild(ad);
    const adImg = document.createElement("img");
    adImg.setAttribute("src", "./assets/loading.png");
    adImg.setAttribute("alt", "Ícono de cargando");
    ad.appendChild(adImg);
    const adText = document.createElement("p");
    adText.textContent = "Estamos configurando tu GIFO...";
    ad.appendChild(adText);
    //Stop and get blob
    await videoRecorder.stopRecording();
    await gifRecorder.stopRecording();
    const videoBlob = await videoRecorder.getBlob();
	const gifBlob = await gifRecorder.getBlob();
    video.src = URL.createObjectURL(videoBlob);
    console.log(video.src);
    videoRecorder.stream.getTracks().forEach(t => t.stop());
	video.srcObject = null;

    await videoRecorder.reset();
    await videoRecorder.destroy();
    await gifRecorder.reset();
    await gifRecorder.destroy();
    video.width = 300;
    video.play();
    video.setAttribute("loop", true);
    
    gifSrc = await gifBlob;
    console.log(gifSrc);

    gifRecorder = null;
    videoRecorder = null;

    console.log("***Upload started***");
    const formData = new FormData();
    formData.append("file", gifSrc, "myGif.gif")
    const params = {
        method: "POST",
        body: formData,
        json: true
    }
    const data = await fetchURL(`https://upload.giphy.com/v1/gifs?api_key=${api_key}`, params);
    console.log(await data);
    console.log("***Upload ended***");
    if(data.meta.status === 200) {
        ad.remove();
        const id = data.data.id;
        console.log(id);
        let uploadBtn = document.createElement("button");
        uploadBtn.innerText = "SUBIR GIFO";
        uploadBtn.setAttribute("id", "uploadBtn");
        uploadBtn.setAttribute("class", "create-gifs_button");
        let container = document.querySelector(".create-actions");
        container.appendChild(uploadBtn);
        uploadBtn.addEventListener("click", ()=> {
            uploadGif(id);
        })
    } else {console.log("There was an error")}
    return data;
}   
async function uploadGif(id) {
    //Advertisment
    const ad = document.createElement("div");
    ad.setAttribute("class", "video-ad");
    videoContainer.appendChild(ad);
    //Img
    const adImg = document.createElement("img");
    adImg.setAttribute("src", "./assets/loading.png");
    adImg.setAttribute("alt", "Ícono de cargando");
    ad.appendChild(adImg);
    //Paragraph
    const adText = document.createElement("p");
    adText.textContent = "Estamos subiendo tu GIFO";
    ad.appendChild(adText);
    //Numbers
    number2.style.backgroundColor = "#ffffff";
    number2.style.color = "#572EE5";
    number3.style.backgroundColor = "#572EE5";
    number3.style.color = "#ffffff";
    console.log("saving......")
    const api_url = "https://api.giphy.com/v1/gifs/"
    const response = await fetch(`${api_url}${id}?api_key=${api_key}`);
    console.log(response);
    const data = await response.json();
    console.log(data)
    try {
        //Save to local storage
        const source = data.data.images.downsized.url;
        const alt = "Mi Gifo";
        let gifObj = {
            src: source,
            name: alt,
        };

        if(localStorage.getItem('gifo') == null) {
            localStorage.setItem('gifo', '[]');
        }
        let favData = JSON.parse(localStorage.getItem('gifo'));
        favData.push(gifObj);
        localStorage.setItem('gifo', JSON.stringify(favData));
        const lastBtn = document.getElementById("uploadBtn");
        lastBtn.remove();
        //Popup advertisment
        const download = document.createElement("img");
        download.setAttribute("src", "./assets/icon-download.svg");
        download.setAttribute("alt", "Ícono de descargar");
        download.setAttribute("class", "ad-download");
        ad.appendChild(download);
        download.addEventListener("click", () => {downloadGif(id)})
        const link = document.createElement("img");
        link.setAttribute("src", "./assets/icon-link-normal.svg");
        link.setAttribute("alt", "Ícono de copiar enlace");
        link.setAttribute("class", "ad-link");
        ad.appendChild(link);
        const gifLink = data.data.url;
        link.addEventListener("click", () => {copyLink(gifLink)})
        //Check icon
        adImg.setAttribute("src", "./assets/check.png");
        adImg.setAttribute("alt", "Ícono de subido");
        adText.textContent = "GIFO subido con éxito";
        //Make new 2 buttons: repeat and go to my_gifos.html
        const repeatBtn = document.createElement("button");
        repeatBtn.innerText = "REPETIR CAPTURA";
        repeatBtn.setAttribute("id", "repeatBtn");
        repeatBtn.setAttribute("class", "create-gifs_button");
        const container = document.querySelector(".create-actions");
        container.appendChild(repeatBtn);
        repeatBtn.addEventListener("click", () => {
            repeatBtn.remove();
            ad.remove();
            pageBtn.remove();
            number3.style.backgroundColor = "#ffffff";
            number3.style.color = "#572EE5";
            init();
            // video.srcObject = stream;
            // record();
        })
        const pageBtn = document.createElement("button");
        pageBtn.innerText = "VER GIFOS";
        pageBtn.setAttribute("id", "pageBtn");
        pageBtn.setAttribute("class", "create-gifs_button");
        // const box = document.querySelector(".create-actions");
        container.appendChild(pageBtn);
        pageBtn.addEventListener("click", () => {
            pageBtn.remove();
            window.location.href = "../my_gifos.html";
        })
    } catch (error) {
        console.log(error);
    }
}
const downloadGif = async (id) => {
    console.log("donwloading: ", id);
    let blob = await fetch(`https://media.giphy.com/media/${id}/giphy.gif`)
    .then((img) => img.blob());
    invokeSaveAsDialog(blob, "My-gif.gif");
}
const copyLink = (gifLink) => {
    const text = document.createElement("textarea");
    text.value = gifLink;
    console.log(text.value);
    text.setAttribute("readonly", "");
    text.style.display = "none";
    document.body.appendChild(text);
    const copy = async () => {
        const value = await navigator.clipboard.writeText(text.value)
        try {
            console.log("copied"); 
        } catch (error) {
            console.log(error);
        }
    }           
    copy();
}