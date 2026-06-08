export class Item {

    /*
    (todo)

    id INTEGER NOT NULL AUTO_INCREMENT,
    handle varchar(20) UNIQUE NOT NULL, -- for access/reference, eg. 'WPN_IRON_SWORD'

    item_name varchar(20) NOT NULL,          -- actual display name, eg. 'Iron Sword'
    item_description varchar(50) NOT NULL,   -- flavortext

    gold_value INTEGER NOT NULL,
    rarity varchar(10) NOT NULL,      -- 'COMMON', 'UNCOMMON', 'RARE', 'LEGENDARY'
    equipment boolean NOT NULL,       -- if false then this item is a consumable
    effect varchar(50) DEFAULT NULL,  -- relevant json string, to be parsed at relevant times

    -- equipment-specific attributes
    equip_slot varchar(10) DEFAULT NULL,    -- 'WEAPON' / 'ARMOR' / 'ACCESSORY'
    equip_type varchar(10) DEFAULT NULL,    -- 'SWORD' / 'STAFF' / 'LIGHT' / 'HEAVY' / and so on

    hp INTEGER DEFAULT NULL,
    mp INTEGER DEFAULT NULL,
    str INTEGER DEFAULT NULL,
    def INTEGER DEFAULT NULL,
    mag INTEGER DEFAULT NULL,
    spd INTEGER DEFAULT NULL,
    */
    
    constructor() { // "empty" item

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