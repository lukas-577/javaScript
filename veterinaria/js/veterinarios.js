const listaVeterinarios = document.getElementById('lista-veterinarios');
const pais = document.getElementById('pais');
const nombre = document.getElementById('nombre');
const identificacion = document.getElementById('identificacion');
const apellido = document.getElementById('apellido');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btnGuardar');

let veterinarios = [
    {
        nombre:"Naryie",
        apellido: "Vasques",
        pais: "Chile",
        identificacion: "123217863817123"
    },
    {
        nombre:"Lukas",
        apellido: "Vasques",
        pais: "Chile",
        identificacion: "387289789834298"
    }
];


function listarVeterinarios(){
    const htmlVeterinarios = veterinarios.map((veterinario , index)=>`
    <tr>
                <th scope="row">${index}</th>
                <td>${veterinario.identificacion}</td>
                <td>${veterinario.pais}</td>
                <td>${veterinario.nombre}</td>
                <td>${veterinario.apellido}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                      <button type="button" class="btn btn-warning editar"><i class="far fa-edit"></i></button>
                      <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
                    </div></td>
                </tr>`
    ).join("");
    listaVeterinarios.innerHTML = htmlVeterinarios;
    Array.from((document.getElementsByClassName("editar"))).forEach((botonEditar, index)=>botonEditar.onclick=editar(index));
    Array.from((document.getElementsByClassName("eliminar"))).forEach((botonEliminar, index)=>botonEliminar.onclick=eliminar(index));

}


function enviarDatos(evento){
    evento.preventDefault();
    const datos={
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value,
        identificacion: identificacion.value 
    };

    const accion = btnGuardar.innerHTML;
    switch(accion){
        case 'Editar':
            veterinarios[indice.value]=datos;
        break;

        default:
            veterinarios.push(datos);
        break;
    }

    listarVeterinarios();
    resetModal();

}

function editar(index){
    
    return function cuandoCliqueo(){ //solo se llama cuando doy click 

        btnGuardar.innerHTML = "Editar";
        $('#exampleModal').modal('toggle');//tengo que tener si osi jquery en el html 
        const veterinario= (veterinarios[index]);
        nombre.value = veterinario.nombre;
        apellido.value = veterinario.apellido;
        pais.value = veterinario.pais;
        identificacion.value = veterinario.identificacion;
        indice.value = index;
    }
    
}

function resetModal(){
    indice.value="";
    nombre.value="";
    apellido.value="";
    pais.value="";
    identificacion.value=""; 
    btnGuardar.innerHTML="Crear";
}

function eliminar(index){
    return function clickEnEliminar(){
        veterinarios = veterinarios.filter((veterinaria,indiceVeterinario)=>indiceVeterinario!== index);
        listarVeterinarios();
    }
    
    
}

listarVeterinarios();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;