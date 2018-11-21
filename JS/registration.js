const registrationController =  (function (){
    const AllowEmail = (email) => {
        let re = /\S+@\S+\.\S+/; 
        console.log(email)
        if (!email.match(re) && email !== "")
        {
            console.log('escriba bien su email');
            return false;
        } else {
            // verifyEmail(form.value);  
            console.log('todo bien bro!'); 
            return true;
        }
    };
    return{
        checkPass: function (pass1,pass2){
            return pass1 === pass2 && pass1 !=="" && pass2 !=="" ? true : false;  
        }, 
        checkEmail:  function(email){
            return AllowEmail(email);
        }
    }
})();

const UIController = (function (){ 

    let DOMstring = { 
        inputName: "#nombre",
        inputSurname: "#apellidos",
        inputEmail: "#correoE",
        inputCellphone: "#telefono",
        inputGender: "#genero", 
        inputUser: "#alias",
        inputPassword: "#pass1",
        inputSecondPassword: "#pass2", 
        confirmationMsgPsswd: '#confirmMessage',
        confirmationMsgEmail: '#confirmMessage-e',
        confirmationMsgUser: "#confirmMessage-a",
        btnRegistration: "#finalizar"
    }  
    
    function verifyEmail(email){
        let obj; 
        obj = {
            correoE:  email
        };
    
        $.ajax({
            type: "POST",
            url: "../BS/verifyEmail.php",
            data: {
                json: JSON.stringify(obj)
            },
            success: function (response) {
                 updateMail(response === '0');
            }  
        }); 
    }

    const  verifyUser = (user) => {
        let obj; 
        obj = {
            alias:  user
        };
    
        $.ajax({
            type: "POST",
            url: "../BS/verifyAlias.php",
            data: {
                json: JSON.stringify(obj)
            },
            success: function (response) {
                 updateUser(response === '0');
            }  
        }); 
    }

    const updatePsswd = (flag) => {
        let goodColor, badColor, message;
        goodColor = "#a5d6a7";
        badColor = "#ef9a9a"; 
        message = document.querySelector(DOMstring.confirmationMsgPsswd);

        if(flag){
            document.querySelector(DOMstring.inputSecondPassword).style.backgroundColor = goodColor;
            message.style.color = goodColor;
            message.innerHTML = "Coinciden!"
        }else{
            document.querySelector(DOMstring.inputSecondPassword).style.backgroundColor = badColor;
            message.style.color = badColor;
            message.innerHTML = "No Coinciden!"
        }
    }; 
    const updateMail = (flag) => {
        let goodColor, badColor, message;
        goodColor = "#a5d6a7";
        badColor = "#ef9a9a"; 
        message = document.querySelector(DOMstring.confirmationMsgEmail);

        if(flag){
            document.querySelector(DOMstring.inputEmail).style.backgroundColor = goodColor;
            message.style.color = goodColor;
            message.innerHTML = "Email disponible."
        }else{
            document.querySelector(DOMstring.inputEmail).style.backgroundColor = badColor;
            message.style.color = badColor;
            message.innerHTML = "Email no disponible."
        }
    };
    const updateUser = (flag) => {
        let goodColor, badColor, message;
        goodColor = "#a5d6a7";
        badColor = "#ef9a9a"; 
        message = document.querySelector(DOMstring.confirmationMsgUser);

        if(flag){
            document.querySelector(DOMstring.inputUser).style.backgroundColor = goodColor;
            message.style.color = goodColor;
            message.innerHTML = "Usuario disponible."
        }else{
            document.querySelector(DOMstring.inputUser).style.backgroundColor = badColor;
            message.style.color = badColor;
            message.innerHTML = "Usuario no disponible."
        }
    };

    const correction = (option) => {
            
    };

    return {
        getInputs : function(){
            return { 
                name: document.querySelector(DOMstring.inputName).value, 
                surname: document.querySelector(DOMstring.inputSurname).value,
                email: document.querySelector(DOMstring.inputEmail).value,
                cellphone: document.querySelector(DOMstring.inputCellphone).value,
                gender: document.querySelector(DOMstring.inputGender).value,
                user: document.querySelector(DOMstring.inputUser).value, 
                pass: document.querySelector(DOMstring.inputPassword).value, 
                pass2: document.querySelector(DOMstring.inputSecondPassword).value
            }
        },
        getDOMs: function (){
            return DOMstring;
        }, 
        updatePassword: function (flag){
           updatePsswd(flag);
        }, 
        updateEmail: function(email){
            verifyEmail(email); 
        },
        updateUser: function(user){
            verifyUser(user);
        },
        writingCorrection: function(){
            correction();
        }
    }
})();

const controller = (function (registration,UI){
    let DOMs, INPUTS;

    DOMs = UI.getDOMs();  

    const validatePasswords = function () {
        let flag;
        //check if the passwords are the same 
        flag = registration.checkPass(UI.getInputs().pass, UI.getInputs().pass2); 
        //Update the UI  
        UI.updatePassword(flag);
    }  

    const validateEmail = function (){
        let flag; 
        //Check the email is write correctly  
        flag = registration.checkEmail(UI.getInputs().email)
        //Check if the email is avaliable and Update UI 
        if(flag)
            UI.updateEmail(UI.getInputs().email); 
        else 
            UI.writingCorrection('email');
    }

    const validateUser = function (){
        let flag = true; 
        //Check the email is write correctly  
        // flag = registration.checkEmail(UI.getInputs().user)
        //Check if the email is avaliable and Update UI 
        if(flag)
            UI.updateUser(UI.getInputs().user); 
        else 
            UI.writingCorrection('email');
    }

    // LISTENERS
    document.querySelector(DOMs.inputPassword).addEventListener("keyup",validatePasswords);
    document.querySelector(DOMs.inputSecondPassword).addEventListener("keyup",validatePasswords);
    document.querySelector(DOMs.inputEmail).addEventListener("keyup",validateEmail);
    document.querySelector(DOMs.inputUser).addEventListener("keyup",validateUser);



    

})(registrationController,UIController);