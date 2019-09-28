const scores = require('./score.json');


var choices = ["cooperate", "cheat"];

function getResult(choice1, choice2){
    let choice = `${choice1}_${choice2}`;
    return scores[choice];
}


function getRandomChoice(){
    return choices[Math.floor(Math.random()*choices.length)]
}

function Game(player1, player2, repeat){
    this.player1 = player1;
    this.player2 = player2;
    this.repeat = repeat;
}

Game.prototype.play = function(){
    for(let i = 0; i < this.repeat; i++){
        let result = getResult(this.player1.getPlayerChoice(), this.player2.getPlayerChoice());
        console.log(this.player1.getPlayerChoice(), this.player2.getPlayerChoice(), result.player1, result.player2)
        result = this.calculate(result);
    }
}

Game.prototype.calculate = function(result){
    this.player1.score =  this.player1.score + result.player1;
    this.player2.score =  this.player2.score + result.player2;
    return { 'player1':  this.player1.score, 'player2':  this.player2.score }
}

Game.prototype.print = function(){
    console.log(`RESULT: Bot is ${this.player1.score}`)
    console.log(`Player 2 is ${this.player2.score}`)
}


function Player(name, type){
    this.score = 0;
    this.type = type;
    this.name = name;
    this.choice;
}

Player.prototype.getPlayerChoice = function(){
    if(this.type === 'bot'){
        if(this.name === 'kind') return "cooperate";
        else if(this.name === 'evil') return "cheat";
        else throw new Error("Invalid bot name");
    }else return getRandomChoice();
}


var player1 = new Player('kind', 'bot');
var player2 = new Player('kind', 'bot');
// player1.assignChoice();
// player2.assignChoice();

var game = new Game(player1, player2, 4);
game.play()
game.print()
process.exit();