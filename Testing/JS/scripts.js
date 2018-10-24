function validateForm() {
    var a = document.forms["data"]["name"].value;
    var b = document.forms["data"]["lastname"].value;
    var c = document.forms["data"]["email"].value;
    var d = document.forms["data"]["phone"].value;
    var e = document.forms["data"]["gender"].value;
    var f = document.forms["data"]["user"].value;
    var g = document.forms["data"]["random1"].value;
    



/*
    var email = document.getElementById('email');
    emailValidation(email, "* Please enter a valid email address *")
    */
    console.log(a+b+c+d+e+f+g);


    return a+b+c+d+e+f+g;
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
        message.innerHTML = "Passwords Match!"
    }else{
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!"
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