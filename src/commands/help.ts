   /**
        * Print out some help information.
        * Here we print some stupid, cryptic message and a list of the 
        * command words.
        * 
        * @param params array containing all parameters
        * @return true, if this command quits the game, false otherwise.
        */
        
 class Help extends Command {

 execute(params : string[]) : boolean {
            if(params.length > 0) {
                this.game.out.println("Help what?");
                return false;
            }
            this.game.out.println("You are lost. You are alone. You wander");
            this.game.out.println("around at the university.");
            this.game.out.println();
            this.game.out.println("Your command words are:");
            this.game.out.println("   go attack quit help");
            return false;
        }
 }