    window.onload = function () {
        ListarDoctor();
        previewImage();
        ListarClinica();
        ListarEspecialidad();
}

function ListarClinica() {
    fetch("http://192.168.250.10:8081/api/Clinica")
        .then(res => res.json())
        .then(res => {
            LlenarComboClinica(res);
        });
}

function LlenarComboClinica(res) {
    var contenido = "<option value=''>--Seleccione</option>";
    for (var i = 0;  i < res.length; i++) {
        contenido += "<option value='" + res[i].iidClinica + "'>" + res[i].nombreClinica + "</option>";
    }
    document.getElementById("cboClinica").innerHTML = contenido;

}

function ListarEspecialidad() {
    fetch("http://192.168.250.10:8081/api/Especialidad")
        .then(res => res.json())
        .then(res => {
            LlenarComboEspecialidad(res);
        });
}
function LlenarComboEspecialidad(res) {
    var contenido = "<option value=''>--Seleccione</option>";
    for (var i = 0; i < res.length; i++) {
        contenido += "<option value='" + res[i].iiEspecialidad + "'>" + res[i].nombreEspecialidad + "</option>";
    }
    document.getElementById("cboEspecialidad").innerHTML = contenido;
}
function previewImage() {
    var fupFoto = document.getElementById("fupFoto");
    fupFoto.onchange = function () {
        //Foto Elegida
        var foto = fupFoto.files[0];
        nombreArchivo = foto.name;
        //FileReader leer la foto
        var file = new FileReader();
        file.readAsDataURL(foto);
        file.onloadend = function () {
            document.getElementById("imgFoto").src = file.result;
        }
       
    }
}
function ListarDoctor() {
    fetch("http://192.168.250.10:8081/api/Doctor")
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
               
                fetch("http://192.168.250.10:8081/api/Doctor?iidDoctor=" + iidDoctor, {
                     
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
    document.getElementById("imgFoto").src = "";
}
var nombreArchivo;
function Guardar() {
    if (confirm("Guardar?") == 1) {

        var objeto = DatosObligatorios();
        if (objeto.exito==false) {
            var contenido = objeto.contenido;
            document.getElementById("divError").innerHTML = contenido;
            return;
        }

        document.getElementById("divError").innerHTML = "";
        var idDoctor = document.getElementById("txtIdDoctor").value;
        var nombre = document.getElementById("txtNombre").value;
        var apPaterno = document.getElementById("txtApPaterno").value;
        var apMaterno = document.getElementById("txtApMaterno").value;
        var idClinica = document.getElementById("cboClinica").value;
        var idEspecialidad = document.getElementById("cboEspecialidad").value;
        var email = document.getElementById("txtemail").value;
        var telefonoCelular = document.getElementById("txtTelefonoCelular").value;
        var sueldo = document.getElementById("txtsueldo").value;
        var fechaContrato = document.getElementById("txtFechaContrato").value;
        var foto = document.getElementById("imgFoto").src;

        //alert("");
        var cboSexo;

        if (document.getElementById("rbSexoMascu").checked==1) {
            cboSexo = 1;
        } else {
            cboSexo = 2;
        }


        //if (foto!=null) {
        //     nombreArchivo = document.getElementById("fupFoto").files[0].name;
        //}
       
        fetch("http://192.168.250.10:8081/api/Doctor", {

            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                "IIDDOCTOR": idDoctor,
                "NOMBRE": nombre,
                "APPATERNO": apPaterno,
                "APMATERNO": apMaterno,
                "IIDCLINICA": idClinica,
                "IIDESPECIALIDAD": idEspecialidad,
                "EMAIL": email,
                "TELEFONOCELULAR": telefonoCelular,
                "IIDSEXO": cboSexo,
                "SUELDO": sueldo,
                "FECHACONTRATO": fechaContrato,
                "ARCHIVO": foto,
                "NOMBREARCHIVO": nombreArchivo,
                "BHABILITADO": 1


            })
        }).then(res => res.json())
            .then(res => {

                if (res == 1) {
                    alert("Correcto");
                    ListarDoctor();
                    document.getElementById("btnClose").click();
                } else {

                    alert("Ocurrio un error");
                }
            });


    }
}

    function DatosObligatorios() {

        var obligatorios = document.getElementsByClassName("obligatorio");
        var nobligatorios = obligatorios.length;
        var obligatorio;
        var exito = true;
        var contenido = "<ol style='color:red'>";
        for (var i = 0; i < nobligatorios; i++) {
            if (obligatorios[i].value=="") {
                exito = false;
                contenido += "<li>" + obligatorios[i].name +"es obligatorio</li>"

            }
        }

        contenido += "</ol>"
        return { exito, contenido };
                                 }

function AbrirModal( id) {
    Limpiar();
    if (id==0) {
        document.getElementById("lblTitulo").innerHTML = "Agregar Doctor";
    }
    else {
        //alert("Limpiar" + id);
        fetch("http://192.168.250.10:8081/api/Doctor/?iidDoctor=" + id)
       
            .then(res => res.json())
            .then(res => {
                document.getElementById("txtIdDoctor").value = res.iidDoctor;
                document.getElementById("txtNombre").value = res.nombre;
                document.getElementById("txtApPaterno").value = res.apPaterno;
                document.getElementById("txtApMaterno").value = res.apMaterno;
                document.getElementById("cboClinica").value = res.iidClinica;
                document.getElementById("cboEspecialidad").value = res.iidEspecialidad;
                document.getElementById("txtemail").value = res.email;
                document.getElementById("txtsueldo").value = res.sueldo;
                document.getElementById("txtTelefonoCelular").value = res.telefonoCelular;
                document.getElementById("txtFechaContrato").value = res.fechaContrato.substr(0,10);
                document.getElementById("imgFoto").src = res.nombreArchivo;
                //nombreArchivo = res.nombre;

                var rbSexoMascu = document.getElementById("rbSexoMascu");
                var rbSexoFeme = document.getElementById("rbSexoFeme");

                if (res.iidSexo == 1) rbSexoMascu.checked = true;
                else rbSexoFeme.checked = true;

                document.getElementById("txtFechaContrato").value = res.fechaContrato.substr(0, 10);
                //document.getElementById.("imgFoto").src = res.archivo;
                nombreArchivo = res.nombreArchivo;
             
                //previewImage();

            });
        document.getElementById("lblTitulo").innerHTML = "Editar Doctor";
    }
}