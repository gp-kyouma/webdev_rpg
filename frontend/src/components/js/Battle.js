import {_get} from './DatabaseCRUD';
import Skill from './Skill';
import { clamp, getRandomInt, getRandomIntInclusive } from './utils';

export class Battler {
    
    constructor() { // "empty" battler

        this.name = ""
        this.level = 0

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

    async setFromEnemyDataDB(handle, useID = false, expectedLevel = 1) {
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
        this.level = expectedLevel//TODO

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
        this.name = player.name +" the "+ player.class.class_name
        this.level = player.lvl

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

    //Buff/debuff stages (ranks)
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

    ChangeHP(change){
        this.hp += change
        this.hp = clamp(this.hp, 0, this.max_hp)
    }
    ChangeMP(change){
        this.mp += change
        this.mp = clamp(this.mp, 0, this.max_mp)
    }

    get isDead(){
        return this.hp == 0
    }

    // (Stat * rank modifier) getters
    get effectiveStr() {
        return Math.round(this.str * this.GetRankModifier("attack_rank"));
    }
    get effectiveDef() {
        return Math.round(this.def * this.GetRankModifier("defense_rank"));
    }
    get effectiveMag() {
        return Math.round(this.mag * this.GetRankModifier("magic_rank"));
    }
    get effectiveSpd() {
        return Math.round(this.spd * this.GetRankModifier("speed_rank"));
    }

    get effectiveSkillCost(){
        let skill_cost = this.skill.cost
        if (this.effects["mp_cost_modifier"]){
            skill_cost *= this.effects["mp_cost_modifier"]
            skill_cost = Math.ceil(skill_cost)
        }
        return skill_cost
    }
    get canUseSkill(){
        return this.mp >= this.effectiveSkillCost 
    }
    get usesMP(){
        return this.max_mp != -1
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

    static calculateHit(attacker, defender){
        //Most of the other calculations were stolen from somewhere else
        //But this one I just made up in my head

        //base dodge calculated using both actors' speed
        //comparing defender speed to attacker speed
        
        const dodge_speed = (defender.effectiveSpd > 0) ? defender.effectiveSpd : 1
        const hit_speed = (attacker.effectiveSpd > 0) ? attacker.effectiveSpd : 1
        const speed_compare = dodge_speed / hit_speed

        let base_dodge = 10 + ((speed_compare - 1) * 20)
        //defender has:
        //half speed: 0
        //same speed: 10
        //double speed: 30
        //triple speed: 50

        //no more than 67% (haha) dodge rate purely from speed
        base_dodge = clamp(base_dodge, 1, 67)

        //extra dodge effect
        if (defender.effects["extra_dodge"]){
            base_dodge += defender.effects["extra_dodge"]
        }

        //always at least 1% to miss, and 1% to hit
        base_dodge = clamp(base_dodge, 1, 99)

        //using dodge value, rolls for hit
        const hit_roll = getRandomInt(0, 100)

        if (hit_roll < base_dodge)
            return false
        else 
            return true
    }

    static calculateAttackDamage(attacker, defender, modifiers = {}){
        let offense = attacker.effectiveStr
        let defense = defender.effectiveDef

        //special skill cases
        if (modifiers["magic"]){
            //magical attack calculation
            offense = attacker.effectiveMag
            defense = defender.effectiveMag
        }

        if (modifiers["adaptive"]){
            //smaller of the two defenses
            defense = (defender.effectiveDef > defender.effectiveMag) ? defender.effectiveMag : defender.effectiveDef
        }

        //4x atk 2x def, like rpg maker
        let offense_modifier = modifiers["offense_modifier"] ? modifiers["offense_modifier"] : 1.0
        let defense_modifier = modifiers["defense_modifier"] ? modifiers["defense_modifier"] : 1.0

        //special attacker cases
        //[this one is noticeably janky but it's ok]
        if (attacker.effects["effective_damage"] && 
            defender.name.includes(attacker.effects["effective_damage"]))
        {
            offense_modifier = offense_modifier * 1.5
        }

        let base_damage = 4*offense*offense_modifier - 2*defense*defense_modifier

        //special defender cases
        if (defender.effects["reduce_mag_damage"] && 
            modifiers["magic"]){
            base_damage = base_damage * (100 - defender.effects["reduce_mag_damage"])/100
        }
        if (defender.effects["reduce_phys_damage"] && 
            !modifiers["magic"]){
            base_damage = base_damage * (100 - defender.effects["reduce_phys_damage"])/100
        }
        if (defender.effects["guarding"]){
            base_damage = base_damage * 0.5
        }

        //random damage spread
        const spread_percent = 20
        const random_spread = getRandomIntInclusive(100-spread_percent, 100+spread_percent) / 100

        return Math.floor(base_damage*random_spread)
    }

    changeRankStage(target, rankname, statname, change){
        const target_name = target.name
        const current_rank = target.effects[rankname] ? target.effects[rankname] : 0
        const rank_limit = 2 // [-2, 2]

        //prevent rank change if already at limit
        if (current_rank){
            if (current_rank >= rank_limit){
                this.addToLog(target_name + "'s " + statname + " rank can't go any higher!")
                return
            }
            else if (current_rank <= -rank_limit){
                this.addToLog(target_name + "'s " + statname + " rank can't go any lower!")
                return
            }
        }

        target.effects[rankname] = current_rank + change
        target.effects[rankname] = clamp(target.effects[rankname], -rank_limit, rank_limit)

        const active_change = target.effects[rankname] - current_rank

        if (active_change > 0)
            this.addToLog(target_name + "'s " + statname + " rank increased by " + active_change + "!")
        else
            this.addToLog(target_name + "'s " + statname + " rank decreased by " + -active_change + "!")
    }

    doBasicAttack(attacker, defender){
        let num_attacks = 1
        if (attacker.effects["extra_attack"])
            num_attacks += attacker.effects["extra_attack"]

        for (let i = 0; i < num_attacks; i++){
            if (defender.isDead)
                continue

            this.addToLog(attacker.name + " attacks!")

            const hit = Battle.calculateHit(attacker, defender)
            if (hit){
                const damage = Battle.calculateAttackDamage(attacker, defender)
                defender.ChangeHP(-damage)
                this.addToLog(defender.name + " took " + damage + " damage!")
            }
            else
                this.addToLog(defender.name + " dodged the attack!")
        }
    }

    useSkill(attacker, defender){

        const skill = attacker.skill
        
        //check mp cost
        if (attacker.usesMP){
            if (!attacker.canUseSkill){
                this.addToLog(attacker.name + " has insufficient MP to use " + skill.skill_name + "!")
                return
            }
            attacker.ChangeMP(-attacker.effectiveSkillCost)
        }

        this.addToLog(attacker.name + " uses " + skill.skill_name + "!")

        let num_attacks = skill.effect["attacks"] ? skill.effect["attacks"] : 0

        let made_contact = false

        for (let i = 0; i < num_attacks; i++){
            if (defender.isDead)
                continue

            const hit = Battle.calculateHit(attacker, defender)
            if (hit){
                made_contact = true
                const damage = Battle.calculateAttackDamage(attacker, defender, skill.effect)
                defender.ChangeHP(-damage)
                this.addToLog(defender.name + " took " + damage + " damage!")
            }
            else
                this.addToLog(defender.name + " dodged the attack!")
        }

        //Apply rank effects if any
        const ranknames = ["attack_rank", "defense_rank", "magic_rank", "speed_rank"]
        const statnames = { "attack_rank":  "Attack", 
                            "defense_rank": "Defense", 
                            "magic_rank":   "Magic", 
                            "speed_rank":   "Speed" }
        
        if (skill.effect["user_rank"]){
            const userrank = skill.effect["user_rank"]
            for (let i = 0; i < ranknames.length; i++){
                const rankname = ranknames[i]
                if (userrank[rankname])
                    this.changeRankStage(attacker, rankname, statnames[rankname], userrank[rankname])
            }
        }
        if (skill.effect["enemy_rank"] && (made_contact || num_attacks == 0)){
            const enemyrank = skill.effect["enemy_rank"]
            for (let i = 0; i < ranknames.length; i++){
                const rankname = ranknames[i]
                if (enemyrank[rankname])
                    this.changeRankStage(defender, rankname, statnames[rankname], enemyrank[rankname])
            }
        }

        //TODO apply other effects? (which currently do not exist)
    }

    doGuard(user){
        this.addToLog(user.name + " is guarding!")
        user.effects["guarding"] = true

        const mp_restore = 0.25
        if (user.usesMP)
            user.ChangeMP(Math.ceil(user.max_mp * mp_restore))
    }

    runAway(user){
        this.addToLog(user.name + " ran away!")
        this.battle_state = Battle.BATTLE_ESCAPE
    }
    
    useItem(item){
        //TODO
        this.addToLog("Used " + item.item_name + "! (It was not implemented yet...)")
        //will just be a big switch case probably...?
    }

    checkBattleState(){
        if (this.player_battler.isDead){
            this.addToLog(this.player_battler.name + " was defeated!")
            this.battle_state = Battle.BATTLE_DEFEAT
        }
        else if (this.enemy_battler.isDead){
            this.addToLog(this.enemy_battler.name + " was defeated!")
            this.battle_state = Battle.BATTLE_VICTORY
        }
    }

    doPlayerAction(action, item = null){
        //unset guarding if was guarding
        this.player_battler.effects["guarding"] = false

        switch (action) {
            case "ATTACK":
                this.doBasicAttack(this.player_battler, this.enemy_battler)
                this.checkBattleState()
                break;
            case "SKILL":
                this.useSkill(this.player_battler, this.enemy_battler)
                this.checkBattleState()
                break;
            case "GUARD":
                this.doGuard(this.player_battler)
                break;
            case "ITEM":
                this.useItem(item)
                this.checkBattleState()
                break;
            case "ESCAPE":
                this.runAway(this.player_battler)
                break;
        }
    }

    doEnemyAction(){
        //randomly roll enemy action between attack and skill
        let skill_chance

        //if enemy is physical focused, 80/20
        if (this.enemy_battler.str >= (2 * this.enemy_battler.mag))
            skill_chance = 20

        //if enemy is magic focused, 25/75
        else if (this.enemy_battler.mag >= (2 * this.enemy_battler.str))
            skill_chance = 75

        //else (if enemy has somewhat balanced stats), 60/40
        else
            skill_chance = 40

        const enemy_roll = getRandomInt(0, 100)
        const used_skill = (enemy_roll < skill_chance)
        if (used_skill){
            this.useSkill(this.enemy_battler, this.player_battler)
            this.checkBattleState()
        }
        else{
            this.doBasicAttack(this.enemy_battler, this.player_battler)
            this.checkBattleState()
        }
    }

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