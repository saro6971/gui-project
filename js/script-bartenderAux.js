
function logOutMe(){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('pass');
    sessionStorage.removeItem('firstname');
    sessionStorage.removeItem('lastname');
    sessionStorage.removeItem('assets');
    sessionStorage.removeItem('userid');
}

function findCustomer(id){
    for(var num in customerList){
        if(id == customerList[num].id){
            return customerList[num];
        }
    }
}

function removeElementById(id){
    document.getElementById("" + id + "").remove();
}


function findInfo(id){
    for(var item in beerItemList){
        if(id == beerItemList[item].id){
            return beerItemList[item];
        }
    }
}

function findInfoBeer2(id){
    for(var item in beerItemList2){
        if(id == beerItemList2[item].id){
            return beerItemList2[item];
        }
    }

}

function closeDiv(){
    var myElem = document.getElementById('temp');
    if (myElem === null){
        removeElementById('temp2');
        document.getElementById('lightOrder').style.display='none';document.getElementById('fadeOrder').style.display='none';
    }

    else {
        removeElementById('temp');
        document.getElementById('lightEdit').style.display='none';document.getElementById('fadeEdit').style.display='none';
    }
}


function loadUsername(){
    document.getElementById("userHeader").innerHTML =  sessionStorage.getItem("user");

}

function changeTheme(){
    var theme = sessionStorage.getItem('themeCounter');
    if(theme == null){
        theme = 1;
    }
    else{
        theme = parseInt(theme)+1;
    }
    theme = theme %2;
    if(theme == 0){
        sessionStorage.setItem('themeCounter',theme);
        console.log("Theme1 inc");
        //$(".headers").css({"color":"#DE1B1B"});
        $(".stylee").css({"background-color":"#F6F6F6"});
    }
    else {
        sessionStorage.setItem('themeCounter',theme);
        console.log("Theme2 inc");
        //$(".headers").css({"color":"#35CA41"});
        $(".stylee").css({"background-color":"#CEF0EF"});
        //LÄGG IN KOD FÖR ÄNDRA TEMA2 HÄR. TA SEN BORT ALERT
    }

}