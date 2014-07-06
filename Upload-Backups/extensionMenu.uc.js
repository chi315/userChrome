(function() {
	var dTS = $("devToolsSeparator")
	var ExtensionMenu = dTS.parentNode.insertBefore($C("menu", {
		id: "Extension-Menu",
		class: "menu-iconic",
		label: "附加元件選單",
		tooltiptext: "附加元件選單",
		style: "list-style-image: url(chrome://mozapps/skin/extensions/extensionGeneric-16.png)"
	}), dTS);
	ExtensionMenu.appendChild($C("menupopup")).addEventListener("popupshowing", showExtensionList, false);

	function showExtensionList(node) {
		node = node.target;
		while (node.hasChildNodes()) {
			node.removeChild(node.lastChild);
		}
		var AddonManager = Components.utils.import('resource://gre/modules/AddonManager.jsm').AddonManager;
		AddonManager.getAddonsByTypes(["extension"], function(extension) {
			var item = [];
			for(var i=0; i < extension.length; i++) {
				item[i] = node.appendChild(document.createElement("menuitem"));
				item[i].setAttribute("label", extension[i].name + ' [' + extension[i].version + ']');
				item[i].setAttribute("type", "checkbox");
				item[i].setAttribute("checked", !extension[i].userDisabled);
				item[i].setAttribute("Disabled", extension[i].appDisabled);
				item[i].setAttribute("extensionID", extension[i].id);
				item[i].onclick = function(evt) {
					AddonManager.getAddonByID(evt.target.getAttribute("extensionID"), function(p) {
						p.userDisabled = p.userDisabled ? false : true;
					});
				}
			}
		});
	}

	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
