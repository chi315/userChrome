GESTURES = {
	'U': {
		name: '復原已關閉分頁',
		cmd: function() {
			undoCloseTab();
//			document.getElementById('History:UndoCloseTab').doCommand();
		}
	},
	'D': {
		name: '關閉分頁',
		cmd: function() {
			gBrowser.removeCurrentTab();
		}
	},
	'L': {
		name: '後退/上一頁',
		cmd: function() {
			var nav = gBrowser.webNavigation;
			if (nav.canGoBack) nav.goBack();
			else nextPage.next();
		}
	},
	'R': {
		name: '前進/下一頁',
		cmd: function() {
			var nav = gBrowser.webNavigation;
			if (nav.canGoForward) nav.goForward();
			else nextPage.next(true);
		}
	},
	'W-': {
		name: '後退 / 上一頁 / 尋找上一筆',
		cmd: function() {
			var txt = document.getElementById("searchbar").value;
			if (txt == "") {
				var nav = gBrowser.webNavigation;
				if (nav.canGoBack) nav.goBack();
				else nextPage.next();
			}
			else {
//				gFindBar.open();
				gFindBar.toggleHighlight(1);
				gFindBar.getElement('highlight').setAttribute("checked", "true");
//				gFindBar.getElement('highlight').setAttribute("checkState", "1");
				gFindBar._findField.value = txt;
//				gFindBar.onFindAgainCommand(true);
				gWHT.addWord(txt);
				gWHT.find(txt, true);
			}
			return;
		}
	},
	'W+': {
		name: '前進 / 下一頁 / 尋找下一筆',
		cmd: function() {
			var txt = document.getElementById("searchbar").value;
			if (txt == "") {
				var nav = gBrowser.webNavigation;
				if (nav.canGoForward) nav.goForward();
				else nextPage.next(true);
			}
			else {
//				gFindBar.open();
				gFindBar.toggleHighlight(1);
				gFindBar.getElement('highlight').setAttribute("checked", "true");
//				gFindBar.getElement('highlight').setAttribute("checkState", "1");
				gFindBar._findField.value = txt;
//				gFindBar.onFindAgainCommand(false);
				gWHT.addWord(txt);
				gWHT.find(txt, false);
			}
			return;
		}
	},
	'L<R': {
		name: '貼上 / UTF-8 / 清除搜索欄關鍵字',
		cmd: function() {
//			document.getElementById("charset.UTF-8").doCommand();
			var txt = document.getElementById("searchbar").value;
			if (txt == "") {
				var focused = document.commandDispatcher.focusedElement;
				if (focused) {goDoCommand("cmd_paste");}
				else {BrowserSetForcedCharacterSet("UTF-8");}
				return;
			}
			else {
				document.getElementById("searchbar").value = "";
				gFindBar._foundMatches.hidden = true;
				gFindBar._foundMatches.value = "";
			}
			return;
		}
	},
	'L>R': {
		name: '全選 & 複製頁面全部文字',
		cmd: function() {
			var focused = document.commandDispatcher.focusedElement;
//			document.getElementById("context-selectall").doCommand(); 全選
			goDoCommand("cmd_selectAll");
			if (focused) {goDoCommand("cmd_copy");}
			else {Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(content.document.documentElement.textContent);}
			return;
		}
	},
	'UD': {
		name: 'Snaplinks批量操作模式',
		cmd: function() {
			snapLinks.init();
		}
	},
	'DU': {
		name: '啟用 / 關閉自動翻頁',
		cmd: function() {
			uAutoPagerize.toggle();
		}
	},
	'LR': {
		name: '轉繁體',
		cmd: function() {
			document.getElementById("tongwen-context-text-tra-item").doCommand();
			document.getElementById("tongwen-context-clip-traditional-item").doCommand();
			document.getElementById("tongwen-context-traditional-item").doCommand();
		}
	},
	'RL': {
		name: '轉簡體',
		cmd: function() {
			document.getElementById("tongwen-context-text-sim-item").doCommand();
			document.getElementById("tongwen-context-clip-simplified-item").doCommand();
			document.getElementById("tongwen-context-simplified-item").doCommand();
		}
	},
	'UL': {
		name: 'Adblock Plus 條件偏好設定',
		cmd: function() {
			document.getElementById("abp-menuitem-filters").doCommand();
		}
	},
	'UR': {
		name: '清除復原分頁列表',
		cmd: function() {
			var Setting = "browser.sessionstore.max_tabs_undo";
			gPrefService.setIntPref(Setting, 0);
			gPrefService.setIntPref(Setting, 50);
		}
	},
	'DL': {
		name: '關閉其他分頁',
		cmd: function() {
			gBrowser.removeAllTabsBut(gBrowser.mCurrentTab);
		}
	},
	'DR': {
		name: '關閉重複分頁',
		cmd: function() {
			CloseRepeatedTabs();
		}
	},
	'LU': {
		name: '彈出搜索框(新分頁背景)',
		cmd: function(event) {
			var popup = document.getAnonymousElementByAttribute(document.querySelector("#searchbar").searchButton, "anonid", "searchbar-popup"),
				searchbar = document.getElementById("searchbar"),
				selected = getBrowserSelection();
			if (!searchbar.value == "") {
				var TXT = searchbar.value;
				searchbar.value = "";
			}
			else {
				if (selected) {var TXT = selected;}
				else {var TXT = readFromClipboard();}
			}
			var EngineSearch = function() {
				popup.removeEventListener("command", EngineSearch, false);
				popup.removeEventListener("popuphidden", closeSerach, false)
				setTimeout(function(selectedEngine) {
					BrowserSearch.loadSearch(TXT, true);
					popup.querySelectorAll("#" + selectedEngine.id)[0].click();
				}, 10, popup.querySelector("*[selected=true]"))
			}
			var closeSerach = function() {
				popup.removeEventListener("command", EngineSearch, false);
				popup.removeEventListener("popuphidden", closeSerach, false)
			}
			popup.addEventListener("command", EngineSearch, false)
			popup.addEventListener("popuphidden", closeSerach, false)
			popup.openPopup(null, null, 640, 369);
		}
	},
	'LD': {
		name: '彈出搜索框(新分頁前景)',
		cmd: function(event) {
			var popup = document.getAnonymousElementByAttribute(document.querySelector("#searchbar").searchButton, "anonid", "searchbar-popup"),
				searchbar = document.getElementById("searchbar"),
				selected = getBrowserSelection();
			if (!searchbar.value == "") {
				var TXT = searchbar.value;
				searchbar.value = "";
			}
			else {
				if (selected) {var TXT = selected;}
				else {var TXT = readFromClipboard();}
			}
			var EngineSearch = function() {
				popup.removeEventListener("command", EngineSearch, false);
				popup.removeEventListener("popuphidden", closeSerach, false)
				setTimeout(function(selectedEngine) {
					gBrowser.selectedTab = gBrowser.addTab();
					BrowserSearch.loadSearch(TXT, false);
					popup.querySelectorAll("#" + selectedEngine.id)[0].click();
				}, 10, popup.querySelector("*[selected=true]"))
			}
			var closeSerach = function() {
				popup.removeEventListener("command", EngineSearch, false);
				popup.removeEventListener("popuphidden", closeSerach, false)
			}
			popup.addEventListener("command", EngineSearch, false)
			popup.addEventListener("popuphidden", closeSerach, false)
			popup.openPopup(null, null, 640, 369);
		}
	},
	'RU': {
		name: '切換圖片顯示',
		cmd: function() {
			!/img, embed, object { visibility: hidden/.test(content.document.getElementsByTagName("head")[0].lastElementChild.innerHTML) ? content.document.getElementsByTagName("head")[0].appendChild(content.document.createElement("style")).innerHTML = "img, embed, object { visibility: hidden !important; }html * { background-image: none !important; }" : content.document.getElementsByTagName("head")[0].removeChild(content.document.getElementsByTagName("head")[0].lastElementChild);
		}
	},
	'RD': {
		name: '切換GIF動畫循環',
		cmd: function() {
			Array.forEach(content.document.querySelectorAll("img"), function (gif) {
				try {
					gif.QueryInterface(Ci.nsIImageLoadingContent).getRequest(Ci.nsIImageLoadingContent.CURRENT_REQUEST).image.animationMode ^= 1;
				} catch (e) {}
			})
		}
	},
	'ULU': {
		name: '',
		cmd: function() {
		}
	},
	'URU': {
		name: '啟用 / 停用DOM Inspector & Element Inspector(重新啟動瀏覽器)',
		cmd: function() {
			var { AddonManager } = Components.utils.import("resource://gre/modules/AddonManager.jsm", {});
			var AddonIDs = [
				'inspector@mozilla.org',
				'InspectElement@zbinlin',
				]
			for(n=0; n<AddonIDs.length; n++) {
			AddonManager.getAddonByID(AddonIDs[n], function(addon) {
				addon.userDisabled = addon.userDisabled ? false : true;
			});
			}
			Application.restart();
		}
	},
	'DLD': {
		name: '',
		cmd: function() {
		}
	},
	'DRD': {
		name: 'ScreenCapture',
		cmd: function() {
			var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);file.initWithPath("D:\\Program Files\\ScreenCapture\\screencapture.exe");file.launch();
		}
	},
	'UDU': {
		name: '暫時允許此頁面的所有物件',
		cmd: function() {
			noscriptOverlay.allowPage();
		}
	},
	'DUD': {
		name: '取消暫時許可',
		cmd: function() {
			noscriptOverlay.revokeTemp();
		}
	},
	'LRL': {
		name: '重新載入 & 頁面重置',
		cmd: function() {
			UCL.rebuild();
			USL.rebuild();
			ucjsMouseGestures.reload(true);
			addMenu.rebuild(true);
			uAutoPagerize.loadSetting(true);
			refererChanger.reload(true);
			KeyChanger.makeKeyset(true);
			FullZoom.reset(); setTimeout (function() {FullZoom.enlarge();}, 0);
		}
	},
	'RLR': {
		name: 'dTa 單鍵下載選擇器',
		cmd: function() {
			dTaTurboSelect.Toggle();
		}
	},
	'URDL': {
		name: '全螢幕 & 隱藏工具列',
		cmd: function() {
//			resizeTo(screen.availWidth, screen.availHeight, moveTo(0, 0)); 窗口適應屏幕
//			document.getElementById("View:FullScreen").doCommand(); 全螢幕
			BrowserFullScreen();
			FullScreen.setAutohide();
//			UCL.toggle('ToggleToolbar.css');
		}
	},
}
