(function() {
	document.getAnonymousElementByAttribute($("urlbar"), "anonid", "textbox-input-box").appendChild($("alltabs-button", {
		tooltiptext: "左鍵：所有分頁選單",
		ordinal: "1",
		style: "padding: 0px;"
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
		",
		onmouseover: "AnotherBrowser.openPanel(event); UCL.rebuild(); USL.rebuild(); ucjsMouseGestures.reload(true); addMenu.rebuild(true); uAutoPagerize.loadSetting(true); uAutoPagerize.loadSetting_CN(); refererChanger.reload(true); KeyChanger.makeKeyset(true);",
		style: "margin: 0px -4px 0px -2px;"
	}));

	$("urlbar-icons").appendChild($("downloads-button" , {
		onmouseover: "DownloadsIndicatorView.onCommand(event);",
		style: "padding: 0px; margin-left: -1px;",
	}));

//	document.querySelector("#nav-bar").removeAttribute("overflowable");
//	setTimeout (function() {$('PanelUI-popup').hidePopup();}, 4000);
/*	setTimeout (function() {
		$('PanelUI-menu-button').click();
		setTimeout (function() {
			$('PanelUI-menu-button').click();
			$('AnotherBrowser').click();
		}, 500);
	}, 500);*/

	function DelayStart() {
		$("tczoompanel", {
			tooltiptext: "左鍵：快速縮放選單\n向上滾動：放大\n向下滾動：縮小",
			onclick: "if (event.button == 2) {event.preventDefault();}",
			onDOMMouseScroll: "if (event.detail > 0) {FullZoom.reduce();} else {FullZoom.enlarge();} return;",
			style: "margin: 0px -3px;",
		});

		$("urlbar-icons").appendChild($("clipple-statusbar-icon"));

		$("abp-menuitem", {class: "menu-iconic"});

		$("editBookmarkPanel", {position: "after_start"});

		$("urlbar-reload-button", {
			tooltiptext: "左鍵：重新載入此分頁\n滾動：重新載入所有分頁",
			onDOMMouseScroll: "gBrowser.reloadAllTabs();",
		});

		$("urlbar-stop-button", {
			tooltiptext: "左鍵：停止載入此分頁\n滾動：停止載入所有分頁",
			onDOMMouseScroll: "Array.map(gBrowser.browsers, function(browser) {browser.stop()});",
		});

		$("uAutoPagerize-icon", { //identity-box
			onmouseover: "document.getElementById('downloadsPanel').hidePopup();"
		});

		$('AnotherBrowser').click();
	}

	function $(id, attr) {
		var el = document.getElementById(id);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}

	if (location == "chrome://browser/content/browser.xul") {setTimeout(DelayStart, 1000);}
})();
