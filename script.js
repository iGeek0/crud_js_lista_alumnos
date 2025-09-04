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

    guardarLocal();
    mostrarAlumnos();
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