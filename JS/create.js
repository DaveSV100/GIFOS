const container = document.querySelector(".create");
const btn = document.getElementById('create-button');
const title = document.querySelector('.create-container_title');
const paragraph = document.querySelector('.create-container_paragraph');
const video = document.querySelector("#gifo");

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
    let stopBtn = document.createElement("button");
                stopBtn.innerText = "Finalizar";
                stopBtn.setAttribute("id", "stopBtn");
                let container = document.querySelector(".create");
                container.appendChild(stopBtn);
    stopBtn.addEventListener("click", () => {
        stop();
    })
}

async function stop() {
    console.log("stopping........")
    await videoRecorder.stopRecording();
    await gifRecorder.stopRecording();
    const videoBlob = await videoRecorder.getBlob();
	const gifBlob = await gifRecorder.getBlob();
    video.src = URL.createObjectURL(videoBlob);
    videoRecorder.stream.getTracks().forEach(t => t.stop());
	video.srcObject = null;

    await videoRecorder.reset();
    await videoRecorder.destroy();
    await gifRecorder.reset();
    await gifRecorder.destroy();

    gifSrc = await gifBlob;
    console.log(gifSrc);
    
    // video.remove();
    // let video2 = document.createElement("video");
    // video2.setAttribute("id", "videoElement")
    // video2.controls = true;
    // let videoContainer = document.querySelector('.create-container');
    // videoContainer.appendChild(video2);
    // video2.src = URL.createObjectURL(await gifBlob);

    gifRecorder = null;
    videoRecorder = null;

    console.log("***Upload started***");
    const api_key = "efARnSmXUsXz3XqFvbyykWkVyNi3IIuQ";
    const formData = new FormData();
    formData.append("file", gifSrc, "myGif.gif");
    const params = {
        method: "POST",
        body: formData,
        json: true
    }
    const data = await fetchURL(`https://upload.giphy.com/v1/gifs?api_key=${api_key}`, params);
    console.log(await data);
    console.log("***Upload ended***");
    return await data;
    // uploadCreatedGif()
}   

// async function uploadCreatedGif() {
    
// }















//222222222222222222222
// let constraintObj = { 
//     audio: false, 
//     video: { 
//         facingMode: "user", 
//         width: 300, height: 250
//         //   width: { min: 640, ideal: 1280, max: 1920 },
//         //   height: { min: 480, ideal: 720, max: 1080 } 
//         // width: 1280, height: 720  -- preference only
//         // facingMode: {exact: "user"}
//         // facingMode: "environment"
//     } 
// }; 

//  //handle older browsers that might implement getUserMedia in some way
//  if (navigator.mediaDevices === undefined) {
//     navigator.mediaDevices = {};
//     navigator.mediaDevices.getUserMedia = function(constraintObj) {
//         let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//         if (!getUserMedia) {
//             return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
//         }
//         return new Promise(function(resolve, reject) {
//             getUserMedia.call(navigator, constraintObj, resolve, reject);
//         });
//     }
// }else{
//     navigator.mediaDevices.enumerateDevices()
//     .then(devices => {
//         devices.forEach(device=>{
//             console.log(device.kind.toUpperCase(), device.label);
//             //, device.deviceId
//         })
//     })
//     .catch(err=>{
//         console.log(err.name, err.message);
//     })
// }

// navigator.mediaDevices.getUserMedia(constraintObj)

// .then(function(mediaStreamObj) {
//     // create video element
//     let video = document.createElement('video');
//     video.setAttribute('id', 'video1');
//     let videoContainer = document.querySelector('.create-container');
//     videoContainer.appendChild(video);

//     if("srcObject" in video) {
//         video.srcObject = mediaStreamObj;
//     } else {
//         //old version
//         video.src = window.URL.createObjectURL(mediaStreamObj);
//     }
//     video.onloadedmetadata = function(ev) {
//         //showing the video element that's being captured by the webcam
//         video.play();
//     }
    
//     // let mediaRecorder = new MediaRecorder(mediaStreamObj);
//     // let chunks = [];
//     // // if(btn.innerText === "Empezar") {
//     // //     btn.innerText = "Grabar";
//     // // }
//     // btn.addEventListener("click", (ev) => {
//     //     mediaRecorder.start();
//     //     console.log("recording......")
//     //     btn.remove();
//     //     let stopBtn = document.createElement("button");
//     //     stopBtn.innerText = "Finalizar";
//     //     stopBtn.setAttribute("id", "stopBtn");
//     //     let container = document.querySelector(".create");
//     //     container.appendChild(stopBtn);
//     //     stopBtn.addEventListener("click", ()=> {
//     //         mediaRecorder.stop();
//     //         console.log("stopping.......")
//     //         video.remove();
//     //     })
//     //     mediaRecorder.ondataavailable = function(ev) {
//     //         chunks.push(ev.data);
//     //     }
//     //     mediaRecorder.onstop = (ev) => {
//     //         let video = document.createElement("video");
//     //         video.setAttribute("id", "videoElement")
//     //         video.controls = true;
//     //         let videoContainer = document.querySelector('.create-container');
//     //         videoContainer.appendChild(video);
//     //         let blob = new Blob(chunks, { "type" : "video/mp4;" });
//     //         console.log(blob);
            
            
//     //         let videoURL = window.URL.createObjectURL(blob);
//     //         video.src = videoURL;
//     //         console.log(videoURL);

            

