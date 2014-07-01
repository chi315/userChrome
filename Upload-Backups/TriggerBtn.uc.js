(function() {
	var bar = "TabsToolbar";
	TriggerButton = {
		init: function() {
			this.icon = $(bar).appendChild($C("toolbarbutton", {
				id: "Trigger-button",
				class: "toolbarbutton-1",
				label: "觸發按鈕",
				tooltiptext: "顯示 Index\n重新載入",
//				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArUlEQVQ4jc2TUQrDIBBE3wVMcoEk90iOmx5C/wO1f80FhNqL9CMDXYpCIIVWGFzX2dHVXYA7kIFk8AQ80ApePsvJiuUBTEAPjJpn4Cq7lz1/cCbFkuS0YwRWI7BWOOk/BLLyG+QctI5GIFY4GSCIsBrcgAvghEU+y4mKpTMnWTTmuk2F08H+z6VNZwRchdPCXiSlFJYDKfivPOLv6+C0wOlm2ii3c+DdzoFyO28vxlBcNJTkO0QAAAAASUVORK5CYII=",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAEklEQVQ4jWNgGAWjYBSMAggAAAQQAAF/TXiOAAAAAElFTkSuQmCC",
				onmouseover: "AnotherBrowser.openPanel(event); UCL.rebuild(); USL.rebuild(); ucjsMouseGestures.reload(true); addMenu.rebuild(true); uAutoPagerize.loadSetting(true); uAutoPagerize.loadSetting_CN(); refererChanger.reload(true); KeyChanger.makeKeyset(true);",
				ordinal: "1",
			}));
		}
	};
	TriggerButton.init();
	function $(id, doc) (doc || document).getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
