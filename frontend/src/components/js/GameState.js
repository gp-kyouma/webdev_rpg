import Player from './Player';
import Item from './Item';
//import Battle from './Battle';
import * as db from './DatabaseCRUD';
import * as maputils from './MapUtils.js'

export class GameState {

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

        this.log_ = null//function to add text to log
    }

    //Todo soooooo much

    async startGameState()
    {
        //
    }

    async loadGameState()
    {
        //
    }

    saveGameState()
    {
        //
    }

    generateNewFloor()
    {
        //
    }

    movePlayer(direction)
    {
        //
    }

    openChest()
    {
        //
    }

    fightBoss()
    {
        //
    }
}