export default function OngoingGameBanner({data}) {

    //show some game data
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
        Character name: {data.char_name}
        <br/>
        Current floor: {data.floor}
        <hr />

        Class: {data.class_name}
        <br/>
        Current HP: {data.current_hp} / {data.max_hp}
        <br/>
        Current Level: {data.lvl}
        <br/>
        Current Gold: {data.gold}
        <hr />

        Current Equipment:
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