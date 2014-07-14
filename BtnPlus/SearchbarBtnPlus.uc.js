// ==UserScript==
// @name           SearchbarBtnPlus.uc.js
// @homepageURL    https://github.com/Drager-oos/userChrome/blob/master/BtnPlus/SearchbarBtnPlus.uc.js
// ==/UserScript==

/****** 使用方法 ******
自動清除搜索欄關鍵字並切換至默認搜索引擎

searchbar-engine-button
在按鈕上
左鍵：搜尋選單
雙擊左鍵：重設至默認搜索引擎
滾動：切換搜索引擎
中鍵：貼上就瀏覽 (新分頁背景)
右鍵：貼上就瀏覽 (新分頁前景)

在選單上
選擇指定搜索引擎後即搜尋 (新分頁前景)
❖ 若搜索欄有關鍵字，便搜尋搜索欄關鍵字
❖ 若搜索欄沒有關鍵字並選取了文字，便搜尋選取文字
❖ 否則便貼上就搜尋

findMatchCase
左鍵：符合大小寫
中鍵：貼上到尋找欄和搜索欄
右鍵：關閉尋找欄及高亮顯示並清除關鍵字
向上滾動：尋找上一筆
向下滾動：尋找下一筆

gWHTFind-button
左鍵：啟用 / 禁用搜索高亮工具例
中鍵：貼上到搜索欄並高亮
右鍵：關閉高亮工具例並清除關鍵字
向上滾動：尋找上一筆
向下滾動：尋找下一筆

SearchEngine-button
左鍵：Google 加密
中鍵：Google 翻譯
右鍵：Google 加密站內
向上滾動：百度圖片
向下滾動：Google 圖片

❖ 若搜索欄有關鍵字，便搜尋搜索欄關鍵字
❖ 若搜索欄沒有關鍵字並選取了文字，便搜尋選取文字
❖ 否則便貼上就搜尋
❖ 新分頁前景
 **** 結束說明 ****/

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

	var searchPopup = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-popup");
	searchPopup.setAttribute("onclick", "if (event.button == 0) {SearchEngine.popupClick(event);} event.preventDefault(); event.stopPropagation();");
	var searchGoBtn = document.getAnonymousElementByAttribute(searchbar, "anonid", "search-go-button");
	var searchInput = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-textbox");

	var searchbarEngineBtn = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-engine-button");
	searchbarEngineBtn.setAttribute("onclick", "if (event.button == 1) {gBrowser.addTab(readFromClipboard());} else if (event.button == 2) {gBrowser.selectedTab = gBrowser.addTab(readFromClipboard()); event.preventDefault();}");
	searchbarEngineBtn.setAttribute("ondblclick", "if (event.button == 0) {Reset.onClick(event); event.preventDefault();}");
	searchbarEngineBtn.setAttribute("onDOMMouseScroll", "EngineScroll.onScroll(event);");
	searchbarEngineBtn.setAttribute("tooltiptext","在按鈕上\n左鍵：搜尋選單\n雙擊左鍵：清除搜索欄關鍵字\n　　　　　重設至默認搜索引擎\n滾動：切換搜索引擎\n中鍵：貼上就瀏覽 (新分頁背景)\n右鍵：貼上就瀏覽 (新分頁前景)\n\n在選單上\n選擇指定搜索引擎後即搜尋 (新分頁前景)\n❖ 若搜索欄有關鍵字，便搜尋搜索欄關鍵字\n❖ 若搜索欄沒有關鍵字並選取了文字，便搜尋選取文字\n❖ 否則便貼上就搜尋");
	EngineScroll = {
		onScroll: function(event) {searchbar.selectEngine(event, (event.detail > 0));}
	};
	Reset = {
		onClick: function(event) {
			searchbar.value = "";
			searchbar.currentEngine = searchbar.engines ? searchbar.engines[1] : searchbar._engines[1];
		}
	};

	var findMatchCase = searchInput.appendChild($C("checkbox", {
		id: "findMatchCase",
		tooltiptext: "左鍵：符合大小寫\n中鍵：貼上到尋找欄和搜索欄\n右鍵：關閉尋找欄及高亮顯示並清除關鍵字\n向上滾動：尋找上一筆\n向下滾動：尋找下一筆",
		oncommand: "gFindBar._setCaseSensitivity(this.checked); document.getElementById('searchbar').focus();",
		onDOMMouseScroll: "FindScroll.onScroll(event);",
	}));

	findMatchCase.addEventListener("click", function(event) {
		if (event.button == 1) {
			gFindBar._findField.value = readFromClipboard();
			searchbar.value = readFromClipboard();
		}
		else if (event.button == 2) {
			gFindBar.close();
			gFindBar.toggleHighlight(0);
			gFindBar.getElement('highlight').setAttribute("checked", "false");
//			gFindBar.getElement('highlight').setAttribute("checkState", "0");
			gFindBar._findField.value = '';
			$('searchbar').value = '';
			gFindBar._foundMatches.hidden = true;
			gFindBar._foundMatches.value = '';
		}
		event.preventDefault();
	}, false);

	FindScroll = {
		onScroll: function(event) {
			if (searchbar.value == "") {
				gFindBar._findField.value = readFromClipboard();
				searchbar.value = readFromClipboard();
			}
			else {
//				gFindBar.open();
				gFindBar.toggleHighlight(1);
				gFindBar.getElement('highlight').setAttribute("checked", "true");
//				gFindBar.getElement('highlight').setAttribute("checkState", "1");
				gFindBar._findField.value = searchbar.value;
				if (event.detail > 0) {
					gFindBar.onFindAgainCommand(false);
				}
				else {
					gFindBar.onFindAgainCommand(true);
				}
			}
			return;
		}
	};

	var gWHTFindBtn = searchGoBtn.parentNode.insertBefore($C("toolbarbutton", {
		id: "gWHTFind-button",
		type: "checkbox",
		class: "toolbarbutton-1",
		tooltiptext: "左鍵：啟用 / 禁用搜索高亮工具例\n中鍵：貼上到搜索欄並高亮\n右鍵：關閉高亮工具例並清除關鍵字\n向上滾動：尋找上一筆\n向下滾動：尋找下一筆",
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

	var SearchEngineBtn = searchGoBtn.parentNode.insertBefore($C("image", {
		id: "SearchEngine-button",
		tooltiptext: "左鍵：Google 加密\n中鍵：Google 翻譯\n右鍵：Google 加密站內\n向上滾動：百度圖片\n向下滾動：Google 圖片\n\n❖ 若搜索欄有關鍵字，便搜尋搜索欄關鍵字\n❖ 若搜索欄沒有關鍵字並選取了文字，便搜尋選取文字\n❖ 否則便貼上就搜尋\n❖ 新分頁前景",
		style: "list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACo0lEQVQ4jY3Mz2vTcBgG8FdnallK3VKW/mAuLLD1B8OlI23arW22NGWHUNMcwkAHybZT0a21uq60PWQDxzwNetCL9KJ40FvBg55E/wTR01BBEMSDB0Xc6vZ6Sike5r7wuTzf530AAMCyrPP1ev2apmlPFUV5eRpN0540m80CAJwD+9g0zcfhcBhDoRCGw+FThUIhjEQiaJpmCwAAGo2GHgwGcWJiomdqaupYFMWPkiS9TSaTP/r/bJFIBGu1mgT5fP4Ry7Jok2X51dbW1rSu6wOtVuuiZVkuwzBucRz3q7/HsiwqirIPkiR1GIZBhmFwfn7+tWVZg2tra9VMJvNZEISfuVzuRbPZDBaLxcLk5OSx3WUYBmVZboMoip1AIIDj4+Mn1WqVX11dvT06OoqBQKAnHo9/2tvbuyRJ0vP+fGFhoQ2pVKrj9XpxZmbmi67rA/F4/MDr9WI/mqZxeXn5uq7rN2ma7uXpdLoNyblkh6Io5DjuQNf1gWg0+o2iKPyXqqo3TNM0+7NUKtWGRCLRcbvdyLLs793dXU86nX7mdruxn9/v725sbEwtLi7u9+eJRKINsVisQ5IkkiSJ+Xx+u9FoXOY47p3L5UKSJNHn8x0pinIHAM4LgvDe7pIkiYIgtIHn+Y7T6USn04kjIyNHhmGsWJY1aBjGVVVVV0qlUtCyrAsAAOvr69Msy361+70Bh8OBNpIkT3ief6Oqam1paakoy/IDnuc/lMvlJABAuVzm/H7/ocPhwFgs1oZMJvOQIAj8n7Gxse+bm5tzOzs7MZ/Pd0gQBIqieA8qlUrW5XKdnGXE4/F0aZruEgSBw8PDfyqVShQAADRN2x4aGjo+ywhBEEhRVLdQKJSg/9VqtVg2m707Ozt7/zS5XG67Xq9fse/+AnDURgQylYErAAAAAElFTkSuQmCC); margin-right: 1px;",
		onclick: "SearchEngine.onClick(event);",
		onDOMMouseScroll: "SearchEngine.onScroll(event);",
	}), searchGoBtn);

	var SE = new Array();
	SE[0] = 'https://duckduckgo.com/?q=!ge ';
	SE[1] = 'https://duckduckgo.com/?q=!gt ';
	SE[2] = 'https://duckduckgo.com/?q=!ge site:';
	SE[3] = 'https://duckduckgo.com/?q=!img ';
	SE[4] = 'http://image.baidu.com/i?&cl=2&ie=utf-8&oe=utf-8&word=';

	SearchEngine = {
		popupClick: function(event) {
			var EngineSearch = function() {
				searchPopup.removeEventListener("command", EngineSearch, false);
				searchPopup.removeEventListener("popuphidden", closeES, false)
				var selected = getBrowserSelection();
				if (!searchbar.value == "") {
					var text = searchbar.value;
					searchbar.value = "";
				}
				else {
					if (selected) {var text = selected;}
					else {var text = readFromClipboard();}
				}
				setTimeout(function(selectedEngine) {
					searchbar.doSearch(text, 'tab');
//					searchbar.doSearch(text, 'tabshifted');
//					searchPopup.querySelectorAll("#" + selectedEngine.id)[0].click();
				}, 10, searchPopup.querySelector("*[selected=true]"))
			}
			var closeES = function() {
				searchPopup.removeEventListener("command", EngineSearch, false);
				searchPopup.removeEventListener("popuphidden", closeES, false)
			}
			searchPopup.addEventListener("command", EngineSearch, false)
			searchPopup.addEventListener("popuphidden", closeES, false)
		},
		onClick: function(event) {
			var selected = getBrowserSelection();
			var copied = readFromClipboard();
			if (!searchbar.value == "") {
				var x = searchbar.value;
				searchbar.value = "";
			}
			else {
				if (selected) {var x = selected;}
				else {var x = copied;}
			}
			event.preventDefault();
			switch(event.button) {
				case 0:
					$ST(SE[0] + encodeURIComponent(x));
				break;
				case 1:
					$ST(SE[1] + encodeURIComponent(x));
				break;
				case 2:
					$ST(SE[2] + content.location.host + " " + encodeURIComponent(x));
				break;
			}
		},
		onScroll: function(event) {
			var selected = getBrowserSelection();
			var copied = readFromClipboard();
			if (!searchbar.value == "") {
				var x = searchbar.value;
				searchbar.value = "";
			}
			else {
				if (selected) {var x = selected;}
				else {var x = copied;}
			}
			if (event.detail > 0) {
				$ST(SE[3] + encodeURIComponent(x));
			}
			else {
				$ST(SE[4] + encodeURIComponent(x));
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
