{
	label: "選取文字",
	tooltiptext: "左鍵：Google 加密站內搜尋 (新分頁前景)\n中鍵：Google 翻譯 (新分頁前景)\n右鍵：尋找 & WordHighlightToolbar高亮關鍵字",
	onclick: function(e) {
		switch(e.button) {
			case 0:
				gBrowser.selectedTab = gBrowser.addTab('https://encrypted.google.com/search?q=site:' + content.location.host + ' ' + encodeURIComponent(getBrowserSelection()));
			break;
			case 1:
				gBrowser.selectedTab = gBrowser.addTab("http://translate.google.com.hk/?hl=zh-TW#auto/zh-TW/" + encodeURIComponent(getBrowserSelection()));
			break;
			case 2:
				gFindBar.open();
				gFindBar.toggleHighlight(1);
				gFindBar._findField.value = getBrowserSelection();
				gWHT.addWord(getBrowserSelection());
			break;
		}
	},
	condition:'select'
},
OR
{
	label: "選取文字",
	tooltiptext: "左鍵：Google 加密站內搜尋 (新分頁前景)\n中鍵：Google 翻譯 (新分頁前景)\n右鍵：尋找 & WordHighlightToolbar高亮關鍵字",
	onclick: function(e) {
		var sel = addMenu.convertText("%s");
		var host = addMenu.convertText("%h");
		switch(e.button) {
			case 0:
				gBrowser.selectedTab = gBrowser.addTab('https://encrypted.google.com/search?q=site:' + host + ' ' + sel);
			break;
			case 1:
				gBrowser.selectedTab = gBrowser.addTab("http://translate.google.com.hk/?hl=zh-TW#auto/zh-TW/" + sel);
			break;
			case 2:
				gFindBar.open();
				gFindBar.toggleHighlight(1);
				gFindBar._findField.value = sel;
				gWHT.addWord(sel);
			break;
		}
	},
	condition:'select'
},

{
	label: "剪貼簿中的文字",
	tooltiptext: "左鍵：Google 加密搜尋 (新分頁前景)\n中鍵：Google 翻譯 (新分頁前景)\n右鍵：尋找 & WordHighlightToolbar高亮關鍵字",
	onclick: function(e) {
		switch(e.button) {
			case 0:
				gBrowser.selectedTab = gBrowser.addTab("https://encrypted.google.com/search?q=" + encodeURIComponent(readFromClipboard()));
			break;
			case 1:
				gBrowser.selectedTab = gBrowser.addTab("http://translate.google.com.hk/?hl=zh-TW#auto/zh-TW/" + encodeURIComponent(readFromClipboard()));
			break;
			case 2:
				gFindBar.open();
				gFindBar.toggleHighlight(1);
				gFindBar._findField.value = readFromClipboard();
				gWHT.addWord(readFromClipboard());
			break;
		}
	},
	accesskey: "C"
},
OR
{
	label: "剪貼簿中的文字",
	tooltiptext: "左鍵：Google 加密搜尋 (新分頁前景)\n中鍵：Google 翻譯 (新分頁前景)\n右鍵：尋找 & WordHighlightToolbar高亮關鍵字",
	onclick: function(e) {
		var clipboard = addMenu.convertText("%p");
		switch(e.button) {
			case 0:
				gBrowser.selectedTab = gBrowser.addTab("https://encrypted.google.com/search?q=" + clipboard);
			break;
			case 1:
				gBrowser.selectedTab = gBrowser.addTab("http://translate.google.com.hk/?hl=zh-TW#auto/zh-TW/" + clipboard);
			break;
			case 2:
				gFindBar.open();
				gFindBar.toggleHighlight(1);
				gFindBar._findField.value = clipboard;
				gWHT.addWord(clipboard);
			break;
		}
	},
	accesskey: "C"
},

