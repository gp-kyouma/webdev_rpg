import {_get} from './DatabaseCRUD';
import { getRandomInt } from './utils';

export default class Item {
    
    constructor() { // "empty" item

        this.id = 0
        this.handle = "" //possibly redundant

        this.item_name = ""
        this.item_description = ""

        this.gold_value = 0
        this.rarity = ""
        this.equipment = false //possibly redundant
        this.effect = null

        // equipment-specific attributes
        this.equip_slot = null
        this.equip_type = null

        this.hp = null
        this.mp = null
        this.str = null
        this.def = null
        this.mag = null
        this.spd = null
    }

    async getFromDB(handle, useID = false) {
        let search_term;
        if (useID)
            search_term = { id: handle }
        else
            search_term = { handle: handle }

        const itemdata = await _get('items', search_term)
        if (!itemdata || Array.isArray(itemdata) && itemdata.length === 0)
        {
            console.log("Item with handle " + handle + " does not exist in database")
            return
        }
        const item = itemdata[0]
        if (!item)//just to be sure...
        {
            console.log("Item with handle " + handle + " does not exist in database")
            return
        }

        this.setFromItemData(item)
    }

    setFromItemData(item){
        this.id = item.id
        this.handle = item.handle //possibly redundant

        this.item_name = item.item_name
        this.item_description = item.item_description

        this.gold_value = item.gold_value
        this.rarity = item.rarity
        this.equipment = item.equipment //possibly redundant

        try {
            this.effect = JSON.parse(item.effect);
        } catch (e) {
            console.log(e)
            this.effect = null;
        }

        if (item.equipment)
        {
            // equipment-specific attributes
            this.equip_slot = item.equip_slot
            this.equip_type = item.equip_type

            this.hp = item.hp
            this.mp = item.mp
            this.str = item.str
            this.def = item.def
            this.mag = item.mag
            this.spd = item.spd
        }
    }

    // Getter
    get has_effect() {
        const isObjectEmpty = (obj) => {
            return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
        };

        return !isObjectEmpty(this.effect);
    }

    static rollRarity(){
        //const common_rarity     = 60//redundant
        const uncommon_rarity   = 25
        const rare_rarity       = 10
        const legendary_rarity  = 5

        let roll = getRandomInt(0, 100)

        if (roll < legendary_rarity)
            return "LEGENDARY"

        roll =- legendary_rarity

        if (roll < rare_rarity)
            return "RARE"

        roll =- rare_rarity

        if (roll < uncommon_rarity)
            return "UNCOMMON"

        return "COMMON"
    }

    //cloning business.
    clone() {

        // Deeply clone the internal data, then reconstruct the class
        let clonedItem = structuredClone(this);

        return Object.setPrototypeOf(clonedItem, Item.prototype);
    }
}