// ==UserScript==
// @name           SearchbarBtnPlus.uc.js
// @homepageURL    https://github.com/Drager-oos/userChrome/blob/master/BtnPlus/SearchbarBtnPlus.uc.js
// ==/UserScript==

/****** 使用方法 ******
自動清除搜索欄關鍵字並切換至默認搜索引擎

searchbar-engine-button
在按鈕上
左鍵：搜尋選單
滾動：切換搜索引擎
中鍵：貼上就瀏覽 (新分頁背景)
右鍵：貼上就瀏覽 (新分頁前景)

在選單上
選擇指定搜索引擎後即搜尋
左鍵：新分頁前景
Ctrl + 左鍵：新分頁背景

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
		this.currentEngine = this.engines[1];
	};

	var searchPopup = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-popup");
		searchPopup.setAttribute("onclick", "if (event.button == 0) {SearchEngine.popupClick(event);} event.preventDefault(); event.stopPropagation();");
	var searchGoBtn = document.getAnonymousElementByAttribute(searchbar, "anonid", "search-go-button");
		searchGoBtn.setAttribute("tooltiptext", "左鍵：Google 加密\n中鍵：Google 翻譯\n右鍵：Google 加密站內\n向上滾動：百度圖片\n向下滾動：Google 圖片\n\n❖ 若搜索欄有關鍵字，便搜尋搜索欄關鍵字\n❖ 若搜索欄沒有關鍵字並選取了文字，便搜尋選取文字\n❖ 否則便貼上就搜尋\n❖ 新分頁前景");
		searchGoBtn.setAttribute("onclick", "if (event.ctrlKey) {handleSearchCommand(event);} else {SearchEngine.onClick(event); event.preventDefault(); event.stopPropagation();}");
		searchGoBtn.setAttribute("onDOMMouseScroll", "SearchEngine.onScroll(event);");
	var searchInput = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-textbox");

	var searchbarEngineBtn = document.getAnonymousElementByAttribute(searchbar, "anonid", "searchbar-engine-button");
		searchbarEngineBtn.setAttribute("onclick", "if (event.button == 1) {gBrowser.addTab(readFromClipboard());} else if (event.button == 2) {gBrowser.selectedTab = gBrowser.addTab(readFromClipboard()); event.preventDefault();}");
		searchbarEngineBtn.setAttribute("ondblclick", "if (event.button == 0) {Reset.onClick(event); event.preventDefault();}");
		searchbarEngineBtn.setAttribute("onDOMMouseScroll", "EngineScroll.onScroll(event);");
		searchbarEngineBtn.setAttribute("tooltiptext","在按鈕上\n左鍵：搜尋選單\n滾動：切換搜索引擎\n中鍵：貼上就瀏覽 (新分頁背景)\n右鍵：貼上就瀏覽 (新分頁前景)\n\n在選單上\n選擇指定搜索引擎後即搜尋\n左鍵：新分頁前景\nCtrl + 左鍵：新分頁背景\n\n❖ 若搜索欄有關鍵字，便搜尋搜索欄關鍵字\n❖ 若搜索欄沒有關鍵字並選取了文字，便搜尋選取文字\n❖ 否則便貼上就搜尋");
	EngineScroll = {
		onScroll: function(event) {searchbar.selectEngine(event, (event.detail > 0));}
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
		onDOMMouseScroll: "gWHTFindScroll.onScroll(event);",
	}), searchGoBtn);

	gWHTFindBtn.addEventListener("click", function(event) {
		if (event.button == 1) {
			gWHT.addWord(readFromClipboard());
			searchbar.value = readFromClipboard();
		}
		else if (event.button == 2) {
			gWHT.destroyToolbar();
			$('searchbar').value = '';
		}
		event.preventDefault();
	}, false);

	gWHTFindScroll = {
		onScroll: function(event) {
			if (searchbar.value == "") {
				gWHT.addWord(readFromClipboard());
				searchbar.value = readFromClipboard();
			}
			else {
				gWHT.addWord(searchbar.value);
				if (event.detail > 0) {
					gWHT.find(searchbar.value, false);
				}
				else {
					gWHT.find(searchbar.value, true);
				}
				return;
			}
		}
	};

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
				var text = searchbar.value || getBrowserSelection() || readFromClipboard();
				setTimeout(function(selectedEngine) {
					if (event.ctrlKey) {
						var open = 'tabshifted';
					}
					else {
						var open = 'tab';
					}
					searchbar.doSearch(text, open);
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
			var x = searchbar.value || getBrowserSelection() || readFromClipboard();
			searchbar.value = "";
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
			var x = searchbar.value || getBrowserSelection() || readFromClipboard();
			searchbar.value = "";
			if (event.detail > 0) {var n = 3;}
			else {var n = 4;}
			$ST(SE[n] + encodeURIComponent(x));
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
