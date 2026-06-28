import {_get} from './DatabaseCRUD';
import Skill from './Skill';

export class Battler {
    
    constructor() { // "empty" battler

        this.name = ""

        this.is_boss = false

        this.max_hp = 0
        this.hp = 0

        //-1 = ignores mp costs (aka enemies)
        this.max_mp = -1
        this.mp = -1

        this.str = 0
        this.def = 0
        this.mag = 0
        this.spd = 0

        this.skill = null

        this.gold_dropped = 0
        this.exp_dropped = 0

        this.effects = {}
    }

    async setFromEnemyDataDB(handle, useID = false, currentFloor) {
        let search_term;
        if (useID)
            search_term = { id: handle }
        else
            search_term = { handle: handle }

        const enemydata = await _get('enemy-data', search_term)
        if (!enemydata || Array.isArray(enemydata) && enemydata.length === 0)
        {
            console.log("Enemy with handle " + handle + " does not exist in database")
            return
        }
        const enemy = enemydata[0]
        if (!enemy)//just to be sure...
        {
            console.log("Enemy with handle " + handle + " does not exist in database")
            return
        }

        this.name = enemy.enemy_name

        this.is_boss = enemy.is_boss

        this.skill = new Skill
        await this.skill.getFromDB(enemy.skill)

        //LEVEL AND STAT CALCULATION STUFF GOES HERE
        //ALSO AFFECTS DROPS
        //starting_floor, stopping_floor,
        //base_level, max_level,  level_up_factor,

        //TODO

        this.max_hp = enemy.hp
        this.hp = this.max_hp
        this.str = enemy.str
        this.def = enemy.def
        this.mag = enemy.mag
        this.spd = enemy.spd
        this.gold_dropped = enemy.gold_dropped
        this.exp_dropped = enemy.exp_dropped
    }

    setFromPlayerData(player)
    {
        this.name = player.name

        this.max_hp = player.totalMaxHP
        this.hp = player.current_hp

        this.max_mp = player.totalMaxMP
        this.mp = player.current_mp

        this.str = player.totalStr
        this.def = player.totalDef
        this.mag = player.totalMag
        this.spd = player.totalSpd

        this.skill = player.skill.clone()

        this.effects = player.equippedEffects
    }

    //Buff stages
    //like pokémon
    GetRankModifier(rankname){
        const rank = this.effects[rankname]
        let numerator = 2
        let denominator = 2

        if (rank){
            if (rank > 0)
                numerator += rank
            else if (rank < 0)
                denominator -= rank
        }

        return numerator/denominator
    }

    // (Stat * buff modifier) getters
    get effectiveStr() {
        return this.str * this.GetRankModifier("attack_rank");
    }
    get effectiveDef() {
        return this.def * this.GetRankModifier("defense_rank");
    }
    get effectiveMag() {
        return this.mag * this.GetRankModifier("magic_rank");
    }
    get effectiveSpd() {
        return this.spd * this.GetRankModifier("speed_rank");
    }

    //cloning business.
    clone() {

        // Deeply clone the internal data, then reconstruct the class
        let clonedBattler = structuredClone(this);

        return Object.setPrototypeOf(clonedBattler, Battler.prototype);
    }
}

export default class Battle {
    
    //possible battle states
    static BATTLE_ONGOING = 0
    static BATTLE_VICTORY = 1
    static BATTLE_DEFEAT = 2
    static BATTLE_ESCAPE = 3

    constructor() { // "empty" battle

        this.player_battler = new Battler
        this.enemy_battler  = new Battler
        this.battle_state   = Battle.BATTLE_ONGOING
    }

    //todo EVERYTHING bro.
    //TODO

    addToLog(str)
    {
        if (this.log_)
            this.log_(str)
        else
            console.log("[battle] Log function not set (str was " + str + ")")
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

        let clonedBattle = structuredClone(data);

        Object.assign(clonedBattle, functions);

        clonedBattle.player_battler = this.player_battler.clone()
        clonedBattle.enemy_battler = this.enemy_battler.clone()

        return Object.setPrototypeOf(clonedBattle, Battle.prototype);
    }
}