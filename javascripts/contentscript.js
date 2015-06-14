$( document ).ready(function() {
	initVariables();
	initEvents();
	console.log("web page loaded!");
});

$(function () {
    $(document).tooltip();
});

function initVariables() {
	makeTooltip();
	this.bod = $(document).find("body");
}

function initEvents() {
	$(this.bod).bind('mouseup', function(e) {
		var tool = document.getElementsByClassName('tooltip-container');
		tool[0].style.display = "none";
		var selection = window.getSelection().toString().toLowerCase().trim();
		if (selection === "" || checkifoneword(selection) === false || detectpunctuation(selection)) {
			console.log("selection is invalid");
		}
		else {
			console.log(selection);
			chrome.runtime.sendMessage(selection, function(response) {
				this.definition = response;
				console.log(response);
				// document.getElementById("tooltip").innerHTML = response;
				this.tooltip.innerHTML = response;
				placeTooltip(tool[0], e.pageX, e.pageY);
				tool[0].style.display = "block";
			});
		}
	});
}

function makeTooltip(){
	this.tooltip = document.createElement('div');
	this.tooltip.className = "tooltip-container";
	this.tooltip.style.display = "none";
	document.body.appendChild(this.tooltip);
}

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}


function placeTooltip(tooltip, x_pos, y_pos) {
    // var d = document.getElementById('tooltip');
    tooltip.style.position = "absolute";
    tooltip.style.left = x_pos + 'px';
    tooltip.style.top = y_pos + 'px';
}

	
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
