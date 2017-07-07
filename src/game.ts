    /**
    * This class is part of the "Zorld of Wuul" application. 
    * "Zorld of Wuul" is a very simple, text based adventure game.  
    * 
    * Users can walk around some scenery. That's all. It should really be 
    * extended to make it more interesting!
    * 
    * To play this game, create an instance of this class and call the "play"
    * method.
    * 
    * This main class creates and initialises all the others: it creates all
    * rooms, creates the parser and starts the game.  It also evaluates and
    * executes the commands that the parser returns.
    * 
    * @author  Michael Kölling, David J. Barnes and Bugslayer & Raphaël 
    * @version 2017.03.30
    */
    class Game {
        parser : Parser;
        out : Printer;
        player : Player;
        currentRoom : Room;
        currentPlayer : Player;
        isOn : boolean;
        enemies : {[name: string]: Enemy};
        bossHome : Room;
        
        /**
        * Create the game and initialise its internal map.
        */
        constructor(output: HTMLElement, input: HTMLInputElement) {
            this.parser = new Parser(this, input);
            this.out = new Printer(output);
            this.isOn = true;
            this.enemies = this.createEnemies();
            this.createRooms();
            this.printWelcome();
        }
        
        spawnPlayer(){
            let Henk = new Player(100, 'Henk')
            this.currentPlayer = Henk;
        }

        //By using an array it's expandable in the future
        createEnemies(){
            let enemies: {[name: string]: Enemy} = {};
            enemies['mazeBoss'] = new Enemy(100, 20, 'Dragon');
            return enemies;
        }

        /**
        * Create all the rooms and link their exits together.
        */
        createRooms() : void {
            
            let garden = new Room("There's a big castle ahead, do you want to enter?");
            let maze = new Room("You're standing in front of a maze, you must defeat the boss by using the 'attack' command", this.enemies['mazeBoss']);
            
            // initialise room exits n e s w
            garden.setExits(null, maze, null, null);
            maze.setExits(null, null, null, garden);
            
            // spawn player outside
            this.currentRoom = garden;
        }

        /**
        * Print out the opening message for the player.
        */
        printWelcome() : void {
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
            if(this.currentRoom.northExit != null) {
                this.out.print("north ");
            }
            if(this.currentRoom.eastExit != null) {
                this.out.print("east ");
            }
            if(this.currentRoom.southExit != null) {
                this.out.print("south ");
            }
            if(this.currentRoom.westExit != null) {
                this.out.print("west ");
            }
            this.out.println();
            this.out.print(">");
        }

            gameOver() : void {
            this.isOn = false;
            this.out.println("Thank you for playing.  Good bye.");
            this.out.println("Hit F5 to restart the game");
        }    
    }