{	
	label: "彈出輸入框",
	tooltiptext: "左鍵：Google 加密站內搜尋\n中鍵：Google 翻譯\n右鍵：尋找 & WordHighlightToolbar高亮關鍵字",
	onclick: function(e) {
		switch(e.button) {
			case 0:
				var _document=document.commandDispatcher.focusedWindow.document;
				var p=prompt('請輸入想要在當前域內搜尋的關鍵字('+_document.location.hostname+'):','');
					if(p)_document.location.href='https://encrypted.google.com/search?q=site:'+_document.location.href.split('/')[2]+' '+encodeURIComponent(p);
			break;
			case 1:
				var _document=document.commandDispatcher.focusedWindow.document;
				var p=prompt('請輸入想要翻譯的關鍵字:','');
					if(p)_document.location.href='http://translate.google.com.hk/?hl=zh-TW#auto/zh-TW/'+encodeURIComponent(p);
			break;
			case 2:
				var p=prompt('請輸入想要尋找 & 高亮的關鍵字( 當前網頁 ):','');
					gFindBar.open();
					gFindBar.toggleHighlight(1);
					if(p)	window.gFindBar._findField.value = (p);
					if(p)	window.gWHT.addWord(p);
			break;
		}
	},
	accesskey: "I"
},

{
	label: '翻譯當前網頁',
	tooltiptext: "左鍵：Google 翻譯\n中鍵：Bing Translator\n右鍵：有道翻譯",
	onclick: function(e) {
		switch(e.button) {
			case 0:
				gBrowser.loadURI("javascript:{d=document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','http://translate.google.hk/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function%20googleTranslateElementInit(){new%20google.translate.TranslateElement({pageLanguage:%22%22},%22google_translate_element%22);}';p.setAttribute('type','text/javascript');b.appendChild(p);}void%200")
			break;
			case 1:
				gBrowser.loadURI("javascript:(function(){var%20s%20=%20document.createElement('script');%20s.type%20=%20'text/javascript';%20s.src%20=%20'http://labs.microsofttranslator.com/bookmarklet/default.aspx?f=js&to=zh-chs';%20document.body.insertBefore(s,%20document.body.firstChild);})()")
			break;
			case 2:
				gBrowser.loadURI("javascript:%20void((function()%20{var%20element%20=%20document.createElement('script');element.id%20=%20'outfox_seed_js';element.charset%20=%20'utf-8',element.setAttribute('src',%20'http://fanyi.youdao.com/web2/seed.js?'%20+%20Date.parse(new%20Date()));document.body.appendChild(element);})())")
			break;
		}
	},
	accesskey: "T"
},

{
	label: "清除最近的歷史記錄",
	tooltiptext: "左鍵：清除最近的歷史記錄\n中鍵：收藏庫\n右鍵：錯誤主控台",
	onclick: function(e) {
		switch(e.button) {
			case 0:
				gBrowser.selectedTab = gBrowser.addTab('chrome://browser/content/sanitize.xul');
			break;
			case 1:
				gBrowser.selectedTab = gBrowser.addTab("chrome://browser/content/places/places.xul");
			break;
			case 2:
				gBrowser.selectedTab = gBrowser.addTab("chrome://global/content/console.xul");
			break;
		}
	},
},

{
	label: "URL數字",
	tooltiptext: "左鍵：URL中的數字遞增\n右鍵：URL中的數字遞減",
	onclick: function(e) {
		switch(e.button) {
			case 0:
				loadURI(content.location.href.replace(/(\d+)(?=\D*$)/, function($0) {return +$0 + 1}));
			break;
			case 2:
				loadURI(content.location.href.replace(/(\d+)(?=\D*$)/, function($0) {return +$0 - 1 > 0 ? +$0 - 1 : 0;}));
			break;
		}
	},
},

