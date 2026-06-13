import Class from './Class';
import Skill from './Skill';
import Item from './Item';
import {_get} from './DatabaseCRUD';

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

        //unique classes
        this.class = new Class//empty
        this.skill_id = new Skill//empty

        this.weapon = null
        this.armor = null
        this.accessory = null

        this.items = []
    }
    //Todo the actual player stuff loading and such
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