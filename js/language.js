var langArray = new Array();
langArray['en'] = new Array();
langArray['sw'] = new Array();


//All text that is going to be translated need to have class="lang", with the key e.g.:
//<p class="lang" key=update></p> -> langArray[en/sw]['update'];
$(document).ready(function(){
    //Set language to English if none is set
    if(sessionStorage.getItem('sessionLanguage') == null){
        sessionStorage.setItem('sessionLanguage', 'en');
    }

    //Load language text on start.
    $('.lang').each(function(i){
        $(this).text(langArray[sessionStorage.getItem('sessionLanguage')][ $(this).attr('key') ]);
    });

    //Switch language
    $( "#languageClick" ).click(function() {
        if (sessionStorage.getItem('sessionLanguage') == 'en') {
            sessionStorage.setItem('sessionLanguage', 'sw');
        }
        else {
            sessionStorage.setItem('sessionLanguage', 'en');
        }

        $('.lang').each(function (i) {
            $(this).text(langArray[sessionStorage.getItem('sessionLanguage')][$(this).attr('key')]);
        });
    })

});

//<span key="seeBeersLang" class="lang">
{
//header English
    langArray['en']['userNameLang'] = 'Username:';
    langArray['en']['pwLang'] = 'Password';
    langArray['en']['loginLang'] = 'Log in';
    langArray['en']['accDetailsLang'] = 'Account details';
    langArray['en']['seeBeersLang'] = 'See the beers';

//general English
    langArray['en']['confirm'] = 'Confirm edit';
    langArray['en']['cancel'] = 'Cancel';
    langArray['en']['update'] = 'Update';
    langArray['en']['goBack'] = 'Go back!';
    langArray['en']['search'] = 'Search';
    langArray['en']['edit'] = 'Edit';
    langArray['en']['timestamp'] = 'Timestamp: ';
    langArray['en']['orders'] = 'Orders';
    langArray['en']['order'] = 'Order';
    langArray['en']['name'] = 'Name: ';
    langArray['en']['user'] = 'User: ';
    langArray['en']['cashier'] = 'Cashier: ';
    langArray['en']['amount'] = 'Amount: ';
    langArray['en']['price'] = 'Price: ';

//bartenderIndex English
    langArray['en']['buyBeerLink'] = 'Buy Beer';
    langArray['en']['infoLink'] = 'Beer Info';
    langArray['en']['customerLink'] = 'Customers';
    langArray['en']['tableLink'] = 'Tables';
    langArray['en']['orderIndex'] = 'Order More';
    langArray['en']['removeIndex'] = 'Remove notification';
    langArray['en']['indexText1'] = ' is low on stock. It is currently ';
    langArray['en']['indexText2'] = 'in stock.';

//bartenderCustomer English
    langArray['en']['refreshPay'] = 'Refresh payments';
    langArray['en']['fName'] = 'First Name: ';
    langArray['en']['lName'] = 'Last Name:';
    langArray['en']['email'] = 'Email: ';
    langArray['en']['phone'] = 'Phone number: ';
    langArray['en']['payments'] = 'Payments';
    langArray['en']['funds'] = 'Add funds';
    langArray['en']['transId'] = 'Transaction ID: ';

//bartenderBeerInfo English
    langArray['en']['confirmOrder'] = 'Confirm Order';
    langArray['en']['inStock'] = 'Current amount in stock: ';
    langArray['en']['amountOrder'] = 'Amount order: ';
    langArray['en']['purchaseAmount'] = 'Purchase amount: ';

//mainUser English
    langArray['en']['buy'] = 'Buy';
    langArray['en']['clear'] = 'Clear';
    langArray['en']['undo'] = 'Undo';
    langArray['en']['redo'] = 'Redo';
    langArray['en']['mainText1'] = 'Drag beers here to shop!';
    langArray['en']['totalSum'] = 'Total sum: ';
}

{
//header Swedish
    langArray['sw']['userNameLang'] = 'Användarnamn:';
    langArray['sw']['pwLang'] = 'Lösenord';
    langArray['sw']['loginLang'] = 'Logga in';
    langArray['sw']['accDetailsLang'] = 'Kontoinställningar';
    langArray['sw']['seeBeersLang'] = 'Se ölen';

//general Swedish
    langArray['sw']['confirm'] = 'Bekräfta editering';
    langArray['sw']['cancel'] = 'Avbryt';
    langArray['sw']['update'] = 'Uppdater';
    langArray['sw']['goBack'] = 'Gå tillbaka!';
    langArray['sw']['search'] = 'Sök';
    langArray['sw']['edit'] = 'Editera';
    langArray['sw']['timestamp'] = 'Tidsstämpel: ';
    langArray['sw']['orders'] = 'Beställningar';
    langArray['sw']['order'] = 'Beställ';
    langArray['sw']['name'] = 'Namn: ';
    langArray['sw']['user'] = 'Användare: ';
    langArray['sw']['cashier'] = 'Kassör: ';
    langArray['sw']['amount'] = 'Antal: ';
    langArray['sw']['price'] = 'Pris: ';

//bartenderIndex Swedish
    langArray['sw']['update'] = 'Uppdatera';
    langArray['sw']['buyBeerLink'] = 'Köp öl';
    langArray['sw']['infoLink'] = 'Öl-information';
    langArray['sw']['customerLink'] = 'Kunder';
    langArray['sw']['tableLink'] = 'Bord';
    langArray['sw']['orderIndex'] = 'Beställ mer';
    langArray['sw']['removeIndex'] = 'Ta bort notis';
    langArray['sw']['indexText1'] = ' är snart slut. Nuvarande finns det ';
    langArray['sw']['indexText2'] = 'i lager';


//bartenderCustomer Swedish
    langArray['sw']['refreshPay'] = 'Uppdatera betalningar';
    langArray['sw']['fName'] = 'Förnamn: ';
    langArray['sw']['lName'] = 'Efternamn:';
    langArray['sw']['email'] = 'Epost: ';
    langArray['sw']['phone'] = 'Telefonnummer: ';
    langArray['sw']['payments'] = 'Betalningar';
    langArray['sw']['funds'] = 'Lägg till betalning';
    langArray['sw']['transId'] = 'Transaktionsid: ';


//bartenderBeerInfo Swedish
    langArray['sw']['confirmOrder'] = 'Bekräfta beställningar';
    langArray['sw']['inStock'] = 'Antal i lager: ';
    langArray['sw']['amountOrder'] = 'Antal att beställa: ';
    langArray['sw']['purchaseAmount'] = 'Antal varor: ';

//mainUser Swedish
    langArray['sw']['buy'] = 'Köp';
    langArray['sw']['clear'] = 'Rensa';
    langArray['sw']['undo'] = 'Ångra';
    langArray['sw']['redo'] = 'Gör om';
    langArray['sw']['mainText1'] = 'Dra öl hit för att handla!';
    langArray['sw']['totalSum'] = 'Total summa: ';

}


