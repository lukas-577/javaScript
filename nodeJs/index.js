const http = require('http');
const requestHandler = require("./request-handler");
const recursos = require("./recursos");

global.recursos = recursos;

const server = http.createServer(requestHandler);

server.listen(5000,()=>{
    console.log("el servidor se esta escuchando la peticion");
});
