說明
==========
<h3>事先聲明</h3>
此頁面內的檔案不是_addmenu.js (addMenuPlus.uc.js 配置)，純粹是一個 function() 集合帖，故不要全部複製來使用……<br>
另外，有些功能需下載以下檔案並放到chrome資料夾內才能使用，包括：<br>
截圖：<a href="http://g.mozest.com/attachment.php?aid=30568&k=e1d2830f15b6c45f80adf52639cd46bd&t=1403967622&fid=75&sid=5d46Px3xQ6Eni8tTMz4dCCirYDWhCqI%2FmzaUh8SmZj46kiU">WebScreenShotMod.uc.zip</a><br>
反轉輸入：<a href="http://g.mozest.com/attachment.php?aid=30789&k=3fdb521d46218c9439182930904df8a1&t=1403967378&fid=75&sid=2dbe933%2Bo8G42tL%2BgTVGOqZMnakcsAnjmdlqC72jQHavOzw">InvertInput.uc.zip</a><br>

<h3>addMenuPlus的使用方法</h3>
詳情請參考ywzhaiqi大神的說明：<br>
<a href="https://github.com/ywzhaiqi/userChromeJS/tree/master/addmenuPlus" target="_blank">userChromeJS/addmenuPlus at master · ywzhaiqi/userChromeJS · GitHub</a><br>
<a href="http://bbs.kafan.cn/thread-1554431-1-1.html" target="_blank">uc<span href="tag.php?name=%E8%84%9A%E6%9C%AC" onclick="tagshow(event)" class="t_tag">腳本</span> addMenuPlus.uc.js</a><br>
<a href="http://bbs.kafan.cn/forum.php?mod=viewthread&amp;tid=1576878&amp;page=1&amp;extra=#pid28788912" target="_blank">addMenuPlus.uc.js 配置說明</a><br>
<br>

<h3>可參考的配置</h3>
<ul>
<li><a href="https://github.com/ywzhaiqi/userChromeJS/blob/master/addmenuPlus/_addmenu.js">_addmenu.js</a></li>
<li><a href="https://github.com/ywzhaiqi/userChromeJS/blob/master/addmenuPlus/_addmenu%E7%A4%BA%E4%BE%8B%E5%90%88%E9%9B%86.js">_addmenu示例合集.js</a></li>
<li><a href="https://github.com/Drager-oos/userChrome/blob/master/addMenuPlus.uc.js/Now%20Used.js">Now Used.js</a><br></li>
<li><a href="https://github.com/Drager-oos/userChrome/blob/master/addMenuPlus.uc.js/Recently%20Used%20(For%20Backups).js">Recently Used (For Backups).js</a><br></li>
<li><a href="http://g.mozest.com/viewthread.php?tid=44436&amp;highlight=">_addmenu.js配置 - 自用功能</a></li>
<li><a href="https://github.com/defpt/userChromeJs/tree/master/addMenuPlus">defpt 的 addMenuPlus 配置</a></li>
<li><a href="http://bbs.kafan.cn/thread-1677811-1-1.html">bobdylan520 的 addMenuPlus 配置</a></li>
<li><a href="http://bbs.kafan.cn/thread-1682712-1-1.html">creek560 的 addmenuPlus 配置</a></li>
</ul>

<h3>以下為測試示例</h3>
<code><pre>var FBMenu = PageMenu({
	label:"最常瀏覽網頁選單",
	tooltiptext: "左鍵：新分頁前景\n中鍵：此分頁\n右鍵：新分頁背景",
	insertBefore:"context-undo",
	onclick: function(event) {
		var url = event.target.getAttribute('LINK');
		switch(event.button) {
			case 0:
				gBrowser.selectedTab = gBrowser.addTab(url);
			break;
			case 1:
				loadURI(url);
			break;
			case 2:
				gBrowser.addTab(url);
			break;
		}
	}
});
FBMenu([
	{
		label: "",
		LINK: ""
	},
]);</code></pre>
