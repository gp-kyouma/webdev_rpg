import axios from 'axios';

// table: table name (ex: "scores")
// id: an object with the search params (ex: { username: "zezinho" })
// data: the data to be updated/saved, in object form (ex: { firstName: 'Fred', lastName: 'Flintstone', })

export async function _get(table,id)
{
    let search_params;

    //can get the whole table unfiltered/unsorted by passing {} as id
    search_params = structuredClone(id);

    let ret;

    //yay async.
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
}

export async function _update(table,id,data)//aka put
{
    const search_params = structuredClone(id);
    const new_data = structuredClone(data);
    
    //hopefully this works the way i imagine it to
    //NO IT DOES NOT.
    try {
        await axios.put('/api/' + table, new_data, { params: search_params });
    } catch (error) {
        console.log((error));
    }
}

export async function _delete(table,id)
{
    const search_params = structuredClone(id);
    
    //hopefully this works the way i imagine it to
    //NO IT DOES NOT.
    try {
        await axios.delete('/api/' + table, { params: search_params })
    } catch (error) {
        console.log((error));
    }
}