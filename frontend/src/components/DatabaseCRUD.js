import axios from 'axios';

// table: table name (ex: "scores")
// id: an object with the search params (ex: { username: "zezinho" })
// pid: an integer; the primary key for a database entry
// data: the data to be updated/saved, in object form (ex: { firstName: 'Fred', lastName: 'Flintstone', })

//this *HAVING* to be async is the bane of my existence. javascript you are a nasty sniveling language
//"JavaScript intentionally does not provide a synchronous way to [resolve promises]" Why. Die
export async function _get(table,id)
{
    //can get the whole table unfiltered/unsorted by passing {} as id
    let search_params = structuredClone(id);

    let ret;

    try {
        const response = await axios.get('/api/' + table, { params: search_params, paramsSerializer: { indexes: null } })
        //console.log(JSON.stringify(response.data));
        ret = structuredClone(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
    return ret;
}

export async function _create(table,data)//aka post
{
    const new_data = structuredClone(data);

    await axios.post('/api/' + table, new_data);
    
    //...i'd probably like to get the pid for the entry i just created, wouldn't i...
    //damn it.
}

export async function _update(table,pid,data)//aka put
{
    const new_data = structuredClone(data);
    
    // using abstract search params does not work here, has to be pid
    try {
        await axios.put('/api/' + table + '/' + pid, new_data);
    } catch (error) {
        console.log((error));
    }
}

export async function _delete(table,pid)
{
    // using abstract search params does not work here, has to be pid
    try {
        await axios.delete('/api/' + table + '/' + pid)
    } catch (error) {
        console.log((error));
    }
}