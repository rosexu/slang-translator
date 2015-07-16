$( document ).ready(function() {
	initVariables();
	initEvents();
	postToPort("status");
});

function postToPort(query) {
	this.port.postMessage(query);
}

function initVariables() {
	this.$menu = $(document).find('.btn-group-vertical.extension-menu');
	this.$disableButton = $menu.find('#disable-btn');
	this.$checkmark = $disableButton.find('.glyphicon.glyphicon-ok.checkmark');
	this.$helpButton = $menu.find('#help-btn');
	this.port = chrome.extension.connect({name: "state"});
	console.log(this.port);
}

function initEvents() {
	this.$disableButton.click( $.proxy( function() {
		if ($checkmark.hasClass('hidden')) {
			this.port.postMessage("disable");
			$checkmark.removeClass('hidden');
		} else {
			this.port.postMessage("enable");
			$checkmark.addClass('hidden');
		}
	}, this));

	this.$helpButton.bind('click', function() {
		chrome.tabs.create({ url: "https://github.com/rosexu/slang-translator" });
	});

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