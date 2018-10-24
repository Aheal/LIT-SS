
function registrar () {
    registro_ajax(obtenerValores());
}

function obtenerValores(){
    let obj = {
        nombre: document.getElementById("nombre").value,
        apellidoP: document.getElementById("apellidoP").value,
        apellidoM: document.getElementById("apellidoM").value, 
        correoE: document.getElementById("correoE").value, 
        telefono: document.getElementById("telefono").value,
        genero: document.getElementById("genero").value, 
        alias: document.getElementById("alias").value
    };     
    return obj;
}

function registro_ajax(params) {
    let obj = params;
    $.ajax({
        type: "POST",
        url: "../BS/registration.php",
        data: {
            json: JSON.stringify(obj)
        },
        success: function (response) {
            //service.php response
            console.log(response);
        }
    });
} 
function checkUser(){
    let obj = {
        alias:  document.getElementById("alias").value
    };
    $.ajax({
        type: "POST",
        url: "../BS/verifyUser.php",
        data: {
            json: JSON.stringify(obj)
        },
        success: function (response) {
            //service.php response
            console.log(response);
        }
    });
} 
function checkEmail(){
    let obj = {
        correoE:  document.getElementById("correoE").value
    };
    $.ajax({
        type: "POST",
        url: "../BS/verifyEmail.php",
        data: {
            json: JSON.stringify(obj)
        },
        success: function (response) {
            //service.php response
            console.log(response);
        }
    });
}