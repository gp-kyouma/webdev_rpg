import Player from './Player';
import Item from './Item';
import Battle from './Battle';
import * as db from './DatabaseCRUD';
import * as maputils from './MapUtils.js'
import { clamp, getRandomInt } from './utils.js';

export default class GameState {

    constructor() { // "empty" state

        this.game_over = false
        this.no_update = false//i don't think this works as intended actually. thanks async very cool.
        
        this.id = 0
        this.user_id = 0

        this.floor = 0

        this.pos = [0,0]
        this.map_data = maputils.EmptyMap()
        this.view_data = maputils.EmptyMap()

        this.shop_items = []

        this.chest_item = null
        this.chest_active = true
        this.is_mimic = false

        this.boss_id = null//in hindsight this should not be allowed to be null but shh
        this.boss_level = 0
        this.boss_defeated = false

        this.player = new Player//empty

        this.battle = null

        //cache of possible encounters on this floor
        this.encounter_table = []
    }

    prepareDatabaseEntry(){
        let result = {}

        result.user_id = this.user_id
        result.floor = this.floor
        result.map_data = maputils.serialize(this.map_data)

        if (this.shop_items.length > 0)
            for (let i = 1; i <= this.shop_items.length; i++)
            {
                const key = ("shop"+i+"_id")
                result[key] = this.shop_items[i-1].id
            }

        result.chest_id = this.chest_item.id
        result.is_mimic = this.is_mimic ? 1 : 0 // must be an integer lol?

        result.boss_id = this.boss_id
        result.boss_level = this.boss_level

        // player data:
        result.char_name = this.player.name

        result.current_hp = this.player.current_hp
        result.current_mp = this.player.current_mp

        result.max_hp = this.player.max_hp
        result.max_mp = this.player.max_mp

        result.str = this.player.str
        result.def = this.player.def
        result.mag = this.player.mag
        result.spd = this.player.spd

        result.exp = this.player.exp
        result.lvl = this.player.lvl
        result.gold = this.player.gold

        result.class_id = this.player.class.id
        result.skill_id = this.player.skill.id

        if (this.player.hasWeapon)
            result.weapon_id = this.player.weapon.id

        if (this.player.hasArmor)
            result.armor_id = this.player.armor.id

        if (this.player.hasAccessory)
            result.accessory_id = this.player.accessory.id

        if (this.player.hasItems)
            for (let i = 1; i <= this.player.items.length; i++)
            {
                const key = ("item"+i+"_id")
                result[key] = this.player.items[i-1].id
            }

        return result
    }

    prepareScoreEntry(){
        const date = new Date; // Current date/time

        // Format: 'YYYY-MM-DDTHH:mm:ss.sssZ' -> 'YYYY-MM-DD HH:mm:ss'
        const sqlTimestamp = date.toISOString().slice(0, 19).replace('T', ' ');

        const score = { user_id : this.user_id, 
                        gameover_time : sqlTimestamp, 
                        char_name: this.player.name, 
                        floor: this.floor, 
                        total_exp: this.player.exp, 
                        final_level: this.player.lvl, 
                        total_value: this.player.totalGoldValue}
        return score
    }

    async startGameState(newCharData)
    {
        this.id = 0
        this.user_id = newCharData.user_id

        await this.player.startNewChar(newCharData)

        this.floor = 1
        await this.generateNewFloor()

        //create entry in gamestate database
        await db._create('game-states',this.prepareDatabaseEntry())

        //and then immediately read it
        let entry = await db._get('game-states',{user_id:this.user_id})
        entry = entry[0]

        //and set this.id
        this.id = entry.id
    }

    async loadGameState(ongame)
    {
        this.id = ongame.id
        this.user_id = ongame.user_id

        this.floor = ongame.floor

        this.pos = [4,4]
        this.map_data = maputils.deserialize(ongame.map_data)
        this.view_data = maputils.EmptyMap()
        this.movePlayer('')

        this.shop_items = []
        for (let i = 1; i <= 4; i++)
        {
            const key = ("shop"+i+"_id")
            if (key in ongame && ongame[key]) {
                let newItem = new Item
                await newItem.getFromDB(ongame[key], true)
                this.shop_items.push(newItem);
            }
        }

        if ("chest_id" in ongame && ongame.chest_id) {
            this.chest_item = new Item
            await this.chest_item.getFromDB(ongame.chest_id, true);
        }

        this.is_mimic = !!ongame.is_mimic

        if (ongame.boss_id)
            this.boss_id = ongame.boss_id
        this.boss_level = ongame.boss_level

        await this.player.setFromGameState(ongame)

        await this.setEncounterTable()
    }

    async saveGameState()
    {
        this.no_update = true
        await db._update('game-states',this.id,this.prepareDatabaseEntry())
        this.addToLog("Game state saved!")
        this.no_update = false
    }

