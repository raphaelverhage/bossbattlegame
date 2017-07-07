/**
 * "Quit" was entered. Check the rest of the command to see
 * whether we really quit the game.
 *
 * @param params array containing all parameters
 * @return true, if this command quits the game, false otherwise.
 */

class Quit extends Command{

    execute(params : string[]) : boolean {
        if(params.length > 0) {
            this.game.out.println("Quit what?");
            return false;
        }
        else {
            return true;  // signal that we want to quit
        }
    }
}