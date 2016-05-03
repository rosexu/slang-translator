var enabled = true;

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    if (!sender.tab) {
        console.log("from the extension");
        sendResponse("");
    }
    if (request === "") {
        sendResponse("");
        return true;
    }
    else if (request === "status") {
        sendResponse(enabled);
    } else {
        ImplementDictionaryAPI(request, sendResponse);
        return true;
    }
});

chrome.extension.onConnect.addListener(function(port) {
    console.log("Connected .....");
    port.onMessage.addListener(function(msg) {
        console.log("message recieved by background.js: "+ msg);
        if (msg === "disable") {
            enabled = false;
            port.postMessage("background.js: set enabled to: " + enabled);
        } else if (msg === "enable") {
            enabled = true;
            port.postMessage("background.js: set enabled to: " + enabled);
        } else if (msg === "status") {
            port.postMessage({status: enabled});
        }
    });
});
 
const PARAMS = {
    useCanonical: true,
    limit: 10,
    sourceDictionaries: 'ahd,century,webster',
    api_key: 'ccce652ea40b38218500f0eee61084a3a8191bd1e7b26a041',
};

function ImplementDictionaryAPI(word, callback){
    $.ajax({
        url: 'http://api.wordnik.com/v4/word.json/' + word + '/definitions',
        type: 'GET',
        data: PARAMS,
        success: function(result) {
            if (!result.length) {
                console.log('word is undefined in normal dictionary');
                ImplementUrbanAPI(word, callback);
            }
            else {
                var definition = JSON.stringify(result[0].text);
                console.log(definition);
                callback(definition);
            }
        },
        failure: function(err, xhr) {
            console.log(err, xhr);
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
                var definition = JSON.stringify(result.list[0].definition);
                console.log(definition);
                callback(definition);
            }
        }
    });
}