    async endGameState()
    {
        this.no_update = true
        //create entry in score database
        await db._create('scores',this.prepareScoreEntry())

        //delete this entry in gamestate database
        await db._delete('game-states',this.id)

        this.game_over = true
        this.addToLog("Game over! (Score saved to leaderboards)")
    }

    async setEncounterTable() {
        const all_nonboss_enemies = await db._get('enemy-data',{is_boss: 0})

        //manually filter (cringe but necessary)
        const floor_enemies = all_nonboss_enemies.filter(enemy =>   enemy.handle != "ENEMY_MIMIC" && 
                                                                    enemy.starting_floor <= this.floor && 
                                                                    (enemy.stopping_floor ? (enemy.stopping_floor >= this.floor) : true));
        const handles = floor_enemies.map(enemy => enemy.handle);

        this.encounter_table = handles
    };

    async generateBoss(){
        const all_boss_enemies = await db._get('enemy-data',{is_boss: 1})

        //manually filter (cringe but necessary)
        const possible_bosses = all_boss_enemies.filter(enemy =>enemy.starting_floor <= this.floor && 
                                                                (enemy.stopping_floor ? (enemy.stopping_floor >= this.floor) : true));

        let chosen_boss
        
        if (possible_bosses.length == 0){//if somehow there's no bosses for this floor, get a random one
            chosen_boss = all_boss_enemies[getRandomInt(0,all_boss_enemies.length)]
        }
        else{
            chosen_boss = possible_bosses[getRandomInt(0,possible_bosses.length)]
        }

        //calculates boss level
        if (!chosen_boss.max_level)
            chosen_boss.max_level = 9999//quickfix

        const level_variation = 2
        const boss_level = clamp(this.floor + getRandomInt(-level_variation,level_variation), chosen_boss.base_level, chosen_boss.max_level)

        this.boss_id = chosen_boss.id
        this.boss_level = boss_level
        this.boss_defeated = false
    }

    addToLog(str)
    {
        if (this.log_)
            this.log_(str)
        else
            console.log("[gamestate] Log function not set (str was " + str + ")")
    }

    //attempt to prevent async-related disasters
    setNoUpdate(bool){
        this.no_update = bool
    }

    async generateRandomItem()
    {
        let query_params = {}

        console.log("=== NEW ITEM ROLL ===")//debug

        const equip_chance = 33
        const equip_roll = getRandomInt(0,100)
        const is_equip = equip_roll < equip_chance

        console.log("EQUIPMENT ROLL: " + equip_roll)//debug

        query_params.equipment = is_equip ? 1 : 0;//has to be 0/1 for query

        if (is_equip){
            // 40% chance for weapon, 40% chance for armor, 20% chance for accessory

            const acc_chance = 20
            const arm_chance = 40
            //remaining is wpn_chance

            let chosen_slot
            const slotroll = getRandomInt(0,100)
            if (slotroll < acc_chance)
                chosen_slot = "ACCESSORY"
            else if (slotroll < acc_chance + arm_chance)
                chosen_slot = "ARMOR"
            else
                chosen_slot = "WEAPON"

            query_params.equip_slot = chosen_slot

            console.log("SLOT ROLL: " + slotroll)//debug

            // if weapon or armor:
            // 80% chance for same type as class (staff/sword/etc, light/heavy/etc), 20% random type
            const class_type_chance = 80
            const typeroll = getRandomInt(0,100)
            const use_class_type = typeroll < class_type_chance
            
            if (use_class_type && chosen_slot == "WEAPON")
                query_params.equip_type = this.player.class.weapon_type
            else if (use_class_type && chosen_slot == "ARMOR")
                query_params.equip_type = this.player.class.armor_type

            console.log("TYPE ROLL: " + typeroll)//debug
        }
        
        // then roll rarity
        query_params.rarity = Item.rollRarity()

        console.log(query_params)//debug

        // then do proper query and pick randomly from received array
        const possible_items = await db._get('items',query_params)
        const random_index = getRandomInt(0,possible_items.length)

        if (possible_items.length == 0)
            return null

        const chosen_item = possible_items[random_index]

        let newItem = new Item
        newItem.setFromItemData(chosen_item)
        return newItem
    }

    async generateShop(){
        this.shop_items = []
        for (let i = 0; i < 4; i++){
            const new_item = await this.generateRandomItem()
            if (new_item != null)
                this.shop_items.push(new_item)
        }
    }

    async generateChest(){
        this.chest_item = await this.generateRandomItem()
        if (this.chest_item != null)
            this.chest_active = true
        else
            this.chest_active = false

        //roll for mimic
        const mimic_chance = 20
        const mimic_roll = getRandomInt(0,100)
        console.log("MIMIC ROLL: " + mimic_roll)//debug
        this.is_mimic = mimic_roll < mimic_chance
    }

