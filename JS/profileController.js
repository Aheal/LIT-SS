const profileController =  (function (){ 

    const getSearch = () => {
        search = window.location.search;
        search = search.split('?');
        return search[1];
    }; 

    const getContests = () => {
        // $.ajax({
        //     type: "POST",
        //     url: "../BS/getSchools.php",
        //     data: {
        //         json: JSON.stringify(obj)
        //     },
        //     success: function (response) {

        //     }
        // }); 
        return [{
            
                id: 1,
                name: "La cueva del Leon"
            }, 
            {
                id: 2,
                name: "Foto me"
            } 
        ];
    };

    const getSchools = () => {
        // $.ajax({
        //     type: "POST",
        //     url: "../BS/getSchools.php",
        //     data: {
        //         json: JSON.stringify(obj)
        //     },
        //     success: function (response) {

        //     }
        // }); 
        return [{
            
                id: 1,
                name: "Colegio Americano de tabasco"
            }, 
            {
                id: 2,
                name: "Colegio Arji"
            } 
        ];
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
        }, 
        getSchool: function(){
            return getSchools();
        },
        getContest: function(){
            return getContests();
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
        fButton1: "#fButton1", 
        fButton2: "#fButton2", 
        infoSections: ".p-change", 
        inputSections: ".i-change"
    } 

    const AJAXGetInfo = (user) =>{
        let obj ={
            user: user
        };
        $.ajax({
            type: "POST",
            url: "../BS/getProfileInfo.php",
            data: {
                json: JSON.stringify(obj)
            },
            success: function (response) {
                
            }
        });
    };

    const AJAXSetInfo = (user) =>{

        let obj = { 
            user: user,
            nombre : document.querySelector(DOMstring.inputName).value,
            escuela : document.querySelector(DOMstring.inputSchool).value,
            lema : document.querySelector(DOMstring.inputMotto).value,
            concurso : document.querySelector(DOMstring.inputContest).value,
            bio : document.querySelector(DOMstring.inputBio).value,
            logro1 : document.querySelector(DOMstring.inputAchievement1).value,
            logro2 : document.querySelector(DOMstring.inputAchievement2).value,
            logro3 : document.querySelector(DOMstring.inputAchievement3).value
        }
        $.ajax({
            type: "POST",
            url: "../BS/setProfileInfo.php",
            data: {
                json: JSON.stringify(obj)
            },
            success: function (response) {

                response === "0" ? toggle() : console.log(response);
                
            }
        });
        
    }; 

    const fillDropdowns = (type,obj) => {
        let father;
        switch (type) {
            case "school":
                father = DOMstring.inputSchool; 
                break;
            case "contest":
                father = DOMstring.inputContest;
                break;
            default:
                break;
        } 

        obj.forEach(element => {
            html = `<option value="${element.id}">${element.name}</option>` 
            document.querySelector(father).insertAdjacentHTML('beforeend', html);
        });

    };


    const toggle = () => {
        let info, inputs;
        info = document.querySelectorAll(DOMstring.infoSections);
        inputs = document.querySelectorAll(DOMstring.inputSections); 
        info.forEach(element => {
            element.classList.toggle("switch");
        });
        inputs.forEach(element => {
            element.classList.toggle("switch");                
        }); 
        document.querySelector(DOMstring.fButton1).classList.toggle("switch");
        document.querySelector(DOMstring.fButton2).classList.toggle("switch");

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
        save: function(user){
            AJAXSetInfo(user);
        }, 
        edit: function(){
            toggle();
        },
        fillDropdown: function(type,obj){
            fillDropdowns(type,obj);
        }        
    }
})();

const controller = (function (profile,UI){ 
    let DOMs, INPUTS;
    DOMs = UI.getDOMs();  

    // const validateName = function (){
    //     let flag; 
    //     //Check the name is written correctly 
    //     console.log("1");
    //     flag = profile.checkAlphabet(UI.getInputs().name)
    //     UI.updateName(flag);
    // } 

    const init = () => {
        let schools, contests; 
        //Get schools names and ids 
        schools = profile.getSchool();
        //Get the contest names
        contests = profile.getContest();
        //Update the ui 
        UI.fillDropdown("school",schools);
        UI.fillDropdown("contest",contests);

    } 

    const save = () => { 
        UI.save(profile.getUser());
        console.log("save");
    };
    const edit = () => { 
        UI.edit();
        console.log("edit");
    };

    init();
    //LISTENERS
    // document.querySelector(DOMs.inputName).addEventListener("keyup",validateName); 
    document.querySelector(DOMs.fButton1).addEventListener("click", save);
    document.querySelector(DOMs.fButton2).addEventListener("click", edit);

})(profileController,UIController); 