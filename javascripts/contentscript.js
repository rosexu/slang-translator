$( document ).ready(function() {
	initVariables();
	initEvents();
	console.log("web page loaded!");
});

function initVariables() {
	this.bod = $(document).find("body");
}

function initEvents() {
	$(this.bod).bind('mouseup', function() {
		var selection = window.getSelection().toString();
		if (selection === "") {
			console.log("selection is empty");
		}
		else {
			console.log(window.getSelection().toString());
			chrome.runtime.sendMessage(selection, function(response) {
				this.definition = response;
				console.log(response);
			});
		}
	});
}
