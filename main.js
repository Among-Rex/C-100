var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function(event) {
    console.log(event);
    var content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = content;
    console.log(content);
    //speak();
    if (content == "take my selfie") {
        console.log("Taking Selfie");
        speak();
    }
}

function speak() {
    console.log("Inside Speak Function");
    var synth = window.speechSynthesis;
    speak_data = document.getElementById("textbox").value;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);
    setTimeout(function() {
        takeSnapShot();
        save();
    }, 5000);
}

camera = document.getElementById("camera");
Webcam.set({
    width:360,
    height:250,
    image_format:'jpeg',
    jpeg_quality:90
});

function takeSnapShot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_img" src="'+data_uri+'"/>';
    });
}

function save() {
    link = document.getElementById("link");
    img = document.getElementById("selfie_img").src;
    link.href = img;
    link.click();
}