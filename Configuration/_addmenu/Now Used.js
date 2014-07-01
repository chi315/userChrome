// ====================== 標籤右鍵菜單 =======================================
tab([
	{
		label: "截圖",
		tooltiptext: "左鍵：頁面所有區域截圖\n中鍵：頁面可見區域截圖\n右鍵：瀏覽器界面截圖",
		oncommand: "captureAll.init();",
		onclick: function(e) {
			switch(e.button) {
				case 1:
					capturePage.init();
				break;
				case 2:
					captureBrower.init();
				break;
			}
		},
		position: 1,
	},
	{label: "選擇網頁區域", oncommand: "WebScreenShotByClipping.init();", position: 1,},
	{label: "單擊捕獲元素", oncommand: "WebScreenShotByClick.init();", position: 1,},
	{	// 標籤的右鍵菜單中加入複製圖標網址的功能
		label: "複製 Favicon",
		tooltiptext: "左鍵：base64\n右鍵：URL",
		class: "copy",
		onclick: function(e) {
			switch(e.button) {
				case 0:
					addMenu.copy(addMenu.convertText("%FAVICON_BASE64%"));
				break;
				case 2:
					addMenu.copy(addMenu.convertText("%FAVICON%"));
				break;
			}
		},
		position: 1,
	},
	{
		label: "複製頁面",
		tooltiptext: "左鍵：標題\n中鍵：標題和鏈結(簡短)\n右鍵：標題和鏈結",
		class: "copy",
		onclick: function(e) {
			switch(e.button) {
				case 0:
					addMenu.copy(addMenu.convertText("%TITLE%"));
				break;
				case 1:
					addMenu.copy(addMenu.convertText("%TITLES%\n%URL%"));
				break;
				case 2:
					addMenu.copy(addMenu.convertText("%TITLE%\n%URL%"));
				break;
			}
		},
		position: 1,
	},
	{
		label: "前進(下一頁) / 後退(上一頁)",
		tooltiptext: "左鍵：前進到最前\n中鍵：網址向上一層\n右鍵：後退到最後",
		onclick: function(e) {
			switch(e.button) {
				case 0:
					getWebNavigation().gotoIndex(getWebNavigation().sessionHistory.count - 1);
				break;
				case 1:
					loadURI(content.location.host + content.location.pathname.replace(/\/[^\/]+\/?$/, ""));
				break;
				case 2:
					getWebNavigation().gotoIndex(0);
				break;
			}
		},
		position: 1,
	},
	{
		label: "停止載入所有分頁",
		accesskey: "S",
		insertAfter: "context_reloadAllTabs",
		oncommand: function(event) {
			var len = gBrowser.mPanelContainer.childNodes.length;
			for (var i = 0; i < len; i++) {
				gBrowser.getBrowserAtIndex(i).stop();
			}
		},
	},
	{
		label: "複製所有分頁標題和網址",
		tooltiptext: "左鍵：無格式\n中鍵：列表鏈結 (HTML)\n右鍵：鏈結 (HTML)",
		class: "copy",
		insertAfter: "context_bookmarkAllTabs",
		onclick: function(e) {
			var text = "";
			var tabs = gBrowser.mTabContainer.childNodes;
			switch(e.button) {
				case 0:
					for (var i = 0, l = tabs.length, win; i < l; i++) {
						win = tabs[i].linkedBrowser.contentWindow;
						text += win.document.title + "\n" + win.location.href + "\n";
					}
				break;
				case 1:
					for (var i = 0, l = tabs.length, win; i < l; i++) {
						win = tabs[i].linkedBrowser.contentWindow;
						text += '<li><a href="' + win.location.href + '" target="_blank">' + win.document.title + "</a><br></li>" + "\n";
					}
				break;
				case 2:
					for (var i = 0, l = tabs.length, win; i < l; i++) {
						win = tabs[i].linkedBrowser.contentWindow;
						text += '<a href="' + win.location.href + '" target="_blank">' + win.document.title + "</a><br>" + "\n";
					}
				break;
			}
			Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper).copyString(text);
		},
	},
	{
		label: "關閉右邊所有分頁",
		accesskey: "R",
		insertAfter: "context_closeOtherTabs",
		oncommand: function() {
			var tabs = gBrowser.mTabContainer.childNodes;
			for (var i = tabs.length - 1; tabs[i] != gBrowser.selectedTab; i--) {
				gBrowser.removeTab(tabs[i]);
			}
		},
	},
	{
		label: "關閉左邊所有分頁",
		accesskey: "L",
		insertAfter: "context_closeOtherTabs",
		oncommand: function() {
			var tabs = gBrowser.mTabContainer.childNodes;
			for (var i = tabs.length - 1; tabs[i] != gBrowser.mCurrentTab; i--) {}
			for (i--; i >= 0; i--) {
				gBrowser.removeTab(tabs[i]);
			}
		},
	},
	{
		label: "關閉重複分頁",
		accesskey: "R",
		insertAfter: "context_closeOtherTabs",
		oncommand: "CloseRepeatedTabs();",
	},
	{
		label: "關閉其他分頁",
		accesskey: "O",
		insertAfter: "context_closeOtherTabs",
		oncommand: "gBrowser.removeAllTabsBut(gBrowser.mCurrentTab);",
	},
	{
		label: "下載頁面到指定位置 (不彈窗)",
		tooltiptext: "UC Script 下載到 chrome 資料夾\nUser Script 下載到 UserScriptLoader 資料夾\nUser Style 下載到 CSS 資料夾\nJavaScript 下載到 local 資料夾",
		onclick: function(e) {
			var url = addMenu.convertText("%u"),
				uri = Components.classes["@mozilla.org/network/io-service;1"].
					  getService(Components.interfaces.nsIIOService).newURI(url, null, null)

			var file = Components.classes["@mozilla.org/file/directory_service;1"].
					   getService(Components.interfaces.nsIProperties).
					   get("ProfD", Components.interfaces.nsIFile);

			file.append("chrome");
			if (url.endsWith(".uc.js") || url.endsWith(".uc.xul")) {

			} else if (url.endsWith("user.js")) {
				file.append("UserScriptLoader");
			} else if (url.endsWith(".js")) {
				file.append("local");
			} else if (url.endsWith(".css")) {
				file.append("CSS");
			}

			file.append(getDefaultFileName(null, uri));
			internalSave(null, null, null, null, null, null, null, {
				file: file,
				uri: uri
			}, null, internalSave.length === 12 ? document : true, internalSave.length === 12 ? true : null, null);
		},
	},
]);

