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
		var selection = window.getSelection().toString().toLowerCase().trim();
		if (selection === "" || checkifoneword(selection) === false || detectpunctuation(selection)) {
			console.log("selection is invalid");
		}
		else {
			console.log(selection);
			chrome.runtime.sendMessage(selection, function(response) {
				this.definition = response;
				console.log(response);
			});
		}
	});
}
//NOTE: MUST READ
//MU

	
function warnUser(word){	
	if (checkifoneword(word))
	{console.log("Please highlight only one word (multiword functionality may be added in future)");}
	else {
	    console.log(retrievedefinition());
        console.log(retrievedefinitionurban());
	}
}



function checkifoneword(a_string){

    var parts = a_string.split(" ");
    var length=parts.length;
    if (length>1) {return false;}
    else {return true;}
}

function detectpunctuation (a_string)
{
    var has_illegal_char=a_string.match(/[^A-Za-z0-9\-']/);    
    return has_illegal_char;
}
