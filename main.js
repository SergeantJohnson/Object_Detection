img="";
status="";
objects=[];

function preload() {
  img=loadImage('dog_cat.jpg');
}

function setup() {
canvas=createCanvas(640,410);
canvas.center();
object_detector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting Objects"
}

function draw() {
    image(img,0,0,640,410);
    if(status!="") {
      document.getElementById("status").innerHTML="Status: Objects are Detected";
        console.log(objects.length);
      for(i=0;i<objects.length;i++) {
        console.log(i);
        fill('#ff0000');
        percentage=floor(objects[i].confidence*100);
        console.log(percentage);
        text(objects[i].label+" "+percentage+"%",objects[i].x,objects[i].y);
        noFill();
        stroke('#05ff16');
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      } 
    }
}

function modelLoaded () {
  console.log("Model Loaded!");
  object_detector.detect(img,gotResults);
  status=true;
  
}

function gotResults(results,error) {
  if (error) {
    console.log(error);
  } else{
    console.log(results);
    objects=results;
    console.log(objects);
  }

  
}