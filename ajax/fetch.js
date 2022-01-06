const listaUsuarios = document.getElementById("body-usuarios");
const boton = document.getElementById("boton");
const nombre = document.getElementById("nombre");
let usuarios=[];


function render () {
    const usuariosRender = usuarios
    .map(usuario=>`<tr><td>${usuario.nombre}</td></tr>`)
    .join("");
    console.log(usuariosRender);
    listaUsuarios.innerHTML= usuariosRender;
  }


  


  function enviarDatos(){
      const datos ={nombre: nombre.value};
      var url = "https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios";


    fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(datos), // data can be `string` or {object}!
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .then(respuestaJson=>{
        console.log('respuestaJson',respuestaJson)
        refrescar();
    });  
  }


function refrescar(){
    fetch("https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios",{method:'GET'})
    .then(res=>res.json())
    .then(respuestaUsuarios=>{
        console.log('respuestaUsuarios',respuestaUsuarios)
        usuarios = respuestaUsuarios
        render();
    });
}

  boton.onclick = enviarDatos;