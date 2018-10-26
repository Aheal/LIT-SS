/*
function validateForm() {
    var a = document.forms["data"]["nombre"].value;
    var b = document.forms["data"]["apellidos"].value;
    var c = document.forms["data"]["correoE"].value;
    var d = document.forms["data"]["telefono"].value;
    var e = document.forms["data"]["genero"].value;
    var f = document.forms["data"]["alias"].value;
    var g = document.forms["data"]["random1"].value;
}
*/

function obtenerValores(){
    let obj = {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
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
            alert("Registro exitoso!");
        }
    });
} 


function Next() {
    var x = document.querySelectorAll('.group1, .group2');
    var i;
    for (i = 0; i < x.length; i++) {
              if (x[i].style.display === "none") {
                  x[i].style.display = "block";
              } else {
                  x[i].style.display = "none";
              }
    }
}

function checkPass()
{
    //Store the password field objects into variables ...
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field 
    //and the confirmation field
    if(pass1.value == pass2.value){
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Coinciden!"
    }else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "No Coinciden!"
    }
}



// Verify
function verifyEmail(email){
    let obj = {
        correoE:  email
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
            alertEmail(response);
        }
    });
}

function verifyAlias(Alias){
    let obj = {
        alias:  Alias
    };
    $.ajax({
        type: "POST",
        url: "../BS/verifyAlias.php",
        data: {
            json: JSON.stringify(obj)
        },
        success: function (response) {
            //service.php response
            console.log(response); 
            alertAlias(response);
        }
    });
}

function verifyTelephone(telephone){
    let obj = {
        Telefono:  telephone
    };
    $.ajax({
        type: "POST",
        url: "../BS/verifyTelephone.php",
        data: {
            json: JSON.stringify(obj)
        },
        success: function (response) {
            //service.php response
            console.log(response); 
            alertTelephone(response);
        }
    });
}

// Alerts

function alertEmail (response) {
    if (response == "0")
        alert("El Email est\xE1 disponible");
    else if (response == "1")
        alert("ERROR\nEl Email ya est\xE1 registrado");
}

function alertAlias (response) {
    if (response == "0")
        alert("El usuario est\xE1 disponible");
    else if (response == "1")
        alert("ERROR\nEl usuario ya est\xE1 registrado");
}

function alertName (response) {
    if (response == "0")
        alert("El Email est\xE1 disponible");
    else if (response == "1")
        alert("ERROR\nEl usuario ya est\xE1 registrado");
}

function alertPhone (response) {
    if (response == "0")
        alert("El Tel\xE9fono est\xE1 disponible");
    else if (response == "1")
        alert("ERROR\nEl Tel\xE9fono ya est\xE1 registrado");
}

//Allows: Regex and AJAX
function AllowNumbers(form){
    
    var re = /^[0-9]*$/;
    if (!form.value.match(re) && form.value !=="")
    {
    form.value="";
    form.focus();
    alert("Verifique N\xFAmero Telef\xF3nico");
    }
}


function AllowAlias(form){
    
    var re = /^[a-zA-Z0-9]*$/;
    if (!form.value.match(re) && form.value !=="")
    {
    form.value="";
    form.focus();
    alert("Ingrese solo Letras");
    } else {
        verifyAlias(form.value);
    }
}

function AllowAlphabet(form){
    var re = /^[a-zA-Z ]+$/;
    if (!form.value.match(re) && form.value !=="")
    {
    form.value="";
    form.focus();
    alert("Ingrese solo Letras");
    }
}

function AllowAlphabetandNumbers(form){
    var re = /^[a-zA-Z0-9]*$/;
    if (!form.value.match(re) && form.value !=="")
    {
    form.value="";
    form.focus();
    alert("Ingrese solo Letras y Numeros");
    }
}


function AllowEmail(form){
    
    var re = /\S+@\S+\.\S+/;
    if (!form.value.match(re) && form.value !=="")
    {
    form.value="";
    form.focus();
    alert("Verifique su correo electronico");
    } else {
        verifyEmail(form.value);
    }
} 


function checkform()
{
    var f = document.forms["data"].elements;
    var cansubmit = true;
    for (var i = 0; i < f.length; i++) {
        if (f[i].value.length == 0) cansubmit = false;
    }
    document.getElementById('fin').disabled = !cansubmit;
}