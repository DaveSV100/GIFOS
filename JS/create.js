const container = document.querySelector(".create-actions");
const btn = document.getElementById('create-button');
const title = document.querySelector('.create-container_title');
const paragraph = document.querySelector('.create-container_paragraph');
const video = document.querySelector("#gifo");
const api_key = "efARnSmXUsXz3XqFvbyykWkVyNi3IIuQ";
let totalTime = 0;
let newGifId = "";
let videoRecorder;
let gifRecorder;
let gifSrc;
let playing = false;

//Async await instead of promises and .then
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
    const stream = await navigator.mediaDevices.getUserMedia(constraintObj);
    video.srcObject = stream;
    await video.play();
    record()
}

async function record() {
    console.log("let's record")
    btn.remove();
    const recordBtn = document.createElement("button");
    recordBtn.setAttribute("id", "recordBtn");
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
        stopBtn.innerText = "Finalizar";
        stopBtn.setAttribute("id", "stopBtn");
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
        const id = data.data.id;
        console.log(id);
        let uploadBtn = document.createElement("button");
        uploadBtn.innerText = "Subir GIFO";
        uploadBtn.setAttribute("id", "uploadBtn");
        let container = document.querySelector(".create-actions");
        container.appendChild(uploadBtn);
        uploadBtn.addEventListener("click", ()=> {
            uploadGif(id);
        })
    } else {console.log("There was an error")}
    return data;
}   
async function uploadGif(id) {
    console.log("saving......")
    const api_url = "https://api.giphy.com/v1/gifs/"
    const response = await fetch(`${api_url}${id}?api_key=${api_key}`);
    console.log(response);
    const data = await response.json();
    console.log(data)
    try {
        const new_data = data.data.images.downsized.url;
        if(localStorage.getItem('gifo') == null) {
            localStorage.setItem('gifo', '[]');
        }
        let old_data = JSON.parse(localStorage.getItem('gifo'));
        old_data.push(new_data);
        localStorage.setItem('gifo', JSON.stringify(old_data));
        // let gif = document.createElement("img");
        // gif.setAttribute("src", data.data.images.downsized.url);
        // gif.setAttribute("alt", "mygif");
        // container.appendChild(gif);
    } 
    //From ecma script on you just need to place the catch and console log (error) and all of this stuff are not necessary anymore
    catch {}
}