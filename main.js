Webcam.set({
    width:350,
    height: 300,
    image_format: 'jpg',
    jpg_quality: 90
});

camera= document.getElementById("camera");
Webcam.attach("#camera");

function take_Snapshot(){
    Webcam.snap( function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+ data_uri+'" > ' ;
    });
}
console.log('ml5 version- ', ml5.version);
classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/1hT3tfj84/model.json",modelLoaded);
 
function modelLoaded(){
    console.log("modelLoaded");

}

function speak(){
    Synth= window.speechSynthesis;
    Speak_data1= " The first prediction is"+ prediction1;
    Speak_data2= " The second prediction is" + prediction2;
    Utter_this= new SpeechSynthesisUtterance(Speak_data1+ Speak_data2);
    Utter_this.rate= 1.0;
    Synth.speak(Utter_this);
}

function check(){
    image= document.getElementById("captured_image");
    classifier.classify(image,gotResult);
}

function gotResult(error,results){
if (error){
console.error(error);
}
else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML= results[0].label ;
    document.getElementById("result_emotion_name2").innerHTML= results[1].label;
    prediction1= results[0].label;
    prediction2= results[1].label;
    speak();
    if(results[0].label == "happy") 
    { document.getElementById("update_emoji").innerHTML = "&#128512;";
 }
    if(results[0].label == "sad") 
    { document.getElementById("update_emoji").innerHTML = "&#128532;";
 }
    if(results[0].label == "angry") 
    { document.getElementById("update_emoji").innerHTML = " &#128545; "; 
}
    if(results[0].label == "surprised") 
    { document.getElementById("update_emoji").innerHTML = "&#128561;"; 
}
    if(results[1].label == "happy") 
    { document.getElementById("update_emoji2").innerHTML =  "&#128512;"; 
}
    if(results[1].label == "sad") 
    { document.getElementById("update_emoji2").innerHTML = "&#128532;"; 
}
    if(results[1].label == "angry") 
    { document.getElementById("update_emoji2").innerHTML = "&#128545;"; 
}
    if(results[1].label == "surprised") 
    { document.getElementById("update_emoji2").innerHTML = " &#128561; ";
 }
    }
}

