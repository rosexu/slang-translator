$( document ).ready(function() {
	initVariables();
	initEvents();

	// on ready, ask the background script for whether the extension
	// is enabled or not
	postToPort("status");
});

/*	Post message: query to background
 * 
 *  @method postToPort
 *	@param String query
 *  @return {undefined}
 */
function postToPort(query) {
	this.port.postMessage(query);
}

/*	Define all the jquery variable needed and save them globally, 
 *  opens the port to talk to background. 
 * 
 *  @method initVariables
 *  @return {undefined}
 */
function initVariables() {
	this.$menu = $(document).find('.btn-group-vertical.extension-menu');
	this.$disableButton = $menu.find('#disable-btn');
	this.$checkmark = $disableButton.find('.glyphicon.glyphicon-ok.checkmark');
	this.$helpButton = $menu.find('#help-btn');

	// set up a port to pass message about the state of the extension
	this.port = chrome.extension.connect({name: "state"});
}

/*	where all the callbacks are binded: disable button click, help button
 *  click, and updating the state of the extension (enabled or disabled)
 * 
 *  @method initEvents
 *  @return {undefined}
 */
function initEvents() {

	// handling disabling and enabling of extension, sends message to
	// background
	this.$disableButton.click( $.proxy( function() {
		if ($checkmark.hasClass('hidden')) {
			this.port.postMessage("disable");
			$checkmark.removeClass('hidden');
		} else {
			this.port.postMessage("enable");
			$checkmark.addClass('hidden');
		}
	}, this));

	// help button takes user to github project page in new tab
	this.$helpButton.bind('click', function() {
		chrome.tabs.create({ url: "https://github.com/rosexu/slang-translator" });
	});

	// if extension is enabled, do not show disable checkmark, otherwise show it
	this.port.onMessage.addListener(function(msg) {
        console.log("message recieved by popup.js: "+ msg);
        if (msg.status === true) {
			$checkmark.addClass('hidden');
        }
        else if (msg.status === false) {
			$checkmark.removeClass('hidden');
        }
	});
}