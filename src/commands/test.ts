/**
        * Print out error message when user enters unknown command.
        * Here we print some erro message and a list of the 
        * command words.
        * 
        * @param params array containing all parameters
        * @return true, if this command quits the game, false otherwise.
        */
        
class Test extends Command {
    execute(params: string[]): boolean {
        if(params.length > 0){
            this.game.out.println("Attack what?")
            return;
        }
        else {
            this.isBossPresent();
        }
    }

    isBossPresent() : void {
        if(this.game.currentRoom.enemy == null) {
            console.log('hij ziet inderdaad dat er geen enemy is.')
            this.game.out.println("There is no enemy to attack");
        }
        else {
           this.isBossAlive();
        }
    }

    isBossAlive() : void{
        if(this.game.enemies.mazeBoss.health <=0){
        this.victory();
        }
        else{
        this.attack();
        }
    }

    attack() : void {
        this.game.currentRoom.enemy.decreaseHealth(10);
        this.game.out.println('He now has ' + this.game.enemies.mazeBoss.health + ' health.');
        this.game.currentPlayer.decreaseHealth(5);
        this.game.out.println('The boss hits you back and you have ' + this.game.currentPlayer.health + ' health.') 
        this.isBossStillAlive();
    }

    isBossStillAlive() : void{
        if(this.game.enemies.mazeBoss.health <=0){
            this.victory();
        }
        else {
            this.game.out.println('He is not dead yet, attack him again!');
        }
    }

    victory() : void {
            this.game.out.println("You've defeated this boss.");
            this.game.gameOver();
    }
}