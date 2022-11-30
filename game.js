let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];

let gameStarted = false;
let level = 0;

$(document).keypress(function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

function checkAnswer() {
  if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern)) {
    userClickedPattern = [];
    setTimeout(nextSequence, 1000);
  } else {
    playSound();
    $(document.body).addClass("game-over");
    setTimeout(() => {
      $(document.body).removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
  }
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level " + level);
  level++;
}

$(".btn").on("click", function (event) {
  let userChosenColour = event.currentTarget.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(event.currentTarget.id);
  if (userClickedPattern.length == gamePattern.length) {
    checkAnswer();
  }
});

function playSound(name) {
  switch (name) {
    case "blue":
      let btnBlue = new Audio("sounds/blue.mp3");
      btnBlue.play();
      break;
    case "green":
      let btnGreen = new Audio("sounds/green.mp3");
      btnGreen.play();
      break;
    case "red":
      let btnRed = new Audio("sounds/red.mp3");
      btnRed.play();
      break;
    case "yellow":
      let btnYellow = new Audio("sounds/yellow.mp3");
      btnYellow.play();
      break;

    default:
      let btnWrong = new Audio("sounds/wrong.mp3");
      btnWrong.play();
      break;
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  let $this = $("#" + currentColour);
  setTimeout(function () {
    $this.removeClass("pressed");
  }, 100);
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
  level = 0;
}
