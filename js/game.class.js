"use strict"
class Game{

    constructor(numOfQuestions = 10,gameTitle = "Title",gameDescription = "Description",gameAText = "A",gameBText = "B"){
        this.numOfQuestions = numOfQuestions;

        this.views = {
            "start":document.getElementById("start"),
            "game":document.getElementById("game"),
            "end":document.getElementById("end")
        }

        document.getElementById("gameDescription").innerText = gameDescription; 
        document.getElementById("gameTitle").innerText = gameTitle; 
        document.getElementById("gameAText").innerHTML = gameAText; 
        document.getElementById("gameBText").innerHTML = gameBText; 

        this.questions = [] // will have the random selected question
        this.correctNow = 0;// keeps the correct answer to the present question

        this.quoteNumber = 0;
        this.score = 0;

        /* 
            The quetes the player have to decide between. You could modify this to load it from a file, now I just 
            put it here like this.
            in this example Marcus Aurelius is 0 and Plato is 1 
        */
        this.AB = {
            "quotes":[
                {"You have power over your mind - not outside events. Realize this, and you will find strength.":0},
                {"Dwell on the beauty of life. Watch the stars, and see yourself running with them.":0},
                {"Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.":0},
                {"Our life is what our thoughts make it":0},
                {"If it is not right do not do it; if it is not true do not say it.":0},
                {"The best revenge is not to be like your enemy.":0},
                {"Do not act as if you were going to live ten thousand years. Death hangs over you. While you live, while it is in your power, be good.":0},
                {"The first rule is to keep an untroubled spirit. The second is to look things in the face and know them for what they are.":0},
                {"A good decision is based on knowledge and not on numbers.":1},
                {"There is no harm in repeating a good thing.":1},
                {"Truth is the beginning of every good to the gods, and of every good to man.":1},
                {"Knowledge without justice ought to be called cunning rather than wisdom.":1},
                {"Do not train a child to learn by force or harshness; but direct them to it by what amuses their minds, so that you may be better able to discover with accuracy the peculiar bent of the genius of each.":1},
                {"Ideas are the source of all things.":1},
                {"Knowledge becomes evil if the aim be not virtuous.":1},
                {"False words are not only evil in themselves, but they infect the soul with evil.":1}
            ]

        }

        if(this.numOfQuestions > this.AB.quotes.length)
        { // if you except more question than it is in the object, you max out at the objects length
            this.numOfQuestions = this.AB.quotes.length;
        }

        
    }

    ini(){
        this.setView("start");
        this.clearSelection();
        this.quoteNumber = 0;
        this.score = 0;
    }

    shuffleQuotes() {
        for (let i = this.AB.quotes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.AB.quotes[i], this.AB.quotes[j]] = [this.AB.quotes[j], this.AB.quotes[i]];
        }   
    }

    setView(view){
        this.views.start.style.display =
        this.views.game.style.display = 
        this.views.end.style.display = 'none';

        this.views[view].style.display = 'block';
    }

    getCorrect(){
        return this.correctNow;
    }

    setCorrect(num){
        this.correctNow = num;
    }

    getScore(){
        return this.score;
    }

    setScore(num){
        this.score = num;
    }

    clearSelection(){
        document.querySelectorAll("input[name='q']").forEach((input) => {
            input.addEventListener('change',function(){
               
                input.checked = false;
            
            });
        });

    }

    loadNextQuote(){
        
        if(this.quoteNumber >= this.numOfQuestions)
        {
            this.setView("end");
            document.getElementById("score").innerText = this.getScore();
            document.getElementById("scorefrom").innerText = this.numOfQuestions;
            return;
        }

        /* loading the first question */ 
        document.getElementById("quote").innerText = Object.keys(this.questions[this.quoteNumber])[0];
        this.setCorrect(this.questions[this.quoteNumber][Object.keys(this.questions[this.quoteNumber])[0]]);

    

        this.clearSelection();

        this.quoteNumber++;

       

    }
    startGame(){
        this.setView("game");

        /* Select numOfQuestions quote */ 
        this.shuffleQuotes();
        for(var i = 0; i < this.numOfQuestions; i++){
            this.questions.push(this.AB.quotes[i]);
        }
       
        this.loadNextQuote();
        

        
    }

    endGame(){
        this.setView("end");
    }
}