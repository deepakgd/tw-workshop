const scores = require('./score.json');

const COOPERATE = "cooperate", 
    CHEAT = "cheat", 
    choices = ["cooperate", "cheat"], 
    EVIL = "evil";

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
        this.player1.setChoice(this.player2.prevChoice);
        this.player2.setChoice(this.player1.prevChoice);
        let result = getResult(this.player1.choice, this.player2.choice);
        console.log(this.player1.choice, this.player2.choice, result.player1, result.player2)
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


function Player(){
    this.score = 0;
    this.choice, this.prevChoice;
}

Player.prototype.setChoice = function(){
    this.prevChoice = this.choice;
    this.choice = getRandomChoice();
}

Player.prototype.getChoice = function(){
    return this.choice;
}

function Bot(type){
    this.type = type;
    this.score = 0;
    this.isBot = true;
}

Bot.prototype.setChoice = function(opponentChoice){
    if(this.type === "kind") this.choice = COOPERATE;
    else if(this.type === "evil") this.choice = CHEAT;
    else if(this.type === "copycat"){
        if(opponentChoice) this.choice = opponentChoice;
        else this.choice = COOPERATE;
    } else if(this.type === "grudger") {
        if(opponentChoice) this.choice = CHEAT;
        else this.choice = COOPERATE;
    } else throw new Error("Invalid bot type");
    this.prevChoice = this.choice;
}

Bot.prototype.getChoice = function(){
    return this.choice;
}


var player1 = new Bot('grudger');
var player2 = new Bot('evil');

var game = new Game(player1, player2, 4);
game.play()
game.print()
process.exit();