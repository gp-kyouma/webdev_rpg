export default function BossRoomScreen({data, apply}) {

    //const applyToData = (method, params) => apply(method,params);

    let action
    if (data.boss_defeated)
        action=<button type="button" onClick={() => apply("goNextFloor",undefined)} > Go to Next Floor </button>
    else
        action=<button type="button" onClick={() => apply("fightBoss",undefined)} > Approach Boss </button>
    
    return (
        <>
            {action}
        </>
    );
}