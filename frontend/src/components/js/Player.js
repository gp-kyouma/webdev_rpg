import Class from './Class';
import Skill from './Skill';
import Item from './Item';

export default class Player {
    
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
        this.skill = new Skill//empty

        this.weapon = null
        this.armor = null
        this.accessory = null

        this.items = []
    }

    async startNewChar(newCharData) {
        this.name = newCharData.name
        
        // get default class data from class struct
        await this.class.getFromDB(newCharData.class)

        this.current_hp = this.class.hp
        this.current_mp = this.class.mp

        this.max_hp = this.class.hp
        this.max_mp = this.class.mp

        this.str = this.class.str
        this.def = this.class.def
        this.mag = this.class.mag
        this.spd = this.class.spd

        this.exp = 0
        this.lvl = 1
        this.gold = 100//starting gold, placeholder

        //LOAD HANDLES
        await this.skill.getFromDB(this.class.skills[1])

        if ("weapon" in this.class && this.class.weapon) {
            this.weapon = new Item
            await this.weapon.getFromDB(this.class.weapon);
        }

        if ("armor" in this.class && this.class.armor) {
            this.armor = new Item
            await this.armor.getFromDB(this.class.armor);
        }

        if ("accessory" in this.class && this.class.accessory) {
            this.accessory = new Item
            await this.accessory.getFromDB(this.class.accessory);
        }

        if (this.class.hasStartingItems)
        {
            for (let i = 0; i < this.class.items.length; i++)
            {
                let newItem = new Item
                await newItem.getFromDB(this.class.items[i])
                this.items.push(newItem)
            }
        }
    }

    async setFromGameState(gameStateData) {
        this.name = gameStateData.char_name

        this.current_hp = gameStateData.current_hp
        this.current_mp = gameStateData.current_mp

        this.max_hp = gameStateData.max_hp
        this.max_mp = gameStateData.max_mp

        this.str = gameStateData.str
        this.def = gameStateData.def
        this.mag = gameStateData.mag
        this.spd = gameStateData.spd

        this.exp = gameStateData.exp
        this.lvl = gameStateData.lvl
        this.gold = gameStateData.gold

        await this.class.getFromDB(gameStateData.class_id, true)
        await this.skill.getFromDB(gameStateData.skill_id, true)

        if ("weapon_id" in gameStateData && gameStateData.weapon_id) {
            this.weapon = new Item
            await this.weapon.getFromDB(gameStateData.weapon_id, true);
        }

        if ("armor_id" in gameStateData && gameStateData.armor_id) {
            this.armor = new Item
            await this.armor.getFromDB(gameStateData.armor_id, true);
        }

        if ("accessory_id" in gameStateData && gameStateData.accessory_id) {
            this.accessory = new Item
            await this.accessory.getFromDB(gameStateData.accessory_id, true);
        }

        for (let i = 1; i <= 4; i++)
        {
            const key = ("item"+i+"_id")
            if (key in gameStateData && gameStateData[key]) {//will this work...
                let newItem = new Item
                await newItem.getFromDB(gameStateData[key], true)
                this.items.push(newItem);
            }
        }
    }

    //TODO:
    //LEVEL UP FUNCTION

    get hasWeapon() {
        return !(this.weapon == null);
    }
    get hasArmor() {
        return !(this.armor == null);
    }
    get hasAccessory() {
        return !(this.accessory == null);
    }
}