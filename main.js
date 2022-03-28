objects=[];

function preload(){
  alert_sound=loadSound("shark.mp3");
}

function setup() {
  canvas=createCanvas(640,420);
  canvas.center();
  detector=ml5.objectDetector("cocossd",modelLoaded);
  video=createCapture(VIDEO);
  video.hide();
}
function draw() {
  image(video,0,0,640,420);  
  detector.detect(video,gotResult);

 for(var i=0;i<objects.length; i++){ 
  if(object_name="person"){
    document.getElementById("baby_status").innerHTML="Baby Found";
    object_x=Math.floor(objects[i].x);
    object_y=Math.floor(objects[i].y);
   object_height=Math.floor(objects[i].height);
    object_width=Math.floor(objects[i].width);
    object_name=objects[i].label;
    object_confidence=Math.floor(objects[i].confidence*100)+"%";
    noFill();
    rect(object_x,object_y,object_width,object_height);    
    text(object_name+","+object_confidence,object_x,object_y);
    alert_sound.stop();
  } 
  else{
    document.getElementById("baby_status").innerHTML="Baby Not Found";
    alert_sound.play();
  }
 }
  

}
function modelLoaded() {
  console.log("model is loaded");
  
 
  document.getElementById("status").innerHTML="Status : objects are being detected";

}

function gotResult(error,results){
  
  if(error){
    console.error(error);
  }
  else {
    console.log(results);
    objects=results;
  }
  
}

