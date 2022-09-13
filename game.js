
let buttonColors = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let firstKey = true;

function checkAnswer(level)
{
  if (userClickedPattern[level] === gamePattern[level])
  {
    console.log(true);
    if (level+1 === gamePattern.length)
    {
      console.log("user finished pattern");
    }
  }
  else {
    startOver();
  }
}

function animateButton(name)
{
  $("#"+name).animate({opacity:0},10);
  $("#"+name).animate({opacity:1},10);
}

function playAudio(name)
{
  let audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

$(document).keypress(function(event){
  if (firstKey === true){
    console.log(event.key);
    level = 0;
    setTimeout(function(){
      nextSequence();
    },500);

    firstKey = false;
  }
});

$(".btn").click(function(event){
  //choose Id of button clicked and play animation and sound.
  let userChosenColor = event.target.getAttribute("id");
  playAudio(userChosenColor);
  animatePress(userChosenColor);

  //push that button into userClickedPattern.
  userClickedPattern.push(userChosenColor);

  //check if userClickedPattern is same as the randomnly generated gamePattern.
  let ans = checkAnswer(userClickedPattern.length-1);
  console.log(ans);

  if (userClickedPattern.length === gamePattern.length)
  {
    console.log("calling nextSequence()");
    setTimeout(nextSequence,1000);
  }
});


function nextSequence()
{
  //Display level number.
  level++;
  $("h1").text("Level "+level);

  //clear userClickedPattern.
  userClickedPattern = [];

  //generate random number to choose any of the 4 color.
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  playAudio(randomChosenColour);
  animateButton(randomChosenColour);
}

function startOver()
{
  //play the game-over Audio
  playAudio("wrong");

  //Add game-over class and remove it after a delay of 200 millisecond to let the user know that the game is over.
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  //reset all the variable back to the initial state so that the user may restart the game.
  $("h1").text("Press A Key to Start");
  firstKey = true;
  gamePattern = [];
  level = 0;
}
