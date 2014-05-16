(function(){
	if (!isElementVisible(gURLBar)) return;

	var loadingStat = true;

	var urlbarIcons = document.getElementById('urlbar');
	var additionBar = document.createElement('label');
	additionBar.setAttribute('id','addtion-link');
	additionBar.setAttribute('value','');
	additionBar.setAttribute('crop','center');
	additionBar.setAttribute('text-align','right');
	additionBar.style.color = 'green';
	additionBar.style.margin = "0px 0px 0px 0px";

	gURLBar.appendChild(additionBar);

	XULBrowserWindow.statusTextField.__defineGetter__('label', function() {
		return this.getAttribute("label");
	});
	XULBrowserWindow.statusTextField.__defineSetter__('label', function(str) {
		if (str) {
			this.setAttribute('label', str);
			if (this.getAttribute('type') == 'overLink') {
				if (str.length > 80) {
					additionBar.value = '➥ ' + str.substr(0, 39) + '...' + str.substr(str.length - 39, 39) + ' ';
				} else {
					additionBar.value = '➥ ' + str + ' ';
				}
			} else {
				if (loadingStat == true) {
					additionBar.value = str;
				} else {
					this.style.opacity = 1;
					additionBar.value = '';
				}
			}
		} else {
			this.style.opacity = 0;
			additionBar.value = '';
		}
		if (this.style.opacity == 0) {
			XULBrowserWindow.statusTextField.removeAttribute('mirror');
		}
		return str;
	});
})();
