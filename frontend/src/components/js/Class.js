import {_get} from './DatabaseCRUD';

export class Class {
    
    constructor() { // "empty" class

        this.id = 0
        this.handle = ""

        this.class_name = ""
        this.class_description = ""

        this.hp = 0
        this.mp = 0
        this.str = 0
        this.def = 0
        this.mag = 0
        this.spd = 0

        this.hp_growth = 0
        this.mp_growth = 0
        this.str_growth = 0
        this.def_growth = 0
        this.mag_growth = 0
        this.spd_growth = 0

        this.weapon_type = ""
        this.armor_type = ""

        // remaining attributes are handles

        this.skills = {// access: skills[i]
            1: "",
            5: "",
            10: "",
            15: "",
            20: ""
        };

        this.weapon = null
        this.armor = null
        this.accessory = null

        this.items = []
    }

    async getFromDB(handle, useID = false) {
        let search_term;
        if (useID)
            search_term = { id: handle }
        else
            search_term = { handle: handle }

        const classdata = await _get('classes', search_term)
        if (!classdata || Array.isArray(classdata) && classdata.length === 0)
        {
            console.log("Class with handle " + handle + " does not exist in database")
            return
        }
        const class_ = classdata[0]
        if (!class_)//just to be sure...
        {
            console.log("Class with handle " + handle + " does not exist in database")
            return
        }

        this.setFromClassData(class_)
    }

    setFromClassData(class_){
        this.id = class_.id
        this.handle = class_.handle //possibly redundant

        this.class_name = class_.class_name
        this.class_description = class_.class_description

        this.hp = class_.hp
        this.mp = class_.mp
        this.str = class_.str
        this.def = class_.def
        this.mag = class_.mag
        this.spd = class_.spd

        this.hp_growth = class_.hp_growth
        this.mp_growth = class_.mp_growth
        this.str_growth = class_.str_growth
        this.def_growth = class_.def_growth
        this.mag_growth = class_.mag_growth
        this.spd_growth = class_.spd_growth

        this.weapon_type = class_.weapon_type
        this.armor_type = class_.armor_type

        // remaining attributes are handles

        this.skills = {
            1: class_.skill_1,
            5: class_.skill_5,
            10: class_.skill_10,
            15: class_.skill_15,
            20: class_.skill_20
        };

        // these handles can be null

        if ("weapon" in class_ && class_.weapon) {
            this.weapon = class_.weapon;
        }

        if ("armor" in class_ && class_.armor) {
            this.armor = class_.armor;
        }

        if ("accessory" in class_ && class_.accessory) {
            this.accessory = class_.accessory;
        }
        
        this.items = []
        for (let i = 1; i <= 4; i++)
        {
            const key = ("item"+i)
            if (key in class_ && class_[key]) {//will this work...
                this.items.push(class_[key]);
            }
        }
    }

    // Getter
    get hasStartingItems() {
        return !(this.items?.length === 0);
    }
}