//     //      const api_key = "efARnSmXUsXz3XqFvbyykWkVyNi3IIuQ";
//     //         const apiUrl = "https://upload.giphy.com/v1/gifs?";
//     //      const hidder = new Headers()

//     //         async function uploadGif () {
//     //             let form = new FormData();
//     //             form.append("file", blob, "myGif.gif");
//     //             console.log(form.get('file'))
//     //             const giphy = await fetch(`${apiUrl}&api_key=${api_key}`,{
//     //                 method:"POST",
//     //                 body: form,
//     //                 json: true
//     //                 })
//     //             const data = await giphy.json();
//     //             return data;
//     //         }
//     //         uploadGif()
//     //      .then(result => {
//     //          console.log(result);
//     //      })
//     //      .catch(error => {
//     //          console.error("Error: ", error)
//     //      })
//     //      chunks = [];
//     //     }
        
//     // })    
// })
// .catch(function(err) { 
//     console.log(err.name, err.message); 
// });


























//333333333333333333
// let constraintObj = { 
//     audio: false, 
//     video: { 
//         facingMode: "user", 
//         width: 300, height: 250
//         //   width: { min: 640, ideal: 1280, max: 1920 },
//         //   height: { min: 480, ideal: 720, max: 1080 } 
//         // width: 1280, height: 720  -- preference only
//         // facingMode: {exact: "user"}
//         // facingMode: "environment"
//     } 
// }; 

//  //handle older browsers that might implement getUserMedia in some way
//  if (navigator.mediaDevices === undefined) {
//     navigator.mediaDevices = {};
//     navigator.mediaDevices.getUserMedia = function(constraintObj) {
//         let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//         if (!getUserMedia) {
//             return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
//         }
//         return new Promise(function(resolve, reject) {
//             getUserMedia.call(navigator, constraintObj, resolve, reject);
//         });
//     }
// }else{
//     navigator.mediaDevices.enumerateDevices()
//     .then(devices => {
//         devices.forEach(device=>{
//             console.log(device.kind.toUpperCase(), device.label);
//             //, device.deviceId
//         })
//     })
//     .catch(err=>{
//         console.log(err.name, err.message);
//     })
// }

// navigator.mediaDevices.getUserMedia(constraintObj)
// .then(function(mediaStreamObj) {
//     // create video element
//     let video = document.createElement('video');
//     video.setAttribute('id', 'video1');
//     let videoContainer = document.querySelector('.create-container');
//     videoContainer.appendChild(video);

//     if("srcObject" in video) {
//         video.srcObject = mediaStreamObj;
//     } else {
//         //old version
//         video.src = window.URL.createObjectURL(mediaStreamObj);
//     }
//     video.onloadedmetadata = function(ev) {
//         //showing the video element that's being captured by the webcam
//         video.play();
//     }

//     let mediaRecorder = new MediaRecorder(mediaStreamObj);
//     let chunks = [];

//     // if(btn.innerText === "Empezar") {
//     //     btn.innerText = "Grabar";
//     // }
//     btn.addEventListener("click", (ev) => {
//         mediaRecorder.start();
//         console.log("recording......")
//         btn.remove();
//         let stopBtn = document.createElement("button");
//         stopBtn.innerText = "Finalizar";
//         stopBtn.setAttribute("id", "stopBtn");
//         let container = document.querySelector(".create");
//         container.appendChild(stopBtn);
//         stopBtn.addEventListener("click", ()=> {
//             mediaRecorder.stop();
//             console.log("stopping.......")
//             video.remove();
//         })
//         mediaRecorder.ondataavailable = function(ev) {
//             chunks.push(ev.data);
//         }
//         mediaRecorder.onstop = (ev) => {
//             let video = document.createElement("video");
//             video.setAttribute("id", "videoElement")
//             video.controls = true;
//             let videoContainer = document.querySelector('.create-container');
//             videoContainer.appendChild(video);
//             let blob = new Blob(chunks, { "type" : "video/mp4;" });
//             console.log(blob);
//             chunks = [];
//             let videoURL = window.URL.createObjectURL(blob);
//             video.src = videoURL;
//             console.log(videoURL);
//             // const apiUrl = "https://upload.giphy.com/v1/gifs?&api_key=efARnSmXUsXz3XqFvbyykWkVyNi3IIuQ"
//             // async function upload() {
                
