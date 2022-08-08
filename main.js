song = "" ;

function preload() {
    song=loadSound("music.mp3");
}

LeftwristX= 0;
LeftwristY= 0;

RightwristX= 0;
RightwristY= 0;

ScoreLeft= 0;
ScoreRight= 0;

function setup(){
    canvas = createCanvas(650,550);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelloaded);
    posenet.on("pose", gotposes);
}



function m(){
    song.stop();
    song.play();

    song.setVolume(1);
    song.rate(1);

}
 function s(){
    song.stop();
 }

function modelloaded(){
    console.log("model has started");
}

function gotposes(results){
  if(results.length>0){
    console.log(results);
   }
    LeftwristX = results[0].pose.leftWrist.x;
    LeftwristY = results[0].pose.leftWrist.y;

    RightwristX = results[0].pose.rightWrist.x;
    RightwristY = results[0].pose.rightWrist.y;

    ScoreLeft = results[0].pose.keypoints[9].score;
    ScoreRight= results[0].pose.keypoints[10].score;
}

function draw(){
  image(video,0,0, 650, 550);
  
  if(ScoreLeft>0.2) {
    circle(LeftwristX,LeftwristY,20);
    number = Number(LeftwristY);
    wholeNumber =floor(number);
    volume = wholeNumber/550;
    document.getElementById("Volume-of-music").innerHTML=" : " + volume + " ";
    song.setVolume(volume);
  }

  if(ScoreRight>0.2) {
    circle(RightwristX,RightwristY,20);
    if(RightwristY>0 && RightwristY<=100){
      document.getElementById("speed-of-music").innerHTML=" : " + 0.5 + "x ";
      song.rate(0.5);
    }
    else if(RightwristY>100 && RightwristY<=200 ){
      document.getElementById("speed-of-music").innerHTML=" : " + 1 + "x ";
      song.rate(1);

    }
    else if(RightwristY>200 && RightwristY<=300 ){
      document.getElementById("speed-of-music").innerHTML=" : " + 1.5 + "x ";
      song.rate(1.5);

    }
    else if(RightwristY>300 && RightwristY<=400 ){
      document.getElementById("speed-of-music").innerHTML=" : " + 2 + "x ";
      song.rate(2);

    }
    else if(RightwristY>400 && RightwristY<=550 ){
      document.getElementById("speed-of-music").innerHTML=" : " + 2.5 + "x ";
      song.rate(2.5);

    }
  }


  }