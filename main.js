var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Enemy = (function () {
    function Enemy(health, damage, Name) {
        this.health = health;
        this.damage = damage;
        this.name = Name;
    }
    Enemy.prototype.decreaseHealth = function (amount) {
        this.health -= amount;
    };
    return Enemy;
}());
var Game = (function () {
    function Game(output, input) {
        this.parser = new Parser(this, input);
        this.out = new Printer(output);
        this.isOn = true;
        this.enemies = this.createEnemies();
        this.createRooms();
        this.printWelcome();
    }
    Game.prototype.spawnPlayer = function () {
        var Henk = new Player(100, 'Henk');
        this.currentPlayer = Henk;
    };
    Game.prototype.createEnemies = function () {
        var enemies = {};
        enemies['mazeBoss'] = new Enemy(100, 20, 'Dragon');
        return enemies;
    };
    Game.prototype.createRooms = function () {
        var garden = new Room("There's a big castle ahead, do you want to enter?");
        var maze = new Room("You're standing in front of a maze, you must defeat the boss by using the 'attack' command", this.enemies['mazeBoss']);
        garden.setExits(null, maze, null, null);
        maze.setExits(null, null, null, garden);
        this.currentRoom = garden;
    };
    Game.prototype.printWelcome = function () {
        this.out.println();
        this.out.println("Hello traveller. My name is Rashid and I'm a local farmer from the village you just passed.");
        this.out.println("I need you to help me with the dragon in the maze. He is burning our crops every night!");
        this.out.println("Can you kill him for us?");
        this.out.println("If you are willing to help me, please go to the maze and attack that beast! If not, please quit this game and start league of legends.");
        this.out.println("");
        this.out.println("Type 'help' if you need help.");
        this.out.println();
        this.spawnPlayer();
        this.out.println(this.currentRoom.description);
        this.out.print('Exits: ');
        if (this.currentRoom.northExit != null) {
            this.out.print("north ");
        }
        if (this.currentRoom.eastExit != null) {
            this.out.print("east ");
        }
        if (this.currentRoom.southExit != null) {
            this.out.print("south ");
        }
        if (this.currentRoom.westExit != null) {
            this.out.print("west ");
        }
        this.out.println();
        this.out.print(">");
    };
    Game.prototype.gameOver = function () {
        this.isOn = false;
        this.out.println("Thank you for playing.  Good bye.");
        this.out.println("Hit F5 to restart the game");
    };
    return Game;
}());
var Parser = (function () {
    function Parser(game, input) {
        var _this = this;
        this.commands = {};
        this.game = game;
        this.input = input;
        this.failure = new Failure(game);
        this.commands["help"] = new Help(game);
        this.commands["attack"] = new Test(game);
        this.commands["go"] = new Go(game);
        this.commands["quit"] = new Quit(game);
        input.onkeyup = function (e) {
            if (e.keyCode == 13 && _this.game.isOn) {
                var command = _this.input.value;
                _this.game.out.println(command);
                _this.parse(command.split(" "));
                _this.input.value = "";
                _this.game.out.print(">");
            }
        };
    }
    Parser.prototype.parse = function (words) {
        var wantToQuit = false;
        var params = words.slice(1);
        if (words[0] === "") {
            return;
        }
        var command;
        command = this.commands[words[0]];
        if (command == null) {
            command = this.failure;
        }
        wantToQuit = command.execute(params);
        if (wantToQuit) {
            this.input.disabled = true;
            this.game.gameOver();
        }
    };
    return Parser;
}());
var Player = (function () {
    function Player(health, name) {
        this.health = health;
        this.name = name;
    }
    Player.prototype.decreaseHealth = function (amount) {
        this.health -= amount;
    };
    return Player;
}());
var Printer = (function () {
    function Printer(output) {
        this.output = output;
    }
    Printer.prototype.print = function (text) {
        this.output.innerHTML += text;
    };
    Printer.prototype.println = function (text) {
        if (text === void 0) { text = ""; }
        this.print(text + "<br/>");
        this.output.scrollTop = this.output.scrollHeight;
    };
    return Printer;
}());
var Room = (function () {
    function Room(description, enemy) {
        if (enemy === void 0) { enemy = null; }
        this.description = description;
        this.enemy = enemy;
    }
    Room.prototype.setExits = function (north, east, south, west) {
        if (north != null) {
            this.northExit = north;
        }
        if (east != null) {
            this.eastExit = east;
        }
        if (south != null) {
            this.southExit = south;
        }
        if (west != null) {
            this.westExit = west;
        }
    };
    return Room;
}());
var Command = (function () {
    function Command(game) {
        this.game = game;
    }
    Command.prototype.execute = function (params) {
        return false;
    };
    return Command;
}());
var Failure = (function (_super) {
    __extends(Failure, _super);
    function Failure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Failure.prototype.execute = function (params) {
        this.game.out.println("I don't know what you mean...");
        this.game.out.println();
        this.game.out.println("Your command words are:");
        this.game.out.println("   go quit help");
        return false;
    };
    return Failure;
}(Command));
var Go = (function (_super) {
    __extends(Go, _super);
    function Go() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Go.prototype.execute = function (params) {
        if (params.length == 0) {
            this.game.out.println("Go where?");
            return;
        }
        var direction = params[0];
        var nextRoom = null;
        switch (direction) {
            case "north":
                nextRoom = this.game.currentRoom.northExit;
                break;
            case "east":
                nextRoom = this.game.currentRoom.eastExit;
                break;
            case "south":
                nextRoom = this.game.currentRoom.southExit;
                break;
            case "west":
                nextRoom = this.game.currentRoom.westExit;
                break;
        }
        if (nextRoom == null) {
            this.game.out.println("There is no door!");
        }
        else {
            this.game.currentRoom = nextRoom;
            this.game.out.println(this.game.currentRoom.description);
            this.game.out.println("Here is enemy called " + this.game.currentRoom.enemy.name);
            this.game.out.print("Exits: ");
            if (this.game.currentRoom.northExit != null) {
                this.game.out.print("north ");
            }
            if (this.game.currentRoom.eastExit != null) {
                this.game.out.print("east ");
            }
            if (this.game.currentRoom.southExit != null) {
                this.game.out.print("south ");
            }
            if (this.game.currentRoom.westExit != null) {
                this.game.out.print("west ");
            }
            this.game.out.println();
        }
        return false;
    };
    return Go;
}(Command));
var Help = (function (_super) {
    __extends(Help, _super);
    function Help() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Help.prototype.execute = function (params) {
        if (params.length > 0) {
            this.game.out.println("Help what?");
            return false;
        }
        this.game.out.println("You are lost. You are alone. You wander");
        this.game.out.println("around at the university.");
        this.game.out.println();
        this.game.out.println("Your command words are:");
        this.game.out.println("   go attack quit help");
        return false;
    };
    return Help;
}(Command));
var Quit = (function (_super) {
    __extends(Quit, _super);
    function Quit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Quit.prototype.execute = function (params) {
        if (params.length > 0) {
            this.game.out.println("Quit what?");
            return false;
        }
        else {
            return true;
        }
    };
    return Quit;
}(Command));
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Test.prototype.execute = function (params) {
        if (params.length > 0) {
            this.game.out.println("Attack what?");
            return;
        }
        else {
            this.isBossPresent();
        }
    };
    Test.prototype.isBossPresent = function () {
        if (this.game.currentRoom.enemy == null) {
            console.log('hij ziet inderdaad dat er geen enemy is.');
            this.game.out.println("There is no enemy to attack");
        }
        else {
            this.isBossAlive();
        }
    };
    Test.prototype.isBossAlive = function () {
        if (this.game.enemies.mazeBoss.health <= 0) {
            this.victory();
        }
        else {
            this.attack();
        }
    };
    Test.prototype.attack = function () {
        this.game.currentRoom.enemy.decreaseHealth(10);
        this.game.out.println('He now has ' + this.game.enemies.mazeBoss.health + ' health.');
        this.game.currentPlayer.decreaseHealth(5);
        this.game.out.println('The boss hits you back and you have ' + this.game.currentPlayer.health + ' health.');
        this.isBossStillAlive();
    };
    Test.prototype.isBossStillAlive = function () {
        if (this.game.enemies.mazeBoss.health <= 0) {
            this.victory();
        }
        else {
            this.game.out.println('He is not dead yet, attack him again!');
        }
    };
    Test.prototype.victory = function () {
        this.game.out.println("You've defeated this boss.");
        this.game.gameOver();
    };
    return Test;
}(Command));
var Item = (function () {
    function Item(name) {
        this.name = name;
    }
    Item.prototype.use = function () {
    };
    return Item;
}());
var Key = (function (_super) {
    __extends(Key, _super);
    function Key(name, keyHole) {
        var _this = _super.call(this, name) || this;
        _this.room = keyHole;
        return _this;
    }
    return Key;
}(Item));
var Potion = (function (_super) {
    __extends(Potion, _super);
    function Potion(health, name) {
        return _super.call(this, name) || this;
    }
    return Potion;
}(Item));
var Weapon = (function (_super) {
    __extends(Weapon, _super);
    function Weapon(damage, name) {
        var _this = _super.call(this, name) || this;
        _this.damage = damage;
        return _this;
    }
    Weapon.prototype.use = function () {
    };
    return Weapon;
}(Item));
