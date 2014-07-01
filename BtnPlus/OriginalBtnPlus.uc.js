(function() {
	$("tczoompanel", {
		tooltiptext: "左鍵：快速縮放選單\n向上滾動：放大\n向下滾動：縮小",
		onclick: "if (event.button == 2) {event.preventDefault();}",
		onDOMMouseScroll: "if (event.detail > 0) {FullZoom.reduce();} else {FullZoom.enlarge();} return;",
		style: "margin: 0px -3px;",
	});

	document.getAnonymousElementByAttribute($("urlbar"), "anonid", "textbox-input-box").appendChild($("alltabs-button", {
		tooltiptext: "左鍵：所有分頁選單",
		ordinal: "1",
	}));

	$("urlbar").appendChild($("PanelUI-button", {
		tooltiptext: "左鍵：開啟選單\n中鍵：Adblock Plus 條件偏好設定\n右鍵：窗口占用屏幕右下半部分\n向上滾動：隱藏Firefox\n向下滾動：清除startupCache並重新啟動瀏覽器",
		onclick: "\
		if (event.button == 1) {document.getElementById('abp-menuitem-filters').doCommand();}\
		else if (event.button == 2) {\
			resizeTo(screen.availWidth / 2, screen.availHeight / 2, moveTo(screen.availWidth / 2, screen.availHeight / 2));\
			event.preventDefault();\
		}\
		",
		onDOMMouseScroll: "\
		if (event.detail > 0) {Services.appinfo.invalidateCachesOnRestart() || Application.restart();}\
		else {HideFirefox();}\
		return;\
		"
	}));

//	document.querySelector("#nav-bar").removeAttribute("overflowable");

	$("editBookmarkPanel", {position: "after_start"});

	$("back-button" , {
		onmouseover: "document.getElementById('backForwardMenu').openPopupAtScreen(event.screenX, event.screenY, true);"
	});

	$("forward-button" , {
		onmouseover: "document.getElementById('backForwardMenu').openPopupAtScreen(event.screenX, event.screenY, true);"
	});

	$("urlbar-reload-button", {
		tooltiptext: "左鍵：重新載入此分頁\n滾動：重新載入所有分頁",
		onDOMMouseScroll: "gBrowser.reloadAllTabs();",
		onmouseover: "document.getElementById('backForwardMenu').hidePopup();"
	});

	$("urlbar-stop-button", {
		tooltiptext: "左鍵：停止載入此分頁\n滾動：停止載入所有分頁",
		onDOMMouseScroll: "Array.map(gBrowser.browsers, function(browser) {browser.stop()});",
		onmouseover: "document.getElementById('backForwardMenu').hidePopup();"
	});

	$("urlbar-icons").appendChild($("downloads-button" , {
		onmouseover: "DownloadsIndicatorView.onCommand(event);",
		style: "padding: 0px; margin-left: -1px;",
	}));

	$("identity-box", {
		onmouseover: "document.getElementById('downloadsPanel').hidePopup(); document.getElementById('AnotherBrowser-panel').hidePopup();"
	});
	
//	setTimeout (function() {$('PanelUI-popup').hidePopup();}, 4000);
	setTimeout (function() {
		$('PanelUI-menu-button').click();
		setTimeout (function() {
			$('PanelUI-menu-button').click();
			$('AnotherBrowser').click();
		}, 500);
	}, 500);

	function $(id, attr) {
		var el = document.getElementById(id);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
