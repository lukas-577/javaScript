function obtenerNombre(){
    return "Lukas";
}

function obtenerApellido(){
    return "Medina";
}

function obtenerNombreComleto(){
    const nombre = obtenerNombre();
    const apellido = obtenerApellido();
    return `${nombre} ${apellido}`;
}

const nombreCompleto = obtenerNombreComleto();

console.log("nombre completo",nombreCompleto);