var Bookmarklet = TabMenu({
	label: "Bookmarklet",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWklEQVQ4jWNgoANYyMDA8J+BgWEuuQb8R8JkgTNQzaeI1TAVzVZcuJ0YJxPCg8iA+VCB00Roqofqsaeqs+dAJfeT6wKqugaXjfXkGkCsHByg2wTzqz0Ol1EGAF7Adz+tGmdUAAAAAElFTkSuQmCC",
	position: 99,
});
Bookmarklet([
	{label: 'Make numbered list', url: 'javascript:(function(){ function selectColor(i) { return ["#fdc", "#cdf", "#bfd", "#dbf", "#fbd"] [i%5]; } var u=location.href, ul=u.length; var tparts=[""], zparts=[], nz=0; function isDigit(c) { return ("0" <= c && c <= "9"); } for (i=0; i<ul; ) { for (; i<ul && !isDigit(u.charAt(i)); ++i) tparts[nz] += u.charAt(i); if(i<ul) { zparts[nz]=""; for (; i<ul && isDigit(u.charAt(i)); ++i) zparts[nz] += u.charAt(i); tparts[nz+1]=""; ++nz; } } if(!nz) { alert("No numbers in URL."); return; } D=window.open().document; D.write(); D.close(); function a(n) { A(D.body,n); } function A(p,n) { p.appendChild(n); } function E(q) { return D.createElement(q); } function cT(t) { return D.createTextNode(t) } function cBR() { return E("br"); } function cS(t,ci) { var s=E("span"); s.style.background=selectColor(ci); s.style.fontWeight="bold"; A(s, cT(t)); return s; } function cTB(v,oc) { var b=E("input"); b.size=6; b.value=v; b.addEventListener("input", oc, false); return b; } function cCB(t,oc) { var L=E("label"), b=E("input"); b.type="checkbox"; b.checked=true; b.onchange=oc; A(L,b); A(L,cT(t)); return L; } function cL(nz,tparts,zparts) { var L=E("a"); var u=""; for (var i=0; i<nz; ++i) { A(L,cT(tparts[i])); A(L,cS(zparts[i], i)); u += tparts[i]+zparts[i]; } A(L,cT(tparts[nz])); u += tparts[nz]; L.href=u; L.target="_blank"; return L; } a(cT("Original URL: ")); a(cBR()); a(cL(nz, tparts, zparts)); a(cBR()); a(cBR()); var fromBoxes=[], toBoxes=[], padChecks=[]; for (i=0; i<nz; ++i) { a(cT("Run ")); a(cS(zparts[i], i)); a(cT(" from ")); a(fromBoxes[i]=cTB(zparts[i], listURLs)); a(cT(" to ")); a(toBoxes[i]=cTB(zparts[i], listURLs)); a(cT(" (")); a(j=cCB(" Pad with zeroes to maintain length", listURLs)); padChecks[i]=j.childNodes[0]; a(cT(")")); a(cBR()); } a(cBR()); resultDiv=E("div"); a(resultDiv); listURLs(); function listURLs() { while (resultDiv.childNodes.length) resultDiv.removeChild(resultDiv.childNodes[0]); var lows=[], highs=[]; for (i=0; i<nz; ++i) { lows[i]=parseInt(fromBoxes[i].value, 10); highs[i]=parseInt(toBoxes[i].value, 10); if(highs[i]-lows[i] > 999) { A(resultDiv, cT("Too many")); return; } } urls=[]; function cb(sta) { var newzparts=[]; for (var i=0; i<nz; ++i) { var z=""+sta[i]; if(padChecks[i].checked) while (z.length < zparts[i].length) z="0"+z; newzparts[i]=z; } A(resultDiv, cL(nz, tparts, newzparts)); A(resultDiv, cBR()); } fors(nz, cb, lows, highs); } function fors (n, callback, lows, highs) { function fors_inner (states, v) { if(v >= n) callback(states); else for (states[v]=lows[v]; states[v] <= highs[v]; ++(states[v])) fors_inner(states, v+1); } fors_inner ([], 0); } })()'},
	{label: 'Increment', url: 'javascript:(function(){ var e,s; IB=1; function isDigit(c) { return ("0" <= c && c <= "9") } L = location.href; LL = L.length; for (e=LL-1; e>=0; --e) if (isDigit(L.charAt(e))) { for(s=e-1; s>=0; --s) if (!isDigit(L.charAt(s))) break; break; } ++s; if (e<0) return; oldNum = L.substring(s,e+1); newNum = "" + (parseInt(oldNum,10) + IB); while (newNum.length < oldNum.length) newNum = "0" + newNum; location.href = L.substring(0,s) + newNum + L.slice(e+1); })();'},
	{label: 'Decrement', url: 'javascript:(function(){ var e,s; IB=-1; function isDigit(c) { return ("0" <= c && c <= "9") } L = location.href; LL = L.length; for (e=LL-1; e>=0; --e) if (isDigit(L.charAt(e))) { for(s=e-1; s>=0; --s) if (!isDigit(L.charAt(s))) break; break; } ++s; if (e<0) return; oldNum = L.substring(s,e+1); newNum = "" + (parseInt(oldNum,10) + IB); while (newNum.length < oldNum.length) newNum = "0" + newNum; location.href = L.substring(0,s) + newNum + L.slice(e+1); })();'},
	{label: '自動翻頁', url: "javascript:(function(){if(window['pgzp']){_pgzpToggleBookmarklet();}else{window._page_zipper_is_bookmarklet=true;window._page_zipper=document.createElement('script');window._page_zipper.type='text/javascript';window._page_zipper.src='http://www.printwhatyoulike.com/static/pagezipper/pagezipper_10.js';document.getElementsByTagName('head')[0].appendChild(window._page_zipper);}})();"},
//	{label: '繁簡轉換 (繁)', url: 'javascript:(function(){var s=document.getElementById("tongwenlet_tw");if(s!=null){document.body.removeChild(s);}var s=document.createElement("script");s.language="javascript";s.type="text/javascript";s.src="http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_tw.js";s.id="tongwenlet_tw";document.body.appendChild(s); })();'},
//	{label: '繁簡轉換 (簡)', url: 'javascript:(function(){var s=document.getElementById("tongwenlet_cn");if(s!=null){document.body.removeChild(s);}var s=document.createElement("script");s.language="javascript";s.type="text/javascript";s.src="http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_cn.js";s.id="tongwenlet_cn";document.body.appendChild(s); })();'},
	{label: '破解右鍵限制', url: 'javascript:alert(document.body.oncontextmenu=document.body.onmouseup=document.body.onmousemove=document.body.onclick=document.body.onselectstart =document.body.oncopy=document.onmousedown = document.onkeydown =null)'},
	{label: '破解右鍵限制', url: "javascript:(function(){var doc=document;var bd=doc.body;bd.onselectstart=bd.oncopy=bd.onpaste=bd.onkeydown=bd.oncontextmenu=bd.onmousemove=bd.onselectstart=bd.ondragstart=doc.onselectstart=doc.oncopy=doc.onpaste=doc.onkeydown=doc.oncontextmenu=null;doc.onselectstart=doc.oncontextmenu=doc.onmousedown=doc.onkeydown=function (){return true;};with(document.wrappedJSObject||document){onmouseup=null;onmousedown=null;oncontextmenu=null;}var arAllElements=document.getElementsByTagName('*');for(var i=arAllElements.length-1;i>=0;i--){var elmOne=arAllElements[i];with(elmOne.wrappedJSObject||elmOne){onmouseup=null;onmousedown=null;}}var head=document.getElementsByTagName('head')[0];if(head){var style=document.createElement('style');style.type='text/css';style.innerHTML='html,*{-moz-user-select:auto!important;}';head.appendChild(style);}void(0);})();"},
	{label: '清除隱藏文字', url: "javascript:document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).setAttribute('src','http://www.karmatics.com/aardvark/bookmarklet.js')"},
	{label: '垂直分屏瀏覽', url: "javascript:document.write('<HTML><HEAD></HEAD><FRAMESET COLS=\"50%,*\"><FRAME SRC=' + location.href + '><FRAME SRC=' + location.href + '></FRAMESET></HTML>')"},
	{label: '水平分屏瀏覽', url: "javascript:document.write('<HTML><HEAD></HEAD><FRAMESET ROWS=\"50%,*\"><FRAME SRC=' + location.href + '><FRAME SRC=' + location.href + '></FRAMESET></HTML>')"},
	{label: 'PrintWhatYouLike', url: "javascript:(function(){if(window['ppw']&&ppw['bookmarklet']){ppw.bookmarklet.toggle();}else{window._pwyl_home='http://www.printwhatyoulike.com/';window._pwyl_pro_id=null;window._pwyl_bmkl=document.createElement('script');window._pwyl_bmkl.setAttribute('type','text/javascript');window._pwyl_bmkl.setAttribute('src',window._pwyl_home+'static/compressed/pwyl_bookmarklet_10.js');window._pwyl_bmkl.setAttribute('pwyl','true');document.getElementsByTagName('head')[0].appendChild(window._pwyl_bmkl);}})();"},
	{label: 'List all Image', url: "javascript:outText='';for(i=0;i<document.images.length;i++){if(outText.indexOf(document.images[i].src)==-1){outText+='<tr><td><img src='+document.images[i].src+'></td><td>'+document.images[i].height+'</td><td>'+document.images[i].width+'</td><td>'+document.images[i].src+'</td></tr>'}};if(outText!=''){imgWindow=window.open('','imgWin','width=800,height=600');imgWindow.document.write ('<table border=1 cellpadding=10><tr><th>Image</th><th>Height</th><th>Width</th><th>URL</th></tr>'+outText+'</table>');imgWindow.document.close()}else{alert('No images!')}"},
	{label: 'Mouseover DOM Inspector', url: "javascript:void(z=document.body.appendChild(document.createElement('script')));void(z.language='javascript');void(z.type='text/javascript');void(z.src='http://slayeroffice.com/tools/modi/modi.js');void(z.id='modi');"},
	{label: 'aardvark', url: "javascript:document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).setAttribute('src','http://www.karmatics.com/aardvark/bookmarklet.js')"},
	{label: '網頁另存為 PDF', url: "javascript:pdf_url=location.href;location.href='http://pdfmyurl.com?url='+escape(pdf_url)"},
	{label: '夜間模式', url: "javascript:(function(){var night=function(w){(function(d){var css='html{opacity:0.6!important;background:black!important;}body{background:white!important;}';var s=d.getElementsByTagName('style');for(var i=0,si;si=s[i];i  ){if(si.innerHTML==css){si.parentNode.removeChild(si);return}};var heads=d.getElementsByTagName('head');if(heads.length){var node=d.createElement('style');node.type='text/css';node.appendChild(d.createTextNode(css));heads[0].appendChild(node)}})(w.document); for(var i=0,f;f=w.frames[i];i  ){try{arguments.callee(f)}catch(e){}}};night(window)})();"},
	{label: '手寫輸入', url: "javascript:(function(){var st;st=document.createElement('script');st.charset='utf-8';st.src='http://libowen.com/tool/shouxie/plugins/shouxie.js';document.body.appendChild(st);})();"},
	{label: 'Firefox 記事本', url: 'data:text/html, <html contenteditable>'},
	{label: 'Google 加密搜圖', url: 'javascript:var googleImageSearch={init:function(){var a=document.createElement("div");a.id="toolTip4Google";a.innerHTML="點擊圖片搜索";document.body.appendChild(a);var b=document.documentElement.clientWidth,c=document.documentElement.clientHeight;a.style.color="red";a.style.backgroundColor="rgba(20, 20, 20, 0.4)";a.style.position="fixed";a.style.zIndex="999999";a.style.left=(b- a.clientWidth)/2+"px";a.style.top=(c-a.clientHeight)/2+"px";document.addEventListener("click",this,!1)},handleEvent:function(a){document.removeEventListener("click",this,!1);a.stopPropagation();a.preventDefault();a=a.target;if(a.localName=="img"){var b="https://encrypted.google.com/searchbyimage?image_url=";b+=encodeURIComponent(a.src);window.open(b,"_blank")}(a=document.getElementById("toolTip4Google"))&&a.parentNode.removeChild(a)}};googleImageSearch.init();void 0;'},
	{label: 'Google 加密計算機', url: 'https://encrypted.google.com/#q=the loneliest number'},
	{
		label: "Hexadecimal Character Codes",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKklEQVQ4jWPo7l/3nxLMAGOQClAMQBYgFsP0jBowasBwMgAmQHZmogQDAK0PAR7fOgPOAAAAAElFTkSuQmCC",
		tooltiptext: "左鍵：Java Unicode\n中鍵：HTML Unicode\n右鍵：URL",
		onclick: function(e) {
			switch(e.button) {
				case 0:
					gBrowser.selectedTab = gBrowser.addTab('http://code.cside.com/3rdpage/us/javaUnicode/converter.html');
				break;
				case 1:
					gBrowser.selectedTab = gBrowser.addTab('http://code.cside.com/3rdpage/us/unicode/converter.html');
				break;
				case 2:
					gBrowser.selectedTab = gBrowser.addTab('http://code.cside.com/3rdpage/us/url/converter.html');
				break;
			}
		},
	},
]);

