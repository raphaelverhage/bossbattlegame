class Command {
    protected game : Game;

    constructor(game : Game){
        this.game = game;
    }

    execute(params : string[]) : boolean {
        return false;
    }
}