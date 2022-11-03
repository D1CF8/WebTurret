var body, num, array, width, context, logo, myElements, analyser, src, height;

contAudio = 0;
countShot = 0;

const audio_Activate = new Audio("./audio/1.wav");
const audio_Shot = new Audio("./audio/2.wav");

body = document.querySelector('body');

num = 32;

array = new Uint8Array(num*2);

width = 10;

window.onclick = function(){

    if(context) return;

    body.querySelector('img').remove();

    for(var i = 0 ; i < num ; i++){
        logo = document.createElement('div');
        logo.className = 'logo';
        logo.style.background = '#319dff';
        logo.style.minWidth = width+'px';
        body.appendChild(logo);
    }

    myElements = document.getElementsByClassName('logo');
    context = new AudioContext();
    analyser = context.createAnalyser();

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        src = context.createMediaStreamSource(stream);
        src.connect(analyser);
        loop();
    }).catch(error => {
        alert(error + '\r\n\ Отклонено. Страница будет обновлена!');
        location.reload();
    });
}

function loop() {
    window.requestAnimationFrame(loop);
    analyser.getByteFrequencyData(array);
    for(var i = 0 ; i < num ; i++){
        height = array[i+num];
        myElements[i].style.minHeight = height+'px';
        myElements[i].style.opacity = 0.008*height;
    }

Activation();

function Activation() {
    if (countShot != 10) {
        countShot += 1;
        if (height > 150) {
            body.style.background = 'url("./image/2.png")';
            if (contAudio == 0) {
                audio_Activate.play();
                contAudio += 1;
            }
            audio_Shot.play();
        }
    } else {
        countShot = 0;
        body.style.background = 'url("./image/1.png")';
    }
}
}