//             // }
//         }
        
//     })    
// })
// .catch(function(err) { 
//     console.log(err.name, err.message); 
// });



































//444444444444444444444

// btn.addEventListener('click', () => {
//     title.textContent = "¿Nos das acceso a tu cámara?";
//     paragraph.textContent = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO."
//     const number1 = document.querySelector('.create-number1');
//     number1.style.backgroundColor = "#572EE5";
//     number1.style.color = "#ffffff";
//     btn.remove();
//     let constraintObj = { 
//       audio: false, 
//       video: { 
//           facingMode: "user", 
//           width: 300, height: 250
//         //   width: { min: 640, ideal: 1280, max: 1920 },
//         //   height: { min: 480, ideal: 720, max: 1080 } 
//       } 
//   }; 
//   // width: 1280, height: 720  -- preference only
//   // facingMode: {exact: "user"}
//   // facingMode: "environment"
  
//   //handle older browsers that might implement getUserMedia in some way
//   if (navigator.mediaDevices === undefined) {
//       navigator.mediaDevices = {};
//       navigator.mediaDevices.getUserMedia = function(constraintObj) {
//           let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//           if (!getUserMedia) {
//               return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
//           }
//           return new Promise(function(resolve, reject) {
//               getUserMedia.call(navigator, constraintObj, resolve, reject);
//           });
//       }
//   }else{
//       navigator.mediaDevices.enumerateDevices()
//       .then(devices => {
//           devices.forEach(device=>{
//               console.log(device.kind.toUpperCase(), device.label);
//               //, device.deviceId
//           })
//       })
//       .catch(err=>{
//           console.log(err.name, err.message);
//       })
//   }

//   navigator.mediaDevices.getUserMedia(constraintObj)
//   .then(function(mediaStreamObj) {
//       //create video element
//       let camera = document.createElement('video');
//       camera.setAttribute('id', 'video1');
//       let videoContainer = document.querySelector('.create-container');
//       videoContainer.appendChild(camera);
//       //change styles
//       number1.style.backgroundColor = "#ffffff";
//       number1.style.color = "#572EE5";
//       const number2 = document.querySelector('.create-number2');
//       number2.style.backgroundColor = "#572EE5";
//       number2.style.color = "#ffffff";
//       //change button from "comenzar" to "grabar"
//       let recordBtn = document.createElement('button');
//       recordBtn.textContent = 'GRABAR';
//       let container = document.querySelector('.create');
//       container.appendChild(recordBtn);
//       //connect the media stream to the first video element
//       let video = document.querySelector('#video1');
//       if ("srcObject" in video) {
//           video.srcObject = mediaStreamObj;
//       } else {
//           //old version
//           video.src = window.URL.createObjectURL(mediaStreamObj);
//       }
      
//       video.onloadedmetadata = function(ev) {
//           //show in the video element what is being captured by the webcam
//           video.play();
//       };
      
//       //add listeners for saving video/audio
//     //   let start = document.getElementById('btnStart');
//     //   let stop = document.getElementById('btnStop');
//     //   let vidSave = document.getElementById('vid2');
//       let mediaRecorder = new MediaRecorder(mediaStreamObj);
//       let chunks = [];
      
      
//        recordBtn.addEventListener('click', (ev)=>{
//           recordBtn.remove();
//           mediaRecorder.start();
//           console.log(mediaRecorder.state);

//           let stopBtn = document.createElement('button');
//           stopBtn.setAttribute('id', 'stopBtn');
//           stopBtn.textContent = 'FINALIZAR';
//           container.appendChild(stopBtn);
//       })
//       const stopButton = document.getElementById("stopBtn");
//       stopButton.addEventListener('click', (ev)=> {
//           //change button from "finalizar" to "subir gifo"
//         console.log('clicked')
//         //   mediaRecorder.stop();
//         //   console.log(mediaRecorder.state);
//         //   stopButton.remove();
//         //   let uploadBtn = document.createElement('button');
//         //   uploadBtn.setAttribute('id', 'uploadBtn');
//         //   uploadBtn.textContent = 'SUBIR GIFO';
//         //   container.appendChild(uploadBtn);
//       });
//       mediaRecorder.ondataavailable = function(ev) {
//           chunks.push(ev.data);
//       }
//       let uploadButton = document.getElementById('uploadBtn');
//       uploadButton.addEventListener('click', (ev) => {
//         //remove button
//         uploadButton.remove();
//         console.log('Gif uploaded');
//       })
//       mediaRecorder.onstop = (ev)=>{
//           let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
//           chunks = [];
//           let videoURL = window.URL.createObjectURL(blob);
//           camera.src = videoURL;
//       }
//   })
//   .catch(function(err) { 
//       console.log(err.name, err.message); 
//   });
// });
