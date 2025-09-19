// borrar todo el localStorage
// localStorage.clear();
// borrar un item específico
//  localStorage.removeItem("alumnos");

// let alumnos_lista = [
//     { nombre: "Juan", apellido: "Pérez", edad: 20 },
//     { nombre: "María", apellido: "Gómez", edad: 22 },
//     { nombre: "Luis", apellido: "Martínez", edad: 19 }
// ];

// localStorage.setItem("alumnos", JSON.stringify(alumnos_lista));

// let alumnos_storage = JSON.parse(localStorage.getItem("alumnos"));

// console.log(alumnos_storage);

// console.log("El primer alumnos es",alumnos_storage[1]);

// Cargar alumnos desde LocalStorage o array vacío
let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

// Guardar en LocalStorage
function guardarLocal() {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
}

// Renderizar tabla
function mostrarAlumnos() {
    const tbody = document.getElementById("tablaAlumnos");
    tbody.innerHTML = "";
    alumnos.forEach((alumno, index) => {
        tbody.innerHTML += `
          <tr>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.edad}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editarAlumno(${index})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="eliminarAlumno(${index})">Eliminar</button>
            </td>
          </tr>`;
    });
}

// Agregar o Editar
document.getElementById("alumnoForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = document.getElementById("edad").value;
    const editIndex = document.getElementById("editIndex").value;

    if (editIndex === "") {
        // Nuevo alumno
        alumnos.push({ nombre, apellido, edad });
    } else {
        // Editar alumno
        alumnos[editIndex] = { nombre, apellido, edad };
        document.getElementById("editIndex").value = "";
    }

    // giarda en el localStorage
    guardarLocal();
    // Actualiza la tabla del html con los datos del localstorage
    mostrarAlumnos();
    // Resetea el formulario(vacia los campos)
    this.reset();
});

// Editar alumno
function editarAlumno(index) {
    const alumno = alumnos[index];
    document.getElementById("nombre").value = alumno.nombre;
    document.getElementById("apellido").value = alumno.apellido;
    document.getElementById("edad").value = alumno.edad;
    document.getElementById("editIndex").value = index;
}

// Eliminar alumno
function eliminarAlumno(index) {
    if (confirm("¿Seguro que quieres eliminar este alumno?")) {
        alumnos.splice(index, 1);
        guardarLocal();
        mostrarAlumnos();
    }
}

// Mostrar tabla al cargar
mostrarAlumnos();