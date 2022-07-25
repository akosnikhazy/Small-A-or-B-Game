"use strict"
let game = new Game(10,
    "A or B game",
    "Press start to decide who said it: Marcus Aurelius or Plato? You will get a final score at the end.",
    "Marcus Aurelius",
    "Plato"
);

game.ini();

document.getElementById("startGame").addEventListener("click",function(){
game.startGame();

});

document.getElementById("restartGame").addEventListener("click",function(){
game.ini();
});

var waitForIt = false;
document.querySelectorAll("input[name='q']").forEach((input) => {
input.addEventListener('change',function(){

if(!waitForIt)
{
if((input.getAttribute("id") == "Ar" &&  game.getCorrect() == 0) || (input.getAttribute("id") == "Br" &&  game.getCorrect() == 1))
{
game.setScore( ++game.score);
input.parentElement.classList.add("correct");
} else {
input.parentElement.classList.add("wrong");
}

waitForIt = !waitForIt;
setTimeout(function(){
input.parentElement.classList.remove("correct");
input.parentElement.classList.remove("wrong");
waitForIt = !waitForIt;
game.loadNextQuote();
},500);

}

});
});