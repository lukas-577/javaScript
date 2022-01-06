const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
let recursos = {
    mascotas: [
        {tipo:"perro",nombre:"Johana",dueno: "Camilo"},
        {tipo:"perro",nombre:"Johana",dueno: "Camilo"},
        {tipo:"perro",nombre:"Johana",dueno: "Camilo"},
        {tipo:"perro",nombre:"Johana",dueno: "Camilo"},
        {tipo:"perro",nombre:"Johana",dueno: "Camilo"}
    ]
}

const server = http.createServer((req, res) => {
    //1.obtener url desde el objeto request

    const urlActual = req.url;
    const urlPArseada = url.parse(urlActual,true);
    //2.obtener la ruta
    const ruta = urlPArseada.pathname;
    //3.quitar slach
    const rutaLimpia= ruta.replace(/^\/+|\/+$/g,'');
    //3.1 obtener el metodo http
    const metodo = req.method.toLowerCase();
    //3.2 obtener las variables del query url
    
    const {query = {}}= urlPArseada;
    
    //3.3 obtener los headers
    const {headers={}}= req;

    //3.4 obtener payload, en caso de obtener uno
    const decoder = new StringDecoder('utf-8');
    let buffer  = '';

    //3.4.1 ir acumulando la data cuando el request reciba un payload
    req.on('data',(data)=>{
        buffer += decoder.write(data);
    });

    //3.4.2 termina de acumular datos y decirle al decoder que finalice
    req.on('end',()=>{
        buffer += decoder.end();

        if(headers["content-type"]==='application/json'){
            buffer = JSON.parse(buffer);
        }


        //3.5 ordenar data del request
        const data ={
            ruta: rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer
        };

        console.log({data});

        //3.6 elegir el manejador dependiendo de la ruta y asignarle la funcion que el enrutador tiene //handler
        let handler;
        if(rutaLimpia&&enrutador[rutaLimpia]&& enrutador[rutaLimpia][metodo]){
            handler = enrutador[rutaLimpia][metodo];
        }else{
            handler = enrutador.noEncontrado;
        }

        //4.ejecutar handler (manejador) para enviar la respuesta
        if(typeof handler==='function'){
            handler(data,(statusCode=200,mensaje)=>{
                const respuesta = JSON.stringify(mensaje);
                res.setHeader('Content-Type',"application/json");
                res.writeHead(statusCode);
                
                //linea donde realmente ya estamos respondiendo a la aplicacion cliente
                res.end(respuesta);
            })
        }
        
    });
});

const enrutador = {
    ruta: (data,callback)=>{ //handlers
        callback(200,{mensaje:'esta es /ruta'});
    },
    mascotas: {
        get: (data,callback)=>{ //handlers
            callback(200,recursos.mascotas);
        },
        post: (data,callback)=>{ //handlers
            recursos.mascotas.push(data.payload);
            callback(201,data.payload);
        }
    },
    noEncontrado: (data,callback)=>{
        callback(404,{mensaje:'no encontado'});
    }
}

server.listen(5000,()=>{
    console.log("el servidor se esta escuchando la peticion");
});