// 頁面右鍵菜單移到2級目錄菜單
new function () {
	var items = [
		{command: 'context-selectall'},
		{command: 'tongwen-context-clip-simplified-item'},
		{command: 'tongwen-context-clip-traditional-item'},
		{command: 'snaplinksMenuEntry'},
		{
			label: "當前鏈結在側邊欄開啟",
			condition: "noselect nomedia noinput nomailto",
			oncommand: function(event) {
				var title = gContextMenu.onLink? gContextMenu.linkText() : gContextMenu.target.ownerDocument.title;
				var url = gContextMenu.linkURL || gContextMenu.target.ownerDocument.location.href;
				openWebPanel(title, url);
			}
		},
		{
			label: "檢視當前頁面的源代碼",
			url: "view-source:%u",
			condition: "nolink",
		},
		{
			label: "檢視當前鏈結網址的源代碼",
			url: "view-source:%l",
		},
		{command: 'context-viewsource'},
		{command: 'context-viewpartialsource-selection'},
		{command: 'context-inspect'},
		{
			label: "刪除選中部分網頁",
			oncommand: function(event) {content.getSelection().deleteFromDocument(0);},
			condition: "select",
		},
		{
			label: "切換當前網頁可編輯",
			oncommand: function(event) {content.document.body.contentEditable = content.document.body.contentEditable == "true" ? "false" : "true";},
		},
	];
	var menu = PageMenu({insertAfter: 'context-selectall', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it) {
		if (it.command)
			css('#contentAreaContextMenu #' + it.command + '{display: none !important;}')
	});
};

