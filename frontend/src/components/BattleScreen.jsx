function BattlerData({data}) {

    const hp_ratio = data.hp / data.max_hp
    const mp_ratio = data.mp / data.max_mp
    
    let hp_color
    let mp_color

    if (hp_ratio < 0.20)
        hp_color = "text-negative"
    else if (hp_ratio <= 0.5)
        hp_color = "text-middling"
    else
        hp_color = "text-positive"

    if (mp_ratio == 0)
        mp_color = "text-0-magic"
    else if (mp_ratio <= 0.5)
        mp_color = "text-50-magic"
    else
        mp_color = "text-100-magic"

    const attack_rank = data.effects["attack_rank"] ? data.effects["attack_rank"] : 0
    const defense_rank = data.effects["defense_rank"] ? data.effects["defense_rank"] : 0
    const magic_rank = data.effects["magic_rank"] ? data.effects["magic_rank"] : 0
    const speed_rank = data.effects["speed_rank"] ? data.effects["speed_rank"] : 0
    let str_color = ""
    let def_color = ""
    let mag_color = ""
    let spd_color = ""

    if (attack_rank > 0)
        str_color = "text-positive"
    else if (attack_rank < 0)
        str_color = "text-negative"

    if (defense_rank > 0)
        def_color = "text-positive"
    else if (defense_rank < 0)
        def_color = "text-negative"

    if (magic_rank > 0)
        mag_color = "text-positive"
    else if (magic_rank < 0)
        mag_color = "text-negative"

    if (speed_rank > 0)
        spd_color = "text-positive"
    else if (speed_rank < 0)
        spd_color = "text-negative"

    return (
        <div class="align-center">
            <div>
                <b>{data.name}</b>
                <br/>
                Level {data.level}
            </div>

            <div>
                HP: <span class={hp_color}>{data.hp}</span> / {data.max_hp}
                <br/>
                {data.usesMP ? <>MP: <span class={mp_color}>{data.mp}</span> / {data.max_mp}</> : <br/>}
            </div>
            <br/>

            <div class="flex-parent flex-gap ">
                <div class="flex-child">
                    Strength:
                    <br/>
                    <span class={str_color}>{data.effectiveStr} {(attack_rank != 0) ? <><br/>(Rank: {attack_rank})</> : null}</span>
                </div>
                <div class="flex-child">
                    Defense:
                    <br/>
                    <span class={def_color}>{data.effectiveDef} {(defense_rank != 0) ? <><br/>(Rank: {defense_rank})</> : null}</span>
                </div>
                <div class="flex-child">
                    Magic:
                    <br/>
                    <span class={mag_color}>{data.effectiveMag} {(magic_rank != 0) ? <><br/>(Rank: {magic_rank})</> : null}</span>
                </div>
                <div class="flex-child">
                    Speed:
                    <br/>
                    <span class={spd_color}>{data.effectiveSpd} {(speed_rank != 0) ? <><br/>(Rank: {speed_rank})</> : null}</span>
                </div>
            </div>
        </div>
    );
}

export default function BattleScreen({data, apply}) {
    
    const item_buttons = (data.player.hasItems) ? 
                                <>{data.player.items.map(function(item, index) { 
                                    return ( 
                                        <div> 
                                            <button type="button" onClick={() => apply("doBattleAction",{name: "ITEM", item_index: index})} > Use {item.item_name} </button>
                                            &emsp;
                                            {item.item_description}
                                            <br/>
                                        </div> ); 
                                    })}
                                </> : null

    const canUseSkill = data.battle.player_battler.canUseSkill
    const skillColor = canUseSkill ? "" : "text-negative"

    const isBoss = data.battle.enemy_battler.is_boss
    const fleeColor = isBoss ? "text-negative" : ""
    
    return (
        <>
        <hr />

        <div class="flex-parent flex-gap">
            <div class="flex-child edge-right">
                <BattlerData data={data.battle.player_battler}/>
            </div>
            <div class="flex-child">
                <BattlerData data={data.battle.enemy_battler}/>
            </div>
        </div>

        <hr />

        <div> 
            <button type="button" onClick={() => apply("doBattleAction",{name: "ATTACK"})} > Attack </button>
            &emsp;
            Do a basic physical attack with your weapon.
            <br/>
        </div>

        <div> 
            <button type="button" onClick={() => apply("doBattleAction",{name: "SKILL"})} disabled={!canUseSkill} class={skillColor}> 
                {data.battle.player_battler.skill.skill_name} ({data.battle.player_battler.effectiveSkillCost} MP)
            </button>
            &emsp;
            {data.battle.player_battler.skill.skill_description}
            <br/>
        </div>

        <div> 
            <button type="button" onClick={() => apply("doBattleAction",{name: "GUARD"})} > Guard </button>
            &emsp;
            Guard against incoming attacks, reducing damage and recovering 25% MP.
            <br/>
        </div>

        {item_buttons}

        <div> 
            <button type="button" onClick={() => apply("doBattleAction",{name: "ESCAPE"})} disabled={isBoss} class={fleeColor}> Escape </button>
            &emsp;
            {isBoss ? "No escaping from a boss battle!" : "Run away from battle, receiving no rewards."}
            <br/>
        </div>

        <hr />
        </>
    );
}