    async generateNewFloor()//sadly this has to be async. tragic. top 10 saddest javascript moments.
    {
        this.no_update = true

        this.pos = [4,4]
        this.map_data = maputils.GenerateMap(this.floor)
        this.view_data = maputils.EmptyMap()
        this.movePlayer('')

        //shop item generation
        await this.generateShop()

        //chest generation
        await this.generateChest()

        //boss generation
        await this.generateBoss()

        await this.setEncounterTable()

        this.no_update = false
    }

    doRandomEncounter()
    {
        if (this.encounter_table.length == 0)
            return

        const enemy_handle = this.encounter_table[getRandomInt(0,this.encounter_table.length)]

        //random chance
        const encounter_chance = 20
        const encounter_roll = getRandomInt(0,100)
        console.log("ENCOUNTER ROLL: " + encounter_roll)//debug
        if (encounter_roll < encounter_chance)
            this.startBattleEncounter(enemy_handle, false)//THIS IS ASYNC!!!
    }
    
    async startBattleEncounter(id, boss)
    {
        this.battle = new Battle
        this.battle.log_ = this.log_

        const enemy_level = boss ? this.boss_level : this.floor

        this.battle.player_battler.setFromPlayerData(this.player)

        await this.battle.enemy_battler.setFromEnemyDataDB(id,boss,enemy_level)

        this.addToLog("A level " + this.battle.enemy_battler.level + " " + this.battle.enemy_battler.name + " draws near!")
        this.addToLog("=== PLAYER TURN ===")
    }

    async goNextFloor()//this Should Not be async. but it has to be.
    {
        this.floor++
        this.addToLog("Moving to floor " + this.floor + "...")
        await this.generateNewFloor()

        //SAVES GAME TO DATABASE
        await this.saveGameState()
    }

    movePlayer(direction)
    {
        // basic movement test
        let [x,y] = this.pos
        let dirFull = ""
        switch (direction) {
            case 'N':
                y=y-1
                dirFull = "North"
                break;
        
            case 'S':
                y=y+1
                dirFull = "South"
                break;

            case 'E':
                x=x+1
                dirFull = "East"
                break;

            case 'W':
                x=x-1
                dirFull = "West"
                break;
            
            default:
                break;
        }

        if (y < 0 || y >= maputils.MapHeight)
            return false

        if (x < 0 || x >= maputils.MapWidth)
            return false

        if (this.map_data[y][x] == maputils.TileTypes.NONE)
            return false

        this.view_data[y][x] = maputils.TileTypes.CURRENT

        function updateAdjacentView(map,view,x,y){
            if (map[y][x] != maputils.TileTypes.NONE){
                if (view[y][x] == maputils.TileTypes.CURRENT)
                    view[y][x] = maputils.TileTypes.VISITED
                else if (view[y][x] == maputils.TileTypes.NONE)
                    view[y][x] = maputils.TileTypes.UNKNOWN
            }
        }

        if (x > 0) 
            updateAdjacentView(this.map_data,this.view_data,x-1,y);
        if (x < maputils.MapWidth-1) 
            updateAdjacentView(this.map_data,this.view_data,x+1,y);
        if (y > 0) 
            updateAdjacentView(this.map_data,this.view_data,x,y-1);
        if (y < maputils.MapHeight-1) 
            updateAdjacentView(this.map_data,this.view_data,x,y+1);

        this.pos = [x,y]

        if (direction != ''){
            this.addToLog("You moved "+dirFull+".")

            //recover 5% MP per step
            const mp_restore = 0.05
            this.player.current_mp += Math.ceil(this.player.totalMaxMP * mp_restore)
            this.player.current_mp = clamp(this.player.current_mp, 0, this.player.totalMaxMP)

            switch (this.currentTile) {
                // if is a default tile, random chance to start encounter
                case maputils.TileTypes.DEFAULT:
                    this.doRandomEncounter()
                    break;

                // else if is a special tile, add relevant line to log
                case maputils.TileTypes.TREASURE:
                    this.addToLog("You are inside a small room, with a" + (this.chest_active ? "" : "n opened") + " chest at the center.")
                    break;
            
                case maputils.TileTypes.SHOP:
                    this.addToLog("Welcome to the Floor " + this.floor + " Shop!")
                    break;

                case maputils.TileTypes.BOSS:
                    this.addToLog("You arrive at a large chamber, with a staircase leading to the next floor.")
                    if (!this.boss_defeated)
                        this.addToLog("A level " + this.boss_level + " boss monster stands between you and the floor exit...")
                    break;
            }
        }

        return true
    }

    get currentTile(){
        const [x,y] = this.pos
        return this.map_data[y][x]
    }