new function () {
	var items = [
		{
			label: "啟動 Chrome",
			text: "%u",
			exec: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
			accesskey: "C",
		},
		{
			label: "啟動 Chrome(禁用擴展)",
			text: "%u -disable-extensions",
			exec: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
			accesskey: "E",
		},
		{
			label: "啟動 Internet Explorer",
			text: "%u",
			exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
			accesskey: "I",
		},
		{
			label: "Google 翻譯當前頁面",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC",
			url: "http://translate.google.tw/translate?u=%u",
			accesskey: "T"
		},
		{
			label: "用 Google docs 中開啟頁面",
			url: "http://docs.google.com/viewer?url=%u",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADrSURBVDhPnZO9CsIwFEb7cLY11fcxf66Ckz6FiIubiOKg0tzEQXFwVRCdfAARFU2kCvWKLf3gQIab890U6vksnpdYvCtETc08dwgYPApRi7cfAeF6GXHdJtK0/uFmQgErJIikHng5QwQMkSAQ+kCEmuWhzOGIBBVpOklBZuy2XbwBUyci9DoPbhYJnDUpyExFQg8JQqr2IVOTXNhZJCgLPUoKMkOkHiOBfZuJBDQyqUODcFggQcDVJilA8am6v2a+SX3Euun/aqxK0/QZ3NBlR2oDCteQwvkb235BF9+kBEV4Cewv6Q6FoDB9ApgI8l6APDOdAAAAAElFTkSuQmCC",
			accesskey: "D"
		},
		{
			label: "Google 快照",
			url: "http://webcache.googleusercontent.com/search?q=cache:%u",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC",
			accesskey: "W"
		},
		{
			label: "查找相似頁面",
			url: "https://encrypted.google.com/search?q=related:%u",
			accesskey: "S"
		},
		{
			label: "檢視反向鏈結",
			url: "https://encrypted.google.com/search?q=link:%u",
			accesskey: "R"
		},
		{
			label: "視頻去廣告播放",
			url: "http://www.mtkan.net/video/p/%u",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjklEQVQ4jY2Ta0jTYRjFf9P/5nKzslxoVxVbYBchS7pbYrOIpKIIgq4GZmUoWBRpOpIgjIiuVIZRqGhU4II+BH2ISkpMa5RYltPKDJI0QbK004csDJp04IX3gfd3OOeBF/zLSvS8FcQsXjvEG7+yjExOy2bPrQbTjopa68jwyP9HIxNSKHjczM0eUSNxt08Uf/wa4MoqBExDwxEzFgYXNfWdfdala2+6NPFhhw4871TV6y+KK20XizOPDYUHhmdV1rjvd+i3enr/XOVt65LtSMMP25hxcX5aW2It7rr++297JPXraP5enTtWoNzsdLW/a1GLz6e4kg/C4TzwbwPDmhjg9qqs9r062lrkuXpSDzxXdO3cYT15XK2a2jpNKW5TgHPhKX8V4thZ9X399Vb5Gp6q9VWjbr/qlvdli5rqH+lSdasMt1dGeEz+v2AT4Ahesr2Og7VKLfMp7UajNhWla1e5R2er2zW80CtrenkfgUGpgAOIBWy/DczAuIBhthxremUvh5vF8U/i9EeZT7cp9nyzTIfqZYlOuAUkWQ0jCRg9MTRkwWCDyUCqKXrePQrqRW612HRBZHpE4QtZVuZ3ATlAimGQCESMHWVzDa4xwWwO3DwiLKzMnrzzW+i2ExqRXSFbxmWRcug7YZPvAFuBOUCILchYFhVhX0RIUNCUeGf4mTTXjDfr5jubls+OaVy7ZpUOZsyUO3O69mfMkmupqzveGXFvWpSjyjk29MyEMHue9VcKyNswt3t6lKMSmAlMwmzfzeoiH2nlnWwr7TRtKflsbLz4yTxq/HkgFYj8a/2hdsu0QeNoYD6wHcgDCoB8YB+wAZgKBOPnT5iAYcCkgZ7JQMrASRpIOAYwBkM/AUsJEs+05Cd1AAAAAElFTkSuQmCC",
		},
		{
			label: "用 Flvcd 解析當前頁面",
			url: "http://www.flvcd.com/parse.php?kw=%URL_ENCODE%&flag=&format=high",
		},
	];
	var menu = PageMenu({condition: 'normal', insertBefore: 'dtaCtxCompact'});
	menu(items);
};

new function () {
	var items = [
		{command: 'context-bookmarkpage', icon: 'starbutton'},
		{command: 'context-savepage'},
		{command: 'context-sendpage', style:'display:none;'},
		{command: 'context-viewinfo'},
		{command: 'context-viewbgimage'},
		{command: 'context-sep-viewbgimage'},
		{command: 'context-back', onclick:'checkForMiddleClick(document.getElementById("Browser:BackOrBackDuplicate"), event);'},
		{command: 'context-forward', onclick:'checkForMiddleClick(document.getElementById("Browser:ForwardOrForwardDuplicate"), event);'},
		{command: 'context-reload', onclick:'checkForMiddleClick(document.getElementById("Browser:ReloadOrDuplicate"), event);'},
		{command: 'context-stop', onclick:'checkForMiddleClick(document.getElementById("Browser:Stop"), event);'},
		{command: 'context-sep-stop'},
	];
	var menu = PageMenu({condition: 'normal', insertBefore: 'dtaCtxCompact', icon: 'starbutton', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it) {
		if (it.command)
			css('#contentAreaContextMenu #' + it.command + '{display: none !important;}')
	});
};

