chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log("request triggered: " + request);
		console.log(sender.tab ?
					"from a content script:" + sender.tab.url :
					"from the extension");
		if (request === "") {
			sendResponse("");
		}
		else {
			sendUrbanAPICall(request, sendResponse);
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