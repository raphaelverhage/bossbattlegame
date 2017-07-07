 /** 
        * Try to go in one direction. If there is an exit, enter
        * the new room, otherwise print an error message.
        * 
        * @param params array containing all parameters
        * @return true, if this command quits the game, false otherwise.
        */
        
class Go extends Command {

execute(params : string[]) : boolean {
            if(params.length == 0) {
                // if there is no second word, we don't know where to go...
                this.game.out.println("Go where?");
                return;
            }
            
            let direction = params[0];
            
            // Try to leave current room.
            let nextRoom = null;
            switch (direction) {
                case "north" : 
                nextRoom = this.game.currentRoom.northExit;
                break;
                case "east" : 
                nextRoom = this.game.currentRoom.eastExit;
                break;
                case "south" : 
                nextRoom = this.game.currentRoom.southExit;
                break;
                case "west" : 
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
                if(this.game.currentRoom.northExit != null) {
                    this.game.out.print("north ");
                }
                if(this.game.currentRoom.eastExit != null) {
                    this.game.out.print("east ");
                }
                if(this.game.currentRoom.southExit != null) {
                    this.game.out.print("south ");
                }
                if(this.game.currentRoom.westExit != null) {
                    this.game.out.print("west ");
                }
                this.game.out.println();
            }
            return false;
        }
}