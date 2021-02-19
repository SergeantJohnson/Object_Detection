img="";
status="";
objects=[];

function preload() {
  img=loadImage('dog_cat.jpg');
}

function setup() {
canvas=createCanvas(640,410);
canvas.center();
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting Objects"
}



function modelLoaded () {
  console.log("Model Loaded!");
  objectDetector.detect(img,gotResults);
  status=true;
  
}

function gotResults(error,results) {
  if(error) {
    console.error(error);
  }
   console.log(results);
   objects=results;
   console.log(objects.length);
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
      text(objects[i].label+" "+percentage+"%",objects[i].x+5,objects[i].y+15);
      noFill();
      stroke('#05ff16');
      rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    } 
  }
}