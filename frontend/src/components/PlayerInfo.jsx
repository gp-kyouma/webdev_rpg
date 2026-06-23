import HoverableItem from "./HoverableItem"

export default function PlayerInfo({data, apply}) {

    //const applyToData = (method, params) => apply(method,params);
    
    //if items can be used outside of combat this needs to be revisited
    //also if can sell items in shop
    
    const wpn_name = data.weapon ? <>Weapon: <HoverableItem data={data.weapon}/></> : <>Weapon: (None)</>
    const arm_name = data.armor ? <>Armor: <HoverableItem data={data.armor}/></> : <>Armor: (None)</>
    const acc_name = data.accessory ? <>Accessory: <HoverableItem data={data.accessory}/></> : <>Accessory: (None)</>
    const inventory_names = (data.hasItems) ? 
                                <>Items:<br/>{data.items.map(function(item) { return ( 
                                    <> 
                                        <HoverableItem data={item}/>
                                        <br/>
                                    </> ); })}</> : 
                                <>Items:<br/>(None)</>

    const hp_ratio = data.current_hp / data.totalMaxHP
    const mp_ratio = data.current_mp / data.totalMaxMP
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
    
    return (
        <>
        <h2>{data.name}, the {data.class.class_name}</h2>
        <hr />

        <div class="flex-parent flex-gap">
            <div class="flex-child">
                Level: {data.lvl}
                <br/>
                Total EXP: {data.exp}
                <br/>
                EXP to next level: {data.EXPtoNextLevel}
                <hr />

                <div>
                    <div>
                        HP: <span class={hp_color}>{data.current_hp}</span> / {data.totalMaxHP}
                        <br/>
                        MP: <span class={mp_color}>{data.current_mp}</span> / {data.totalMaxMP}
                        <br/>
                        Strength: {data.totalStr}
                        <br/>
                        Defense: {data.totalDef}
                        <br/>
                        Magic: {data.totalMag}
                        <br/>
                        Speed: {data.totalSpd}
                    </div>
                </div>
                <hr />

                <b>Skill: {data.skill.skill_name}</b>
                <br/>
                {data.skill.skill_description}
                <br/>
                MP cost: {data.skill.cost}
            </div>
            <div class="flex-child">
                Gold: {data.gold}
                <br/>
                Total value of equipment + inventory: {data.totalGoldValue - data.gold}
                <br/>
                Total gold value: {data.totalGoldValue}
                <hr />
                Equipment:
                <br/>
                {wpn_name}
                <br/>
                {arm_name}
                <br/>
                {acc_name}
                <br/>
                {inventory_names}
            </div>
        </div>

        <hr />
        </>
    );
}