{
	label: "上 / 下一頁",
	tooltiptext: "左鍵：跟蹤下一鏈接\n右鍵：跟蹤上一鏈接",
	onclick: function(e) {
		switch(e.button) {
			case 0:
				var document = window._content.document;
				var links = document.links;
				for(i = 0; i < links.length; i++) {
				if ((links[i].text == '下一頁') ||(links[i].text == '下一页') ||(links[i].text == '下一页>')||(links[i].text == '下一页 »') ||(links[i].text == '下一页>>') || (links[i].text == '[下一页]') || (links[i].text == '【下一页】') ||(links[i].text == 'Next') || (links[i].text == 'next') || (links[i].text == '››') || (links[i].text == '>')) document.location = links[i].href;
				}
			break;
			case 2:
				var document = window._content.document;
				var links = document.links;
				for(i = 0; i < links.length; i++) {
				if ((links[i].text == '上一頁') ||(links[i].text == '上一页') ||(links[i].text == '<上一页')||(links[i].text == '« 上一页') ||(links[i].text == '<<上一页') || (links[i].text == '[上一页]') || (links[i].text == '【上一页】') ||(links[i].text == 'Previous') || (links[i].text == 'Prev') ||(links[i].text == 'previous') || (links[i].text == 'prev') || (links[i].text == '‹‹') || (links[i].text == '<')) document.location = links[i].href;
				}
			break;
		}
	},
},

{
	label: "上 / 下一頁",
	tooltiptext: "左鍵：跟蹤下一鏈接\n右鍵：跟蹤上一鏈接",
	onclick: function(e) {
		switch(e.button) {
			case 0:
				var document = window._content.document;
				var links = document.links;
				for(i = 0; i < links.length; i++) {
				if(/^([^\d^\w.]*(下一页|下一頁|next)[^\d^\w]*|\s*(»|>+|›+)\s*)$/i.test(links[i].text))
				document.location = links[i].href;
				}
			break;
			case 2:
				var document = window._content.document;
				var links = document.links;
				for(i = 0; i < links.length; i++) {
				if(/^([^\d^\w.]*(上一頁|上一页|previous|prev)[^\d^\w]*|\s*(«|<+|‹+)\s*)$/i.test(links[i].text))
				document.location = links[i].href;
				}
			break;
		}
	},
},

{
	label: '開啟主頁',
	icon: 'home',
	oncommand: 'BrowserGoHome(event);',
	onclick:'checkForMiddleClick(document.getElementById("Browser:Home"), event);',
},

{
	label: "錯誤主控台",
	oncommand: "toJavaScriptConsole()",
},

{
	label: "程式碼速記本",
	oncommand: "Scratchpad.openScratchpad();",
},

{
	label: "顯示所有標籤頁縮略圖",
	oncommand: "allTabs.open();",
},

{
	label: "搜尋鏈結文本",
	url: "https://encrypted.google.com/search?q=%LINK_TEXT%",
},

{
	label: "翻譯鏈結文本",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC",
	url: "http://translate.google.com.hk/?hl=zh-TW#auto/zh-TW/%LINK_TEXT%",
},

{
	label: '飛驢視頻下載器',
	image:"data:image/png;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAcFBQYFBAcGBQYIBwcIChELCgkJChUPEAwRGBUaGRgVGBcbHichGx0lHRcYIi4iJSgpKywrGiAvMy8qMicqKyr/2wBDAQcICAoJChQLCxQqHBgcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKir/wAARCAAQABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1nWtFvr6+bWreVI7ZQ0inaGm2eWACvGVAILgBgeemeKsabFrsV4dU1C6WSwbMhjV3DhCDyUJKgDIIA5wvckis3WvGSaZoEctxaXMFh8ka3LEAhGUgfIrHccf44yAKl8H+LovF8E2m2cFwtvFGVe7mXG8ZwVAyfmwRyDgeg4FRCUaico6odSPs5KMtGz//2Q==",
	oncommand: function() {
		gBrowser.addTab('http://flvxz.com/?url='+ encodeURIComponent(content.location.href) + '&flag=&format=high');
	},
},

{
	label: "清除复原分页列表",
	oncommand: function(event) {
		var Setting = "browser.sessionstore.max_tabs_undo";
		gPrefService.setIntPref(Setting, 0);
		gPrefService.setIntPref(Setting, 50);
	}
},

