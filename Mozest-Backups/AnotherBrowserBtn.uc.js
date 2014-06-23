(function() {
	window.AnotherBrowser = {
		init: function() {
			var bar = "TabsToolbar";
			this.icon = $(bar).appendChild($C("toolbarbutton", {
				id: "AnotherBrowser",
				class: "toolbarbutton-1",
				label: "另一個視窗",
				tooltiptext: "左鍵：顯示 Index\n中鍵：顯示收藏庫\n右鍵：顯示 Website",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArUlEQVQ4jc2TUQrDIBBE3wVMcoEk90iOmx5C/wO1f80FhNqL9CMDXYpCIIVWGFzX2dHVXYA7kIFk8AQ80ApePsvJiuUBTEAPjJpn4Cq7lz1/cCbFkuS0YwRWI7BWOOk/BLLyG+QctI5GIFY4GSCIsBrcgAvghEU+y4mKpTMnWTTmuk2F08H+z6VNZwRchdPCXiSlFJYDKfivPOLv6+C0wOlm2ii3c+DdzoFyO28vxlBcNJTkO0QAAAAASUVORK5CYII=",
				onclick: "AnotherBrowser.openPanel(event);",
			}));

			var panel = $("mainPopupSet").appendChild($C("panel", {
				id: "AnotherBrowser-panel",
				type: "arrow",
				flip: "both",
				side: "top",
				consumeoutsideclicks: "false",
				noautofocus: "false",
				panelopen: "true",
			}));

			panel.appendChild($C("iframe", {
				id: "AnotherBrowser-iframe",
				type: "content",
				flex: "1",
				transparent: "transparent",
				showcaret: "true",
				autocompleteenabled: "true",
				style: "width: 1024px; height: 768px;",
			}));
		},
		openPanel: function(event) {
			var self = this;
			var panel = $("AnotherBrowser-panel"),
				iframe = $("AnotherBrowser-iframe");
			var openPopup = function() {
				panel.openPopup(self.icon, "after_end", -8, 0, false, null, null);
			};
			openPopup();
			switch(event.button) {
				case 0:
					iframe.contentDocument.location.href = "chrome://userchromejs/content/index.html";
				break;
				case 1:
					iframe.contentDocument.location.href = "chrome://browser/content/places/places.xul";
				break;
				case 2:
					iframe.contentDocument.location.href = "chrome://userchromejs/content/Website.html";
					event.preventDefault();
				break;
			}
		},
	};
	window.AnotherBrowser.init();

	function $(id, doc) (doc || document).getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