// 頁面鏈結右鍵菜單移到2級目錄菜單
new function () {
	var items = [
		{
			label: "用 Chrome 開啟當前鏈結",
			text: "%l",
			exec: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
			accesskey: "C",
		},
		{
			label: "用 Chrome(禁用擴展) 開啟當前鏈結",
			text: "%l -disable-extensions",
			exec: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
			accesskey: "E",
		},
		{
			label: "用 Internet Explorer 開啟當前鏈結",
			text: "%l",
			accesskey: "I",
			exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe"
		},
		{
			label: "Google 翻譯當前鏈結",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC",
			url: "http://translate.google.tw/translate?u=%l",
			accesskey: "T"
		},
		{
			label: "用 Google docs 開啟鏈結",
			url  : "http://docs.google.com/viewer?url=%l",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADrSURBVDhPnZO9CsIwFEb7cLY11fcxf66Ckz6FiIubiOKg0tzEQXFwVRCdfAARFU2kCvWKLf3gQIab890U6vksnpdYvCtETc08dwgYPApRi7cfAeF6GXHdJtK0/uFmQgErJIikHng5QwQMkSAQ+kCEmuWhzOGIBBVpOklBZuy2XbwBUyci9DoPbhYJnDUpyExFQg8JQqr2IVOTXNhZJCgLPUoKMkOkHiOBfZuJBDQyqUODcFggQcDVJilA8am6v2a+SX3Euun/aqxK0/QZ3NBlR2oDCteQwvkb235BF9+kBEV4Cewv6Q6FoDB9ApgI8l6APDOdAAAAAElFTkSuQmCC",
			accesskey: "D"
		},
		{
			label: "當前鏈結的 Google 快照",
			url: "http://webcache.googleusercontent.com/search?q=cache:%l",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC",
			accesskey: "W"
		},
		{
			label: "查找相似頁面",
			url: "https://encrypted.google.com/search?q=related:%l",
			accesskey: "S"
		},
		{
			label: "檢視反向鏈結",
			url: "https://encrypted.google.com/search?q=link:%l",
			accesskey: "R"
		},
		{
			label: "視頻去廣告播放",
			url: "http://www.mtkan.net/video/p/%l",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACjklEQVQ4jY2Ta0jTYRjFf9P/5nKzslxoVxVbYBchS7pbYrOIpKIIgq4GZmUoWBRpOpIgjIiuVIZRqGhU4II+BH2ISkpMa5RYltPKDJI0QbK004csDJp04IX3gfd3OOeBF/zLSvS8FcQsXjvEG7+yjExOy2bPrQbTjopa68jwyP9HIxNSKHjczM0eUSNxt08Uf/wa4MoqBExDwxEzFgYXNfWdfdala2+6NPFhhw4871TV6y+KK20XizOPDYUHhmdV1rjvd+i3enr/XOVt65LtSMMP25hxcX5aW2It7rr++297JPXraP5enTtWoNzsdLW/a1GLz6e4kg/C4TzwbwPDmhjg9qqs9r062lrkuXpSDzxXdO3cYT15XK2a2jpNKW5TgHPhKX8V4thZ9X399Vb5Gp6q9VWjbr/qlvdli5rqH+lSdasMt1dGeEz+v2AT4Ahesr2Og7VKLfMp7UajNhWla1e5R2er2zW80CtrenkfgUGpgAOIBWy/DczAuIBhthxremUvh5vF8U/i9EeZT7cp9nyzTIfqZYlOuAUkWQ0jCRg9MTRkwWCDyUCqKXrePQrqRW612HRBZHpE4QtZVuZ3ATlAimGQCESMHWVzDa4xwWwO3DwiLKzMnrzzW+i2ExqRXSFbxmWRcug7YZPvAFuBOUCILchYFhVhX0RIUNCUeGf4mTTXjDfr5jubls+OaVy7ZpUOZsyUO3O69mfMkmupqzveGXFvWpSjyjk29MyEMHue9VcKyNswt3t6lKMSmAlMwmzfzeoiH2nlnWwr7TRtKflsbLz4yTxq/HkgFYj8a/2hdsu0QeNoYD6wHcgDCoB8YB+wAZgKBOPnT5iAYcCkgZ7JQMrASRpIOAYwBkM/AUsJEs+05Cd1AAAAAElFTkSuQmCC",
		},
		{
			label: "用 Flvcd 解析當前鏈結",
			url: "http://www.flvcd.com/parse.php?kw=%LINK_ENCODE%&flag=&format=high",
		},
		{
			label: "開啟反轉鏈結",
			oncommand: "invertInput.openInvertedLink();",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAgklEQVRYhe2VywmAMBAFn1qANYg12YInzRYZPzXpRQ8RxIC4wfXkG9hDYFgmEAhACHmkqwDnAVkAGcLZwlUjAyDbOc7buGrcel0qi42rD5ijW402rpq+DovcCsgUzhYu0ZFFj+qY124KKUsZwAAGMIABPwvII/HmM2oKoC0NQgj5hh2kZAWqL5sf6AAAAABJRU5ErkJggg=="
		},
	];
	var menu = PageMenu({condition: 'link', insertBefore: 'dtaCtxCompact'});
	menu(items);
};

new function () {
	var items = [
		{command: 'context-bookmarklink'},
		{command: 'context-copylink', style:'display:none;'},
		{ //  替換 Context_LinkText.uc.js
			label: "複製鏈結文本和網址",
			tooltiptext: "左鍵：鏈結網址\n中鍵：鏈結文本\n右鍵：鏈結文本和網址",
			onclick: function(e) {
				switch(e.button) {
					case 0:
						addMenu.copy(addMenu.convertText("%LINK%"));
					break;
					case 1:
						addMenu.copy(addMenu.convertText("%LINK_TEXT%"));
					break;
					case 2:
						addMenu.copy(addMenu.convertText("%LINK_TEXT%\n%LINK%"));
					break;
				}
			}
		},
		{
			label: "以特定格式複製鏈結",
			tooltiptext: "左鍵：BBCode\n中鍵：MD 格式\n右鍵：HTML Code",
			onclick: function(event) {
				var title = addMenu.convertText("%RLINK_TEXT%"),
					url = addMenu.convertText("%RLINK%");
					switch(event.button) {
					case 0:
						addMenu.copy("[url=" + url + "]" + title + "[/url]");
					break;
					case 1:
						addMenu.copy("[" + title + "](" + url + ")");
					break;
					case 2:
						addMenu.copy('<a href="' + url + '">' + title + '</a><br>');
					break;
				}
			}
		},
		{command: 'context-savelink'},
		{
			label: "下載鏈結到指定位置 (不彈窗)",
			tooltiptext: "左鍵：E:\n中鍵：G:\n右鍵：D:",
			onclick: function(e) {
				var uri = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(gContextMenu.linkURL, null, null)
				switch(e.button) {
					case 0:
						var path = "E:";
					break;
					case 1:
						var path = "G:";
					break;
					case 2:
						var path = "D:";
					break;
				}
				var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
				file.initWithPath(path);
				file.append(getDefaultFileName(null, uri));
				internalSave(null, null, null, null, null, null, null, {
					file: file,
					uri: uri
				}, null, internalSave.length === 12 ? document : true, internalSave.length === 12 ? true : null, null);
			},
		},
		{
			label: "下載鏈結到指定位置 (不彈窗)",
			tooltiptext: "UC Script 下載到 chrome 資料夾\nUser Script 下載到 UserScriptLoader 資料夾\nUser Style 下載到 CSS 資料夾\nJavaScript 下載到 local 資料夾",
			onclick: function(e) {
				var url = gContextMenu.linkURL,
					uri = Components.classes["@mozilla.org/network/io-service;1"].
						  getService(Components.interfaces.nsIIOService).newURI(url, null, null)

				var file = Components.classes["@mozilla.org/file/directory_service;1"].
						   getService(Components.interfaces.nsIProperties).
						   get("ProfD", Components.interfaces.nsIFile);

				// 添加哪個文件夾名
				file.append("chrome");
				if (url.endsWith(".uc.js") || url.endsWith(".uc.xul")) {

				} else if (url.endsWith("user.js")) {
					file.append("UserScriptLoader");
				} else if (url.endsWith(".js")) {
					file.append("local");
				} else if (url.endsWith(".css")) {
					file.append("CSS");
				}

				// 添加文件名
				file.append(getDefaultFileName(null, uri));
				internalSave(null, null, null, null, null, null, null, {
					file: file,
					uri: uri
				}, null, internalSave.length === 12 ? document : true, internalSave.length === 12 ? true : null, null);
			},
		},
		{command: 'context-copyemail'},
		{command: 'context-openlinkintab'},
		{command: 'context-openlinkprivate'},
		{command: 'context-openlink'},
		{command: 'context-sep-open', style:'display:none;'},
		{command: 'context-sendlink', style:'display:none;'},
		{command: 'context-sep-copylink', style:'display:none;'},
	];
	var menu = PageMenu({condition: 'link', insertBefore: 'dtaCtxCompact', icon:'copy2', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it) {
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{display: none !important;}')
	});
};

