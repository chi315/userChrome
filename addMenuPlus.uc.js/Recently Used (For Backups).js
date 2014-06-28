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
