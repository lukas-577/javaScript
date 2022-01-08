const listaDuenos= document.getElementById('lista-duenos');
const nombre = document.getElementById('nombre');
const identificador = document.getElementById('identificador');
const apellido = document.getElementById('apellido');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btnGuardar');
const url = 'http://localhost:5000/duenos';
let duenos = [];


async function listarDuenos(){

    try {
        const respuesta = await fetch(url);
        const duenosDelServer = await respuesta.json();
        if(Array.isArray(duenosDelServer)){
           duenos =duenosDelServer;
        }
        if(duenos.length>0){

            const htmlDuenos = duenos.map((dueno , index)=>`
            <tr>
                        <th scope="row">${index}</th>
                        <td>${dueno.identificador}</td>
                        <td>${dueno.nombre}</td>
                        <td>${dueno.apellido}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" class="btn btn-warning editar"><i class="far fa-edit"></i></button>
                            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
                            </div></td>
                        </tr>`
            ).join("");
            listaDuenos.innerHTML = htmlDuenos;
            Array.from((document.getElementsByClassName("editar"))).forEach((botonEditar, index)=>botonEditar.onclick=editar(index));
            Array.from((document.getElementsByClassName("eliminar"))).forEach((botonEliminar, index)=>botonEliminar.onclick=eliminar(index));
            return;
        }
        listaDuenos.innerHTML = `<tr> 
            <td colspan="5">No Hay Dueños</td>
        </tr>`;
        
    } catch (error) {
        console.log({error});
        $(".alert").show();
    }

    
}


async function enviarDatos(evento){
    evento.preventDefault();
    try {
        const datos={
            nombre: nombre.value,
            apellido: apellido.value,
            identificador: identificador.value 
        };
    
        const accion = btnGuardar.innerHTML;
        let urlEnvio = url;
        let method = "POST";
        if(accion==="Editar"){
            urlEnvio+= `/${indice.value}`;
            method = "PUT";
        }
        const respuesta = await fetch(urlEnvio, {
            method, 
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
    
        if(respuesta.ok){
            listarDuenos();
            resetModal();
        }
        
    } catch (error) {
        console.log({error});
        $(".alert").show();
    }
    

    

}

function editar(index){
    
    return function cuandoCliqueo(){ //solo se llama cuando doy click 

        btnGuardar.innerHTML = "Editar";
        $('#exampleModal').modal('toggle');//tengo que tener si osi jquery en el html 
        const dueno= (duenos[index]);
        nombre.value = dueno.nombre;
        apellido.value = dueno.apellido;
        identificador.value = dueno.identificador;
        indice.value = index;
    }
    
}

function resetModal(){
    indice.value="";
    nombre.value="";
    apellido.value="";
    identificador.value=""; 
    btnGuardar.innerHTML="Crear";
}

function eliminar(index){
    const urlEnvio = `${url}/${index}`;
    return async function clickEnEliminar(){
        try {
            const respuesta = await fetch(urlEnvio, {
                method:"DELETE", 
            });
        
            if(respuesta.ok){
                listarDuenos();
            }
            
        } catch (error) {
            console.log({error});
            $(".alert").show();
        }
    }
    
    
}

listarDuenos();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;