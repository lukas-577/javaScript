module.exports = function veterinariosHandler(veterinarias){
    return {
        get: (data,callback)=>{ //handlers
            if(typeof data.indice!== "undefined"){
                console.log("handler masscotas",data);
                if(veterinarias[data.indice]){
                    return callback(200,veterinarias[data.indice]);
                }
                return callback(404,{mensaje:`veterinario con indice ${data.indice}no encontada`});
            }
            callback(200,veterinarias);
        },
        post: (data,callback)=>{ //handlers
            veterinarias.push(data.payload);
            callback(201,data.payload);
        },
        put: (data,callback)=>{ //handlers
            if(typeof data.indice!== "undefined"){
                if(veterinarias[data.indice]){
                    veterinarias[data.indice] = data.payload;
                    return callback(200,veterinarias[data.indice]);
                }
                return callback(404,{mensaje:`veterinario con indice ${data.indice} no encontada`});
            }
            callback(400,{mensaje: "indice no enviado"});
        },
        delete: (data,callback)=>{ //handlers
            if(typeof data.indice!== "undefined"){
                if(veterinarias[data.indice]){
                    veterinarias = veterinarias.filter(
                        (_veterinario, indice)=> indice != data.indice);
                    return callback(204,{mensaje: `elemento con indice ${data.indice} eliminado`});
                }
                return callback(404,{mensaje:`veterinario con indice ${data.indice} no encontada`});
            }
            callback(400,{mensaje: "indice no enviado"});
        }
        
    }
} 