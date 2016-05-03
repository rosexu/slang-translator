$( document ).ready(function() {
	initVariables();
	initEvents();
	console.log("web page loaded!");
});

/*	Finds the tooltip and caches it.
 * 
 *  @method initVariables
 *  @return {undefined}
 */
function initVariables() {
	makeTooltip();
	this.bod = $(document).find("body");
	this.$tooltip = $(document).find(".tooltip-container");
}

/*	Binds the mouseup event that sends a message to the
 *  background containing the word selected.
 * 
 *  @method initEvents
 *  @return {undefined}
 */
function initEvents() {
	$(this.bod).mouseup( $.proxy( function(e) {
		// Hides the tooltip; we want the tooltip to disappear if the
		// user click outside of it.
		this.$tooltip.hide();

		// Sends message to background, if extension is disabled, don't do
		// anything.
		chrome.runtime.sendMessage("status", function(state) {
			if (state === false) {
				console.log("extension is disabled");
				return;
			}

			// get highlighted text
			var selection = window.getSelection().toString().toLowerCase().trim();
			if (selection === "" || isOneWord(selection) === false || hasInvalidSymbols(selection)) {
				console.log("selection is invalid");
			}
			else {
				console.log(selection);

				// sends message to background to look up definition of word
				chrome.runtime.sendMessage(selection, function(definition) {
					console.log(definition);
					if (definition === "") {
						this.tooltip.innerHTML = "No definition found for " + '\"' + selection + '\"';
					} else {
						this.tooltip.innerHTML = definition;
					}

					// show the tooltip to the user right beside the highlighted text
					placeTooltip(e.pageX, e.pageY);
					this.$tooltip.show();
				});
			}
		});
	}, this));
}

/*	Make tooltip and append to body
 * 
 *  @method makeTooltip
 *  @return {undefined}
 */
function makeTooltip(){
	this.tooltip = document.createElement('div');
	this.tooltip.className = "tooltip-container";
	this.tooltip.style.display = "none";
	document.body.appendChild(this.tooltip);
}

/*	Get highlighted text
 * 
 *  @method getSelectionText
 *  @return string text
 */
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}

/*	Places the tooltip at the position specified on the 
 *	window
 * 
 *  @method placeTooltip
 *	@param double x_pos, double y_pos
 *  @return {undefined}
 */
function placeTooltip(x_pos, y_pos) {
    this.tooltip.style.position = "absolute";
    this.tooltip.style.left = x_pos + 'px';
    this.tooltip.style.top = y_pos + 'px';
}

/*	Checks if selection is one word
 * 
 *  @method isOneWord
 *	@param string str
 *  @return boolean
 */
function isOneWord(str){
    var parts = str.split(" ");
    var length = parts.length;
    if (length > 1) {
		return false;
    } else {
		return true;
    }
}

/*	Checks if selection has invalid symbols like / or }
 * 
 *  @method hasInvalidSymbols
 *	@param string str
 *  @return boolean
 */
function hasInvalidSymbols (str) {
    return str.match(/[^A-Za-z0-9\-']/);
}
