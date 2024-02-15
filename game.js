var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log(randomNumber, randomChosenColour)
    console.log(gamePattern, userClickedPattern);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    // console.log("sounds/"+randomChosenColour+".mp3");
    level+=1;
    $("h1").text("Level "+level);
}

$(".btn").on("click", function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    if (gameComparison(userClickedPattern.length-1)) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence(), 2000);
            userClickedPattern=[];
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 2000);
        $("h1").text("Game Over, Press A to Restart")
        gamePattern=[];
        userClickedPattern=[];
        level=0;
    };
});

function playSound(name){
    new Audio("sounds/"+name+".mp3").play();
};

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 100);
};

$(document).on("keydown", function(event){
    if ((event.key.toLowerCase()==="a")  & (level === 0)) {
        nextSequence();
    }
});

function gameComparison(index){
        return (gamePattern[index]===userClickedPattern[index])
};

