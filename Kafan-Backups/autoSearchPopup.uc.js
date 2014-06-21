location == "chrome://browser/content/browser.xul" && (autoSearchPopup = true) && gBrowser.mPanelContainer.addEventListener("mouseup", function (event) {
	setTimeout(function () {
		if (autoSearchPopup === true && event.button === 0 && event.target.ownerDocument.designMode !== "on" && getBrowserSelection()) {
			var popup = document.getAnonymousElementByAttribute(document.querySelector("#searchbar").searchButton, "anonid", "searchbar-popup");
			var text = getBrowserSelection();
			var serach = function() {
					popup.removeEventListener("command", serach, false);
					popup.removeEventListener("popuphidden", closeSerach, false)
					setTimeout(function(selectedEngine) {
						BrowserSearch.loadSearch(text, true);
						popup.querySelectorAll("#" + selectedEngine.id)[0].click();
					}, 10, popup.querySelector("*[selected=true]"))
				}
			var closeSerach = function() {
					popup.removeEventListener("command", serach, false);
					popup.removeEventListener("popuphidden", closeSerach, false)
				}
			popup.addEventListener("command", serach, false)
			popup.addEventListener("popuphidden", closeSerach, false)
			popup.openPopup(null, null, event.screenX - 100, event.screenY + 20);
		}
	}, 500)
}, false)
