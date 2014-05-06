(function() {
	var AllTabsBtn = document.getElementById("alltabs-button");
	AllTabsBtn.setAttribute("onDOMMouseScroll", "ReloadOrStopScroll.onScroll(event);");
	AllTabsBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAYklEQVQ4je3SMQ6CQAAF0ReNVGojFNp5Aag9HB23oOKc7EYbNyZWu4RyJ5nyT/X5cUGX6dkfEyLemQaMadwWjpMrrvDcME7ea6AGdgs8bLtywA2OWAojETMOvjQY8Mq0xwk+lZbHj/TRZdcAAAAASUVORK5CYII=)";
	AllTabsBtn.setAttribute("tooltiptext","左鍵：分頁選單\n雙擊左鍵：重新載入此分頁\n中鍵：關閉其他分頁\n右鍵：停止載入此分頁\n向上滾動：停止載入所有分頁\n向下滾動：重新載入所有分頁");
	AllTabsBtn.addEventListener("click", function(event) {
		if (event.button == 1) {
			gBrowser.removeAllTabsBut(gBrowser.mCurrentTab);
		}
		else if (event.button == 2) {
			BrowserStop();
		}
		event.preventDefault();
	}, false);
	AllTabsBtn.addEventListener('dblclick', function (event) {
		if (event.button == 0) {
			gBrowser.mCurrentBrowser.reload();
		}
		event.preventDefault();
	}, false);
	ReloadOrStopScroll = {
		onScroll: function(event) {
			if (event.detail > 0) {gBrowser.reloadAllTabs();}
			else {Array.map(gBrowser.browsers, function(browser) {browser.stop()});}
			return;
		}
	};
	var AllTabsPopup = document.getElementById("alltabs-popup");
	AllTabsPopup.setAttribute('onclick', 'event.preventDefault(); event.stopPropagation();');
	AllTabsPopup.setAttribute('ondblclick', 'event.preventDefault(); event.stopPropagation();');
})();
