import axios from 'axios';

// table: table name (ex: "Scores")
// id: an object with the search params (ex: { username: "zezinho" })
// data: the data to be updated/saved, in object form (ex: { firstName: 'Fred', lastName: 'Flintstone', })
//^possibly needs to be formdata...? requires testing
//ALL of ts requires testing, since i haven't actually made the schema yet
//idk how much of a problem it would be to make all of these async...
//guess i'll have to find out later if it works

export function DB_get(table,id)
{
    let search_params;
    //allow for getting the whole table, by passing '' as id instead of an object
    //hopefully this works the way i imagine it to
    if (id === '')
        search_params = {};
    else
        search_params = structuredClone(id);

    let ret;

    // following the react+yii class example, this should just work
    axios.get('/api/' + table, { params: search_params }).then(res => ret = structuredClone(res.data));

    return ret;
}

export function DB_create(table,data)//aka post
{
    const new_data = structuredClone(data);

    //this is the simplest one and should simply work as imagined
    //hopefully no await shenanigans here
    axios.post('/api/' + table, new_data);
}

export function DB_update(table,id,data)//aka put
{
    const search_params = structuredClone(id);
    const new_data = structuredClone(data);
    
    //hopefully this works the way i imagine it to
    axios.put('/api/' + table, new_data, { params: search_params });
}

export function DB_delete(table,id)
{
    const search_params = structuredClone(id);
    
    //hopefully this works the way i imagine it to
    axios.delete('/api/' + table, { params: search_params })
}