var Punctuationsub = PageMenu({
	label:"標點符號",
	condition:"input",
	insertBefore:"context-undo",
	oncommand: function(event) {
		var input_text = event.target.getAttribute('input_text');
		if(input_text) {
			addMenu.copy(input_text);
			goDoCommand("cmd_paste");
		}
	}
});
Punctuationsub([
	{label: "，", input_text:"，"},
	{label: "、", input_text:"、"},
	{label: "；", input_text:"；"},
	{label: "。", input_text:"。"},
	{label: "？", input_text:"？"},
	{label: "！", input_text:"！"},
	{label: "：", input_text:"："},
	{label: "「", input_text:"「"},
	{label: "」", input_text:"」"},
	{label: "『", input_text:"『"},
	{label: "』", input_text:"』"},
	{label: "（", input_text:"（"},
	{label: "）", input_text:"）"},
	{label: "……", input_text:"……"},
	{label: "—", input_text:"—"},
]);

var Punctuationsub = PageMenu({
	label:"標點符號",
	condition:"input",
	insertBefore:"context-undo",
	oncommand: function(event) {
		var focused = document.commandDispatcher.focusedElement;
		var input_text = event.target.getAttribute('input_text');
		if(focused) {
			var aStart = aEnd = focused.selectionStart;
			focused.value = focused.value.slice(0, aStart) + input_text + focused.value.slice(aEnd);
			var aOffset = aStart + input_text.length;
			focused.setSelectionRange(aOffset, aOffset);
		}
		else {
			addMenu.copy(input_text);
			goDoCommand("cmd_paste");
		}
		return;
	}
});
Punctuationsub([
	{label: "，", input_text:"，"},
	{label: "、", input_text:"、"},
	{label: "；", input_text:"；"},
	{label: "。", input_text:"。"},
	{label: "？", input_text:"？"},
	{label: "！", input_text:"！"},
	{label: "：", input_text:"："},
	{label: "「", input_text:"「"},
	{label: "」", input_text:"」"},
	{label: "『", input_text:"『"},
	{label: "』", input_text:"』"},
	{label: "（", input_text:"（"},
	{label: "）", input_text:"）"},
	{label: "……", input_text:"……"},
	{label: "—", input_text:"—"},
]);

page({
	label: '快速保存選定文本',
	condition: 'select',
	oncommand: function() {
		if (!window.NetUtil) Cu.import("resource://gre/modules/NetUtil.jsm");
		if (!window.FileUtils) Cu.import("resource://gre/modules/FileUtils.jsm");

		var data = addMenu.convertText('%s');

		var fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
		fp.init(window, "另存為", Ci.nsIFilePicker.modeSave);
		fp.appendFilter("文本文件", "*.txt");
		fp.defaultString = content.document.title + '.txt';

		var res = fp.show();
		if (res != Ci.nsIFilePicker.returnCancel) {
			var aFile = fp.file;

			var ostream = FileUtils.openSafeFileOutputStream(aFile);

			var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
			converter.charset = "gbk";
			var istream = converter.convertToInputStream(data);

			NetUtil.asyncCopy(istream, ostream, function(status) {
				if (!Components.isSuccessCode(status)) {
					// Handle error!
					return;
				}

				aFile.launch();

				// var path = addMenu.handleRelativePath('\\chrome\\txtFormat.exe');
				// addMenu.exec(path, [aFile.path]);
			});
		}
	}
})

{
	label: "切換編碼（gbk <-> utf-8）",
	accesskey: "e",
	oncommand: function() {
		var charset = gBrowser.mCurrentBrowser._docShell.charset;
		BrowserSetForcedCharacterSet(charset == "UTF-8" ? "GBK" : "UTF-8");
	}
},

{
	label: "停止載入所有分頁", 
	oncommand: function(event) {
		var len = gBrowser.mPanelContainer.childNodes.length;
		for (var i = 0; i < len; i++) {
			gBrowser.getBrowserAtIndex(i).stop();
		}
	},
},
{
	label: "重新載入所有分頁", 
	oncommand: function(event) {
		var len = gBrowser.mPanelContainer.childNodes.length;
		for (var i = 0; i < len; i++) {
			gBrowser.getBrowserAtIndex(i).reload();
		}
	},
},
{label: "重新載入所有分頁", oncommand: "gBrowser.reloadAllTabs();"},
{label: "停止載入所有分頁", oncommand: "Array.map(gBrowser.browsers,function(browser) {browser.stop()});"}

