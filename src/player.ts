class Player {
    
    health : number;
    name : string;

    constructor(health : number, name : string){
        this.health = health;
        this.name = name;
    }
    
    decreaseHealth(amount : number){
        this.health -= amount;
    }
}