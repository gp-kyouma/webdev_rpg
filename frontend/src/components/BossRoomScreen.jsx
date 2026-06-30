export default function BossRoomScreen({data, apply}) {

    //const applyToData = (method, params) => apply(method,params);

    //Trust
    async function nextfloor(){
        await apply("setNoUpdate",true)
        await apply("goNextFloor",undefined)
    }

    let action
    if (data.boss_defeated)
        action=<button type="button" onClick={() => nextfloor()} > Go to Next Floor </button>
    else
        action=<button type="button" onClick={() => apply("fightBoss",undefined)} > Approach Boss </button>
    
    return (
        <>
            {action}
        </>
    );
}