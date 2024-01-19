prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("results").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/2p4jtHmI9/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded')
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        document.getElementById("result_gesture_name").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if(results[0].label == "Up"){
            document.getElementById("update_gesture").innerHTML = "&#128070;";
        }

        if(results[0].label == "Good"){
            document.getElementById("update_gesture").innerHTML = "&#128077;";
        }

        if(results[0].label == "Peace"){
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }

        if(results[0].label == "Bad"){
            document.getElementById("update_gesture").innerHTML = "&#128078;";
        }

        if(results[0].label == "Down"){
            document.getElementById("update_gesture").innerHTML = "&#128071;";
        }

        if(results[1].label == "Up"){
            document.getElementById("update_gesture2").innerHTML = "&#128070;";
        }

        if(results[1].label == "Good"){
            document.getElementById("update_gesture2").innerHTML = "&#128077;";
        }

        if(results[1].label == "Peace"){
            document.getElementById("update_gesture2").innerHTML = "&#9996;";
        }

        if(results[1].label == "Bad"){
            document.getElementById("update_gesture2").innerHTML = "&#128078;";
        }

        if(results[1].label == "Down"){
            document.getElementById("update_gesture2").innerHTML = "&#128071;";
        }
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is - "+ prediction_1;
    speak_data_2 = "The second predictino is - "+ prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    utterThis.rate = 0.5;
    synth.speak(utterThis);
}