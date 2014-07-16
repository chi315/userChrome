GESTURES = {
	'U': {
		name: '上一頁(後退) / 滾動到頁面頂部',
		cmd: function() {
			var nav = gBrowser.webNavigation;
			if (nav.canGoBack) {nav.goBack();}
			else {content.scrollTo(0, 0);}
		}
	},
	'D': {
		name: '下一頁(前進) / 滾動到頁面底部',
		cmd: function() {
			var nav = gBrowser.webNavigation;
			if (nav.canGoForward) {nav.goForward();}
			else {content.scrollTo(0, 1e10);}
		}
	},
	'L': {
		name: '上一頁',
		cmd: function(gestures, event) {
			var url = content.location.href;
			if (url.startsWith("file://")) {
				MGs.goNumericURL(-1);
			}
			else {
				var srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
					doc = srcNode.ownerDocument;
				var dispatchEvent = function (eventName) {
					var evt = doc.createEvent('HTMLEvents');
					evt.initEvent(eventName, true, false);
					doc.dispatchEvent(evt);
				};
				dispatchEvent('nextpage.back');
			}
		}
	},
	'R': {
		name: '下一頁',
		cmd: function(gestures, event) {
			var url = content.location.href;
			if (url.startsWith("file://")) {
				MGs.goNumericURL(+1);
			}
			else {
				var srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
					doc = srcNode.ownerDocument;
				var dispatchEvent = function (eventName) {
					var evt = doc.createEvent('HTMLEvents');
					evt.initEvent(eventName, true, false);
					doc.dispatchEvent(evt);
				};
				dispatchEvent('nextpage.go');
			}
		}
	},
	'W-': {
		name: '後退 / 上一頁 / 尋找上一筆',
		cmd: function(gestures, event) {
			var txt = document.getElementById("searchbar").value;
			if (txt == "") {
				var nav = gBrowser.webNavigation;
				var url = content.location.href;
				if (nav.canGoBack) {nav.goBack();}
				else if (url.startsWith("file://")) {
					MGs.goNumericURL(-1);
				}
				else {
					var srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
						doc = srcNode.ownerDocument;
					var dispatchEvent = function (eventName) {
						var evt = doc.createEvent('HTMLEvents');
						evt.initEvent(eventName, true, false);
						doc.dispatchEvent(evt);
					};
					dispatchEvent('nextpage.back');
				}
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
		cmd: function(gestures, event) {
			var txt = document.getElementById("searchbar").value;
			if (txt == "") {
				var nav = gBrowser.webNavigation;
				var url = content.location.href;
				if (nav.canGoForward) {nav.goForward();}
				else if (url.startsWith("file://")) {
					MGs.goNumericURL(+1);
				}
				else {
					var srcNode = window.FireGestures ? FireGestures.sourceNode : event.target,
						doc = srcNode.ownerDocument;
					var dispatchEvent = function (eventName) {
						var evt = doc.createEvent('HTMLEvents');
						evt.initEvent(eventName, true, false);
						doc.dispatchEvent(evt);
					};
					dispatchEvent('nextpage.go');
				}
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
				gFindBar.toggleHighlight(0);
				gFindBar.getElement('highlight').setAttribute("checked", "false");
//				gFindBar.getElement('highlight').setAttribute("checkState", "0");
				document.getElementById("searchbar").value = '';
				gFindBar._findField.value = '';
				gFindBar._foundMatches.hidden = true;
				gFindBar._foundMatches.value = '';
				gWHT.destroyToolbar();
			}
			return;
		}
	},
	'L>R': {
		name: '全選 & 複製頁面全部文字',
		cmd: function() {
			var focused = document.commandDispatcher.focusedElement;
//			document.getElementById("context-selectall").doCommand();
			goDoCommand("cmd_selectAll");
			if (focused) {goDoCommand("cmd_copy");}
			else {Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(content.document.documentElement.textContent);}
			return;
		}
	},
	'UD': {
		name: '跳過緩存重新載入此分頁',
		cmd: function() {
			BrowserReloadSkipCache();
		}
	},
	'DU': {
		name: '停止載入此分頁 & 切換油猴腳本、用戶樣式及UC腳本管理器顯示',
		cmd: function() {
			BrowserStop();
			UCL.toggleUI(1);
			USL.toggleUI(1);
			userChromejs.toggleUI(1);
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
//彈出搜索框(新分頁前景)			document.getAnonymousElementByAttribute(document.querySelector('#searchbar').searchButton, 'anonid', 'searchbar-popup').openPopup(null, null, 640, 369);
		}
	},
	'UL': {
		name: '啟用 / 停用 dTa 單鍵下載選擇器',
		cmd: function() {
			dTaTurboSelect.Toggle();
		}
	},
	'UR': {
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
	'DL': {
		name: '啟用 / 停用自動翻頁',
		cmd: function() {
			uAutoPagerize.toggle();
		}
	},
	'DR': {
		name: 'Snaplinks 批量操作模式',
		cmd: function() {
			snapLinks.init();
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
	'LU': {
		name: '暫時允許此頁面的所有物件',
		cmd: function() {
			noscriptOverlay.allowPage();
		}
	},
	'LD': {
		name: '取消暫時許可',
		cmd: function() {
			noscriptOverlay.revokeTemp();
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
	'RULD': {
		name: 'ScreenCapture',
		cmd: function() {
			var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);file.initWithPath("D:\\Program Files\\ScreenCapture\\screencapture.exe");file.launch();
		}
	},
}
