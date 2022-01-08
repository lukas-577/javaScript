const listaConsultas = document.getElementById("lista-consultas");

const url = "http://localhost:5000/consultas";
let consultas =[];


async function listarConsultas(){
    try {

        const respuesta = await fetch(url);
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
                        <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
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