{
	label: "複製所有分頁標題和網址",
	class: "copy",
	insertAfter: "context_bookmarkAllTabs",
	oncommand: function() {
		var text = "";
		var tabs = gBrowser.mTabContainer.childNodes;
		for (var i = 0, l = tabs.length, win; i < l; i++) {
			win = tabs[i].linkedBrowser.contentWindow;
			text += win.document.title + "\n" + win.location.href + "\n";
		}

		Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper).copyString(text);
	}
},

{
	label: "傲游瀏覽器",
	tooltiptext: "左鍵：打開傲游\r\n右鍵：用傲游打開",
	onclick: function(e) {
		// var maxthonPath = Services.dirsvc.get("ProfD", Ci.nsILocalFile).parent.parent.path + "\\Maxthon\\bin\\Maxthon.exe";
		var maxthonPath = "D:\\Program Files\\Maxthon\\bin\\Maxthon.exe";
		switch (e.button) {
			case 0:
				var url = addMenu.convertText("%URL%");
				addMenu.exec(maxthonPath, url);
				break;
			case 2:
				addMenu.exec(maxthonPath);
				break;
		}
	},
},

{
	label: "啟動 Opera",
	text: "%u",
	exec: "C:\\Program Files\\Opera\\opera.exe",
	accesskey: "O",
},
{
	label: "添加到 Google 書籤",
	url: "http://www.google.co.jp/bookmarks/mark?op=add&bkmk=%u&title=%TITLE_ENCODE%&annotation=%SEL_ENCODE%",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC",
	condition: "nolink"
},
{
	label: "Web Archive",
	url: "http://web.archive.org/web/*/%u",
},
{
	label: "用 Opera 開啟當前鏈結",
	text: "%l",
	accesskey: "O",
	exec: "C:\\Program Files\\Opera\\opera.exe", 
},
{
	label: "當前鏈結的 Web Archive",
	url: "http://web.archive.org/web/*/%l",
},
{
	label: "高亮選擇的文字"
	,oncommand: function(event) {
		var ts = {};
		addMenu.getRangeAll().forEach(function(range) {
			var word = range.toString();
			if (ts[word]) return;
			gFindBar._highlightDoc(true, word);
			ts[word] = true;
		});
	}
},
{
	label: "開啟選取範圍內的 URL"
	,oncommand: function(event) {
		var urls = {};
		var reg = /h?t?tps?\:\/\/(?:\w+\.wikipedia\.org\/wiki\/\S+|[^\s\\.]+?\.[\w#%&()=~^_?.;:+*/-]+)/g;
		var matched = addMenu.focusedWindow.getSelection().toString().match(reg) || [];
		matched.forEach(function(url) {
			url = url.replace(/^h?t?tp/, "http");
			if (!urls[url])
				gBrowser.addTab(url);
			urls[url] = true;
		});
	}
},
{
	label: "開啟一組選取範圍內新的鏈結"
	,oncommand: function(event) {
		var urls = [];
		addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {
			if (/^http|^file/.test(a.href))
				urls.push(a.href);
		});
		if (urls.length === 0) return;

		TabView._initFrame(function(){
			var item = TabView._iframe.focusedWindow.GroupItems.newGroup();
			urls.forEach(function(url, i){
				var tab = gBrowser.addTab(url);
				TabView.moveTabTo(tab, item.id);
				if (i === 0) gBrowser.selectedTab = tab;
			});
		});
	}
},
 // 関數を書いてもいい
{
	label: "開啟選取範圍內的鏈結",
	condition: "select", // 表示する條件を自分で決める
	oncommand: function(event) {
		var sel = addMenu.focusedWindow.getSelection();
		var urls = {};
		for (var i = 0, len = sel.rangeCount; i < len; i++) {
			Array.forEach(sel.getRangeAt(i).cloneContents().querySelectorAll('a:not(:empty)'), function(a){
				if (!urls[a.href] && /^http|^file/.test(a.href))
					gBrowser.addTab(a.href);
				urls[a.href] = true;
			});
		};
	}
},
{
	label: "選取範圍內復選框的 ON/OFF",
	class: "checkbox",
	condition: "select",
	oncommand: function(event) {
		var win = addMenu.focusedWindow;
		var sel = win.getSelection();
		Array.slice(win.document.querySelectorAll('input[type="checkbox"]:not(:disabled)')).forEach(function(e) {
			if (sel.containsNode(e, true))
				e.checked = !e.checked;
		});
	}
},

/**
 * ファイルメニューなどを右クリックメニューから無理矢理使えるようにする
 */

// 既存の menupopup をサブメニューとして利用する関數
// menu に subpopup 屬性が必要
function subPopupshowing(event) {
	var subPopup = document.getElementById(event.currentTarget.getAttribute('subpopup'));
	if (!subPopup) return;

	var popup = event.target;
	if (!popup.hasAttribute('style')) {
		popup.style.cssText = [
			'-moz-appearance: none !important;'
			,'max-height: 1px !important;'
			,'border: none !important;'
			,'background: transparent !important;'
			,'opacity: 0 !important;'
		].join(' ');
	}
	popup.style.setProperty('min-width', (popup._width || 100)+'px', 'important');

	var {screenY, screenX, width} = popup.boxObject;
	var popupshown = function(evt) {
		var utils = window.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils);
		utils.sendMouseEvent('mousemove', screenX, screenY, 0, 1, 0);
		subPopup.removeEventListener('popupshown', popupshown, false);
		popup._width = subPopup.boxObject.width;
	};
	setTimeout(function() {
		subPopup.addEventListener('popupshown', popupshown, false);
		subPopup.openPopupAtScreen(screenX-2, screenY-2, true);
	}, 0);
};
TabMenu({
	label: '列出所有分頁',
	accesskey: 'A',
	subpopup: 'alltabs-popup',
	onpopupshowing: subPopupshowing,
});
TabMenu({
	label: '搜尋選單',
	accesskey: 'S',
	subpopup: 'search-popup',
	onpopupshowing: subPopupshowing,
});
TabMenu({
	label: '前進後退選單',
	accesskey: 'B',
	subpopup: 'backForwardMenu',
	onpopupshowing: subPopupshowing,
});

