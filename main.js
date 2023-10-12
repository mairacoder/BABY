img = "";
status = "";
objects = [];

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"

}

function preload() {
    song = loadSound("alarm.mp3")
}


function draw() {
    image(video, 0, 0, 640, 420);
   if(status != "")
   {
    console.log("status")
    console.log("no of objects detected:" + objects.length)
    objectDetector.detect(video, gotResult);
        for(i = 0; i< objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;

            fill ("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text (objects[i].label + " " + percent + "%" , objects[i]. x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect (objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person"){
                document.getElementById("number_of_objects").innerHTML = "Baby found";
                console.log("stop");
                song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML = "Baby not found";
                console.log("play");
                song.play();
            }
    }
if(objects.length == 0){
    document.getElementById("number_of_objects").innerHTML = "Baby not found";
                console.log("play");
                song.play();
}
   }

   
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}