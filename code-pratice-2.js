const scores = require('./score.json');

const COOPERATE = "cooperate", CHEAT = "cheat", choices = ["cooperate", "cheat"];

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
        let choice1, choice2;
        this.player1.setChoice();
        if(this.player1.type && this.player1.type != 'copycat') this.player2.setChoice();
        if(this.player1.isBot && this.player1.type === 'copycat') choice1 = this.player2.prevChoice?this.player2.prevChoice:COOPERATE;
        else choice1 = this.player1.getChoice();
        if(this.player2.isBot && this.player2.type === 'copycat') choice2 = this.player1.prevChoice?this.player1.prevChoice:COOPERATE;
        else choice2 = this.player2.getChoice();
        let result = getResult(choice1, choice2);
        console.log(choice1, choice2, result.player1, result.player2)
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

Bot.prototype.setChoice = function(){
    this.prevChoice = this.choice;
    if(this.type === "kind") this.choice = COOPERATE;
    else if(this.type === "evil") this.choice = CHEAT;
    else if(this.type === "copycat") this.choice = null;
    else throw new Error("Invalid bot type");
}

Bot.prototype.getChoice = function(){
    return this.choice;
}

var player1 = new Player();
var player2 = new Bot('copycat');

var game = new Game(player1, player2, 4);
game.play()
game.print()
process.exit();