export class Player {
    
    constructor() { // "empty" player

        this.name = "";

        this.current_hp = 0
        this.current_mp = 0

        this.max_hp = 0
        this.max_mp = 0

        this.str = 0
        this.def = 0
        this.mag = 0
        this.spd = 0

        this.exp = 0
        this.lvl = 0
        this.gold = 0

        //these will be their own classes, use getters to get their ids when needed
        //todo
        this.class_id = 0
        this.skill_id = 0

        this.weapon_id = null
        this.armor_id = null
        this.accessory_id = null

        this.item1_id = null
        this.item2_id = null
        this.item3_id = null
        this.item4_id = null
    }
    /*
    // Getter
    get area() {
        return this.calcArea();
    }
    // Method
    calcArea() {
        return this.height * this.width;
    }
    */
}