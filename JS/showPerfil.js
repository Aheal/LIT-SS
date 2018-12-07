const showProfile = (function(){
    const getSearch = () => {
        search = window.location.search;
        search = search.split('?');
        return search[1];
    }; 

    return {
        getUser: function(){
            return getSearch();
        }
    }

})(); 
const UI = (function(){ 
    const DOMstring = {
        textName: "#_name",
        textSchool: "#_school",
        textMotto: "#_motto",
        textContest: "#_contest",
        textBenchmarks: "#_benchmarks",
        textBio: "#_bio",
        textAchievement1: "#_achievement1",
        textAchievement2: "#_achievement2",
        textAchievement3: "#_achievement3"
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
    const setInfo = (obj) => { 

        obj = JSON.parse(obj);

        document.querySelector(DOMstring.textName).innerHTML = obj.name;
        document.querySelector(DOMstring.textMotto).innerHTML = obj.motta;
        document.querySelector(DOMstring.textBio).innerHTML = obj.bio;
        document.querySelector(DOMstring.textAchievement1).innerHTML = obj.achievement1;
        document.querySelector(DOMstring.textAchievement2).innerHTML = obj.achievement2;
        document.querySelector(DOMstring.textAchievement3).innerHTML = obj.achievement3;
        
    } 

    return { 
        init: function(user){
            AJAXGetInfo(user);
        }
    }

})(); 
const con = (function(show,UI){
    
    const init = () => {
        UI.init(show.getUser());
    } 

    init();

})(showProfile,UI); 