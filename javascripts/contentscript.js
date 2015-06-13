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
		console.log(window.getSelection().toString());
	});
}
