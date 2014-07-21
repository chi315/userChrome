(function() {
	function $(id) document.getElementById(id);
/* 複製功能到書籤按鈕選單 */
	var n, Item, FavIDs;
	FavIDs = [
		'file-menu',
		'edit-menu',
		'view-menu',
		'history-menu',
		'bookmarksMenu',
//		'tools-menu',
		'helpMenu',
		'goOfflineMenuitem',
		'fullScreenItem',
		'FavIconReloader',
		];
	for(n = 0; n < FavIDs.length; n++) {
		Item = $(FavIDs[n]);
			if (Item) {
				Item = Item.cloneNode(true);
				Item.removeAttribute('key');
			}
//		if (Item!=null) $('contentAreaContextMenu').appendChild(Item); /* 右鍵選單 */
//		if (Item!=null) $('BMB_bookmarksPopup').insertBefore(Item, $('BMB_bookmarksPopup').firstChild);
		if (Item!=null) $('BMB_bookmarksPopup').insertBefore(Item, $('BMB_viewBookmarksSidebar')); /* $('BMB_bookmarksToolbar') */
	}

/* 複製功能到工具選單 */
	var n, Item, FavIDs;
	FavIDs = [
		'noscript-context-menu',
		'tongwen-context-menu',
		];
	for(n = 0; n < FavIDs.length; n++) {
		var FavID = FavIDs[n];
			Item = $(FavID);
			if (Item) {
				Item = Item.cloneNode(true);
				Item.removeAttribute('key');
			}
		if (Item!=null) $('menu_ToolsPopup').insertBefore(Item, $("menu_preferences"));
	}

	var n, Item, FavIDs;
	FavIDs = [
		'charsetMenu',
		];
	for(n = 0; n < FavIDs.length; n++) {
		var FavID = FavIDs[n];
			Item = $(FavID);
			if (Item) {
				Item = Item.cloneNode(true);
				Item.removeAttribute('key');
			}
//		if (Item!=null) $('devToolsSeparator').parentNode.insertBefore(Item, $('devToolsSeparator'));
		if (Item!=null) $('menu_ToolsPopup').insertBefore(Item, $('webDeveloperMenu'));
	}
})();
