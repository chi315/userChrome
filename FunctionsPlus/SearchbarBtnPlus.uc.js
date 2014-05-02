(function() {	
	var searchbar = document.getElementById("searchbar");
	//	允許鼠標滾輪切換搜索引擎
//	searchbar.addEventListener("DOMMouseScroll", function(event) {
//		this.selectEngine(event, (event.detail > 0));
//	}, true);
	//	自動清除搜索欄關鍵字並切換至默認搜索引擎
	searchbar._doSearchInternal = searchbar.doSearch;
	searchbar.doSearch = function(aData, aInNewTab) {
		this._doSearchInternal(aData, aInNewTab);
		//	清除搜索欄關鍵字
		this.value = "";
		//	重設至默認搜索引擎
//		this.currentEngine = this.engines ? this.engines[2] : this._engines[2];
	};

	var searchGoBtn = document.getAnonymousElementByAttribute(searchbar, "anonid", "search-go-button");
	searchGoBtn.setAttribute('onclick', 'if (event.button == 0) {handleSearchCommand(event);} else if(event.button == 1) {gBrowser.selectedTab = gBrowser.addTab("https://encrypted.google.com/search?q=" + encodeURIComponent(readFromClipboard()));}');
	searchGoBtn.setAttribute("onDOMMouseScroll", "GoScroll.onScroll(event);");
	searchGoBtn.setAttribute("tooltiptext","左鍵：搜尋\n中鍵：貼上就 Google 加密搜尋 (新分頁前景)\n右鍵：貼上就瀏覽 / 搜尋 (新分頁前景)\n向上滾動：貼上就瀏覽 (新分頁前景)\n向下滾動：貼上就 Google 加密站內搜尋 (新分頁前景)");
	searchGoBtn.addEventListener("click", function(event) {
		if (event.button == 2) {
			(/^\s*(?:(?:(?:ht|f)tps?:\/\/)?(?:(?:\w+?)(?:\.(?:[\w-]+?))*(?:\.(?:[a-zA-Z]{2,5}))|(?:(?:\d+)(?:\.\d+){3}))(?::\d{2,5})?(?:\/\S*|$)|data:(text|image)\/[\u0025-\u007a]+)\s*$/.test(readFromClipboard()) && (gBrowser.selectedTab = gBrowser.addTab(readFromClipboard()))) || searchbar.doSearch(readFromClipboard(), 'tab');
		}
		event.preventDefault();
	}, false);
	GoScroll = {
		onScroll: function(event) {
			if (event.detail > 0) {
			gBrowser.selectedTab = gBrowser.addTab("https://encrypted.google.com/search?q=site:" + content.location.host + " " + encodeURIComponent(readFromClipboard()));
			}
			else {
			gBrowser.selectedTab = gBrowser.addTab(readFromClipboard())
			}
			return;
		}
	};

	var searchInput = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-textbox");
	searchInput.setAttribute("onDOMMouseScroll", "FindScroll.onScroll(event);");
	searchInput.addEventListener('dblclick', function (event) {
		if (event.button == 0) {
			searchbar.value = "";
			gWHT.destroyToolbar();
//			gFindBar.close();
		}
		event.preventDefault();
	}, false);
	FindScroll = {
		onScroll: function(event) {
			if (event.detail > 0) {
			if (searchbar.value == "") {return;}
			gWHT.addWord(searchbar.value);
			gWHT.find(searchbar.value, false);
//			gFindBar._findField.value = searchbar.value;gFindBar.open();gFindBar.toggleHighlight(1);
//			gFindBar.onFindAgainCommand(false);
			}
			else {
			if (searchbar.value == "") {return;}
			gWHT.addWord(searchbar.value);
			gWHT.find(searchbar.value, true);
//			gFindBar._findField.value = searchbar.value;gFindBar.open();gFindBar.toggleHighlight(1);
//			gFindBar.onFindAgainCommand(true);
			}
			return;
		}
	};

	var searchbarEngineBtn = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-engine-button");
	searchbarEngineBtn.setAttribute("onDOMMouseScroll", "EngineScroll.onScroll(event);");
	searchbarEngineBtn.setAttribute("tooltiptext","左鍵：搜尋選單\n雙擊左鍵：重設至默認搜尋引擎\n中鍵：貼上就 Google 翻譯 (新分頁前景)\n滾動：切換搜索引擎\n右鍵：貼上就尋找 & WordHighlightToolbar高亮");
	searchbarEngineBtn.addEventListener("click", function(event) {
		if (event.button == 1) {
			gBrowser.selectedTab = gBrowser.addTab("http://translate.google.com.hk/?hl=zh-TW#auto/zh-TW/" + encodeURIComponent(readFromClipboard()));
		}
		else if (event.button == 2) {
			gFindBar._findField.value = readFromClipboard();gFindBar.open();gFindBar.toggleHighlight(1);
			gWHT.addWord(readFromClipboard());
		}
		event.preventDefault();
	}, false);
	searchbarEngineBtn.addEventListener('dblclick', function (event) {
		if (event.button == 0) {
			searchbar.currentEngine = searchbar.engines ? searchbar.engines[2] : searchbar._engines[2];
		}
		event.preventDefault();
	}, false);
	EngineScroll = {
		onScroll: function(event) {searchbar.selectEngine(event, (event.detail > 0));}
	};
}());
