module.exports = {
    ruta: (data,callback)=>{ //handlers
        callback(200,{mensaje:'esta es /ruta'});
    },
    mascotas: {
        get: (data,callback)=>{ //handlers
            if(typeof data.indice!== "undefined"){
                console.log("handler masscotas",data);
                if(global.recursos.mascotas[data.indice]){
                    return callback(200,global.recursos.mascotas[data.indice]);
                }
                return callback(404,{mensaje:`mascota con indice ${data.indice}no encontada`});
            }
            callback(200,global.recursos.mascotas);
        },
        post: (data,callback)=>{ //handlers
            global.recursos.mascotas.push(data.payload);
            callback(201,data.payload);
        },
        put: (data,callback)=>{ //handlers
            if(typeof data.indice!== "undefined"){
                if(global.recursos.mascotas[data.indice]){
                    global.recursos.mascotas[data.indice] = data.payload;
                    return callback(200,global.recursos.mascotas[data.indice]);
                }
                return callback(404,{mensaje:`mascota con indice ${data.indice} no encontada`});
            }
            callback(400,{mensaje: "indice no enviado"});
        }
    },
    noEncontrado: (data,callback)=>{
        callback(404,{mensaje:'no encontado'});
    }
}