/**
* This class is part of the "Zorld of Wuul" application. 
* "Zorld of Wuul" is a very simple, text based adventure game.  
* 
* This parser reads user input and tries to interpret it as an "Adventure"
* command. Every time it is called it reads a line from the terminal and
* tries to interpret the line as a two word command. 
*
* The parser has a set of known command words. It checks user input against
* the known commands, and invokes a relevant method on the Game object.
* 
* @author  Michael Kölling, David J. Barnes and Bugslayer
* @version 2017.03.30
*/
class Parser {
    input: HTMLInputElement;
    private game: Game;
    player: Player;
    private commands: { [key: string]: Command } = {};
    failure : Failure;

    /**
     * Creates the parser object.
     *
     * @param game the game object to prse commands for
     * @param input the HTMLInputElement to parse the value from
     */
    constructor(game: Game, input: HTMLInputElement) {
        this.game = game;
        this.input = input;
        this.failure = new Failure(game);
        this.commands["help"] = new Help(game);
        this.commands["attack"] = new Test(game);
        this.commands["go"] = new Go(game);
        this.commands["quit"] = new Quit(game);
        input.onkeyup = (e) => { // event handler function
            if (e.keyCode == 13 && this.game.isOn) {
                // Invoke parse method wehen user pressed enter
                let command = this.input.value;
                this.game.out.println(command);
                this.parse(command.split(" "));
                this.input.value = ""; // clears the input element 
                this.game.out.print(">");
            }
        }
    }

    /**
     * Parses the specified words and invokes the corresponding method
     * on the game object.
     *
     * @param words an array of words to parse
     */
    parse(words: string[]): void {
        let wantToQuit = false;
        let params = words.slice(1);
        if (words[0] === "") {
            return;
        }

        let command: Command;
        command = this.commands[words[0]];
        if (command == null) {
            command = this.failure;
        }

        wantToQuit = command.execute(params);

        if (wantToQuit) {
            this.input.disabled = true;
            this.game.gameOver();
        }
    }
}