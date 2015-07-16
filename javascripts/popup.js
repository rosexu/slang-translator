$( document ).ready(function() {
	initVariables();
	initEvents();
	postToPort("status");
	// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	// 	chrome.tabs.sendMessage(tabs[0].id, "status", function(response) {
	// 		console.log(response);
	// 		if (response) {
	// 			$checkmark.addClass('hidden');
	// 		}
	// 		else {
	// 			$checkmark.removeClass('hidden');
	// 		}
	// 	});
	// });
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
			// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			// 	chrome.tabs.sendMessage(tabs[0].id, "disable", function(response) {
			// 		console.log(response);
			// 	});
			// });

			this.port.postMessage("disable");
			$checkmark.removeClass('hidden');
		} else {
			// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			// 	chrome.tabs.sendMessage(tabs[0].id, "enable", function(response) {
			// 		console.log(response);
			// 	});
			// });

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