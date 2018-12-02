const loginController =  (function (){
    return{
        isNotEmpty: function(text){
            return text !== "";
        }
    }
})();

const UIController = (function (){
    let DOMstrings = {
        inputBarra: "#barra",
        parrafo1: "#sugerencias"

    }   

    const AJAXsearch = (barra) => { 
        let obj; 
        obj = {
            barra: barra, 
        };
    
        $.ajax({
            type: "POST",
            url: "barraphp.php",
            data: {
                json: JSON.stringify(obj)
            },
            success: function (response) { 
                console.log(response);
                updateParrafo(response);
            }  
        }); 
    };
    
    const updateParrafo = (users) => {
        let str;
        message = document.querySelector(DOMstrings.parrafo1);
        obj = JSON.parse(users);
        console.log(obj)
        str = JSON.stringify(obj);
        message.innerHTML = str;
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
                barra: document.querySelector(DOMstrings.inputBarra).value
            }
        },
        getDOMs: function(){
            return DOMstrings;
        },
        search: function(barra){
            AJAXsearch(barra);
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
        let INPUTS; 

        INPUTS = UI.getInputs();  
        console.log(`barra : ${INPUTS.barra}`);
        if(INPUTS.barra!=""){
            UI.search(INPUTS.barra);
        }
        
    }; 

    document.querySelector(DOMS.inputBarra).addEventListener("keyup",logIn);

})(loginController,UIController);


