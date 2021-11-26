
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;
var highScore = 0;

//define function for random number 0-3
function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);

  //get a random color
  var randomChosenColor = buttonColors[randomNumber];
  //add the random color to the game pattern array
  gamePattern.push(randomChosenColor);

  //animate the button
  $('#' + randomChosenColor).fadeOut(100).fadeIn(100);

  //play the button's color
  playSound(randomChosenColor);

  //increase the level
  level++;

  //update the h1 text to show the current Level
  $("h1").text("Level " + level);

}

//play the button's sound based on passed color
function playSound(name) {
  var beep = new Audio("sounds/" + name + ".mp3");
  beep.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass("pressed");
  setTimeout(function() {
    $('#' + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout( function() {
          nextSequence();
      }, 1000);
    }

  }
  else {
    console.log("wrong");

    var playErr = new Audio("sounds/wrong.mp3");
    playErr.play();

    //flash the game over screen 'style'
    $("body").addClass("game-over");
    setTimeout( function() {
      //I slowed down the removal, make it hurt more
      $("body").removeClass("game-over");
    }, 2000);

    //post game over message
    $("h1").text("Game Over, Press Any Key to Restart");

    //see if high score needs to be updated
    if (level >= highScore) {
      highScore = level;
      $("#high-score").text(level)
    }

    //reset and start again
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//detect when a button is clicked
$(".btn").click(function () {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function() {
    if (started === false) {
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
    }
});

$(document).on("tap", function() {
  if (started === false) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
}
