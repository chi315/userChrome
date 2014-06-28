不再使用，備份
==========
<pre><code>{
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
},</code></pre>
OR
<pre><code>{
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
},</code></pre>
<pre><code>{
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
},</code></pre>
OR
<pre><code>{
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
},</code></pre>
<pre><code>{	
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
},</code></pre>
<pre><code>{
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
},</code></pre>
<pre><code>{
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
},</code></pre>
