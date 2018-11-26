const profileController =  (function (){ 

    const getSearch = () => {
        search = window.location.search;
        search = search.split('?');
        console.log(search);   
        return search[1];
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
    const AllowSymbols = (name) => {
        let re = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ!?¿¡ ]*$/;
        let result = false;
        if(name === '')
            return false;
        else{
            result = name.match(re) ? true : false;          
        }
        return result;
    };

    return{
        isNotEmpty: function(text){
            return text !== "";
        },
        checkAlphabet: function(text){
            return AllowSymbols(text);
        }, 
        getUser: function(){
            return getSearch();
        }
    }
})();

const UIController = (function (){
    let DOMstring = {
        inputName: "#name",
        inputSchool: "#school",
        inputMotto: "#motto",
        inputContest: "#contest",
        inputBenchmarks: "#benchmarks",
        inputBio: "#bio",
        inputAchievement1: "#achievement1",
        inputAchievement2: "#achievement2",
        inputAchievement3: "#achievement3",
        msgForm: "#message-f", 
        floatButton: ".float", 
        infoSections: ".p-change", 
        inputSections: ".i-change"
    }

    const updateName = (flag) => {
        let message;
        message = document.querySelector(DOMstring.confirmationMsgName);
        if(document.querySelector(DOMstring.inputName).value===''){
            message.innerHTML='Llenar el campo';
            Validations.Name = false;
            console.log("invalid");
        }
        else{
            if(flag){
                message.innerHTML = "";
                Validations.Name = true;
                console.log("valid");
            }else{
                message.innerHTML = "Usar solo letras";
                Validations.Name = false;
                console.log("invalid");
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

    const toggle = () => {
        let key, info, inputs;
        info = document.querySelectorAll(DOMstring.infoSections);
        inputs = document.querySelectorAll(DOMstring.inputSections); 
        info.forEach(element => {
            element.classList.toggle("switch");
        });
        inputs.forEach(element => {
            element.classList.toggle("switch");                
        });
        // switch (key) {
        //     case "edit":
        //         info = document.querySelectorAll(".p-change");
        //         inputs = document.querySelectorAll(".i-change"); 
        //         info.forEach(element => {
        //             element.classList.toggle("switch");
        //         });
        //         inputs.forEach(element => {
        //             element.classList.toggle("switch");                
        //         });
        //         key = "save";
        //         break;
        //     case "save":
        //         info = document.querySelectorAll(".p-change");
        //         inputs = document.querySelectorAll(".i-change");
        //         inputs.forEach(element => {
        //             element.style.display = "block";
        //         });
        //         info.forEach(element => {
        //             element.style.display = "none";
        //         });
        //         key = "edit";
        //         break;
        //     default:
        //         break;}
    };

    const reset = () => {
        document.querySelector(DOMstring.inputName).value="";
        document.querySelector(DOMstring.inputSchool).value="";
        document.querySelector(DOMstring.inputMotto).value="";
        document.querySelector(DOMstring.inputContest).value="";
        document.querySelector(DOMstring.inputBio).value="";
        document.querySelector(DOMstring.inputAchievement1).value="";
        document.querySelector(DOMstring.inputAchievement2).value="";
        document.querySelector(DOMstring.inputAchievement3).value="";
    }

    return {
        getInputs : function(){
            return { 
                name: document.querySelector(DOMstring.inputName).value, 
                school: document.querySelector(DOMstring.inputSchool).value,
                motto: document.querySelector(DOMstring.inputMotto).value,
                contest: document.querySelector(DOMstring.inputContest).value,
                bio: document.querySelector(DOMstring.inputBio).value, 
                achievement1: document.querySelector(DOMstring.inputAchievement1).value,
                achievement2: document.querySelector(DOMstring.inputAchievement2).value, 
                achievement3: document.querySelector(DOMstring.inputAchievement3).value
            }
        },
        getValidations: function(){
            return allValidationsTrue();
        }, 
        getDOMs: function (){
            return DOMstring;
        },
        checkName: function(name){
            return AllowSpecialChar(name);
        },
        updateName: function(flag){
            updateName(flag);
        }, 
        edit_save: function(){
            toggle();
        }        
    }



})();

const controller = (function (profile,UI){ 
    let DOMs, INPUTS;
    DOMs = UI.getDOMs();  

    const validateName = function (){
        let flag; 
        //Check the name is written correctly 
        console.log("1");
        flag = profile.checkAlphabet(UI.getInputs().name)
        UI.updateName(flag);
        
    }

    //LISTENERS
    document.querySelector(DOMs.inputName).addEventListener("keyup",validateName); 
    document.querySelector(DOMs.floatButton).addEventListener("click", UI.edit_save);
})(profileController,UIController); 