// 頁面圖片右鍵菜單移到2級目錄菜單
new function () {
	var items = [
		{	//  替換 googleImageSearch.uc.js
			label: 'Google 加密類似圖片搜尋',
			url: 'https://encrypted.google.com/searchbyimage?image_url=%i'
		},
		{
			label: '七引擎搜圖',
			oncommand: function() {
				var url = encodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
				var SEs = [
				'http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=',
				'http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=',
//				'http://www.tineye.com/search?url=',
				'http://pic.sogou.com/ris?query=',
				'http://iqdb.org/?url=',
				'http://regex.info/exif.cgi/?url=',
				'http://saucenao.com/search.php?db=999&url=',
				'https://encrypted.google.com/searchbyimage?image_url=',
//				'http://www.google.com/searchbyimage?image_url=',
				];
				for(var n = 0; n < SEs.length; n++) {gBrowser.selectedTab = gBrowser.addTab(SEs[n] + url);}
			}
		},
		{
			label: '複製圖像base64',
			text : "%IMAGE_BASE64%"
		},
		{	// 替換 openImgRar.uc.js
			label: "打開圖像rar",
			accesskey: "R",
			image: "moz-icon://file:///c:/program%20files/WinRAR/WinRAR.exe?size=16",
			oncommand: function() {
				var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
				try {
					var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache\\" + new Date().getTime() + ".rar";
					file.initWithPath(path);
				} catch (e) {
					var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache\\" + new Date().getTime() + ".rar";
				}
				file.initWithPath(path);
				Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL), null, null), null, null, null, null, file, null);
				setTimeout(function () {
					file.launch();
				}, 100);
			}
		},
		{
			label: "下載圖片到指定位置 (不彈窗)",
			tooltiptext: "JPEG 下載到 JPEG 文件夾\nBMP 下載到 BMP 文件夾\nPNG 下載到 PNG 文件夾\nGIF 下載到 GIF 文件夾",
			onclick: function(e) {
				var url = gContextMenu.imageURL;
				var uri = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(url, null, null)
				var path;
				if (url.endsWith(".jpg") || url.endsWith(".jpeg")) {
					path = "E:\\JPEG";
				} else if (url.endsWith(".bmp")) {
					path = "E:\\BMP";
				} else if (url.endsWith(".png")) {
					path = "E:\\PNG";
				} else if (url.endsWith(".gif")) {
					path = "E:\\GIF";
				} else {
					path = "E:";
				}
				var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
				file.initWithPath(path);
				file.append(getDefaultFileName(null, uri));
				internalSave(null, null, null, null, null, null, null, {
					file: file,
					uri: uri
				}, null, internalSave.length === 12 ? document : true, internalSave.length === 12 ? true : null, null);
			},
		},
		{command: 'context-viewimage'},
		{command: 'context-reloadimage'},
		{command: 'context-copyimage-contents'},
		{command: 'context-copyimage'},
		{command: 'context-sep-copyimage'},
		{command: 'context-saveimage'},
		{command: 'context-sendimage', style:'display:none;'},
		{command: 'context-viewimageinfo'},
		{command: 'context-setDesktopBackground'},
	];
	var menu = PageMenu({condition:'image', insertBefore:'context-viewimage', icon:'image', onpopupshowing: syncHidden});
	menu(items);
	page({condition:'image', insertBefore:'context-setDesktopBackground'});
	items.forEach(function(it) {
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{display: none !important;}')
	});
};

// 頁面輸入框右鍵菜單移到2級目錄菜單
new function () {
	var items = [
		{command: 'tongwen-context-text-sim-item'},
		{command: 'tongwen-context-text-tra-item'},
		{
			label: "反轉輸入",
			oncommand: "invertInput.invert();",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAgklEQVRYhe2VywmAMBAFn1qANYg12YInzRYZPzXpRQ8RxIC4wfXkG9hDYFgmEAhACHmkqwDnAVkAGcLZwlUjAyDbOc7buGrcel0qi42rD5ijW402rpq+DovcCsgUzhYu0ZFFj+qY124KKUsZwAAGMIABPwvII/HmM2oKoC0NQgj5hh2kZAWqL5sf6AAAAABJRU5ErkJggg=="
		},
		{
			label: "反轉輸入 (逐行反轉)",
			oncommand: "invertInput.invertLineByLine();",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAgklEQVRYhe2VywmAMBAFn1qANYg12YInzRYZPzXpRQ8RxIC4wfXkG9hDYFgmEAhACHmkqwDnAVkAGcLZwlUjAyDbOc7buGrcel0qi42rD5ijW402rpq+DovcCsgUzhYu0ZFFj+qY124KKUsZwAAGMIABPwvII/HmM2oKoC0NQgj5hh2kZAWqL5sf6AAAAABJRU5ErkJggg=="
		},
		{command: 'context-paste'},
		{
			label: "貼上並確定",
			condition: "input",
			insertAfter: "context-paste",
			oncommand: function(event) {
				function $(id) document.getElementById(id)

				// 給原輸入框增加空格
				var input = gContextMenu.target;
				input.value = input.value + " ";

				// $('context-selectall').doCommand();  // 全選
				// $('context-cut').doCommand();  // 剪切
				// $('context-copy').doCommand();  // 複製
				$('context-paste').doCommand();  // 粘貼

				// 回車鍵
				window.QueryInterface(Ci.nsIInterfaceRequestor)
					.getInterface(Ci.nsIDOMWindowUtils)
					.sendKeyEvent("keypress", KeyEvent.DOM_VK_ENTER, 0, 0);
			}
		},
		{
			label: "當前日期 & 時間",
			oncommand: function() {
				var localnow = new Date().toLocaleFormat("%Y.%m.%d & %H:%M:%S");
				addMenu.copy(localnow);
				goDoCommand("cmd_paste");
			},
		},
		{command: 'context-undo'},
		{command: 'context-sep-undo', style:'display:none;'},
		{command: 'context-sep-paste'},
		{command: 'context-keywordfield'},
		{command: 'spell-separator', style:'display:none;'},
		{command: 'spell-check-enabled'},
		{command: 'spell-add-dictionaries-main'},
		{command: 'spell-dictionaries'},
	];
	var menu = PageMenu({condition:'input', insertAfter:'context-sep-open', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it) {
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="input"] #' + it.command + '{display: none !important;}')
	});
};

