$( document ).ready(function() {
    console.log("web page loaded!");
    console.log(retrievedefinition());
    console.log(retrievedefinitionurban());
});
 
 
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
    console.log(getSelectionText());
}
 
function implementdictionaryapi(callback){
$.ajax({
   url: "https://montanaflynn-dictionary.p.mashape.com/define?word=hand",
   type: "GET",
   beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'A83cRYKgDUmshj54WtntYY9pUFnWp19CDK6jsnLqO8Rn3bBMh3');
       xhr.setRequestHeader('Accept','application/json');
   },
   success: function(result) { 
       console.log(JSON.stringify(result.definitions[0].text));
       callback(JSON.stringify(result.definitions[0].text)); }
});  
     
}
 
 
function implement_urban_api(callback){
$.ajax({
   url: "https://mashape-community-urban-dictionary.p.mashape.com/define?term=wat",
   type: "GET",
   beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'A83cRYKgDUmshj54WtntYY9pUFnWp19CDK6jsnLqO8Rn3bBMh3');
       xhr.setRequestHeader('Accept','text/plain');
   },
   success: function(result) { 
       console.log(JSON.stringify(result.list[0].definition));
       callback(JSON.stringify(result.list[0].definition)); }
});  
     
}
 
 
function retrievedefinition(){
    implementdictionaryapi(function(result1){
        document.getElementById("output").innerHTML = result1;
 
    });
}
 
function retrievedefinitionurban(){
    implement_urban_api(function(result){
        document.getElementById("output2").innerHTML = result;
    });
}
 
 
/*
function implement_urban_api(callback){
$.ajax({
   url: "https://mashape-community-urban-dictionary.p.mashape.com/define?term=wat",
   type: "GET",
   beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'A83cRYKgDUmshj54WtntYY9pUFnWp19CDK6jsnLqO8Rn3bBMh3');
       xhr.setRequestHeader('Accept','text/plain');
   },
   success: function(result) { 
       console.log(JSON.stringify(result.list[4].text));
       callback(JSON.stringify(result.definitions[4].text)); }
});  
     
}
 
 
function retrievedefinition(){
    implement_urban_api(function(result2){
        document.getElementById("output2").innerHTML = result2;
 
    });
}
*/