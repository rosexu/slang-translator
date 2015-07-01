chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
// console.log("request triggered: " + request);
// console.log(sender.tab ?
//"from a content script:" + sender.tab.url :
//"from the extension");
    if (request === "") {
        sendResponse("");
        return true;
    } else {
        ImplementDictionaryAPI(request, sendResponse);
        return true;
    }
});
 
function ImplementDictionaryAPI(word, callback){
    $.ajax({
        url: "https://montanaflynn-dictionary.p.mashape.com/define?word=" + word,
        type: "GET",
        beforeSend: function(xhr){
            xhr.setRequestHeader('X-Mashape-Key', 'A83cRYKgDUmshj54WtntYY9pUFnWp19CDK6jsnLqO8Rn3bBMh3');
            xhr.setRequestHeader('Accept','application/json');
        },
        success: function(result) {
            if (typeof result.definitions[0] === 'undefined') {
                console.log("word is undefined in normal dictionary");
                ImplementUrbanAPI(word, callback);
            }
            else {
                var aresult = JSON.stringify(result.definitions[0].text);
                console.log(aresult);
                callback(aresult);
            }
        }
    });
}
 
 
function ImplementUrbanAPI(word, callback){
    $.ajax({
        url: "https://mashape-community-urban-dictionary.p.mashape.com/define?term=" + word,
        type: "GET",
        beforeSend: function(xhr){
            xhr.setRequestHeader('X-Mashape-Key', 'A83cRYKgDUmshj54WtntYY9pUFnWp19CDK6jsnLqO8Rn3bBMh3');
            xhr.setRequestHeader('Accept','text/plain');
        },
        success: function(result) {
            if (typeof result.list[0] === 'undefined') {
                console.log("word is undefined in urbandictionary");
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