var Punctuation = PageMenu({
	label:"標點符號",
	condition:"input",
	insertBefore:"context-undo",
	oncommand: function(event) {
		var focused = document.commandDispatcher.focusedElement;
		var input_text = event.target.getAttribute('input_text');
		if(focused) {
			var host = addMenu.convertText("%h"),
				url = addMenu.convertText("%u");
			if (host.contains("tieba") || url.startsWith("data:text/html")) {
				addMenu.copy(input_text);
				goDoCommand("cmd_paste");
			}
			else {
				var aStart = aEnd = focused.selectionStart;
				focused.value = focused.value.slice(0, aStart) + input_text + focused.value.slice(aEnd);
				var aOffset = aStart + input_text.length;
				focused.setSelectionRange(aOffset, aOffset);
			}
			return;
		}
		else {
			addMenu.copy(input_text);
			goDoCommand("cmd_paste");
		}
		return;
	}
});
Punctuation([
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

var SearchMenu = PageMenu({
	label:"搜索選單",
	tooltiptext: "左鍵：新分頁前景\n中鍵：此分頁\n右鍵：新分頁背景\n\n❖ 若點擊搜索選單，便貼上就瀏覽\n❖ 若搜索欄有文字，便搜尋搜索欄文字\n❖ 若搜索欄沒有文字並選取了文字，便搜尋選取文字\n❖ 否則便搜尋剪貼簿中的文字",
	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACo0lEQVQ4jY3Mz2vTcBgG8FdnallK3VKW/mAuLLD1B8OlI23arW22NGWHUNMcwkAHybZT0a21uq60PWQDxzwNetCL9KJ40FvBg55E/wTR01BBEMSDB0Xc6vZ6Sike5r7wuTzf530AAMCyrPP1ev2apmlPFUV5eRpN0540m80CAJwD+9g0zcfhcBhDoRCGw+FThUIhjEQiaJpmCwAAGo2GHgwGcWJiomdqaupYFMWPkiS9TSaTP/r/bJFIBGu1mgT5fP4Ry7Jok2X51dbW1rSu6wOtVuuiZVkuwzBucRz3q7/HsiwqirIPkiR1GIZBhmFwfn7+tWVZg2tra9VMJvNZEISfuVzuRbPZDBaLxcLk5OSx3WUYBmVZboMoip1AIIDj4+Mn1WqVX11dvT06OoqBQKAnHo9/2tvbuyRJ0vP+fGFhoQ2pVKrj9XpxZmbmi67rA/F4/MDr9WI/mqZxeXn5uq7rN2ma7uXpdLoNyblkh6Io5DjuQNf1gWg0+o2iKPyXqqo3TNM0+7NUKtWGRCLRcbvdyLLs793dXU86nX7mdruxn9/v725sbEwtLi7u9+eJRKINsVisQ5IkkiSJ+Xx+u9FoXOY47p3L5UKSJNHn8x0pinIHAM4LgvDe7pIkiYIgtIHn+Y7T6USn04kjIyNHhmGsWJY1aBjGVVVVV0qlUtCyrAsAAOvr69Msy361+70Bh8OBNpIkT3ief6Oqam1paakoy/IDnuc/lMvlJABAuVzm/H7/ocPhwFgs1oZMJvOQIAj8n7Gxse+bm5tzOzs7MZ/Pd0gQBIqieA8qlUrW5XKdnGXE4/F0aZruEgSBw8PDfyqVShQAADRN2x4aGjo+ywhBEEhRVLdQKJSg/9VqtVg2m707Ozt7/zS5XG67Xq9fse/+AnDURgQylYErAAAAAElFTkSuQmCC",
	insertBefore:"context-undo",
	onclick: function(event) {
		var SV = document.getElementById('searchbar').value,
			selected = addMenu.convertText("%s"),
			clipboard = addMenu.convertText("%p"),
			ll = event.target.getAttribute('label'),
			url = event.target.getAttribute('SUrl');
		if (!SV == "") {
			var x = SV;
			document.getElementById('searchbar').value = "";
		}
		else {
			if (selected) {var x = selected;}
			else {var x = clipboard;}
		}
		switch(event.button) {
			case 0:
				if (ll == "Google 加密站內") {
					gBrowser.selectedTab = gBrowser.addTab(url + content.location.host + " " + x);
				}
				else {
					gBrowser.selectedTab = gBrowser.addTab(url + x);
				}
				return;
			break;
			case 1:
				if (ll == "Google 加密站內") {
					loadURI(url + content.location.host + " " + x);
				}
				else {
					loadURI(url + x);
				}
				return;
			break;
			case 2:
				if (ll == "Google 加密站內") {
					gBrowser.addTab(url + content.location.host + " " + x);
				}
				else {
					gBrowser.addTab(url + x);
				}
				return;
			break;
		}
	}
});

var gIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC";

SearchMenu([
	{
		label: "Google 加密",
		SUrl: "https://encrypted.google.com/#q=",
		image: gIcon
	},
	{
		label: "Google 加密站內",
		SUrl: "https://encrypted.google.com/#q=site:",
		image: gIcon
	},
	{
		label: "Google 翻譯",
		SUrl: "http://translate.google.com.tw/?hl=zh-TW#auto/zh-TW/",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC"
	},
	{
		label: "Google 圖片",
		SUrl: "https://duckduckgo.com/?q=!img ",
		image: gIcon
	},
	{
		label: "百度圖片",
		SUrl: "http://image.baidu.com/i?&cl=2&ie=utf-8&oe=utf-8&word=",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoklEQVQ4jZ2T6UuUURSHzz9QRhCpJJVZERUFmVmp7bZYZiUttpiEVliEtCctJtGHPgQGEm1EUbQHUlCBWSI1NbagJfheX3XG1LSmhWL0NTtPH6ZmEulLF86XcznPPb/7O0eksAYprEEK3iKHqpED1Uj+a2TvK2TXC2SHG8lzIVufILkVyKZyJLsMySpF1t1HpLCG/z2ScQ+Rgre9LqzaTj1S0K7VVR0KYKxOtY2jvQAr7iBysLpH0nGUPTvaGBVTp5kZzWobh2mTGzVljldt4/QEpJcgsr8qmPj8qRuAXXltTB7fQE5mC26Xn7hx9cyd4cHt8vcEpN1GZN9rADyNXWxY26y5Oa1668ZXcjJbKC7yAVBc5KO4yIfb5cfr6QoBFt1EZPdLAK5d+sKQgZYmxjUogG0cOjtCsm3jsGrZO1YuadLWlh8BwPxriOysBOC5y09CbANLFzZxt+QbtnHYvKGFvC2t2Mbh2NGPTBpfT0ykwe3yK4DMvYLI9mcAdHfDjatftbjIp7ZxSE326ogoo2NibNYsf6e2cViW6iVtvlcb6gOOyKxLiGx7Gmyzo+MntnFIm+dlZJTR6HDDn1ixuElt4/D44XfltzKZfhGR3Iog4E1VJymzvYwYVMffxdHhhnHDbbIymrHrQlZK4nlENpUDoAqH89t18ACjQweaXoDBA4yOHWbzqPR78Gdl6jlEssuCgKMFHzS8r6WR/SwiwywN71OrEWEWUf0tHdTf0mERhssXvoQA8WcRySoNtuRp7GJLdivJSR7SU5o4cdzHieM+Zk1tJHZ0PRvXN9P2/kdIQtxpRNY9+Hu4FKgEnvwjKntM4sRTiKy+F1iK9BJkyW0k9Say4HrA49mXkZkXkaQLSMJ5ZMo5JP5M4OXYU8iEk/wC6ZkDX3ssK20AAAAASUVORK5CYII="
	},
]);

new function () {
	var items = [
		{command: 'context-copy'},
		{
			label: "複製為純文字 / HTML",
			tooltiptext: "左鍵：複製為純文字\n右鍵：複製為HTML",
			onclick: function(e) {
				switch(e.button) {
					case 0:
						Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(content.getSelection());
					break;
					case 2:
						var div = content.document.createElement('div');
						div.appendChild(content.getSelection().getRangeAt(0).cloneContents());
						Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(div.innerHTML);
					break;
				}
			},
			condition: 'noinput'
		},
		{
			label: "複製為 Code 格式",
			tooltiptext: "左鍵：複製\n右鍵：複製並貼上",
			onclick: function(event) {
				var selected = addMenu.convertText("%s");
					switch(event.button) {
					case 0:
						addMenu.copy("[code]" + selected + "[/code]");
					break;
					case 2:
						addMenu.copy("[code]" + selected + "[/code]");
						goDoCommand("cmd_paste");
					break;
				}
			}
		},
		{
			label: "複製為 Quote 格式",
			tooltiptext: "左鍵：複製\n右鍵：複製並貼上",
			onclick: function(event) {
				var selected = addMenu.convertText("%s");
					switch(event.button) {
					case 0:
						addMenu.copy("[quote]" + selected + "[/quote]");
					break;
					case 2:
						addMenu.copy("[quote]" + selected + "[/quote]");
						goDoCommand("cmd_paste");
					break;
				}
			}
		},
		{
			label: "複製為 Url 格式",
			tooltiptext: "左鍵：複製\n右鍵：複製並貼上",
			onclick: function(event) {
				var selected = addMenu.convertText("%s");
					switch(event.button) {
					case 0:
						addMenu.copy(selected);
						goDoCommand("cmd_paste");
					break;
					case 2:
						addMenu.copy("[url=" + selected + "][/url]");
						goDoCommand("cmd_paste");
					break;
				}
			}
		},
		{command: 'context-cut'},
		{command: 'context-delete'},
		{
			label: "開啟選取範圍內的鏈結",
			oncommand: function(event) {
				var urls = {};
				addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {
					if (!urls[a.href] && /^http|^file|^about/.test(a.href))
						gBrowser.addTab(a.href);
					urls[a.href] = true;
				});
			},
			condition: 'noinput'
		},
		{
			label: "複製選取範圍內的鏈結",
			oncommand: function(event) {
				var urls = {};
				addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {urls[a.href] = true;});
				urls = Object.keys(urls);
				if (urls.length === 0) return;
				addMenu.copy(urls.join('\n'));
			},
			condition: 'noinput'
		},
		{
			label: "開啟選取範圍內的圖片",
			oncommand: function() {
				var urls = [];
				addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {
					if (/\.(jpe?g|png|gif|bmp)$/i.test(a.href) && urls.indexOf(a.href) === -1)
						urls.push(a.href);
				});
				if (urls.length === 0) return;

				var htmlsrc = '<style> img {max-width: 100%; max-height: 100%;} </style>';
				htmlsrc += urls.map(function(u) '\n<img src="' + u + '">').join("");
				gBrowser.addTab("data:text/html;charset=utf-8," + encodeURIComponent(htmlsrc));
			}
		},
		{
			label: "勾選選取範圍內的選擇框",
			icon: "checkbox",
			checked: true,
			oncommand: function(event) {
				addMenu.$$('input[type="checkbox"]:not(:disabled)', null, true).forEach(function(a) {
					a.checked = true;
				});
			},
			condition: 'noinput'
		},
		{
			label: "取消勾選選取範圍內的選擇框",
			icon: "checkbox",
			oncommand: function(event) {
				addMenu.$$('input[type="checkbox"]:not(:disabled)', null, true).forEach(function(a) {
					a.checked = false;
				});
			},
			condition: 'noinput'
		},
		{
			label: "反轉輸入選取文字",
			oncommand: "invertInput.invertSelection();",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAgklEQVRYhe2VywmAMBAFn1qANYg12YInzRYZPzXpRQ8RxIC4wfXkG9hDYFgmEAhACHmkqwDnAVkAGcLZwlUjAyDbOc7buGrcel0qi42rD5ijW402rpq+DovcCsgUzhYu0ZFFj+qY124KKUsZwAAGMIABPwvII/HmM2oKoC0NQgj5hh2kZAWqL5sf6AAAAABJRU5ErkJggg=="
		},
	];
	var menu = PageMenu({condition:'select', insertBefore:'context-sep-open', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it) {
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="select"] #' + it.command + '{display: none !important;}')
			css('#contentAreaContextMenu[addMenu~="input"] #' + it.command + '{display: none !important;}')
	});
};
