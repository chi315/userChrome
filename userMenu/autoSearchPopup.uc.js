location == "chrome://browser/content/browser.xul" && (autoSearchPopup = true) && gBrowser.mPanelContainer.addEventListener("mouseup", function (event) {
	setTimeout(function () {
		if (autoSearchPopup === true && event.button === 0 && event.target.ownerDocument.designMode !== "on" && getBrowserSelection()) {
			var popup = document.getAnonymousElementByAttribute(document.querySelector("#searchbar").searchButton, "anonid", "searchbar-popup");
			var text = getBrowserSelection();
			var serach = function() {
					popup.removeEventListener("command", serach, false);
					popup.removeEventListener("popuphidden", closeSerach, false)
					setTimeout(function(selectedEngine) {
						gBrowser.selectedTab = gBrowser.addTab();
						BrowserSearch.loadSearch(text, false);
						popup.querySelectorAll("#" + selectedEngine.id)[0].click();
					}, 10, popup.querySelector("*[selected=true]"))
				}
			var closeSerach = function() {
					popup.removeEventListener("command", serach, false);
					popup.removeEventListener("popuphidden", closeSerach, false)
					popup.removeChild(MI1);
					popup.removeChild(MI2);
					popup.removeChild(MI3);
					popup.removeChild(MI4);
				}
			popup.addEventListener("command", serach, false)
			popup.addEventListener("popuphidden", closeSerach, false)
			popup.openPopup(null, null, event.screenX - 100, event.screenY + 20);

			var MI1 = popup.appendChild(document.createElement("menuitem"));
			MI1.setAttribute("label", "複製");
			MI1.setAttribute("accesskey", "C");
			MI1.setAttribute("command", "cmd_copy");

			var MI2 = popup.appendChild(document.createElement("menuitem"));
			MI2.setAttribute("label", "剪下");
			MI2.setAttribute("accesskey", "T");
			MI2.setAttribute("command", "cmd_cut");

			var MI3 = popup.appendChild(document.createElement("menuitem"));
			MI3.setAttribute("label", "貼上");
			MI3.setAttribute("accesskey", "V");
			MI3.setAttribute("command", "cmd_paste");

			var MI4 = popup.appendChild(document.createElement("menuitem"));
			MI4.setAttribute("label", "刪除");
			MI4.setAttribute("accesskey", "D");
			MI4.setAttribute("command", "cmd_delete");
		}
	}, 500)
}, false)
