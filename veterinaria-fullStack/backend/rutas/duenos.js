module.exports = function duenosHandler(duenos){
    return {
        get: (data,callback)=>{ //handlers
            if(typeof data.indice!== "undefined"){
                console.log("handler masscotas",data);
                if(duenos[data.indice]){
                    return callback(200,duenos[data.indice]);
                }
                return callback(404,{mensaje:`dueno con indice ${data.indice}no encontada`});
            }
            callback(200,duenos);
        },
        post: (data,callback)=>{ //handlers
            duenos.push(data.payload);
            callback(201,data.payload);
        },
        put: (data,callback)=>{ //handlers
            if(typeof data.indice!== "undefined"){
                if(duenos[data.indice]){
                    duenos[data.indice] = data.payload;
                    return callback(200,duenos[data.indice]);
                }
                return callback(404,{mensaje:`dueno con indice ${data.indice} no encontada`});
            }
            callback(400,{mensaje: "indice no enviado"});
        },
        delete: (data,callback)=>{ //handlers
            if(typeof data.indice!== "undefined"){
                if(duenos[data.indice]){
                    duenos = duenos.filter(
                        (_dueno, indice)=> indice != data.indice);
                    return callback(204,{mensaje: `elemento con indice ${data.indice} eliminado`});
                }
                return callback(404,{mensaje:`dueno con indice ${data.indice} no encontada`});
            }
            callback(400,{mensaje: "indice no enviado"});
        }
        
    }
} 