class Weapon extends Item {
    readonly damage: number;

    constructor(damage : number, name : string){
        super(name);
        this.damage = damage;
    }
    
    use(){
        //regel vechten en hp handling
    }
    
}