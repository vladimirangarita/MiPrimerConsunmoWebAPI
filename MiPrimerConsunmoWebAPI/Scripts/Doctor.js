    window.onload = function () {
        ListarDoctor();
}


function ListarDoctor() {
    fetch("http://192.168.250.6:8081/api/Doctor")
        .then(res => res.json())
        .then(res => {
            CrearListado(res);
        });

    //var contenido = "";

}

    function CrearListado(res) {
        var contenido = "";

        contenido += "<table class='table'>";
        contenido += "<thead class='thead-dark'>";
        contenido += "<tr>";

        contenido += "<td>Id Doctor</td>";
        contenido += "<td>Nombre completo</td>";
        contenido += "<td>Nombre clinica</td>";
        contenido += "<td>Nombre Especialidad</td>";
        contenido += "<td>Email</td>";
        contenido += "<td>Operaciones</td>";
        contenido += "</tr>";
        contenido += "</thead>";

        contenido += "<tbody>";
        for (var i = 0; i < res.length; i++) {

        
            contenido += "<tr>";
            contenido += "<td>" + res[i].iidDoctor + "</td>";
            contenido += "<td>" + res[i].nombreCompleto +"</td>";
            contenido += "<td>" + res[i].nombreClinica + "</td>";
            contenido += "<td>" + res[i].nombreEspecialidad + "</td>";
            contenido += "<td>" + res[i].email + "</td>";
            contenido += "<td>";
            contenido += "<button class='btn btn-primary'>Editar</button>";
            contenido += "<button class='btn btn-danger'>Eliminar</button>";
            contenido += "</td>";
            contenido += "</tr>";

        }
        contenido += "</tbody>";

        contenido += "</table>";

        document.getElementById("divTabla").innerHTML = contenido;

    }