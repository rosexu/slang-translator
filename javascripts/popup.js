$( document ).ready(function() {
	initVariables();
	initEvents();
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, "status", function(response) {
			console.log(response);
			if (response) {
				$checkmark.addClass('hidden');
			}
			else {
				$checkmark.removeClass('hidden');
			}
		});
	});
});

function initVariables() {
	this.$menu = $(document).find('.btn-group-vertical.extension-menu');
	this.$disableButton = $menu.find('#disable-btn');
	this.$checkmark = $disableButton.find('.glyphicon.glyphicon-ok.checkmark');
	this.$helpButton = $menu.find('#help-btn');
}

function initEvents() {
	this.$disableButton.bind('click', function() {
		if ($checkmark.hasClass('hidden')) {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, "disable", function(response) {
					console.log(response);
				});
			});
			$checkmark.removeClass('hidden');
		} else {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, "enable", function(response) {
					console.log(response);
				});
			});
			$checkmark.addClass('hidden');
		}
	});

	this.$helpButton.bind('click', function() {
		chrome.tabs.create({ url: "https://github.com/rosexu/slang-translator" });
	});
}