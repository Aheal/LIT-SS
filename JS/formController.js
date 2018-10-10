
function obtenerValores(form){
    
}

function registro(params) {
    var obj = {
        nombre: "this2",
        apellidoP: "that",
        apellidoM: "that"
                };
    obj.correoE = 'these@';
    obj['telefono'] = '5555-5555-5555';
    obj['genero'] = 'Masculino';
    $.ajax({
        type: "POST",
        url: "../BS/registro.php",
        data: {
            json: JSON.stringify(obj)
        },
        success: function (response) {
            //service.php response
            console.log(response);
        }
    });
}