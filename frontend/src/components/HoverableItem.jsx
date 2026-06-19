function StatDiff({data, diff, label}){
    return (
        (data != 0 || diff != 0) ?
            <>{label}: {data} 
                {(diff != 0) ? 
                    <span class={(diff > 0) ? "text-positive" : "text-negative"}>
                        ({diff})
                    </span>: null
                }
                <br/>
            </> : null
    );
}

export default function HoverableItem({data, compare = null}) {

    let itemtype = null
    if (data.equipment){
        switch (data.equip_slot){
            case "WEAPON":
                itemtype = data.equip_type
                break;
            case "ARMOR":
                itemtype = data.equip_type + ' ARMOR'
                break;
            case "ACCESSORY":
                itemtype = 'ACCESSORY (' + data.equip_type + ')'
                break;
        }
    }
    else
        itemtype = "CONSUMABLE"

    let stats = null
    if (data.equipment){
        let hp_stat
        let mp_stat
        let str_stat
        let def_stat
        let mag_stat
        let spd_stat
        if (compare){
            const hp_diff  = compare.hp  - data.hp
            const mp_diff  = compare.mp  - data.mp
            const str_diff = compare.str - data.str
            const def_diff = compare.def - data.def
            const mag_diff = compare.mag - data.mag
            const spd_diff = compare.spd - data.spd

            hp_stat = <StatDiff data={data.hp} diff={hp_diff} label={"HP"}/>
            mp_stat = <StatDiff data={data.mp} diff={mp_diff} label={"MP"}/>
            str_stat = <StatDiff data={data.str} diff={str_diff} label={"Strength"}/>
            def_stat = <StatDiff data={data.def} diff={def_diff} label={"Defense"}/>
            mag_stat = <StatDiff data={data.mag} diff={mag_diff} label={"Magic"}/>
            spd_stat = <StatDiff data={data.spd} diff={spd_diff} label={"Speed"}/>
        }
        else{
            hp_stat =  (data.hp  != 0) ? <>HP: {data.hp}<br/></> : null
            mp_stat =  (data.mp  != 0) ? <>MP: {data.mp}<br/></> : null
            str_stat = (data.str != 0) ? <>Strength: {data.str}<br/></> : null
            def_stat = (data.def != 0) ? <>Defense: {data.def}<br/></> : null
            mag_stat = (data.mag != 0) ? <>Magic: {data.mag}<br/></> : null
            spd_stat = (data.spd != 0) ? <>Speed: {data.spd}<br/></> : null
        }

        stats = 
        <>
        {hp_stat}
        {mp_stat}
        {str_stat}
        {def_stat}
        {mag_stat}
        {spd_stat}
        </>
    }
    
    return (
        <>
        <span className="hiding-parent">
            <span className="bold-on-hover">{data.item_name}</span>
            <span className={"hidden-child rarity-"+data.rarity}>
                <br/>
                {itemtype}
                <br/>
                {data.item_description}
                <br/>
                Gold value: {data.gold_value}
                <br/>
                Rarity: {data.rarity}
                <br/>

                {stats}
            </span>
        </span>
        </>
    );
}