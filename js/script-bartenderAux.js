
function logOutMe(){
    window.alert("Du kan föfan inte logga ut");
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

function loadBeerAll(){



}