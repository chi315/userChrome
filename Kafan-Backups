(function() {
	var searchbar = $("searchbar");
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
		this.currentEngine = this.engines ? this.engines[1] : this._engines[1];
	};

	//	選擇指定搜索引擎後即搜尋 (如搜索欄有關鍵字便搜尋搜索欄關鍵字，否則貼上便搜尋 (新分頁前景))
	var searchPopup = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-popup");
	searchPopup.setAttribute("onclick", "event.preventDefault(); event.stopPropagation();");
	var EngineSearch = function() {
		setTimeout(function(selectedEngine) {
		if (searchbar.value == "") {
			var text = readFromClipboard();
		} else {
			var text = searchbar.value;
		}
		searchbar.doSearch(text, 'tab');
		return;
		searchPopup.querySelectorAll("#" + selectedEngine.id)[0].click();
		}, 10, searchPopup.querySelector("*[selected=true]"))
	}
	searchPopup.addEventListener("command", EngineSearch, false);

	var searchGoBtn = document.getAnonymousElementByAttribute(searchbar, "anonid", "search-go-button");
	var searchInput = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-textbox");

	var searchbarEngineBtn = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-engine-button");
	searchbarEngineBtn.setAttribute("onDOMMouseScroll", "EngineScroll.onScroll(event);");
	searchbarEngineBtn.setAttribute("tooltiptext","左鍵：搜尋選單\n雙擊左鍵：清除搜索欄關鍵字並重設至默認搜尋引擎\n中鍵：貼上就瀏覽 (新分頁前景)\n滾動：切換搜索引擎\n右鍵：貼上就瀏覽 / 搜尋 (新分頁前景)");
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
			searchbar.currentEngine = searchbar.engines ? searchbar.engines[1] : searchbar._engines[1];
			searchbar.value = "";
		}
		event.preventDefault();
	}, false);
	EngineScroll = {
		onScroll: function(event) {searchbar.selectEngine(event, (event.detail > 0));}
	};

	var findMatchCase = searchInput.appendChild($C("checkbox", {
		id: "findMatchCase",
		tooltiptext: "左鍵：符合大小寫\n中鍵：尋找搜尋欄關鍵字\n　　　貼上就尋找\n右鍵：關閉尋找欄及高亮顯示並清除關鍵字\n向上滾動：尋找上一筆\n向下滾動：尋找下一筆",
		oncommand: "gFindBar._setCaseSensitivity(this.checked); document.getElementById('searchbar').focus();",
		onclick: "if (event.button == 2) {gFindBar.close(); gFindBar.toggleHighlight(0); document.getElementById('searchbar').value=''; event.preventDefault();}",
		onDOMMouseScroll: "FindScroll.onScroll(event);",
	}));

	findMatchCase.addEventListener("click", function(event) {
		if (event.button == 1) {
			if (searchbar.value == "") {
				gFindBar._findField.value = readFromClipboard(); gFindBar.open(); gFindBar.toggleHighlight(1);
				searchbar.value = readFromClipboard();
			}
			else {
				gFindBar._findField.value = searchbar.value; gFindBar.open(); gFindBar.toggleHighlight(1);
			}
			return;
		event.preventDefault();
		}
	}, false);

	FindScroll = {
		onScroll: function(event) {
			if (event.detail > 0) {
				if (searchbar.value == "") {return;}
				gFindBar._findField.value = searchbar.value; gFindBar.open(); gFindBar.toggleHighlight(1);
//				gFindBar._findField.value = searchbar.value; gFindBar.toggleHighlight(1);
				gFindBar.onFindAgainCommand(false);
			}
			else {
				if (searchbar.value == "") {return;}
				gFindBar._findField.value = searchbar.value; gFindBar.open(); gFindBar.toggleHighlight(1);
//				gFindBar._findField.value = searchbar.value; gFindBar.toggleHighlight(1);
				gFindBar.onFindAgainCommand(true);
			}
			return;
		}
	};

	var gWHTFindBtn = searchGoBtn.parentNode.insertBefore($C("toolbarbutton", {
		id: "gWHTFind-button",
		type: "checkbox",
		class: "toolbarbutton-1",
		tooltiptext: "左鍵：啟用 / 禁用Word Highlight Toolbar\n右鍵：WordHighlightToolbar高亮搜尋欄關鍵字\n　　　貼上就WordHighlightToolbar高亮\n右鍵：關閉WordHighlightToolbar並清除關鍵字\n向上滾動：尋找上一筆\n向下滾動：尋找下一筆",
		style: "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAANUlEQVQ4jWNgGBTg6dOi/6RgrAb8/19PFB7EBlAUBoMDFD0t+k8qxjCgngQ4SA2gKAwGDAAAM3SE/usVkKQAAAAASUVORK5CYII=)",
		oncommand: "gWHT.GET_KEYWORD = !gWHT.GET_KEYWORD",
		onclick: "if (event.button == 2) {gWHT.destroyToolbar(); document.getElementById('searchbar').value=''; event.preventDefault();}",
		onDOMMouseScroll: "gWHTFindScroll.onScroll(event);",
	}), searchGoBtn);

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

	var SE = new Array();
	SE[0] = 'https://duckduckgo.com/?q=!ge ';
	SE[1] = 'https://duckduckgo.com/?q=!gt ';
	SE[2] = 'https://duckduckgo.com/?q=!ge site:';
	SE[3] = 'https://duckduckgo.com/?q=!img ';
	SE[4] = 'http://image.baidu.com/i?&cl=2&ie=utf-8&oe=utf-8&word=';

	var SearchBtn = searchGoBtn.parentNode.insertBefore($C("image", {
		id: "Search-button",
		tooltiptext: "左鍵：Google 加密\n中鍵：Google 翻譯\n右鍵：Google 加密站內\n向上滾動：百度圖片\n向下滾動：Google 圖片\n\n❖ 搜尋搜尋欄關鍵字\n❖ 搜尋選取文字\n❖ 貼上就搜尋\n❖ 新分頁前景",
		style: "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC)",
		onclick: "GoogleFunctions.onClick(event);",
		onDOMMouseScroll: "GoogleFunctions.onScroll(event);",
	}), searchGoBtn);

	GoogleFunctions = {
		onClick: function(event) {
			var selected = getBrowserSelection();
			var copied = readFromClipboard();
			event.preventDefault();
			switch(event.button) {
				case 0:
				if (searchbar.value == "") {
					if (selected) {var x = selected;}
					else {var x = copied;}
					$ST(SE[0] + encodeURIComponent(x));
					return;
				}
				else {
					$ST(SE[0] + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
				break;
				case 1:
				if (searchbar.value == "") {
					if (selected) {var x = selected;}
					else {var x = copied;}
					$ST(SE[1] + encodeURIComponent(x));
					return;
				}
				else {
					$ST(SE[1] + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
				break;
				case 2:
				if (searchbar.value == "") {
					if (selected) {var x = selected;}
					else {var x = copied;}
					$ST(SE[2] + content.location.host + " " + encodeURIComponent(x));
					return;
				}
				else {
					$ST(SE[2] + content.location.host + " " + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
				break;
			}
		},
		onScroll: function(event) {
			var selected = getBrowserSelection();
			var copied = readFromClipboard();
			if (event.detail > 0) {
				if (searchbar.value == "") {
					if (selected) {var x = selected;}
					else {var x = copied;}
					$ST(SE[3] + encodeURIComponent(x));
					return;
				}
				else {
					$ST(SE[3] + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
			}
			else {
				if (searchbar.value == "") {
					if (selected) {var x = selected;}
					else {var x = copied;}
					$ST(SE[4] + encodeURIComponent(x));
					return;
				}
				else {
					$ST(SE[4] + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
			}
			return;
		}
	};

	function $(id, doc) (doc || document).getElementById(id);
	function $ST(se) gBrowser.selectedTab = gBrowser.addTab(se);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
}());
