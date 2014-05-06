(function() {
// ==UserScript==
// @name			NewTabPlus_mod
// @description		整合版標籤增強
// @include			chrome://browser/content/browser.xul
// @include			chrome://browser/content/bookmarks/bookmarksPanel.xul
// @include			chrome://browser/content/history/history-panel.xul
// @include			chrome://browser/content/places/places.xul
// ==/UserScript==

	// 新標籤打開:書籤、歷史、搜索欄
	try {
		eval('openLinkIn=' + openLinkIn.toString().
		replace('w.gBrowser.selectedTab.pinned', '(!w.isTabEmpty(w.gBrowser.selectedTab) || $&)').
		replace(/&&\s+w\.gBrowser\.currentURI\.host != uriObj\.host/, ''));
    } catch(e) {}

    // 地址欄新標籤打開
   try {
		location=="chrome://browser/content/browser.xul" && 
		eval("gURLBar.handleCommand="+gURLBar.handleCommand.toString().replace(/^\s*(load.+);/gm,
		"if(/^javascript:/.test(url)||isTabEmpty(gBrowser.selectedTab)) {loadCurrent();} else {this.handleRevert();gBrowser.loadOneTab(url, {postData: postData, inBackground: false, allowThirdPartyFixup: true});}"));
    } catch(e) {}

	// 主頁新標籤打開
    try {
        eval("BrowserGoHome = " + BrowserGoHome.toString().replace(
            /switch \(where\) {/, "where = (gBrowser.currentURI.spec!="
            +"'about:blank' || gBrowser.webProgress.isLoadingDocument"+
            ") ? 'tab' : 'current'; $&")); 
    } catch(e) {}

	// 滾輪切換標籤
	gBrowser.mTabContainer.addEventListener("DOMMouseScroll", function(event) {
		this.advanceSelectedTab(event.detail > 0 ? +1 : -1, true);
	}, true);
	
	// 標籤上雙擊刷新
	gBrowser.mTabContainer.addEventListener('dblclick', function (event) {
		if (event.target.localName == 'tab' && event.button == 0) {
			getBrowser().getBrowserForTab(event.target).reload();
		}
	}, false);
	
	// 右鍵關閉標籤頁
/*	gBrowser.mTabContainer.addEventListener("click", function(e) {
		if (e.target.localName == "tab" && e.button == 2 && !e.ctrlKey) {
			e.preventDefault();
			gBrowser.removeTab(e.target);
			e.stopPropagation();
		}
	}, false);
*/	
	// 鼠標停留標籤自動聚焦
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

	// 中鍵點擊書籤菜單不關閉
    try {
        eval('BookmarksEventHandler.onClick =' + BookmarksEventHandler.onClick.toString().replace('node.hidePopup()', ''));
        eval('checkForMiddleClick =' + checkForMiddleClick.toString().replace('closeMenus(event.target);', ''));
    } catch(e) {}
	
	// 展開資料夾和標籤
	eval("StarUI._doShowEditBookmarkPanel=" + StarUI._doShowEditBookmarkPanel.toString().replace(/}$/, "gEditItemOverlay.toggleFolderTreeVisibility();gEditItemOverlay.toggleTagsSelector();document.getElementById('editBMPanel_folderTree').style.cssText = 'min-height:222px!important'; $&"));
	
	// 自動關閉下載產生的空白標籤
	eval("gBrowser.mTabProgressListener = " + gBrowser.mTabProgressListener.toString().replace(/(?=var location)/, '\
      if (aWebProgress.DOMWindow.document.documentURI == "about:blank"\
          && aRequest.QueryInterface(nsIChannel).URI.spec != "about:blank") {\
        aWebProgress.DOMWindow.setTimeout(function() {\
          !aWebProgress.isLoadingDocument && aWebProgress.DOMWindow.close();\
        }, 100);\
      }\
    '));
})();
