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
		this.currentEngine = this.engines ? this.engines[1] : this._engines[1];
	};

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

	var SE = new Array();
	SE[0] = 'https://duckduckgo.com/?q=!ge ';
	SE[1] = 'https://translate.google.com.hk/?hl=zh-TW#auto/zh-TW/';
	SE[2] = 'https://encrypted.google.com/search?q=site:';
	SE[3] = 'https://duckduckgo.com/?q=!img ';
	SE[4] = 'https://duckduckgo.com/?q=!googlemaps ';
	SE[5] = 'https://duckduckgo.com/?q=!bd ';
	SE[6] = 'http://image.baidu.com/i?&cl=2&ie=utf-8&oe=utf-8&word=';
	SE[7] = 'https://duckduckgo.com/?q=!tieba ';
	SE[8] = 'https://hk.search.yahoo.com/search?p=';
	SE[9] = 'http://search.yahoo.co.jp/search?p=';
	SE[10] = 'https://duckduckgo.com/?q=!ytw ';

	var BaiduBtn = document.createElement("image");
	BaiduBtn.setAttribute("id", "Baidu-button");
	BaiduBtn.setAttribute("tooltiptext", "左鍵：百度\n中鍵：百度圖片\n右鍵：百度貼吧\n\n❖ 搜尋搜尋欄關鍵字\n❖ 搜尋選取文字\n❖ 貼上就搜尋\n❖ 新分頁前景");
	BaiduBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaWSy0sCURjF/XfuRugukha1CzeBCBKIFFFIBEGrCoRwE4EErlskoYW0EFy0iBAkCMFNBCGuKrqjNg6OgzOTjY+5nhbh3ehMrw/O8vud73E8hDL8Rx5CGf5ajoBCsQuvT0IubwIATk51xA/bsPkPAdFtBYQyLIXeUCpbYtybQtcd0Na+LHb2WiCUYTXaRC5vCsBdyXIG3D/0QCjD2qaCl9cB9g9UPFb66OgcuzEVmayBpmKjVLamAxJJTTg9PQ+mHm1+sQ5CGS4ujUlAJmuAUIaZOQkdnaNS7SMYlhGKyKjVh7B6I2EQi6uTAJsDV9fvqFT7YNIQsws10eAPNNDWODa2FHh9Eoq3H85faKk2/IHGRGCWV2RYvZH7Fzo6n9o8VmS9CcPkzoBUWv82umfnhjNgfEg3pdK6M8AwuUihP9DA0bGGRFJDMCyLYLmu8NsSgP/oExgMERjFwInkAAAAAElFTkSuQmCC)";
	BaiduBtn.setAttribute('onclick', "BaiduFunctions.onClick(event);");
	searchGoBtn.parentNode.insertBefore(BaiduBtn, searchGoBtn);

	BaiduFunctions = {
		onClick: function(event) {
			var selected = getBrowserSelection();
			var copied = readFromClipboard();
			event.preventDefault();
			switch(event.button) {
				case 0:
				if (searchbar.value == "") {
					if (selected) {var x = selected;}
					else {var x = copied;}
					gBrowser.selectedTab = gBrowser.addTab(SE[5] + encodeURIComponent(x));
					return;
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab(SE[5] + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
				break;
				case 1:
				if (searchbar.value == "") {
					if (selected) {var x = selected;}
					else {var x = copied;}
					gBrowser.selectedTab = gBrowser.addTab(SE[6] + encodeURIComponent(x));
					return;
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab(SE[6] + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
				break;
				case 2:
				if (searchbar.value == "") {
					if (selected) {var x = selected;}
					else {var x = copied;}
					gBrowser.selectedTab = gBrowser.addTab(SE[7] + encodeURIComponent(x));
					return;
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab(SE[7] + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
				break;
			}
		}
	};

	var YahooBtn = document.createElement("image");
	YahooBtn.setAttribute("id", "Yahoo-button");
	YahooBtn.setAttribute("tooltiptext", "左鍵：Yahoo! Hong Kong\n中鍵：Yahoo! JAPAN\n右鍵：Yahoo! Taiwan\n\n❖ 搜尋搜尋欄關鍵字\n❖ 搜尋選取文字\n❖ 貼上就搜尋\n❖ 新分頁前景");
	YahooBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADA0lEQVQ4jV2RS0xcZRiG3/l7zn9Ku4F127hyqUFnzthTGFJoGaZOmCmkHVqKMdq68EKRAGFahVKSUsCApoPdcDOOYoSZJk2KXVgSKaVNmhiN2jQYoxvZGRftmnlcIFPjl7z57pc3n8LqJKIuwupaC6vnnK8PDlRrqHIHtcpW1epqVbWGKl/R0P6Ius+G1fVgu6cTRZUlpo9o0BRx+ymHQ5PEzCgxM0qtuUKtuVL2D4cmaVCOBk0R0zhRZVGgS8T1GcdDN/nzt78BSDsFUs4Sze7XpNxFUs4Sx20RSvD7L3+R1k0aNUegSyjQMEkt0eZ8x4ev32NHTtu7nLKrnLKrtHt3y/GBN++RMasktUSgYRToMsnQIm1mjdfchzz64Q8Apt59RId3nw7vPhNv/ATA52Pf0+E8pM2s8WroKwJdRoEGnqRMkZPOCu3uOmfssyvOeOt07F5/5tt12t11TjorpEyBQANPdFAXN5vMPK3ON2Tst7R5d5gdfgxAfvxXPnnrZ0olmB1+TJu3QsbeocVZpsnMc1AXNxVVdqPJzJN2i7TaW5zwlsnsuc1/pVSCzJ7bnPCWabW3SLkFmsw8UWU3FFV2I26mSboLpG2BFq9Ia0WxzBtg7MyPtFbcoMUrkLYFku6XxM309gBf/ZsNJkfCmSdp8zR7edIVC5x+vri9fatE5rlF0hULNHt5kjZPwpmjwVzDV/+mIup/WmcmaHSuE3enSdgZjnkzJPfOAbC1VSK5d45j3iwJO0PcnabRuU6dmSCi/qfy1UdNaIR68zFHnBxH7TXiNkfcmypTiHtTxG2OozbHESdHvZmkJjSCrz4UUQ+BhqgxI8R2jVLnjFHvjtNckS9TaN79BfXuGHXOGLFdo9SYqwQaIqIeFFY3UV0g0ACBGSQwgxxyB0nsmyx/ILFvkkPOYDkfaJCoLhBWNwqrC1+9+OrDVx/RUC++6SX6P/imdzv3b52vXsLqQmF1so3za2GdP+frnQPVer/yBb1dtaN37BfVuf8lvXf2ZXU+2On7B+kzEw3V663qAAAAAElFTkSuQmCC)";
	YahooBtn.setAttribute('onclick', "YahooFunctions.onClick(event);");
	searchGoBtn.parentNode.insertBefore(YahooBtn, searchGoBtn);

	YahooFunctions = {
		onClick: function(event) {
			var selected = getBrowserSelection();
			var copied = readFromClipboard();
			event.preventDefault();
			switch(event.button) {
				case 0:
				if (searchbar.value == "") {
					if (selected) {var x = selected;}
					else {var x = copied;}
					gBrowser.selectedTab = gBrowser.addTab(SE[8] + encodeURIComponent(x));
					return;
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab(SE[8] + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
				break;
				case 1:
				if (searchbar.value == "") {
					if (selected) {var x = selected;}
					else {var x = copied;}
					gBrowser.selectedTab = gBrowser.addTab(SE[9] + encodeURIComponent(x) + "&ei=UTF-8");
					return;
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab(SE[9] + encodeURIComponent(searchbar.value) + "&ei=UTF-8");
					searchbar.value = "";
				}
				return;
				break;
				case 2:
				if (searchbar.value == "") {
					if (selected) {var x = selected;}
					else {var x = copied;}
					gBrowser.selectedTab = gBrowser.addTab(SE[10] + encodeURIComponent(x));
					return;
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab(SE[10] + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
				break;
			}
		}
	};

	var GoogleBtn = document.createElement("image");
	GoogleBtn.setAttribute("id", "Google-button");
	GoogleBtn.setAttribute("tooltiptext", "左鍵：Google 加密\n中鍵：Google 翻譯\n右鍵：Google 加密站內\n向上滾動：Google 地圖\n向下滾動：Google 圖片\n\n❖ 搜尋搜尋欄關鍵字\n❖ 搜尋選取文字\n❖ 貼上就搜尋\n❖ 新分頁前景");
	GoogleBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC)";
	GoogleBtn.setAttribute('onclick', "GoogleFunctions.onClick(event);");
	GoogleBtn.setAttribute("onDOMMouseScroll", "GoogleFunctions.onScroll(event);");
	searchGoBtn.parentNode.insertBefore(GoogleBtn, searchGoBtn);

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
					gBrowser.selectedTab = gBrowser.addTab(SE[0] + encodeURIComponent(x));
					return;
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab(SE[0] + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
				break;
				case 1:
				if (searchbar.value == "") {
					if (selected) {var x = selected;}
					else {var x = copied;}
					gBrowser.selectedTab = gBrowser.addTab(SE[1] + encodeURIComponent(x));
					return;
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab(SE[1] + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
				break;
				case 2:
				if (searchbar.value == "") {
					if (selected) {var x = selected;}
					else {var x = copied;}
					gBrowser.selectedTab = gBrowser.addTab(SE[2] + content.location.host + " " + encodeURIComponent(x));
					return;
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab(SE[2] + content.location.host + " " + encodeURIComponent(searchbar.value));
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
					gBrowser.selectedTab = gBrowser.addTab(SE[3] + encodeURIComponent(x));
					return;
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab(SE[3] + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
			}
			else {
				if (searchbar.value == "") {
					if (selected) {var x = selected;}
					else {var x = copied;}
					gBrowser.selectedTab = gBrowser.addTab(SE[4] + encodeURIComponent(x));
					return;
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab(SE[4] + encodeURIComponent(searchbar.value));
					searchbar.value = "";
				}
				return;
			}
			return;
		}
	};
}());
