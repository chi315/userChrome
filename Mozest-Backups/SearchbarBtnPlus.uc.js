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
//		this.currentEngine = this.engines ? this.engines[3] : this._engines[3];
	};

	var searchGoBtn = document.getAnonymousElementByAttribute(searchbar, "anonid", "search-go-button");
	var searchInput = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-textbox");

	var searchbarEngineBtn = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-engine-button");
	searchbarEngineBtn.setAttribute("onDOMMouseScroll", "EngineScroll.onScroll(event);");
	searchbarEngineBtn.setAttribute("tooltiptext","左鍵：搜尋選單\n雙擊左鍵：重設至默認搜尋引擎\n中鍵：貼上就瀏覽 (新分頁前景)\n滾動：切換搜索引擎\n右鍵：貼上就瀏覽 / 搜尋 (新分頁前景)");
	searchbarEngineBtn.addEventListener("click", function(event) {
		if (event.button == 1) {
			gBrowser.selectedTab = gBrowser.addTab(readFromClipboard());
		}
		else if (event.button == 2) {
			(/^\s*(?:(?:(?:ht|f)tps?:\/\/)?(?:(?:\w+?)(?:\.(?:[\w-]+?))*(?:\.(?:[a-zA-Z]{2,5}))|(?:(?:\d+)(?:\.\d+){3}))(?::\d{2,5})?(?:\/\S*|$)|data:(text|image)\/[\u0025-\u007a]+)\s*$/.test(readFromClipboard()) && (gBrowser.selectedTab = gBrowser.addTab(readFromClipboard()))) || searchbar.doSearch(readFromClipboard(), 'tab');
		}
		event.preventDefault();
	}, false);
	searchbarEngineBtn.addEventListener('dblclick', function (event) {
		if (event.button == 0) {
			searchbar.currentEngine = searchbar.engines ? searchbar.engines[3] : searchbar._engines[3];
		}
		event.preventDefault();
	}, false);
	EngineScroll = {
		onScroll: function(event) {searchbar.selectEngine(event, (event.detail > 0));}
	};

	var findMatchCase = document.createElement("checkbox");
	findMatchCase.id = "findMatchCase";
	findMatchCase.setAttribute("tooltiptext", "左鍵：符合大小寫\n中鍵：尋找搜尋欄關鍵字\n　　　貼上就尋找\n右鍵：關閉尋找欄及高亮顯示並清除關鍵字\n向上滾動：尋找上一筆\n向下滾動：尋找下一筆");
	findMatchCase.setAttribute("accesskey", "C");
	findMatchCase.setAttribute("oncommand", 'gFindBar._setCaseSensitivity(this.checked);document.getElementById("searchbar").focus();');
	findMatchCase.setAttribute('onclick', 'if (event.button == 2) {gFindBar.close();gFindBar.toggleHighlight(0);document.getElementById("searchbar").value="";event.preventDefault();}');
	findMatchCase.setAttribute("onDOMMouseScroll", "FindScroll.onScroll(event);");
	searchInput.appendChild(findMatchCase);

	findMatchCase.addEventListener("click", function(event) {
		if (event.button == 1) {
			if (searchbar.value == "") {
				gFindBar._findField.value = readFromClipboard();gFindBar.open();gFindBar.toggleHighlight(1);
				searchbar.value = readFromClipboard();
			}
			else {
				gFindBar._findField.value = searchbar.value;gFindBar.open();gFindBar.toggleHighlight(1);
			}
			return;
		event.preventDefault();
		}
	}, false);

	FindScroll = {
		onScroll: function(event) {
			if (event.detail > 0) {
				if (searchbar.value == "") {return;}
				gFindBar._findField.value = searchbar.value;gFindBar.open();gFindBar.toggleHighlight(1);
//				gFindBar._findField.value = searchbar.value;gFindBar.toggleHighlight(1);
				gFindBar.onFindAgainCommand(false);
			}
			else {
				if (searchbar.value == "") {return;}
				gFindBar._findField.value = searchbar.value;gFindBar.open();gFindBar.toggleHighlight(1);
//				gFindBar._findField.value = searchbar.value;gFindBar.toggleHighlight(1);
				gFindBar.onFindAgainCommand(true);
			}
			return;
		}
	};

	var gWHTFindBtn = document.createElement("toolbarbutton");
	gWHTFindBtn.setAttribute("id", "gWHTFind-button");
	gWHTFindBtn.setAttribute("type", "checkbox");
	gWHTFindBtn.setAttribute("class", "toolbarbutton-1");
	gWHTFindBtn.setAttribute("tooltiptext", "左鍵：啟用 / 禁用Word Highlight Toolbar\n右鍵：WordHighlightToolbar高亮搜尋欄關鍵字\n　　　貼上就WordHighlightToolbar高亮\n右鍵：關閉WordHighlightToolbar並清除關鍵字\n向上滾動：尋找上一筆\n向下滾動：尋找下一筆");
	gWHTFindBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAANUlEQVQ4jWNgGBTg6dOi/6RgrAb8/19PFB7EBlAUBoMDFD0t+k8qxjCgngQ4SA2gKAwGDAAAM3SE/usVkKQAAAAASUVORK5CYII=)";
	gWHTFindBtn.setAttribute("oncommand", 'gWHT.GET_KEYWORD = !gWHT.GET_KEYWORD');
	gWHTFindBtn.setAttribute('onclick', 'if (event.button == 2) {gWHT.destroyToolbar();document.getElementById("searchbar").value="";event.preventDefault();}');
	gWHTFindBtn.setAttribute("onDOMMouseScroll", "gWHTFindScroll.onScroll(event);");
	searchGoBtn.parentNode.insertBefore(gWHTFindBtn, searchGoBtn);

	gWHTFindBtn.addEventListener("click", function(event) {
		if (event.button == 1) {
			if (searchbar.value == "") {
				gWHT.addWord(readFromClipboard());
				searchbar.value = readFromClipboard();
			}
			else {
				gWHT.addWord(searchbar.value);
			}
			return;
		event.preventDefault();
		}
	}, false);

	gWHTFindScroll = {
		onScroll: function(event) {
			if (event.detail > 0) {
				if (searchbar.value == "") {return;}
				gWHT.addWord(searchbar.value);
				gWHT.find(searchbar.value, false);
			}
			else {
				if (searchbar.value == "") {return;}
				gWHT.addWord(searchbar.value);
				gWHT.find(searchbar.value, true);
			}
			return;
		}
	};

	var GoogleBtn = document.createElement("image");
	GoogleBtn.setAttribute("id", "Google-button");
	GoogleBtn.setAttribute("tooltiptext", "左鍵：Google 加密搜尋搜尋欄關鍵字\n　　　貼上就 Google 加密搜尋 (新分頁前景)\n中鍵：Google翻譯搜尋欄關鍵字\n　　　貼上就 Google 翻譯 (新分頁前景)\n右鍵：Google 加密站內搜尋搜尋欄關鍵字\n　　　貼上就 Google 加密站內搜尋 (新分頁前景)\n向上滾動：百度圖片搜尋搜尋欄關鍵字\n　　　　　貼上就百度圖片搜尋 (新分頁前景)\n向下滾動：Google 圖片搜尋搜尋欄關鍵字\n　　　　　貼上就 Google 圖片搜尋 (新分頁前景)");
	GoogleBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC)";
	GoogleBtn.setAttribute('onclick', "GoogleFunctions.onClick(event);");
	GoogleBtn.setAttribute("onDOMMouseScroll", "GoogleFunctions.onScroll(event);");
	searchGoBtn.parentNode.insertBefore(GoogleBtn, searchGoBtn);

	GoogleFunctions = {
		onClick: function(event) {
			switch(event.button) {
				case 0:
				if (searchbar.value == "") {
					gBrowser.selectedTab = gBrowser.addTab("https://encrypted.google.com/search?q=" + encodeURIComponent(readFromClipboard()));
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab("https://encrypted.google.com/search?q=" + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
				break;
				case 1:
				if (searchbar.value == "") {
					gBrowser.selectedTab = gBrowser.addTab("http://translate.google.com.hk/?hl=zh-TW#auto/zh-TW/" + encodeURIComponent(readFromClipboard()));
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab("http://translate.google.com.hk/?hl=zh-TW#auto/zh-TW/" + encodeURIComponent(searchbar.value))
					searchbar.value = "";
				}
				return;
				break;
				case 2:
				if (searchbar.value == "") {
					gBrowser.selectedTab = gBrowser.addTab("https://encrypted.google.com/search?q=site:" + content.location.host + " " + encodeURIComponent(readFromClipboard()));
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab("https://encrypted.google.com/search?q=site:" + content.location.host + " " + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
				break;
			}
		},

		onScroll: function(event) {
			if (event.detail > 0) {
				if (searchbar.value == "") {
					gBrowser.selectedTab = gBrowser.addTab("https://duckduckgo.com/?q=!img " + encodeURIComponent(readFromClipboard()));
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab("https://duckduckgo.com/?q=!img " + encodeURIComponent(searchbar.value))
					searchbar.value = "";
				}
				return;
			}
			else {
				if (searchbar.value == "") {
					gBrowser.selectedTab = gBrowser.addTab("http://image.baidu.com/i?&cl=2&ie=utf-8&oe=utf-8&word=" + encodeURIComponent(readFromClipboard()));
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab("http://image.baidu.com/i?&cl=2&ie=utf-8&oe=utf-8&word=" + encodeURIComponent(searchbar.value))
					searchbar.value = "";
				}
				return;
			}
			return;
		}
	};
}());
