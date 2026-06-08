export class GameState {

    /*
    (todo)

    id INTEGER NOT NULL AUTO_INCREMENT,
    user_id INTEGER NOT NULL,

    -- current floor data:
    floor INTEGER NOT NULL,

    -- map data
    (pos)
    map_data (map array) NOT NULL,
    (view map)

    -- shop data
    shop1_id INTEGER DEFAULT NULL,
    shop2_id INTEGER DEFAULT NULL,
    shop3_id INTEGER DEFAULT NULL,
    shop4_id INTEGER DEFAULT NULL,

    -- chest data
    chest_id INTEGER DEFAULT NULL,
    is_mimic boolean NOT NULL,
    (is active?)

    -- boss data
    boss_id INTEGER DEFAULT NULL,
    boss_level INTEGER NOT NULL,
    (is dead?)

    -- player data:
    (player class)

    (battle class for in-battle data)
    */
    
    constructor() { // "empty" state

        //todo, this is just copied from player
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