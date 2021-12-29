var hasStarted1 = false;
var hasStarted2 = false;
var random1;
var time1 = 0;
var time2 = 0;
var timeColor;
var scores = [];
var scoresSorted = [];
var scoresText = "";

function start() {
  hasStarted1 = true;
  document.getElementById("main1").style.display = "none";
  document.getElementById("body").style.backgroundImage = "unset";
  document.getElementById("body").style.backgroundColor = "white";

  random1 = Math.floor(Math.random()*1000)+5000;

  var a = setTimeout(() => {
    if (hasStarted2 === false) {
      document.getElementById("body").style.backgroundImage = "unset";
      document.getElementById("body").style.backgroundColor = "blue";
      time1 = new Date().getTime();
    }
  },random1)
}

function test() {
  hasStarted2 = true;
  if (hasStarted1 === true) {
    if (time1 === 0) {
      document.getElementById("body").style.backgroundColor = "red";
      document.getElementById("main2Text").style.color = "black";
      document.getElementById("main2Text").style.fontSize = "30px";
      document.getElementById("main2Text").innerHTML = "FAIL";

      setTimeout(() => {
        home();
      },1000)

    } else {
      time2 = new Date().getTime()-time1;
      scores.push(time2);
      if (time2 < 50) {
        timeColor = "#ffc100";
      } else if (time2 < 100) {
        timeColor = "#15ff00";
      } else if (time2 < 200) {
        timeColor = "#e480ff";
      } else if (time2 < 500) {
        timeColor = "#4fd7ff";
      } else if (time2 < 1000) {
        timeColor = "#ff6700";
      } else {
        timeColor = "#ff0000";
      }
      document.getElementById("main2Text").innerHTML = "You took " + "<span style='color:" + timeColor + "'>" + time2 + "</span>" + " milliseconds";
      setTimeout(() => {
        home();
      },1000)
    }
  }
}

function home() {

  if (localStorage.getItem("scores") === null) {
    localStorage.setItem("scores",JSON.stringify(scores));
  } else if (localStorage.getItem("scores") !== null) {
    localStorage.scores = JSON.stringify(scores);
  }

  hasStarted1 = false;
  hasStarted2 = false;
  random1 = 0;
  time1 = 0;
  time2 = 0;
  timeColor = "";
  scoresSorted = [];
  scoresText = "";

  document.getElementById("body").style.backgroundImage = "url(images/background1.png)";
  document.getElementById("main1").style.display = "block";
  document.getElementById("main2Text").innerHTML = "";
  scoresSorted = scores.sort(function(a, b){return a-b});

  for (i = 0; i < scoresSorted.length && i < 20; i++) {
    scoresText += "<span style='font-weight:bolder'>" + (i+1) + ") </span>" + scoresSorted[i] + " msec" + "<br>";
  }
  document.getElementById("asideScores").innerHTML = scoresText;
}

function getLocalStorage() {
  if (localStorage.getItem("scores") !== null) {
    scores = JSON.parse(localStorage.getItem("scores"));
  }
  home();
}