page({
	label: "Everything 搜索",
	oncommand: function(){
		var str = addMenu.convertText('%s');
		addMenu.exec("D:\\Program Files\\Everything\\Everything.exe", ['-search', str]);
	}
})

function copyBBS_or_MD(event){
	var title = addMenu.convertText("%RLINK_TEXT%") || addMenu.convertText("%TITLE%"),
		url = addMenu.convertText("%RLINK%") || addMenu.convertText("%URL%");

	[" - 互助分享 - 大氣謙和!", "_免費高速下載|百度云 網盤-分享無限制", " - Powered by Discuz!",
		"百度云 網盤-", "的分享", 
	].forEach(function(r){ title = title.replace(r, ""); });

	switch(event.button){
		case 0:
			addMenu.copy("[url=" + url + "]" + title + "[/url]");
			break;
		case 1:
			addMenu.copy(title);
			event.target.parentNode.hidePopup();
			break;
		case 2:
			addMenu.copy("[" + title + "](" + url + ")");
			break;
	}
}

tab({
	label: "複製地址（BBS、MD）",
	tooltiptext: "左鍵複製 BBS 格式，右鍵 MD 格式",
	onclick: copyBBS_or_MD
});

page({
	label: "複製鏈接（BBS、MD）",
	condition: "link noimage",
	tooltiptext: "左鍵複製 BBS 格式，右鍵 MD 格式",
	insertBefore: "context-sep-copylink",
	onclick: copyBBS_or_MD
});

