const btn = document.getElementById('create-button');
const title = document.querySelector('.create-container_title');
const paragraph = document.querySelector('.create-container_paragraph');

// btn.addEventListener("click", ()=> {
//     if(btn.innerText === "Comenzar"){
//         btn.innerText = "Grabar";
//     }
//     else if(btn.innerText === "Grabar"){
//         btn.innerText= "Finalizar";
//     }
//     else if(btn.innerText === "Finalizar") {
//         btn.innerText= "Upload";
//     }
// });

// const upload_url = "https://upload.giphy.com/v1/gifs?";
// const api = `${upload_url}&api_key=efARnSmXUsXz3XqFvbyykWkVyNi3IIuQ`;

// const upload = async () => {
//     const response = await fetch(api);
//     const data = await response.json();
//     console.log(data);
//     return data;
// }
// upload()
// .then(response => {
//     console.log(response);
// })
// .catch(err => {
//     console.error("something went wrong", err);
// })



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

 //handle older browsers that might implement getUserMedia in some way
 if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
    navigator.mediaDevices.getUserMedia = function(constraintObj) {
        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraintObj, resolve, reject);
        });
    }
}else{
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        devices.forEach(device=>{
            console.log(device.kind.toUpperCase(), device.label);
            //, device.deviceId
        })
    })
    .catch(err=>{
        console.log(err.name, err.message);
    })
}

navigator.mediaDevices.getUserMedia(constraintObj)
.then(function(mediaStreamObj) {
    // create video element
    let video = document.createElement('video');
    video.setAttribute('id', 'video1');
    let videoContainer = document.querySelector('.create-container');
    videoContainer.appendChild(video);

    if("srcObject" in video) {
        video.srcObject = mediaStreamObj;
    } else {
        //old version
        video.src = window.URL.createObjectURL(mediaStreamObj);
    }
    video.onloadedmetadata = function(ev) {
        //showing the video element that's being captured by the webcam
        video.play();
    }


    
	let mediaRecorder = new MediaRecorder(mediaStreamObj);
    let chunks = [];
    // if(btn.innerText === "Empezar") {
    //     btn.innerText = "Grabar";
    // }
    btn.addEventListener("click", (ev) => {
        mediaRecorder.start();
        console.log("recording......")
        btn.remove();
        let stopBtn = document.createElement("button");
        stopBtn.innerText = "Finalizar";
        stopBtn.setAttribute("id", "stopBtn");
        let container = document.querySelector(".create");
        container.appendChild(stopBtn);
        stopBtn.addEventListener("click", ()=> {
            mediaRecorder.stop();
            console.log("stopping.......")
            video.remove();
        })
        mediaRecorder.ondataavailable = function(ev) {
            chunks.push(ev.data);
        }
        mediaRecorder.onstop = (ev) => {
            let video = document.createElement("video");
            video.setAttribute("id", "videoElement")
            video.controls = true;
            let videoContainer = document.querySelector('.create-container');
            videoContainer.appendChild(video);
            let blob = new Blob(chunks, { "type" : "video/mp4;" });
            console.log(blob);
			
            
            let videoURL = window.URL.createObjectURL(blob);
            video.src = videoURL;
            console.log(videoURL);

			let form = new FormData();
			form.append("file", blob, "myGif.gif");
			console.log(form.get('file'))

			const api_key = "efARnSmXUsXz3XqFvbyykWkVyNi3IIuQ";
            const apiUrl = "https://upload.giphy.com/v1/gifs?";
			const hidder = new Headers()

            fetch(`${apiUrl}&api_key=${api_key}`,{
            method:"POST",
			body:form
            })
			.then(res => res.json())
			.then(result => {
				console.log(result);
			})
			.catch(error => {
				console.error("Error: ", error)
			})
			chunks = [];
        }
        
    })    
})
.catch(function(err) { 
    console.log(err.name, err.message); 
});




















































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






























// async function createGif() {
//     let response = await 
// }


// const url = () => {
//     const vid = document.getElementsByTagName("video");
//     if(vid.controls === true) {
//         const myVideo = document.getElementById("videoElement").src;
//         console.log(myVideo);
//     }
//     // const newVideo = document.getElementsByTagName("video")
//     // console.log(newVideo.srcObject);
   
//     // if(newVideo.id === "videoElement") {
//     //     console.log("Video url.......")
//     // } else {
//     //     console.log("......it doesn't exist yet")
//     // }
// }
// url();




































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
