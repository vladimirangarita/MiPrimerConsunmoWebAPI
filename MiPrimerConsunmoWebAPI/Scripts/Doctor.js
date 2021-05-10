    window.onload = function () {
        ListarDoctor();
        previewImage();
}

function previewImage() {
    var fupFoto = document.getElementById("fupFoto");
    fupFoto.onchange = function () {
        //Foto Elegida
        var foto = fupFoto.files[0];
        //FileReader leer la foto
        var file = new FileReader();
        
        file.onloadend = function () {
            document.getElementById("imgFoto").src = file.result;
        }
    }
}
function ListarDoctor() {
    fetch("http://192.168.250.11:8081/api/Doctor")
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
            contenido += "<button onclick='AbrirModal(" + res[i].iidDoctor +")' class='btn btn-primary' data-toggle='modal' data-target='#exampleModal'>Editar</button>";
            contenido += "<button onclick='Eliminar("+ res[i].iidDoctor +")' class='btn btn-danger'>Eliminar</button>";
            contenido += "</td>";
            contenido += "</tr>";

        }
        contenido += "</tbody>";

        contenido += "</table>";

        document.getElementById("divTabla").innerHTML = contenido;

}

        function Eliminar(iidDoctor) {
            if (confirm("¿Eliminar?") == 1) {
               
                fetch("http://192.168.250.11:8081/api/Doctor?iidDoctor=" + iidDoctor, {
                     
                    method: "PUT"
                }).then(res => res.json())
      
                    .then(res => {
                        if (res == 1) {
                            alert("Eliminado");
                            ListarDoctor();
                        } else {
                            alert("Error");
                        }
                    })
            }
        }
function Limpiar() {
    
    var limpiar = document.getElementsByClassName("limpiar");
    //alert("Limpiar");
    var nlimpiar = limpiar.length;
    
    for (var i = 0; i < nlimpiar; i++) {
        limpiar[i].value = "";
        //alert("Limpiar");
    }
}

function AbrirModal(id) {
    Limpiar();
    if (id==0) {
        document.getElementById("lblTitulo").innerHTML = "Agregar Doctor";
    }
    else {
        fetch("http://192.168.250.11:8081/api/Doctor/?iidDoctor=" + id)
            .then(res => res.json())
            then(res => {
                document.getElementById("txtIdDoctor").value = res.iidDoctor;
                });
        document.getElementById("lblTitulo").innerHTML = "Editar Doctor";
    }
}