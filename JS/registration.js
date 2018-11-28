    const registrationController =  (function (){
        const AllowEmail = (email) => {
            let re = /\S+@\S+\.\S+/; 
            let result = false;
            if(email === '')
                return false;
            else{
                result = email.match(re) ? true : false;          
            }
            return result;
        };
        const AllowSpecialChar = (name) => {
            let re = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ ]*$/;
            let result = false;
            if(name === '')
                return false;
            else{
                result = name.match(re) ? true : false;          
            }
            return result;
        };
        const AllowNumbers = (number) => {
            let re = /^[0-9]*$/;
            let result = false;
            if(number === '')
                return false;
            else{
                result = number.match(re) ? true : false;          
            }
            return result;
        };


        return{
            checkPass: function (pass1,pass2){
                return pass1 === pass2 && pass1 !=="" && pass2 !=="" ? true : false;  
            }, 
            checkEmail:  function(email){
                return AllowEmail(email);
            },
            checkPhone: function (number){
                return AllowNumbers(number);
            },
            checkName: function(name){
                return AllowSpecialChar(name);
            }

        }
    })();

    const UIController = (function (){ 
        
        let Validations ={
            Name: false,
            Surname: false,
            Email: false,
            Cellphone: false,
            Gender: true, 
            User: false,
            Password: false
        }

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
            confirmationMsgName: "#confirmMessage-n",
            confirmationMsgLastName: "#confirmMessage-ln",
            confirmationMsgPhone: "#confirmMessage-p",
            msgForm: "#message-f",
            btnRegistration: "#finalizar"
        }  
        function AJAXregistro() {
            let obj ={
                nombre: document.querySelector(DOMstring.inputName).value,
                apellidos: document.querySelector(DOMstring.inputSurname).value,
                correoE: document.querySelector(DOMstring.inputEmail).value, 
                telefono: document.querySelector(DOMstring.inputCellphone).value,
                genero: $("#genero option:selected" ).text(), 
                alias: document.querySelector(DOMstring.inputUser).value,
                pass: document.querySelector(DOMstring.inputPassword).value,
            };
            console.log("Intento de hacer registration");
            $.ajax({
                type: "POST",
                url: "../BS/registration.php",
                data: {
                    json: JSON.stringify(obj)
                },
                success: function (response) {
                    console.log(response);
                    updateForm(response);
                    response === "0" ? reset() : null;

                }
            });
        }

        const updateForm = (flag) => { 
            console.log("llegue al update form");
            switch (flag) {
                case "0":
                    message = document.querySelector(DOMstring.msgForm); 
                    message.style.background = "#a5d6a7"; 
                    message.style.color = "#fff";
                    message.innerHTML = "Registro Exitoso";
                    break;
                case "1":
                    message = document.querySelector(DOMstring.msgForm); 
                    message.style.background = "#ef9a9a"; 
                    message.style.color = "#fff";
                    message.innerHTML = "Registro Fallido";                   
                    break;                    
                default:
                    break;
                }
        };
            

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
                Validations.Password = true;
            }else{
                document.querySelector(DOMstring.inputSecondPassword).style.backgroundColor = badColor;
                message.style.color = badColor;
                message.innerHTML = "No Coinciden!"
                Validations.Password = false;
            }
        }; 
        const updateMail = (flag) => {
            let goodColor, badColor, message;
            goodColor = "#a5d6a7";
            badColor = "#ef9a9a";
            neutralColor = "#FFFFFF";
            message = document.querySelector(DOMstring.confirmationMsgEmail);
            if(document.querySelector(DOMstring.inputEmail).value===''){
                message.style.color = "#000000";
                document.querySelector(DOMstring.inputEmail).style.backgroundColor = neutralColor;
                message.innerHTML='Llenar el campo';
                Validations.Email = false;
            }
            else{
                if(flag){
                    document.querySelector(DOMstring.inputEmail).style.backgroundColor = goodColor;
                    message.style.color = goodColor;
                    message.innerHTML = "Email disponible."
                    Validations.Email = true;
                }else{
                    document.querySelector(DOMstring.inputEmail).style.backgroundColor = badColor;
                    message.style.color = badColor;
                    message.innerHTML = "Email no valido."
                    Validations.Email = false;
                }
            }
            
        };
        const updateUser = (flag) => {
            let goodColor, badColor, message;
            goodColor = "#a5d6a7";
            badColor = "#ef9a9a";
            neutralColor = "#FFFFFF";

            message = document.querySelector(DOMstring.confirmationMsgUser);
            
            if(document.querySelector(DOMstring.inputUser).value===''){
                document.querySelector(DOMstring.inputUser).style.backgroundColor = neutralColor;
                Validations.User = false;
                message.style.color = "#000000";
                message.innerHTML='Llenar el campo';
            }
            
            else{
            if(flag){
                document.querySelector(DOMstring.inputUser).style.backgroundColor = goodColor;
                Validations.User = true;
                message.style.color = goodColor;
                message.innerHTML = "Usuario disponible.";
            }else{
                document.querySelector(DOMstring.inputUser).style.backgroundColor = badColor;
                Validations.User = false;
                message.style.color = badColor;
                message.innerHTML = "Usuario no disponible.";
            }
        }
        };
        const updateName = (flag) => {
            let message;
            message = document.querySelector(DOMstring.confirmationMsgName);
            if(document.querySelector(DOMstring.inputName).value===''){
                message.innerHTML='Llenar el campo';
                Validations.Name = false;
            }
            else{
                if(flag){
                    message.innerHTML = "";
                    Validations.Name = true;
                }else{
                    message.innerHTML = "Usar solo letras";
                    Validations.Name = false;
            }
        }
        };
        const updateLastName = (flag) => {
            let message;
            message = document.querySelector(DOMstring.confirmationMsgLastName);
            if(document.querySelector(DOMstring.inputSurname).value===''){
                message.innerHTML='Llenar el campo';
                Validations.Surname = false;
            }
            else{
                if(flag){
                    message.innerHTML = "";
                    Validations.Surname = true;
                }else{
                    message.innerHTML = "Usar solo letras";
                    Validations.Surname = false;
            }
        }
        };        
        const updatePhone = (flag) => {
            let message;
            neutralColor = "#FFFFFF";
            message = document.querySelector(DOMstring.confirmationMsgPhone);
            if(document.querySelector(DOMstring.inputCellphone).value===''){
                document.querySelector(DOMstring.inputCellphone).style.backgroundColor = neutralColor;
                message.style.color = "#000000";
                message.innerHTML='Llenar el campo';
                Validations.Cellphone = false;
            }
            else{
                if(flag){
                    message.innerHTML = "";
                    Validations.Cellphone = true;
                }else{
                    message.innerHTML = "Usar solo números";
                    Validations.Cellphone = false;
            }
        }
        };

        const allValidationsTrue = () =>{
            for (const key in Validations) {
                if (Validations.hasOwnProperty(key)) {
                    element = Validations[key];   
                    if(element==false)
                        return false; 
                }
            }
            return true;
        };

        const reset = () => {
            document.querySelector(DOMstring.inputName).value="";
            document.querySelector(DOMstring.inputSurname).value="";
            document.querySelector(DOMstring.inputCellphone).value="";
            document.querySelector(DOMstring.inputGender).value="M";
            document.querySelector(DOMstring.inputEmail).value="";
            document.querySelector(DOMstring.inputUser).value="";
            document.querySelector(DOMstring.inputPassword).value="";
            document.querySelector(DOMstring.inputSecondPassword).value=""; 
            document.querySelector(DOMstring.confirmationMsgName).innerHTML="";  
            document.querySelector(DOMstring.confirmationMsgLastName).innerHTML="";  
            document.querySelector(DOMstring.confirmationMsgPhone).innerHTML="";
            document.querySelector(DOMstring.confirmationMsgEmail).innerHTML="";
            document.querySelector(DOMstring.confirmationMsgUser).innerHTML=""; 
            document.querySelector(DOMstring.confirmationMsgPsswd).innerHTML=""; 
            document.querySelector(DOMstring.inputUser).style.backgroundColor = neutralColor;
            document.querySelector(DOMstring.inputEmail).style.backgroundColor = neutralColor;
            document.querySelector(DOMstring.inputSecondPassword).style.backgroundColor = neutralColor;
            document.querySelector(DOMstring.btnRegistration).disabled = true;
        }

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
            getValidations: function(){
                return allValidationsTrue();
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
            updateName: function(flag){
                updateName(flag);
            },
            updateLastName: function(flag){
                updateLastName(flag);
            },                
            updatePhone: function(flag){
                updatePhone(flag);
            },
            registration: function(){
                AJAXregistro();
            },        
            neutralEmail: function(flag){
                updateMail(flag);
            }, 
            reset: function(){
                reset();
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
            else{ 
                UI.neutralEmail(flag);
            }
        }

        const validateUser = function (){
            let flag = true; 
            //Check the email is write correctly  
            // flag = registration.checkEmail(UI.getInputs().user)
            //Check if the email is avaliable and Update UI 
            if(flag)
                UI.updateUser(UI.getInputs().user); 
        }

        const validateName = function (){
            let flag; 
            //Check the name is written correctly 
            flag = registration.checkName(UI.getInputs().name)
            //Check if the email is avaliable and Update UI 
            UI.updateName(flag);
        }
        const validateLastName = function (){
            let flag; 
            //Check the name is written correctly 
            flag = registration.checkName(UI.getInputs().surname)
            //Check if the email is avaliable and Update UI 
            UI.updateLastName(flag);
        }        
        const validatePhone = function (){
            let flag; 
            //Check the name is written correctly 
            flag = registration.checkPhone(UI.getInputs().cellphone)
            //Check if the email is avaliable and Update UI 
            UI.updatePhone(flag);
        }
        const unblockRegistration = function (){
            let flag = UI.getValidations();
            flag ? document.querySelector(DOMs.btnRegistration).disabled = false : document.querySelector(DOMs.btnRegistration).disabled = true;
        }

        // LISTENERS
        document.querySelector(DOMs.inputPassword).addEventListener("keyup",validatePasswords);
        document.querySelector(DOMs.inputSecondPassword).addEventListener("keyup",validatePasswords);
        document.querySelector(DOMs.inputEmail).addEventListener("keyup",validateEmail);
        document.querySelector(DOMs.inputUser).addEventListener("keyup",validateUser);
        document.querySelector(DOMs.inputName).addEventListener("keyup",validateName);
        document.querySelector(DOMs.inputCellphone).addEventListener("keyup",validatePhone);
        document.querySelector(DOMs.inputSurname).addEventListener("keyup",validateLastName);
        document.querySelector(DOMs.btnRegistration).addEventListener("click",UI.registration);
        document.addEventListener("keyup",unblockRegistration);
    
    })(registrationController,UIController);