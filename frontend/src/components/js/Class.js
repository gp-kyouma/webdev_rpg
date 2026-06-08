export class Class {

    /*
    (todo)

    id INTEGER NOT NULL AUTO_INCREMENT,
    handle varchar(20) UNIQUE NOT NULL, -- for access/reference, eg. 'CLASS_WARRIOR'

    class_name varchar(20) NOT NULL,          -- actual display name, eg. 'Warrior'
    class_description varchar(50) NOT NULL,   -- flavortext

    -- starting stats
    hp INTEGER NOT NULL,
    mp INTEGER NOT NULL,
    str INTEGER NOT NULL,
    def INTEGER NOT NULL,
    mag INTEGER NOT NULL,
    spd INTEGER NOT NULL,

    -- stat growth per level up
    hp_growth INTEGER NOT NULL,
    mp_growth INTEGER NOT NULL,
    str_growth INTEGER NOT NULL,
    def_growth INTEGER NOT NULL,
    mag_growth INTEGER NOT NULL,
    spd_growth INTEGER NOT NULL,

    -- skill/spell progression
    -- 'skill_X' is learned at level X
    -- if no change, just repeat last value
    skill_1 varchar(20) NOT NULL,
    skill_5 varchar(20) NOT NULL,
    skill_10 varchar(20) NOT NULL,
    skill_15 varchar(20) NOT NULL,
    skill_20 varchar(20) NOT NULL,

    -- 'default' weapon and armor types (used for loot generation)
    weapon_type varchar(10) NOT NULL, -- 'SWORD' / 'STAFF' / and so on
    armor_type varchar(10) NOT NULL,  -- 'LIGHT' / 'HEAVY' / and so on

    -- starting items (can be null)
    weapon varchar(20) DEFAULT NULL,
    armor varchar(20) DEFAULT NULL,
    accessory varchar(20) DEFAULT NULL,

    item1 varchar(20) DEFAULT NULL,
    item2 varchar(20) DEFAULT NULL,
    item3 varchar(20) DEFAULT NULL,
    item4 varchar(20) DEFAULT NULL,
    */
    
    constructor() { // "empty" class

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