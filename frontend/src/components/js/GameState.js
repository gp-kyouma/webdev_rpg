import Player from './Player';
import Item from './Item';
//import Battle from './Battle';
import * as db from './DatabaseCRUD';
import * as maputils from './MapUtils.js'

export default class GameState {

    constructor() { // "empty" state

        this.id = 0
        this.user_id = 0

        this.floor = 0

        this.pos = [0,0]
        this.map_data = maputils.EmptyMap()
        this.view_data = maputils.EmptyMap()

        this.shop_items = []

        this.chest_item = null
        this.chest_active = false
        this.is_mimic = false

        this.boss_id = null//in hindsight this should not be allowed to be null but shh
        this.boss_level = 0
        this.boss_defeated = false

        this.player = new Player//empty

        this.battle = null

        //possible things to add:
        //cache of possible encounters on this floor? then i wouldn't need to query database every step
        //bet
        //probably just save handles here
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

        if (this.chest_item)//this is only here because i haven't implemented chest item yet, remove later
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

    async startGameState(newCharData)
    {
        this.id = 0
        this.user_id = newCharData.user_id

        this.floor = 1
        this.generateNewFloor()

        await this.player.startNewChar(newCharData)

        //create entry in gamestate database
        await db._create('game-states',this.prepareDatabaseEntry())

        //and then immediately read it
        let entry = await db._get('game-states',{user_id:this.user_id})
        entry = entry[0]

        //and set this.id
        this.id = entry.id
    }

    async loadGameState()
    {
        //TODO
    }

    async saveGameState()
    {
        await db._update('game-states',this.id,this.prepareDatabaseEntry())
        this.addToLog("Game state saved!")
    }

    addToLog(str)
    {
        if (this.log_)
            this.log_(str)
        else
            console.log("Log function not set (str was " + str + ")")
    }

    generateNewFloor()
    {
        this.pos = [4,4]
        this.map_data = maputils.GenerateMap(this.floor)
        this.view_data = maputils.EmptyMap()
        this.movePlayer('')

        //TODO item generation
        this.shop_items = []

        //TODO chest generation
        this.chest_item = null
        this.chest_active = false
        this.is_mimic = false

        //TODO boss generation
        this.boss_id = null
        this.boss_level = 0
        this.boss_defeated = false

        //TODO all of this
        this.encounter_table = []
    }

    goNextFloor()
    {
        this.floor++
        this.addToLog("Moving to floor " + this.floor + "...")
        this.generateNewFloor()

        //SAVES GAME TO DATABASE
        this.saveGameState()
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

        if (direction != '')
            this.addToLog("You moved "+dirFull+".")

        // if is a standard tile, random chance to start encounter
        //TODO
        // else if is a special tile, add relevant line to log
        //TODO

        return true
    }

    get currentTile(){
        const [x,y] = this.pos
        return this.map_data[y][x]
    }

    openChest()
    {
        //TODO
    }

    fightBoss()
    {
        //TODO
    }

    doBattleAction(action)
    {
        //TODO
        //something along the lines of:
        //this.battle.doPlayerAction(action)
        //if battle ongoing, do enemy action
        //switch (this.battle.state){
        //case won: etc
        //case died: etc
        //case escaped: etc
        //}
        //and so on
    }

    //debug, remove later
    doKillBoss()
    {
        this.boss_defeated = true
        this.addToLog("You destroyed the boss enemy (which does not exist) with your powers (which also do not exist).")
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

        let clonedData = structuredClone(data);

        Object.assign(clonedData, functions);

        //manually clone and assign the attributes that are classes
        clonedData.player = this.player.clone();

        //todo attributes
        //shop_items
        //chest_item
        //battle

        return Object.setPrototypeOf(clonedData, GameState.prototype);
    }
}