$( document ).ready(function() {
	initVariables();
	initEvents();
});

function initVariables() {
	this.$menu = $(document).find('.btn-group-vertical.extension-menu');
	this.$disableButton = $menu.find('#disable-btn');
	this.$checkmark = $disableButton.find('.glyphicon.glyphicon-ok.checkmark');
	this.$helpButton = $menu.find('#help-btn');
	console.log($checkmark);
}

function initEvents() {
	$(this.$disableButton).bind('click', function() {
		if ($checkmark.hasClass('hidden')) {
			$checkmark.removeClass('hidden');
		} else {
			$checkmark.addClass('hidden');
		}
	});
}