const scores = require('./score.json');

const COOPERATE = "cooperate", 
    CHEAT = "cheat", 
    choices = ["cooperate", "cheat"], 
    EVIL = "evil",
    KIND = "kind",
    COPYCAT = "copycat",
    GRUDGER = "grudger",
    ROUNDS = 5;

const BOTS = [KIND, EVIL, COPYCAT, GRUDGER];

function getResult(choice1, choice2){
    let choice = `${choice1}_${choice2}`;
    return scores[choice];
}


function getRandomChoice(){
    return choices[Math.floor(Math.random()*choices.length)]
}


class Game {

    constructor (player1, player2, repeat, tournament) {
        this.player1 = player1;
        this.player2 = player2;
        this.repeat = repeat;
        this.tournament = tournament;
    }

    play(){
        for(let i = 0; i < this.repeat; i++){
            this.player1.setChoice(this.player2.prevChoice);
            this.player2.setChoice(this.player1.prevChoice);
            let result = getResult(this.player1.choice, this.player2.choice);
            console.log(this.player1.choice, this.player2.choice, result.player1, result.player2)
            result = this.calculate(result);
        }
    }

    calculate(result){
        this.player1.score =  this.player1.score + result.player1;
        this.player2.score =  this.player2.score + result.player2;
        return { 'player1':  this.player1.score, 'player2':  this.player2.score }
    }

    print(){
        console.log(`RESULT: Bot is ${this.player1.score}`)
        console.log(`Player 2 is ${this.player2.score}`)
    }

    save(){
        this.tournament.setScore(this.player1)
        this.tournament.setScore(this.player2)
    }
}

class Human{
    constructor(){
        this.score = 0;
        this.choice, this.prevChoice;
    }

    setChoice(){
        this.prevChoice = this.choice;
        this.choice = getRandomChoice();
    }

    getChoice(){
        return this.choice;
    }
}

class Bot{

    constructor(type){
        this.isBot = true;
        this.score = 0;
        this.choice;
    }

    getChoice(){
        return this.choice;
    }

}


class KindBot extends Bot{
    constructor(){
        super();
        this.name = KIND;
    }

    setChoice(){
        this.choice = COOPERATE;
    }

    getChoice(){
        return this.choice;
    }
}

class EvilBot extends Bot{
    constructor(){
        super();
        this.name = EVIL;
    }

    setChoice(){
        this.choice = CHEAT;
    }

    getChoice(){
        return this.choice
    }
}


class CopycatBot extends Bot{
    constructor(){
        super()
        this.name = COPYCAT;
    }

    setChoice(prevChoice){
        if(prevChoice) this.choice = prevChoice;
        else this.choice = COOPERATE;
    }

    getChoice(){
        return this.choice
    }

}


class GrudgerBot extends Bot{


    constructor(){
        super();
        this.name = GRUDGER;
    }

    setChoice(prevChoice){
        if(prevChoice) this.choice = CHEAT;
        this.choice = COOPERATE;
    }
}

class Tournament extends Game{
    constructor(){
        super();
        this.kind = 0;
        this.evil = 0;
        this.copycat = 0;
        this.grudger = 0;
    }


    getTotalKindScore(){
        return this.kind;
    }

    getTotalEvilScore(){
        return this.evil;
    }

    getTotalCopycatScore(){
        return this.copycat;
    }

    getTotalGrudgerScore(){
        return this.grudger;
    }

    setScore(player){
        this[player.name] =  this[player.name] + player.score;
    }
    
    showScores(){
        console.log(`kind is ${this.kind}`);
        console.log(`evil is ${this.evil}`);
        console.log(`copycat is ${this.copycat}`);
        console.log(`grudger is ${this.grudger}`);
    }

}

var tournament = new Tournament();
console.log("-------------KIND VS EVIL ----------")
var player1 = new KindBot();
var player2 = new EvilBot();
var game = new Game(player1, player2, ROUNDS, tournament);
game.play()
// game.print()
game.save()

console.log("-------------KIND VS COPYCAT ----------")

player1 = new KindBot();
player2 = new CopycatBot();
game = new Game(player1, player2, ROUNDS, tournament);
game.play()
// game.print()
game.save()

console.log("-------------KIND VS GRUDGER ----------")

player1 = new KindBot();
player2 = new GrudgerBot();
game = new Game(player1, player2, ROUNDS, tournament);
game.play()
// game.print()
game.save()

tournament.showScores()
process.exit();
