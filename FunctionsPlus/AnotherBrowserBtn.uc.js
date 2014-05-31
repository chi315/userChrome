(function(){
	window.AnotherBrowser = {
		init: function() {
			var bar = "TabsToolbar";
			this.icon = $(bar).appendChild($C("toolbarbutton", {
				id: "AnotherBrowser",
				class: "toolbarbutton-1",
				label: "另一個視窗",
				tooltiptext: "顯示 Index",
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
			iframe.contentDocument.location.href = "chrome://userchromejs/content/index.html";
			openPopup();
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
