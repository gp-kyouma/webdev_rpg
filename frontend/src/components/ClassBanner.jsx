export default function ClassBanner({data}) {

    //show class data
    const wpn_name = data.weapon_name ? <>Weapon: {data.weapon_name}</> : <>Weapon: (None)</>
    const arm_name = data.armor_name ? <>Armor: {data.armor_name}</> : <>Armor: (None)</>
    const acc_name = data.accessory_name ? <>Accessory: {data.accessory_name}</> : <>Accessory: (None)</>

    let item_names = []
    if (data.item1_name) item_names.push(data.item1_name)
    if (data.item2_name) item_names.push(data.item2_name)
    if (data.item3_name) item_names.push(data.item3_name)
    if (data.item4_name) item_names.push(data.item4_name)
        
    const inventory_names = (item_names.length > 0) ? 
                            <>Items: {item_names.map(function(item, index) { return ( <> {item + ((index < item_names.length-1) ? ", " : "")} </> ); })}</> : 
                            <>Items: (None)</>
    
    return (
        <>
        <h1>{data.class_name}</h1>
        <h2>{data.class_description}</h2>
        <hr />

        Starting Stats:
        <br/>
        <div style={{display: 'flex', "columnGap": "20px"}}>
            <div>
                HP: {data.hp}
                <br/>
                MP: {data.mp}
                <br/>
                Strength: {data.str}
                <br/>
                Defense: {data.def}
                <br/>
                Magic: {data.mag}
                <br/>
                Speed: {data.spd}
            </div>
            <div>
                [+{data.hp_growth} per level up]
                <br/>
                [+{data.mp_growth} per level up]
                <br/>
                [+{data.str_growth} per level up]
                <br/>
                [+{data.def_growth} per level up]
                <br/>
                [+{data.mag_growth} per level up]
                <br/>
                [+{data.spd_growth} per level up]
            </div>
        </div>
        <hr />

        Level 1 Skill: {data.skill1_name}
        { (data.skill_1 != data.skill_5) ? <> <br/> Level 5 Skill: {data.skill5_name} </> : null }
        { (data.skill_5 != data.skill_10) ? <> <br/> Level 10 Skill: {data.skill10_name} </> : null }
        { (data.skill_10 != data.skill_15) ? <> <br/> Level 15 Skill: {data.skill15_name} </> : null }
        { (data.skill_15 != data.skill_20) ? <> <br/> Level 20 Skill: {data.skill20_name} </> : null }
        <hr />

        Starting Equipment:
        <br/>
        {wpn_name}
        <br/>
        {arm_name}
        <br/>
        {acc_name}
        <br/>
        {inventory_names}
        <hr />
        </>
    );
}