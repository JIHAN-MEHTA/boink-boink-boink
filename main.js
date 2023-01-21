


song = "";
// new
scoreLeftWrist = 0;
scoreRightWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.position(520, 200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        //new
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreRightWrist = " + scoreRightWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        //console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        //console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
    }
}
function draw() {
    image(video, 0, 0, 500, 500);

    fill("#FF0000");
    stroke("#FF0000");

    // if (scoreRightWrist > 0) {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "speed=0.5x"
            song.rate(0.5)
        }

        else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "speed=1x"
            song.rate(1)
        }
        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "speed=1.5x"
            song.rate(1.5)
        }
        else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "speed=2x"
            song.rate(2)
        }
        else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "speed=2.5x"
            song.rate(2.5)
        }
    //}


        if (scoreLeftWrist > 0.2) {
            circle(leftWristX, leftWristY, 20);
            // y is going to be between 0 to 500
            // y= 344.55 speed= 344.55 speed 0 to 1
            // i am 29 years old
            num = Number(leftWristY); // num = 344.55
            remove_decimals = floor(num); // num= 344
            volume = remove_decimals / 500; // 344/500 = 0.688
            document.getElementById("volume").innerHTML = "Volume = " + volume;
            song.setVolume(volume);

        }
    }

    function play() {

        song.play();
        song.rate(1);
    }