(function(){
	window.AnotherBrowser = {
		init: function() {
			var bar = "TabsToolbar";
			this.icon = $(bar).appendChild($C("toolbarbutton", {
				id: "AnotherBrowser",
				class: "toolbarbutton-1",
				label: "另一個視窗",
				tooltiptext: "左鍵：顯示 Index\n中鍵：顯示收藏庫\n右鍵：顯示 Website",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA9ElEQVQ4jc3SwS4DcRDH8U94BJdK6RM4IpHwGNWn6M0zEK+g6nXcSTjJ7pIKDpKta3Uddsqq7ZKeTPLLHuY/35md+fE9WhgiR9GgHGdoz9XrI0Ea36pSPGMSkAkGs8LV6L6LA+zXaBtbOMJLZRItnOISVzWdZ7rGMdYC8h4QQ7ziEN1f/n+Kk5jkaQZ4i6LuHwBFTLITOylUFnIbyWyBRjF2EjtJqoAR9rCJTo02Iv8YsB+ALB42RQcP/wqQKg+wNOAOF8sA7pVn7GOdLx/0lNtedIVevL1RuvczBkof5BZ7IIv8VGn7lSqgHZCxZgeOcT7f/QP02IusQJoFMgAAAABJRU5ErkJggg==",
				onclick: "AnotherBrowser.openPanel(event);",
			}));

			// panel
			var panel = $C("panel", {
				id: "AnotherBrowser-panel",
				type: "arrow",
				flip: "both",
				side: "top",
				consumeoutsideclicks: "false",
				noautofocus: "false",
				panelopen: "true",
			});

			// panel 裡添加 iframe
			panel.appendChild($C("iframe", {
				id: "AnotherBrowser-iframe",
				type: "content",
				flex: "1",
				transparent: "transparent",
				showcaret: "true",
				autocompleteenabled: "true",
				style: "width: 1024px; height: 768px;",
			}));

			var mainPopupSet = $("mainPopupSet");
			mainPopupSet.appendChild(panel);
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