page({
	label: "在輸入框光標處插入字符（測試）",
	condition: "input",
	insertAfter: "context-paste",
	oncommand: function(event) {
		var aText = "123";

		var input = gContextMenu.target;
		var aStart = aEnd = input.selectionStart;

		// 在光標處插入字符
		input.value = input.value.slice(0, aStart) + aText + input.value.slice(aEnd);

		// 移動光標到插入字符的後面
		var aOffset = aStart + aText.length;
		input.setSelectionRange(aOffset, aOffset);
	}
});

var testMenu = PageMenu({
	label: '測試子菜單',
	onpopupshowing: function (event){
		Array.slice(event.target.children).forEach(function(elem){
			if(elem.id == "mtest-video"){
				elem.hidden = content.location.host.indexOf("youku") == -1
			}
		});
	}
});
testMenu([
	{
		id: "mtest-video",
		label: "測試視頻鏈接",
		hidden: true
	}
]);

{
	label:"複製擴展清單",
	image:"chrome://mozapps/skin/extensions/extensionGeneric-16.png",
	oncommand: function () {
		Application.extensions ? Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).copyString(Application.extensions.all.map(function (item, id) {
				return id + 1 + ": " + item._item.name;
			}).join("\n")) : Application.getExtensions(function (extensions) {
			Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).copyString(extensions.all.map(function (item, id) {
					return id + 1 + ": " + item._item.name;
				}).join("\n"));
		})
	}
},

{
	label: "複製用戶腳本清單",
	oncommand: function () {
		Cu.import("resource://gre/modules/AddonManager.jsm");

		AddonManager.getAddonsByTypes(['greasemonkey-user-script', 'userscript'], function (aAddons) {
			var downURLs = [];
			aAddons.forEach(function (aAddon) {
				var name, downURL;
				if (aAddon._script) {  // Greasemonkey
					name = aAddon._script.name;
					downURL = aAddon._script._downloadURL;
				} else {  // Scriptish
					name = aAddon._name;
					downURL = aAddon._downloadURL;
					if (!downURL && item._updateURL) {
						downURL = item._updateURL.replace(/\.meta\.js$/, '.user.js');
					}
					if (!downURL && item._homepageURL) {
						downURL = item._homepageURL;
					}
				}

				downURLs.push(name + '\n' + downURL);
			});
			Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).
				copyString(downURLs.join('\n\n'));
		});
	}
},

{label: "批量安裝 GM 腳本",
	tooltiptext: "從剪貼板中的多個網址安裝，是覆蓋安裝",
	oncommand: function() {
		if (!window.GM_BrowserUI) return;

		var scope = {};
		Cu.import('resource://greasemonkey/remoteScript.js', scope);

		var install_GM_script = function(url) {
			var rs = new scope.RemoteScript(url);
			rs.download(function(aSuccess, aType) {
				if (aSuccess && 'dependencies' == aType) {
					rs.install();
				}
			});
		};

		var data = readFromClipboard();
		var m = data.match(/(https?:\/\/.*?\.user\.js)/g);
		if (m) {
			m.forEach(function(url) {
				// 處理下 userscripts 的問題
				url = url.replace(/^https?:\/\/userscripts\.org\//, 'http://userscripts.org:8080/');

				install_GM_script(url);
			})
		}
	}
},

{
	label:"為此頁搜索油侯腳本",
	url: "https://www.google.com/search?q=site:userscripts.org%20%HOST%",
	where: "tab",
	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADSSURBVDhPnZK9DcIwEIXTsQBL0CAU15RQUtKwRAbIAlmCPuzADExAmwUyQHjPvrNs6zA/T/p0jvPe6Sy7MXQEE1ikXsBPWtzNRfD9DNvfqysadGH7s3RkMkh4kH2LLciUjW5Bj4prn0pkhlLoUXHtU1APHsAMpdAD9JixwSQ/r250cxlKgYesGYJ2UkODdmx9rQGvkkkn8JShEvGtQNQecPPMaoVSxLsBpv46xgGkP6pIE95ClNxsXfQVU0SJpS763jU4gTvgY9JHUjILGpY30DQvwsxGGOnZ9v8AAAAASUVORK5CYII="
},
