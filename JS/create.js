const start = document.getElementById('create-button');
const title = document.querySelector('.create-container_title');
const paragraph = document.querySelector('.create-container_paragraph');
const number1 = document.querySelector('.create-number1');


start.addEventListener('click', () => {
    title.textContent = "¿Nos das acceso a tu cámara?";
    paragraph.textContent = "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO."
    number1.style.backgroundColor = "#572EE5";
    number1.style.color = "#ffffff";
    start.remove();

    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      /* use the stream */
    })
    .catch(function(err) {
      /* handle the error */
    });
    
    // async function getMedia(constraints) {
    //     let stream = null;
    
    //     try {
    //         stream = await navigator.mediaDevices.getUserMedia(constraints);
    //         console.log("Hey, give us the permission")
    //     } catch (err) {
    //         console.error("Something went wrong :/", err);
    //     };
    // }
});

