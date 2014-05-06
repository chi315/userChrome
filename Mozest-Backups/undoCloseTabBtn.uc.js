location == "chrome://browser/content/browser.xul" && (function undoCloseTabBtn() {

	var newBtn = document.getElementById("TabsToolbar");
	var uCTBtn = document.createElement("toolbarbutton");
	uCTBtn.id = "undoclosetab-button";
	uCTBtn.setAttribute("label", "復原分頁按鈕");
	uCTBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
	uCTBtn.setAttribute("type", "menu");
	uCTBtn.setAttribute("context", "_child");
	uCTBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAmElEQVQ4jaXSIQ7CQBRF0SMqKlgAghAEEtFFIBEsAYFENGyBFSBYAYtDIhDIQVCSSdOh7fQm38zLu+L/IU39J+ulRphazhLE5YAlytxyPA/cUeWU23OZKggSFxojeWI2RFJghS1ueEfZfsg+2mx8FxpwTgliSRfHJjv9E/wkXSwawa5PkKLEy4gP1qbCNbcMB8xzywXW8cMHRHtGPjrrfUUAAAAASUVORK5CYII=)";
	uCTBtn.setAttribute("tooltiptext", "左鍵：復原分頁選單\n中鍵：復原已關閉分頁\n右鍵：清除復原分頁列表");
	newBtn.appendChild(uCTBtn);

	var popup = uCTBtn.appendChild(document.createElement("menupopup"));
	popup.setAttribute("onpopupshowing", "this.parentNode.populateUndoSubmenu();");
	popup.setAttribute("context", "");
	popup.setAttribute("tooltip", "bhTooltip");
	popup.setAttribute("popupsinherittooltip", "true");

	uCTBtn.populateUndoSubmenu = eval("(" + HistoryMenu.prototype.populateUndoSubmenu.toString().replace(/._rootElt.*/, "") + ")");
	uCTBtn.addEventListener("click", function(event) {
		if (event.button == 1) {
			document.getElementById('History:UndoCloseTab').doCommand();
		}
		else if (event.button == 2) {
			ClearUndoCloseTabList.setPref("browser.sessionstore.max_tabs_undo", "int", 0);
			ClearUndoCloseTabList.setPref("browser.sessionstore.max_tabs_undo", "int", 50);
		}
		event.preventDefault();
	}, false);

	var ClearUndoCloseTabList = {
		setPref: function(aPrefString, aPrefType, aValue) {
			var xpPref = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch2);
			try {
				switch (aPrefType) {
					case 'int':
					aValue = parseInt(aValue);
					return xpPref.setIntPref(aPrefString, aValue);  break;
				}
			} catch(e) {
			}
			return null;
		}
};
})();
