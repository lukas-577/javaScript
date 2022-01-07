const recursos = require("./recursos");
const mascotas = require("./rutas/mascotas");
const veterinarios = require("./rutas/veterinarios");

module.exports = {
    ruta: (data,callback)=>{ //handlers
        callback(200,{mensaje:'esta es /ruta'});
    },
    mascotas:mascotas(recursos.mascotas),
    veterinarios:veterinarios(recursos.veterinarios),
    noEncontrado: (data,callback)=>{
        callback(404,{mensaje:'no encontado'});
    }
}