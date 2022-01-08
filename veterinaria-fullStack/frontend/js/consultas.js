const listaConsultas = document.getElementById("lista-consultas");
const mascota = document.getElementById("mascota");

const url = "http://localhost:5000";
let consultas =[];
let mascotas = [];


async function listarConsultas(){
    try {
        const entidad = "consultas";
        const respuesta = await fetch(`${url}/${entidad}`);
        const consultasDelServidor= await respuesta.json();
        if(Array.isArray(consultasDelServidor)){
            consultas = consultasDelServidor;
        }
        if(respuesta.ok){
            const htmlConsultas = consultas.map(
                (consulta,index)=>
                `<tr>
                    <th scope="row">${index}</th>
                    <td>${consulta.mascota.nombre}</td>
                    <td>${consulta.veterinarios.apellido}</td>
                    <td>${consulta.fechaCreacion}</td>
                    <td>${consulta.fechaEdicion}</td>
                    <td>${consulta.diagnostico}</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" class="btn btn-warning editar"><i class="far fa-edit"></i></button>
                        </div></td>
                    </tr>`
            
            ).join("");
            listaConsultas.innerHTML = htmlConsultas;
        }
        
    } catch (error) {
        throw error;
    }
}

listarConsultas();

async function listarMascotas(){
    try {
        const entidad = "mascotas";
        const respuesta = await fetch(`${url}/${entidad}`);
        const mascotasDelServidor= await respuesta.json();
        if(Array.isArray(mascotasDelServidor)){
            mascotas = mascotasDelServidor;
        }
        if(respuesta.ok){
            const htmlMascota = mascotas
            .forEach(
                (_mascota,index)=>{
                    const optionActual = document.createElement("option");
                    optionActual.innerHTML =_mascota.nombre;
                    optionActual.value = index;
                    mascota.appendChild(optionActual);
                }
            );
        }
        
    } catch (error) {
        throw error;
    }
}

listarMascotas();