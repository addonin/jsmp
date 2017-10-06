//Let prize will x2 for simplicity
class BookmakerCompany {
    constructor() {
        this.games = new Map();
        this.bets = new Map();
    }

    addGames(...games) {
        games.forEach(game => this.games.set(game.id, game));
    }

    showGames() {
        this.games.forEach(function(game, id) {    
            console.log("Game ID: " + game.id);
            console.log("Game description: " + game.description);
            game.winner === 0 ? console.log("Game is going on") : console.log("Winner: " + game.winner);
        }, this.games);
    }

    takeBet(player, bet) {
        let game = this.bets.get(bet.gameId);
        let info = {
            "player": player,
            "winner": bet.winner,
            "amount": bet.amount 
        };
        if (game) {
            game.push(info);
        } else {
            this.bets.set(bet.gameId, [info])
        }
    }

    saveGameResult(gameId, winner) {
        let game = this.games.get(gameId);
        game.winner = winner;  
        let bets = this.bets.get(gameId);
        bets.forEach(bet => {
            let prize = bet.winner === game.winner ? bet.amount * 2 : undefined;
            bet.player.receiveNotification(
                new Message(game, prize));
        });
    }
}

class Game {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.winner = 0;
    }

    finalize(winner) {
        this.winner = winner;
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
        console.log(this.name + " received:");
        console.log(message.payload());
        let prize = message.prize;
        if (prize) {
            console.log("You won " + prize);
        } else {
            console.log("You lose");
        }
    }
}

class Message {
    constructor(game, prize) {
        this.game = game;
        this.prize = prize;
    }

    payload() {
        return this.game.description + " - " + this.game.winner + " won";
    }
}

window.bookmakerCompany = new BookmakerCompany();
bookmakerCompany.addGames(new Game(1, "Football: Dinamo VS Shakhtar"), 
                          new Game(2, "Hockey: Rockets VS Sharks"),
                          new Game(3, "Basketball: Bulls VS Lakers"));
bookmakerCompany.showGames();

const player1 = new Player("Player1");
const player2 = new Player("Player2");
const player3 = new Player("Player3");

player1.makeBet(1, 1, 10);
player1.makeBet(2, 1, 15);
player2.makeBet(2, 2, 100);
player2.makeBet(3, 2, 20);
player3.makeBet(3, 1, 25);

bookmakerCompany.saveGameResult(1, 1);
bookmakerCompany.saveGameResult(2, 1);
bookmakerCompany.saveGameResult(3, 2);



