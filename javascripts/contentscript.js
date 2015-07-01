$( document ).ready(function() {
	initVariables();
	initEvents();
	console.log("web page loaded!");
});

function initVariables() {
	makeTooltip();
	this.bod = $(document).find("body");
	this.$tooltip = $(document).find(".tooltip-container");
	console.log(this.$tooltip);
}

function initEvents() {
	var self = this;
	$(this.bod).bind('mouseup', function(e) {
		self.$tooltip.hide();
		var selection = window.getSelection().toString().toLowerCase().trim();
		if (selection === "" || isOneWord(selection) === false || hasInvalidSymbols(selection)) {
			console.log("selection is invalid");
		}
		else {
			console.log(selection);
			chrome.runtime.sendMessage(selection, function(definition) {
				console.log(definition);
				if (definition === "") {
					this.tooltip.innerHTML = "No definition found for " + '\"' + selection + '\"';
				} else {
					this.tooltip.innerHTML = definition;
				}
				placeTooltip(e.pageX, e.pageY);
				self.$tooltip.show();
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


function placeTooltip(x_pos, y_pos) {
    this.tooltip.style.position = "absolute";
    this.tooltip.style.left = x_pos + 'px';
    this.tooltip.style.top = y_pos + 'px';
}

function isOneWord(str){
    var parts = str.split(" ");
    var length = parts.length;
    if (length > 1) {
		return false;
    } else {
		return true;
    }
}

function hasInvalidSymbols (str) {
    return str.match(/[^A-Za-z0-9\-']/);
}
