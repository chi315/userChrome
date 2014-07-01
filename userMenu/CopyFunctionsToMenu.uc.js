(function() {
/* 複製功能到BMB_bookmarksPopup */
	var n, Item, FavIDs;
	FavIDs = [
		'file-menu',
		'edit-menu',
		'view-menu',
		'history-menu',
		'bookmarksMenu',
//		'tools-menu',
		'helpMenu',
//		'webDeveloperMenu',
		'goOfflineMenuitem',
		'fullScreenItem',
		'FavIconReloader',
		];
	var BMBPopup = document.getElementById('BMB_bookmarksPopup'); /* contentAreaContextMenu */
	for(n=0; n<FavIDs.length; n++) {
		Item = document.getElementById(FavIDs[n]);
			if (Item) {
				Item = Item.cloneNode(true);
				Item.removeAttribute('key');
			}
//	var BMBbTb = document.getElementById('BMB_bookmarksToolbar');
	var BMBvBS = document.getElementById('BMB_viewBookmarksSidebar');
//		if (Item!=null) BMBPopup.appendChild(Item);
//		if (Item!=null) BMBPopup.insertBefore(Item, BMBPopup.firstChild);
		if (Item!=null) BMBPopup.insertBefore(Item, BMBvBS);
	}

/* 複製功能到menu_ToolsPopup */
	var n, Item, FavIDs;
	FavIDs = [
		'noscript-context-menu',
		'tongwen-context-menu',
//		'tongwen-context-autoconvert-menu',
//		'dtaCtxCompact',
//		'snaplinksMenuEntry',
		];
	var ToolsPopup = document.getElementById('menu_ToolsPopup');
	for(n=0; n<FavIDs.length; n++) {
		var FavID = FavIDs[n];
			Item = document.getElementById(FavID);
			if (Item) {
				Item = Item.cloneNode(true);
				Item.removeAttribute('key');
			}
		if (Item!=null) ToolsPopup.appendChild(Item);
	}

/* 複製功能到devToolsSeparator */
	var n, Item, FavIDs;
	FavIDs = [
		'charsetMenu',
		];
	var wDM = document.getElementById('webDeveloperMenu');
	for(n=0; n<FavIDs.length; n++) {
		var FavID = FavIDs[n];
			Item = document.getElementById(FavID);
			if (Item) {
				Item = Item.cloneNode(true);
				Item.removeAttribute('key');
			}
		if (Item!=null) wDM.parentNode.insertBefore(Item, wDM);
	}
})();
