class Key extends Item {
    
    room: Room;

    constructor(name: string, keyHole: Room) {
        super(name);
        this.room = keyHole;
    }
}