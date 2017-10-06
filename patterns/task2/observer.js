//We have bookmaker’s companies with a lot of kinds of sport and games. 
//There are players who can make a bet for the special game and follow the result. 
//When this game is finished, each player who was made a bet to this game will receive 
//notification about his gain or loss.

class BookmakerCompany {
    constructor() {
        this.events = {};
        this.games = [];
    }

    addGames(...games) {
        games.forEach((game) => this.games.push(game));
    }

    showCurrentGames() {
        this.games.forEach((game) => {
            if (!game.finished) {
                console.log("Game ID: " + game.id);
                console.log("Game description: " + game.description);
            }
        });
    }

    takeBet(player, bet) {
        console.log(player.name);
    }

    saveGameResult(gameId, result) {
        
    }
}

class Game {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.finished = false;
        this.result = "Unknown result, game is going on";
    }

    finalize(result) {
        this.finished = true;
        this.result = result;
    }
}

class Bet {
    constructor(gameId, winner, amount) {
        this.gameId = gameId;
        this.winner = winner;
        this.amount = amount;
    }
}

class Player {
    constructor(name) {
        this.name = name;
    }

    makeBet(gameId, winner, amount) {
        bookmakerCompany.takeBet(this, new Bet(gameId, winner, amount));
    }

    receiveNotification(message) {
        console.log(name + " received:");
        console.log(message.result);
        let prize = message.prize;
        if (prize) {
            console.log("You won " + prize);
        } else {
            console.log("You lose");
        }
    }
}

class Message {
    constructor(result, prize) {
        this.result = result;
        this.prize = prize;
    }
}

window.bookmakerCompany = new BookmakerCompany();
bookmakerCompany.addGames(new Game(1, "Football: Dinamo VS Shakhtar"), 
                          new Game(2, "Box: Mayweather VS McGregor"),
                          new Game(3, "Basketball: Bulls VS Lakers"));
bookmakerCompany.showCurrentGames();
const player1 = new Player("Player1");
const player2 = new Player("Player2");
const player3 = new Player("Player3");
player1.makeBet(1, 1, 10);
player1.makeBet(2, 1, 15);
player2.makeBet(2, 2, 100);
player2.makeBet(3, 2, 20);
player3.makeBet(3, 1, 25);



