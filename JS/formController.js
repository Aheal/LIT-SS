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

var flagAlias = false; 
var flagEmail = false;

function registrar (){
    registro(obtenerValores()); 
    reset();

}

function reset () {
    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("correoE").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("alias").value = "";
    document.getElementById("pass1").value = "";
    document.getElementById("pass2").value = "";

}

function obtenerValores(){
    let obj = {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        correoE: document.getElementById("correoE").value, 
        telefono: document.getElementById("telefono").value,
        genero: $( "#genero option:selected" ).text(), 
        alias: document.getElementById("alias").value
    };     
    return obj;
}

function registro(params) {
    let obj = params;
    $.ajax({
        type: "POST",
        url: "../BS/registration.php",
        data: {
            json: JSON.stringify(obj)
        },
        success: function (response) {
            //service.php response
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
    var goodColor = "#a5d6a7";
    var badColor = "#ef9a9a";
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

function checkUser(response){

    let pass1 = document.getElementById('alias');
    let message = document.getElementById('confirmMessage-a');

    let goodColor = "#a5d6a7";
    let badColor = "#ef9a9a";
    
    if (response == "0"){
        flagAlias = true;
        pass1.style.backgroundColor = goodColor;
        message.style.color = goodColor; 
        message.innerHTML = "El usuario est\xE1 disponible";
    }
    else if (response == "1"){
        flagAlias = false; 
        pass1.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "ERROR\nEl usuario ya est\xE1 registrado";
    }
} 

function checkEmail(response){

    let pass1 = document.getElementById('correoE');
    let message = document.getElementById('confirmMessage-e');

    let goodColor = "#a5d6a7";
    let badColor = "#ef9a9a";
    
    if (response == "0"){
        flagAlias = true;
        pass1.style.backgroundColor = goodColor;
        message.style.color = goodColor; 
        message.innerHTML = "El email est\xE1 disponible";
    }
    else if (response == "1"){
        flagAlias = false; 
        pass1.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "ERROR\nEl email ya est\xE1 registrado";
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
            checkEmail(response);
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
            checkUser(response);
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
    if (response == "0"){
        alert("El Email est\xE1 disponible"); 
        flagEmail = true;
    }
    else if (response == "1"){
        alert("ERROR\nEl Email ya est\xE1 registrado");
        flagEmail = false;
    }
}

function alertAlias (response) {
    if (response == "0"){
        alert("El usuario est\xE1 disponible");
        flagAlias = true;
    }
    else if (response == "1"){
        alert("ERROR\nEl usuario ya est\xE1 registrado");
        flagAlias = false;
    }
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
    let re = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;    if (!form.value.match(re) && form.value !=="")
    if (!form.value.match(re) && form.value !==""){
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
    if(flagAlias && flagEmail){
        document.getElementById('fin').disabled = !cansubmit;
    } else {
        document.getElementById('fin').disabled = true;

    }
}