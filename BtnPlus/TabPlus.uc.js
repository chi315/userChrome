(function() {
// ==UserScript==
// @name			NewTabPlus_mod
// @description		整合版分頁增強
// @include			chrome://browser/content/browser.xul
// @include			chrome://browser/content/bookmarks/bookmarksPanel.xul
// @include			chrome://browser/content/history/history-panel.xul
// @include			chrome://browser/content/places/places.xul
// ==/UserScript==

	// 新分頁打開：書籤、歷史、搜索欄
	try {
		eval('openLinkIn=' + openLinkIn.toString().
		replace('w.gBrowser.selectedTab.pinned', '(!w.isTabEmpty(w.gBrowser.selectedTab) || $&)').
		replace(/&&\s+w\.gBrowser\.currentURI\.host != uriObj\.host/, ''));
	} catch(e) {}

	// 地址欄新分頁前景打開 (inBackground: true 背景)
	try {
		eval("gURLBar.handleCommand="+gURLBar.handleCommand.toString().replace(/^\s*(load.+);/gm,
		"if(/^javascript:/.test(url)||isTabEmpty(gBrowser.selectedTab)) {loadCurrent();} else {this.handleRevert();gBrowser.loadOneTab(url, {postData: postData, inBackground: false, allowThirdPartyFixup: true});}"));
	} catch(e) {}

	// 滾輪：切換分頁
	gBrowser.mTabContainer.addEventListener("DOMMouseScroll", function(e) {
		this.advanceSelectedTab(e.detail > 0 ? +1 : -1, true);
	}, true);
	
	// 雙擊左鍵：重新載入
	gBrowser.mTabContainer.addEventListener('dblclick', function (e) {
		if (e.target.localName == 'tab' && e.button == 0) {
			getBrowser().getBrowserForTab(e.target).reload();
		}
	}, false);

	// 右鍵：復原已關閉分頁
	gBrowser.mTabContainer.addEventListener("click", function(e) {
		if (e.target.localName == "tab" && e.button == 2) {
			undoCloseTab();
			e.preventDefault();
			e.stopPropagation();
		}
	}, false);

	// 鼠標停留分頁自動聚焦
	(document.getElementById("tabbrowser-tabs") || gBrowser.mTabBox).addEventListener('mouseover',
	function self(e) {
		if ((self.target = e.target).localName === 'tab') {
			if (!self.timeoutID) {
				this.addEventListener('mouseout',
				function() {
					clearTimeout(self.timeoutID);
				},
				false);
			}
			self.timeoutID = setTimeout(function() {
				gBrowser.selectedTab = self.target;
			},
			200);
		}
	},
	false);

	// 點擊頁面恢復原來的地址
	gBrowser.addEventListener("DOMWindowCreated", function () {
		window.content.document.addEventListener("click", function (e) {
			document.getElementById("urlbar").handleRevert();
		}, false);
	}, false);

	// 中鍵點擊書籤選單不關閉
	try {
		eval('BookmarksEventHandler.onClick =' + BookmarksEventHandler.onClick.toString().replace('node.hidePopup()', ''));
		eval('checkForMiddleClick =' + checkForMiddleClick.toString().replace('closeMenus(event.target);', ''));
	} catch(e) {}
	
	// 自動關閉下載產生的空白分頁
	eval("gBrowser.mTabProgressListener = " + gBrowser.mTabProgressListener.toString().replace(/(?=var location)/, '\
      if (aWebProgress.DOMWindow.document.documentURI == "about:blank"\
          && aRequest.QueryInterface(nsIChannel).URI.spec != "about:blank") {\
        aWebProgress.DOMWindow.setTimeout(function() {\
          !aWebProgress.isLoadingDocument && aWebProgress.DOMWindow.close();\
        }, 100);\
      }\
	'));
})();
