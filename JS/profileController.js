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
        textName: "#_name",
        textSchool: "#_school",
        textMotto: "#_motto",
        textContest: "#_contest",
        textBenchmarks: "#_benchmarks",
        textBio: "#_bio",
        textAchievement1: "#_achievement1",
        textAchievement2: "#_achievement2",
        textAchievement3: "#_achievement3", 
        textShare : "#_share",
        msgForm: "#message-f", 
        fButton1: "#fButton1", 
        fButton2: "#fButton2", 
        shareButton: "#share", 
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
                setInfo(response);
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

    const setInfo = (obj) => { 

        obj = JSON.parse(obj);

        document.querySelector(DOMstring.inputName).value = obj.name;
        document.querySelector(DOMstring.inputMotto).value = obj.motta;
        document.querySelector(DOMstring.inputBio).value = obj.bio;
        document.querySelector(DOMstring.inputAchievement1).value = obj.achievement1;
        document.querySelector(DOMstring.inputAchievement2).value = obj.achievement2;
        document.querySelector(DOMstring.inputAchievement3).value = obj.achievement3;
        document.querySelector(DOMstring.textName).innerHTML = obj.name;
        document.querySelector(DOMstring.textMotto).innerHTML = obj.motta;
        document.querySelector(DOMstring.textBio).innerHTML = obj.bio;
        document.querySelector(DOMstring.textAchievement1).innerHTML = obj.achievement1;
        document.querySelector(DOMstring.textAchievement2).innerHTML = obj.achievement2;
        document.querySelector(DOMstring.textAchievement3).innerHTML = obj.achievement3;
        
    } 
    const setSave = () => { 

        document.querySelector(DOMstring.textName).innerHTML =  document.querySelector(DOMstring.inputName).value;
        document.querySelector(DOMstring.textMotto).innerHTML = document.querySelector(DOMstring.inputMotto).value;
        document.querySelector(DOMstring.textBio).innerHTML = document.querySelector(DOMstring.inputBio).value;
        document.querySelector(DOMstring.textAchievement1).innerHTML = document.querySelector(DOMstring.inputAchievement1).value;
        document.querySelector(DOMstring.textAchievement2).innerHTML = document.querySelector(DOMstring.inputAchievement2).value;
        document.querySelector(DOMstring.textAchievement3).innerHTML = document.querySelector(DOMstring.inputAchievement3).value;

    }

    const setShare = (user) => {
        document.querySelector(DOMstring.textShare).value = user;
    } 

    const getShare = () => {
       return document.querySelector(DOMstring.textShare).value;
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
        setSave: function(){
            setSave();
        },
        toggle: function(){
            toggle();
        },
        fillDropdown: function(type,obj){
            fillDropdowns(type,obj);
        }, 
        setInfo: function(user){
            AJAXGetInfo(user);
        }, 
        setShare: function(user){
            setShare(user);
        },
        getShare : function (){
            return getShare();
        }      
    }
})();

const controller = (function (profile,UI){ 
    let DOMs, INPUTS, user;
    DOMs = UI.getDOMs();  
    user = profile.getUser();

    const init = () => {
        let schools, contests; 
        //Get schools names and ids 
        schools = profile.getSchool();
        //Get the contest names
        contests = profile.getContest();
        //Update the ui 
        UI.fillDropdown("school",schools);
        UI.fillDropdown("contest",contests); 
        UI.setInfo(user); 
        UI.setShare(user);

    } 

    const save = () => { 
        UI.save(user); 
        UI.setSave();
    };

    const edit = () => { 
        UI.toggle(user);
    }; 

    const share = () => {
        /* Get the text field */
        var copyText = document.querySelector(DOMs.textShare);

        copyText.select();
                
        /* Copy the text inside the text field */
        document.execCommand("copy");
        
        /* Alert the copied text */
        alert("Se ha copiado la liga de tu perfil: " + copyText.value);
    }

    init();
    //LISTENERS
    // document.querySelector(DOMs.inputName).addEventListener("keyup",validateName); 
    document.querySelector(DOMs.fButton1).addEventListener("click", save);
    document.querySelector(DOMs.fButton2).addEventListener("click", edit); 
    document.querySelector(DOMs.shareButton).addEventListener("click", share);

})(profileController,UIController); 