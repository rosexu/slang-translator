chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log("request triggered: " + request);
		console.log(sender.tab ?
					"from a content script:" + sender.tab.url :
					"from the extension");
		if (request === "") {
			sendResponse("");
			return true;
		}
		else {
			//sendUrbanAPICall(request, sendResponse);
			implementdictionaryapi(request, sendResponse);
			//implement_urban_api(request, sendResponse);
			return true;
		}
	});

function sendUrbanAPICall(word, sendResponse) {
	var baseAPIstr = "http://api.urbandictionary.com/v0/define?term=";
	var completeAPIquery = baseAPIstr + word;
	console.log("sending api call");
	$.get(completeAPIquery, function(response){
		console.log(response);
		sendResponse(response);
	});
}

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
 
function implementdictionaryapi(word, callback){
$.ajax({
   url: "https://montanaflynn-dictionary.p.mashape.com/define?word=" + word,
   type: "GET",
   beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'A83cRYKgDUmshj54WtntYY9pUFnWp19CDK6jsnLqO8Rn3bBMh3');
       xhr.setRequestHeader('Accept','application/json');
   },
   success: function(result) {
   	   if (typeof result.definitions[0] === 'undefined') {
   	   		console.log("word is undefined");
   	   		implement_urban_api(word, callback);
   	   }
   	   else {
	   	   var aresult = JSON.stringify(result.definitions[0].text);
	       consaole.log(aresult);
	       callback(aresult); 
	   }
	}
});  
     
}
 
 
function implement_urban_api(word, callback){
$.ajax({
   url: "https://mashape-community-urban-dictionary.p.mashape.com/define?term=" + word,
   type: "GET",
   beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'A83cRYKgDUmshj54WtntYY9pUFnWp19CDK6jsnLqO8Rn3bBMh3');
       xhr.setRequestHeader('Accept','text/plain');
   },
   success: function(result) { 
   		if (typeof result.list[0] === 'undefined') {
   	   		console.log("word is undefined");
   	   		callback("");
   	   	}
   	   	else {
   	   		var aresult = JSON.stringify(result.list[0].definition);
   	   		console.log(aresult);
   	   		callback(aresult);
   	   	}
       }
});  
     
}
 
 
function retrievedefinition(word){
    implementdictionaryapi(word, function(result1){
        document.getElementById("output").innerHTML = result1;
 
    });
}
 
function retrievedefinitionurban(word){
    implement_urban_api(word, function(result){
        document.getElementById("output2").innerHTML = result;
    });
}