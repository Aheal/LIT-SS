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
        parrafo1: "#sugerencias",
        inputSugerencias: "#myInput"

    }
    let listofusers = []   

    const AJAXsearch = (barra) => { 
        let obj; 
        obj = {
            barra: barra, 
        };
    
        $.ajax({    
            type: "POST",
            url: "../Testing/barraphp.php",
            data: {
                json: JSON.stringify(obj)
            },
            success: function (response) { 
                //console.log(response);
                //listAllUsernames(response);
                updateUsers(response);
            }  
        }); 
    };
    
    const updateUsers = (users) => {
        obj = JSON.parse(users);
        obj.forEach(element => {
            listofusers.push(element);
        });
        //console.log(obj)
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
        getUsers: function(){
            return listofusers;
        },
        search: function(barra){
            AJAXsearch(barra);
        },
        notBlankSpaces: function(flag){
            updateForm("blank",flag);
        }
    }
})();


function autocomplete(inp, arr) {
    console.log("esto es lo que llega a autocomplete");
    console.log(arr);

    if( typeof arr.length !== undefined){
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
              /*check if the item starts with the same letters as the text field value:*/
              if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
              /*If the arrow DOWN key is pressed,
              increase the currentFocus variable:*/
              currentFocus++;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 38) { //up
              /*If the arrow UP key is pressed,
              decrease the currentFocus variable:*/
              currentFocus--;
              /*and and make the current item more visible:*/
              addActive(x);
            } else if (e.keyCode == 13) {
              /*If the ENTER key is pressed, prevent the form from being submitted,*/
              e.preventDefault();
              if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {closeAllLists(e.target);
});
    }
    
  } 

//autocomplete(document.getElementById("myInput"));

const controller = (function (login,UI){ 
    let DOMS;

    DOMS = UI.getDOMs();
    USERS = UI.getUsers();

    const  logIn = () =>{
        UI.search("");
    }; 

    logIn();
    autocomplete(document.getElementById("myInput"), USERS);


})(loginController,UIController); 

const getSearch = () => {
    user = document.querySelector("#myInput").value; 
    return user;
}; 

const goto = (alias) => {
    window.location.href = `http://localhost/LIT-SS/Templates/perfil.html?${alias}`;
} 

const search = () =>{
    goto(getSearch());
}

document.querySelector("#_search").addEventListener("click", search);


