// ==UserScript==
// @name			RightClickPlus.uc.js
// @description		按住右鍵新分頁打開鏈結，如果 link 的 target="_blank" 前景打開，否則後景打開，雙擊左鍵復原關閉分頁，雙擊右鍵關閉分頁
// @homepageURL		https://github.com/Drager-oos/userChrome/blob/master/SubScript/Backups/RightClickPlus.uc.js
// ==/UserScript==
(function() {
	function findLink(element) {
		// Super_start
		if (element.className == 'site-snapshot') {
			return element.parentNode;
		}
		switch (element.tagName) {
			case 'A': return element;
			case 'B': case 'I': case 'SPAN': case 'SMALL':
			case 'STRONG': case 'EM': case 'BIG': case 'SUB':
			case 'SUP': case 'IMG': case 'S':
			case 'FONT':
				var parent = element.parentNode;
				return parent && findLink(parent);
			default:
				return null;
		}
	}

	function findFrames(frame) {
		var frames = frame.frames;
		var fs = {};
		for (var i = 0, len = frames.length; i < len; ++i) {
			var f = frames[i];
			fs[f.name] = f;
			var children = findFrames(f);
			for (k in children) {
				var f = children[k];
				fs[f.name] = f;
			}
		}
		return fs;
	}

	function followLink(args) {
		var link = args.link;
		var window = args.window;
		var href = link.href;
		var target = link.target;
		if (!target || target == '_self') {
			gBrowser.addTab(href);
		} else {
			switch (target) {
			case '_top':
				gBrowser.addTab(href);
				break;
			case '_parent':
				gBrowser.addTab(href);
				break;
			case '_blank':
				gBrowser.selectedTab = gBrowser.addTab(href);
				break;
			default:
				var frames = findFrames(window.top);
				var frame = frames[target];
				if (frame) {
					gBrowser.addTab(href);
				} else {
					gBrowser.selectedTab = gBrowser.addTab(href);
				}
			}
		}
	}

	gBrowser.mPanelContainer.addEventListener('click', function(e) {
		if (e.button == 2 && !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey) {
			var link = findLink(e.target);
			if (link) {
				var href = link.href;
				if (href && href.match(/^(https?|ftp|chrome):\/\/|^about:/)) {
					e.preventDefault();
					e.stopPropagation();
					$("contentAreaContextMenu").hidePopup();
					followLink({link: link, window: e.view});
				}
			}
		}
	}, false);

	gBrowser.mPanelContainer.addEventListener("dblclick", function(e) {
		var eName = e.target.nodeName || e.target.localName || e.target.tagName;
		if (eName == "TEXTAREA" || eName == "INPUT" || eName == "A" || eName == "IMG" || eName == "B" || eName == "VIDEO" || e.target.isContentEditable) return;
		if (e.button == 0) {
			$('History:UndoCloseTab').doCommand();
		}
		else if (e.button == 2) {
			$("cmd_close").doCommand();
			$("contentAreaContextMenu").hidePopup();
		}
		e.preventDefault();
	}, false);

/* 按住右鍵250亳秒後關閉分頁
	var tid;
	gBrowser.mPanelContainer.addEventListener('mousedown', function(e) {
		if (e.button != 2) return;
		tid = setTimeout(function() {
			e.preventDefault();
			$("cmd_close").doCommand();
			$("contentAreaContextMenu").hidePopup();
		}, 250);
	}, false);

	gBrowser.mPanelContainer.addEventListener('mouseup', function(e) {
		clearTimeout(tid);
	}, false);*/

	function $(id) document.getElementById(id);
})();