    buyFullHeal(){
        if (this.player.current_hp == this.player.totalMaxHP){
            this.addToLog("Already at max HP!")
            return
        }

        if (!this.player.canAfford(this.player.healCost)){
            this.addToLog("You can't afford this!")
            return
        }

        this.player.gold -= this.player.healCost

        this.player.current_hp = this.player.totalMaxHP
        this.addToLog("Fully healed HP!")
    }

    buyItem(index){

        const item = this.shop_items[index]
        let price = item.gold_value

        if (item.equipment){
            const current_equip = this.player.getEquipSlot(item.equip_slot)
            if (current_equip){
                price = price - current_equip.sell_value//discount
                if (current_equip.handle == item.handle){
                    //same item, do not sell
                    this.addToLog("You already have this equipment!")
                    return
                }
            }
        }
        else{
            if (!this.player.hasInventorySpace){
                this.addToLog("Your inventory is full!")
                return
            }
        }

        if (!this.player.canAfford(price)){
            this.addToLog("You can't afford this!")
            return
        }

        this.player.gold -= price

        if (item.equipment){
            if (item.equip_slot == "WEAPON")
                this.player.weapon = item.clone()
            else if (item.equip_slot == "ARMOR")
                this.player.armor = item.clone()
            else if (item.equip_slot == "ACCESSORY")
                this.player.accessory = item.clone()
        }
        else{
            this.player.items.push(item.clone())
        }

        this.addToLog(item.item_name + " purchased!")
    }

    sellItem(index){
        const item = this.player.items[index]

        this.player.gold += item.sell_value

        this.player.items = this.player.items.toSpliced(index, 1)//removes item from inventory

        this.addToLog(item.item_name + " sold!")
    }

    openChest()
    {
        //TODO
        //if mimic start encounter
        //but when do you get the item...? hmm.
        //perhaps some new flags are in order
    }

    async fightBoss()
    {
        await this.startBattleEncounter(this.boss_id, true)
    }

    doBattleAction(action)
    {
        //TAKES IN AN OBJECT

        if (!this.battle)
            return

        const action_name = action.name
        let used_item = null
        if (Object.hasOwn(action, 'item_index'))
            used_item = this.player.items[action.item_index]
        const item_was_used = !(used_item == null)

        this.battle.doPlayerAction(action_name, used_item)
        if (item_was_used)
            this.player.items = this.player.items.toSpliced(action.item_index, 1)//removes item from inventory

        //if battle ongoing, do enemy action
        if (this.battle.battle_state == Battle.BATTLE_ONGOING){
            this.addToLog("=== ENEMY TURN ===")
            this.battle.doEnemyAction()
        }

        //update player's hp/mp
        this.player.current_hp = this.battle.player_battler.hp
        this.player.current_mp = this.battle.player_battler.mp

        switch (this.battle.battle_state) {
            case Battle.BATTLE_ONGOING:
                this.addToLog("=== PLAYER TURN ===")
                break;

            case Battle.BATTLE_VICTORY:
                this.addToLog("=== BATTLE END ===")
                //get exp and gold, end battle
                
                this.addToLog("You gained " + this.battle.enemy_battler.gold_dropped + " Gold!")
                this.player.gold += this.battle.enemy_battler.gold_dropped

                //this.addToLog("Gained " + this.battle.enemy_battler.exp_dropped + " EXP!")
                this.player.gainEXP(this.battle.enemy_battler.exp_dropped)

                //if was boss, set defeated flag
                if (this.battle.enemy_battler.is_boss)
                    this.boss_defeated = true

                this.battle = null
                break;
        
            case Battle.BATTLE_DEFEAT:
                //end game
                this.addToLog("=== BATTLE END ===")
                this.battle = null
                this.endGameState()
                break;

            case Battle.BATTLE_ESCAPE:
                //end battle
                this.addToLog("=== BATTLE END ===")
                this.battle = null
                break;
        }
    }

    //cloning business.
    clone() {
        // Deeply clone the internal data, then reconstruct the class

        //this entire thing could be a 1 liner if it wasn't for the log_ function
        //i gave it my all for the log_ function
        let functions = {};
        let data = {};

        for (const [key, value] of Object.entries(this)) {
            if (key === "player" || key === "battle") {
                continue;
            }
            
            if (typeof value === "function") {
                functions[key] = value;
            } else {
                data[key] = value;
            }
        }

        let clonedData = structuredClone(data);

        Object.assign(clonedData, functions);

        //manually clone and assign the attributes that are classes

        //player
        clonedData.player = this.player.clone();

        //shop_items
        clonedData.shop_items = []
        for (let i = 0; i < this.shop_items.length; i++)
        {
            clonedData.shop_items.push(this.shop_items[i].clone())
        }

        //chest_item
        clonedData.chest_item = this.chest_item.clone()

        //battle
        if (this.battle)
            clonedData.battle = this.battle.clone()

        return Object.setPrototypeOf(clonedData, GameState.prototype);
    }
}