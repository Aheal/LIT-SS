function validateForm() {
    var a = document.forms["data"]["nombre"].value;
    var b = document.forms["data"]["apellidos"].value;
    var c = document.forms["data"]["correoE"].value;
    var d = document.forms["data"]["telefono"].value;
    var e = document.forms["data"]["genero"].value;
    var f = document.forms["data"]["alias"].value;
    var g = document.forms["data"]["random1"].value;
}

function onlyAlphabetical(input){
    var regex = /^[a-zA-Z]*$/;
    var OK = re.exec(input.value);  
    if (!OK)  
      window.alert(input.value + ' Contiene caracteres no validos');  
    else
      window.alert('Thanks, your phone number is ' + OK[0]); 
}



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




/*
function emailValidation(inputtext, alertMsg){
    var emailExp = /^[w-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
    if(inputtext.value.match(emailExp)){
    return true;
    }else{
    document.getElementById('p3').innerText = alertMsg;
    inputtext.focus();
    return false;
    }
}
*/

function AllowAlphabet(form){
    var re = /^[a-zA-Z ]+$/;
    if (!form.value.match(re) && form.value !=="")
    {
    form.value="";
    form.focus();
    alert("Ingrese solo Letras");
    }
    }

function AllowEmail(form){
    
    var re = /\S+@\S+\.\S+/;
    if (!form.value.match(re) && form.value !=="")
    {
    form.value="";
    form.focus();
    alert("Verifique su correo electronico");
    }
}


function AllowNumbers(form){
    
    var re = /^[0-9]*$/;
    if (!form.value.match(re) && form.value !=="")
    {
    form.value="";
    form.focus();
    alert("Verifique Numero Telefonico");
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