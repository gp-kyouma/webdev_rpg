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

        this.max_hp = this.class.hp
        this.max_mp = this.class.mp

        this.str = this.class.str
        this.def = this.class.def
        this.mag = this.class.mag
        this.spd = this.class.spd

        this.exp = 0
        this.lvl = 1
        this.gold = 1000//starting gold

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

        this.current_hp = this.totalMaxHP
        this.current_mp = this.totalMaxMP
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

    addToLog(str)
    {
        if (this.log_)
            this.log_(str)
        else
            console.log("[player] Log function not set (str was " + str + ")")
    }

    //level calculation stuff
    static LevelEXPModifier = 10

    static LevelFromEXP(exp){
        //this (should) convert it back correctly
        const converted_exp = Math.floor(exp/Player.LevelEXPModifier)
        const tri = Math.floor((Math.sqrt(8*converted_exp + 1) - 1)/2)
        return tri + 1
    }

    static EXPFromLevel(level){
        //total exp for level n = modifier * triangular_number(n-1)
        return Player.LevelEXPModifier * ((level-1)*level)/2
    }
    
    get EXPtoNextLevel(){
        return Player.EXPFromLevel(this.lvl+1) - this.exp
    }

    gainEXP(exp){
        this.exp += exp
        this.addToLog("You gained " + exp + " EXP!")
        //CHECK FOR LEVELUP
        const new_lvl = Player.LevelFromEXP(this.exp)
        const lvl_diff = new_lvl - this.lvl
        if (lvl_diff > 0)
        {
            this.addToLog("You are now level " + new_lvl + "! [+" + lvl_diff + " level(s)]")
            //LEVEL UP LOGIC

            //STATS
            //(should some randomness be added?)
            //TODO
            const hp_gain = this.class.hp_growth * lvl_diff
            const mp_gain = this.class.mp_growth * lvl_diff
            const str_gain = this.class.str_growth * lvl_diff
            const def_gain = this.class.def_growth * lvl_diff
            const mag_gain = this.class.mag_growth * lvl_diff
            const spd_gain = this.class.spd_growth * lvl_diff

            //maintain hp ratio on level up
            const hp_ratio = this.current_hp / this.max_hp
            const mp_ratio = this.current_mp / this.max_mp

            this.max_hp += hp_gain
            this.max_mp += mp_gain

            this.current_hp = this.max_hp * hp_ratio
            this.current_mp = this.max_mp * mp_ratio

            this.str += str_gain
            this.def += def_gain
            this.mag += mag_gain
            this.spd += spd_gain

            this.addToLog("Gained " + hp_gain + " Max HP!")
            this.addToLog("Gained " + mp_gain + " Max MP!")
            this.addToLog("Gained " + str_gain + " Strength!")
            this.addToLog("Gained " + def_gain + " Defense!")
            this.addToLog("Gained " + mag_gain + " Magic!")
            this.addToLog("Gained " + spd_gain + " Speed!")

            //UPDATE SKILL
            let new_skill = null

            const skill_lvls = [5,10,15,20]
            for (let i = 0; i < skill_lvls.length; i++)
            {
                const skill_lvl = skill_lvls[i]
                const skill = this.class.skills[skill_lvl]
                if (this.lvl < skill_lvl && new_lvl >= skill_lvl && skill != this.skill.handle)
                    new_skill = skill
            }
            //LOAD NEW SKILL FROM HANDLE
            if (new_skill)
            {
                //async workaround
                async function setNewSkill(player) {
                    await player.skill.getFromDB(new_skill)
                    player.addToLog("Learned new skill \"" + player.skill.skill_name + "\"!")
                };
                setNewSkill(this)
            }

            //UPDATE LVL
            this.lvl = new_lvl
        }
    }

    get hasWeapon() {
        return !(this.weapon == null);
    }
    get hasArmor() {
        return !(this.armor == null);
    }
    get hasAccessory() {
        return !(this.accessory == null);
    }
    get hasItems() {
        return !(this.items?.length === 0);
    }

    //calculate "true" stat values by adding character stats + equip stats
    get totalMaxHP(){
        return this.max_hp  + (this.hasWeapon && this.weapon.hp ? this.weapon.hp : 0) 
                            + (this.hasArmor && this.armor.hp ? this.armor.hp : 0) 
                            + (this.hasAccessory && this.accessory.hp ? this.accessory.hp : 0)
    }

    get totalMaxMP(){
        return this.max_mp  + (this.hasWeapon && this.weapon.mp ? this.weapon.mp : 0) 
                            + (this.hasArmor && this.armor.mp ? this.armor.mp : 0) 
                            + (this.hasAccessory && this.accessory.mp ? this.accessory.mp : 0)
    }

    get totalStr(){
        return this.str     + (this.hasWeapon && this.weapon.str ? this.weapon.str : 0) 
                            + (this.hasArmor && this.armor.str ? this.armor.str : 0) 
                            + (this.hasAccessory && this.accessory.str ? this.accessory.str : 0)
    }

    get totalDef(){
        return this.def     + (this.hasWeapon && this.weapon.def ? this.weapon.def : 0) 
                            + (this.hasArmor && this.armor.def ? this.armor.def : 0) 
                            + (this.hasAccessory && this.accessory.def ? this.accessory.def : 0)
    }

    get totalMag(){
        return this.mag     + (this.hasWeapon && this.weapon.mag ? this.weapon.mag : 0) 
                            + (this.hasArmor && this.armor.mag ? this.armor.mag : 0) 
                            + (this.hasAccessory && this.accessory.mag ? this.accessory.mag : 0)
    }

    get totalSpd(){
        return this.spd     + (this.hasWeapon && this.weapon.spd ? this.weapon.spd : 0) 
                            + (this.hasArmor && this.armor.spd ? this.armor.spd : 0) 
                            + (this.hasAccessory && this.accessory.spd ? this.accessory.spd : 0)
    }

    get totalGoldValue(){
        return this.gold    + (this.hasWeapon ? this.weapon.gold_value : 0) 
                            + (this.hasArmor ? this.armor.gold_value : 0) 
                            + (this.hasAccessory ? this.accessory.gold_value : 0) 
                            + (this.hasItems ? this.items.reduce((acc, item) => acc + item.gold_value, 0) : 0)
    }

    //returns object with every effect from current equipped items
    //numeric keys are *added* together
    get equippedEffects(){
        //i took this from google hopefully it actually works
        const mergeAndSumNumeric = (...objs) => {
            return objs.reduce((acc, obj) => {
                for (const [key, value] of Object.entries(obj)) {
                if (typeof value === 'number' && typeof acc[key] === 'number') {
                    // Both the existing value and new value are numeric, so add them
                    acc[key] += value;
                } else {
                    // Fallback: Overwrite or set the value if it's non-numeric or new
                    acc[key] = value;
                }
                }
                return acc;
            }, {});
        };

        const weapon_effects = (this.hasWeapon ? this.weapon.effect : {}) 
        const armor_effects = (this.hasArmor ? this.armor.effect : {}) 
        const accessory_effects = (this.hasAccessory ? this.accessory.effect : {}) 

        return mergeAndSumNumeric(weapon_effects, armor_effects, accessory_effects)
    }

    //cloning business.
    clone() {

        // Deeply clone the internal data, then reconstruct the class

        //this entire thing could be a 1 liner if it wasn't for the log_ function
        //i gave it my all for the log_ function
        let functions = {};
        let data = {};

        for (const [key, value] of Object.entries(this)) {
            if (typeof value === "function") {
                functions[key] = value;
            } else {
                data[key] = value;
            }
        }

        let clonedPlayer = structuredClone(data);

        Object.assign(clonedPlayer, functions);

        //let clonedPlayer = structuredClone(this);

        clonedPlayer.class = this.class.clone()
        clonedPlayer.skill = this.skill.clone()

        if (this.hasWeapon) {
            clonedPlayer.weapon = this.weapon.clone()
        }

        if (this.hasArmor) {
            clonedPlayer.armor = this.armor.clone()
        }

        if (this.hasAccessory) {
            clonedPlayer.accessory = this.accessory.clone()
        }

        if (this.hasItems) {
            clonedPlayer.items = []
            for (let i = 0; i < this.items.length; i++)
            {
                clonedPlayer.items.push(this.items[i].clone())
            }
        }

        return Object.setPrototypeOf(clonedPlayer, Player.prototype);
    }
}