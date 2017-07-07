class Enemy {
    
    health : number;
    damage : number;
    name : string;
    
    
    constructor(health : number, damage : number, Name : string){
        this.health = health;
        this.damage = damage;
        this.name = Name;
    }

     decreaseHealth(amount : number){
        this.health -= amount;
    }
}