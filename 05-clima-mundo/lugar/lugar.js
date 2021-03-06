const axios = require('axios');
const {argv} = require('../yargs');



const getLugarLongLat = async (dir) =>{
    const encodeDireccion = encodeURI(dir);
    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeDireccion}`,
        headers: {"x-rapidapi-key": "77696da395msh6423dca2422aa34p1c8b7ejsnf98fbc53602c"}
    });
    
    const respuesta = await instance.get();

    if(respuesta.data.Results.length == 0){
        throw new Error(`No hay resultados con la direccion ${argv.direccion}`);
    }

    const data = respuesta.data.Results[0];
    const direccion = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return  {
        direccion,
        lat,
        lng
    }
}

module.exports = {
    getLugarLongLat
}