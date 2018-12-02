const loginController =  (function (){
    return{
        isNotEmpty: function(text){
            return text !== "";
        }
    }
})();

const UIController = (function (){
    let DOMstrings = {
        inputAlias: "#alias",
        inputPass: "#pass",
        btnLogin: "#login",
        msgForm: "#message-f"
    }   

    const AJAXlogin = (alias,pass) => { 
        let obj; 
        obj = {
            alias: alias, 
            pass: pass,
        };
    
        $.ajax({
            type: "POST",
            url: "../BS/login.php",
            data: {
                json: JSON.stringify(obj)
            },
            success: function (response) { 
                console.log(response);
                updateForm("login",response);
            }  
        }); 
    };

    const updateForm = (type,flag) => { 
        switch (type) {
            case "blank":
                message = document.querySelector(DOMstrings.msgForm); 
                message.style.height = ""
                message.style.background = "#ef9a9a"; 
                message.style.color = "#fff";
                message.innerHTML = "Ups! Primero rellena todos los campos";
                break;
            case "login": 
                switch (flag) {
                    case "0":
                        message = document.querySelector(DOMstrings.msgForm); 
                        message.style.background = "#a5d6a7"; 
                        message.style.color = "#fff";
                        message.innerHTML = "Listo Campeon!";
                        break;
                    case "1":
                        message = document.querySelector(DOMstrings.msgForm); 
                        message.style.background = "#ef9a9a"; 
                        message.style.color = "#fff";
                        message.innerHTML = "Woops! Algo salio mal, intenta mas tarde :S";
                        break;
                    case "2":
                        message = document.querySelector(DOMstrings.msgForm);
                        message.style.background = "#a5d6a7"; 
                        message.style.color = "#fff"; 
                        message.innerHTML = "Verifica tu correo antes de iniciar sesion!";
                        break;
                    case "3":
                        message = document.querySelector(DOMstrings.msgForm);
                        message.style.background = "#a5d6a7"; 
                        message.style.color = "#fff"; 
                        message.innerHTML = "Verifica tu Usuario o Contraseña!";
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    };

    return {
        getInputs: function(){ 
            return{
                alias: document.querySelector(DOMstrings.inputAlias).value, 
                pass: document.querySelector(DOMstrings.inputPass).value
            }
        },
        getDOMs: function(){
            return DOMstrings;
        },
        logIn: function(alias,pass){
            AJAXlogin(alias,pass);
        },
        notBlankSpaces: function(flag){
            updateForm("blank",flag);
        }
    }
})();

const controller = (function (login,UI){ 
    let DOMS;

    DOMS = UI.getDOMs();

    const  logIn = () =>{
        let flag, INPUTS; 

        INPUTS = UI.getInputs(); 

        flag = login.isNotEmpty(INPUTS.alias); 
        flag1 = login.isNotEmpty(INPUTS.pass); 
        console.log(`flag : ${flag}`);
        console.log(`flag : ${flag1}`);
        console.log(`alias : ${INPUTS.alias}`);
        console.log(`pass : ${INPUTS.pass}`);
        if(flag && flag1)
            UI.logIn(INPUTS.alias,INPUTS.pass); 
        else 
            UI.notBlankSpaces(flag);
    }; 

    document.querySelector(DOMS.btnLogin).addEventListener("click",logIn);

})(loginController,UIController);


