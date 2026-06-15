export default function BossRoomScreen({data, apply}) {

    //const applyToData = (method, params) => apply(method,params);
    
    //big fat TODO, on multiple levels

    let action
    if (data.boss_defeated)
        action=<button type="button" onClick={() => apply("goNextFloor",undefined)} > Go to Next Floor </button>
    else
        action=<button type="button" onClick={() => apply("doKillBoss",undefined)} > Obliterate Nonexistent Boss With Mind </button>
    
    return (
        <>
            {action}
        </>
    );
}