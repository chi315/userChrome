// ==UserScript==
// @name                Extension Options Menu.uc.js
// @description         拡張を操作するボタンを追加
// @include             main
// @version             3.0.0  プラグインも表示するように アイテムのソート方法を指定できるように
// @note                作成にあたりアドオン版Extension Options Menuとucjs_optionsmenu_0.8.uc.jsとtoggleRestartlessAddons.jsを参考にさせてもらいました
// ==/UserScript==
/*
按鈕圖標
左鍵：附加元件及插件選單
中鍵：清除startupCache並重新啟動瀏覽器
右鍵：打開附加組件管理員
向上滾動：顯示附加元件側邊欄
向下滾動：啟用/停用DOM Inspector & Element Inspector(重新啟動瀏覽器)

擴展
左鍵：啟用/禁用擴展
中鍵：打開擴展主頁
右鍵：打開擴展選項（如果有的話）
CTRL + 左鍵：打開擴展的安裝文件夾
CTRL + 中鍵：複製擴展 ID 和圖標地址（如果可用）到剪貼板
CTRL + 右鍵：移除擴展
*/
/*

#eom-button > .toolbarbutton-icon {
    width: 16px;
    height: 16px;
}
.addon-disabled > .menu-iconic-left { filter: url('chrome://mozapps/skin/extensions/extensions.svg#greyscale') }
.addon-disabled label { opacity: 0.5; }
.addon-disabled label:after { content: "*"; }
.addon-uninstall label { font-weight: bold !important; }
.addon-uninstall label:after { content: "-"; }

*/
var EOM = {

	TOOLBAR:                    'TabsToolbar', // ボタンの挿入先
	ADDON_TYPES:                ['extension', 'plugin'], // 表示するアイテムの種類
	SHOW_VERSION:               true, // ヴァージョンを表示するか
	SHOW_ALL:                   true, // 設定のないアドオンも表示するか
	SHOW_USERDISABLED:          true, // 無効のアドオンを表示するか
	SHOW_APPDISABLED:           false, // 互換性のないアドオンを表示するか
	AUTO_RESTART:               false, // アドオンの有効/無効時に自動で再起動するか(再起動不要アドオンは除外される)
	ICON_URL:                   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWklEQVQ4jWNgoANYyMDA8J+BgWEuuQb8R8JkgTNQzaeI1TAVzVZcuJ0YJxPCg8iA+VCB00Roqofqsaeqs+dAJfeT6wKqugaXjfXkGkCsHByg2wTzqz0Ol1EGAF7Adz+tGmdUAAAAAElFTkSuQmCC',

	sort: {
		enabled: 0,
		clickToPlay: 0,
		disabled: 1
		// 0, 0, 0 - アルファベット順に
		// 0, 0, 1 - アドオンマネージャと同じようにソート
		// 0, 1, 2 - enabled add-ons, then click-to-play and then disabled
	},


	init: function() {
		var toolbar = document.getElementById(this.TOOLBAR);
		var btn = toolbar.appendChild(document.createElement('toolbarbutton'));
		btn.setAttribute('id', 'eom-button');
		btn.setAttribute('type', 'menu');
		btn.setAttribute('onclick', "EOM.iconClick(event)");
		btn.setAttribute('onDOMMouseScroll', "EOM.onScroll(event)");
		btn.setAttribute('class', 'toolbarbutton-1');
		btn.setAttribute('image', this.ICON_URL);
		btn.setAttribute("tooltiptext","按鈕圖標\n左鍵：附加元件及插件選單\n中鍵：清除startupCache並重新啟動瀏覽器\n右鍵：打開附加組件管理員\n向上滾動：顯示附加元件側邊欄\n向下滾動：啟用/停用DOM Inspector & Element Inspector(重新啟動瀏覽器)\n\n擴展\n左鍵：啟用/禁用擴展\n中鍵：打開擴展主頁\n右鍵：打開擴展選項（如果有的話）\nCTRL + 左鍵：打開擴展的安裝文件夾\nCTRL + 中鍵：複製擴展 ID 和圖標地址（如果可用）到剪貼板\nCTRL + 右鍵：移除擴展");

		var mp = btn.appendChild(document.createElement('menupopup'));
		mp.id = 'eom-button-popup';
		mp.setAttribute('onpopupshowing', 'EOM.populateMenu(event.currentTarget)');
		mp.setAttribute('onclick', 'event.preventDefault(); event.stopPropagation();');
		mp.setAttribute('onDOMMouseScroll', 'event.preventDefault(); event.stopPropagation();');
		mp.addEventListener("mouseover", function (event) {event.originalTarget.setAttribute('closemenu', "none")}, true);
	},

	populateMenu: function(aParent) {
		var popup = aParent;
		var i, mi, addon, addons, menuIcon, df,
			sep, type, prevType, addStyle;
		var _this = this;

		for (i = 0, len = popup.childNodes.length; i < len; i++) {
			popup.removeChild(popup.firstChild);
		}

		AddonManager.getAddonsByTypes(this.ADDON_TYPES, function(addonlist) {
			addons = Array.slice(addonlist);
		});

		var thread = Services.tm.mainThread;
		while (addons == void(0)) {
			thread.processNextEvent(true);
		}

		function sortPosition(addon) {
			if ('STATE_ASK_TO_ACTIVATE' in AddonManager && addon.userDisabled == AddonManager.STATE_ASK_TO_ACTIVATE)
				return EOM.sort.clickToPlay;
			return (!addon.isActive) ? EOM.sort.disabled : EOM.sort.enabled;
		}

		function key(addon) {
			return EOM.ADDON_TYPES.indexOf(addon.type) + '\n' + sortPosition(addon) + '\n' + addon.name.toLowerCase();
		}

		addons.sort(function(a, b) {
			var ka = key(a);
			var kb = key(b);
			return ka == kb ? 0 : ka < kb ? -1 : 1;
		});

		for (i = 0, len = addons.length; i < len; i++) {
			addon = addons[i];
			df = document.createDocumentFragment();
			sep = document.createElement('menuseparator');

			if ((!addon.appDisabled || (addon.appDisabled && this.SHOW_APPDISABLED)) && ((addon.isActive && addon.optionsURL) || ((addon.userDisabled && this.SHOW_USERDISABLED) || (!addon.userDisabled && this.SHOW_ALL) || (addon.appDisabled && this.SHOW_APPDISABLED)))) {
				type = addon.type;
				if (prevType && type != prevType)
					df.appendChild(sep);
				prevType = type;
				menuIcon = addon.iconURL
						|| type == 'extension' && 'chrome://mozapps/skin/extensions/extensionGeneric-16.png'
						|| type == 'plugin' && 'chrome://mozapps/skin/plugins/pluginGeneric-16.png';
				mi = document.createElement('menuitem');
				mi.setAttribute('label', _this.SHOW_VERSION ? addon.name += ' ' + '[' + addon.version + ']' : addon.name);
				mi.setAttribute('tooltiptext', 'id: ' + addon.id + '\n' + 'size: ' + Math.floor(addon.size / 1024) + 'KB');
				mi.setAttribute('class', 'menuitem-iconic');
				mi.setAttribute('image', menuIcon);
				mi.addon = addon;
				mi.addEventListener('click', function(e) {
					EOM.itemClick(e, this.addon);
				}, true);
				EOM.setDisabled(mi, addon.userDisabled);
				EOM.setUninstalled(mi, addon.pendingOperations != 0);
				addStyle = mi.style;

				if (!addon.optionsURL && addon.isActive)
					addStyle.color = 'gray';

				df.appendChild(mi);
				popup.appendChild(df);
			}
		}
	},

	iconClick: function(e) {
		switch (e.button) {
		case 1:
			Services.appinfo.invalidateCachesOnRestart() || Application.restart();
			break;
		case 2:
			BrowserOpenAddonsMgr('addons://list/extension');
			e.preventDefault();
			break;
		}
	},

	onScroll: function(event) {
		if (event.detail > 0) {
			var { AddonManager } = Components.utils.import("resource://gre/modules/AddonManager.jsm", {});
			var AddonIDs = [
				'inspector@mozilla.org',
				'InspectElement@zbinlin',
				]
			for(n=0; n<AddonIDs.length; n++) {
			AddonManager.getAddonByID(AddonIDs[n], function(addon) {
				addon.userDisabled = addon.userDisabled ? false : true;
			});
			}
			Application.restart();
		}
		else {
			openWebPanel("附加元件管理員","chrome://mozapps/content/extensions/extensions.xul");
		}
		return;
	},

	itemClick: function(e, aAddon) {
		var addon = aAddon;
		var mi = e.target;
		var ctrl = e.ctrlKey,
			shift = e.shiftKey,
			alt = e.altKey;
		switch (e.button) {
		case 0:
			// 有効/無効を切り替え
			if (!ctrl && !shift && !alt) {
				let curDis = addon.userDisabled;
				let newDis;
				if ('STATE_ASK_TO_ACTIVATE' in AddonManager && curDis == AddonManager.STATE_ASK_TO_ACTIVATE)
					newDis = false;
				else if (!curDis)
					newDis = true;
				else {
					if (this.isAskToActivateAddon(addon))
						newDis = AddonManager.STATE_ASK_TO_ACTIVATE;
					else
						newDis = false;
				}
				addon.userDisabled = newDis;
				this.setDisabled(mi, newDis);
			}
			// 拡張のフォルダを開く
			else if (ctrl && !shift && !alt) {
				var dir = Services.dirsvc.get('ProfD', Ci.nsIFile);
				var nsLocalFile = Components.Constructor('@mozilla.org/file/local;1', 'nsILocalFile', 'initWithPath');
				dir.append('extensions');
				dir.append(addon.id);
				var fileOrDir = dir.path + (dir.exists() ? '' : '.xpi');
				try {
					(new nsLocalFile(fileOrDir)).reveal();
				} catch (ex) {
					var addonDir = /.xpi$/.test(fileOrDir) ? dir.parent : dir;
					try {
						if (addonDir.exists()) {
							addonDir.launch();
						}
					} catch (ex) {
						var uri = Services.io.newFileURI(addonDir);
						var protSvc = Cc['@mozilla.org/uriloader/external-protocol-service;1'].getService(Ci.nsIExternalProtocolService);
						protSvc.loadUrl(uri);
					}
				}
			}
			break;
		case 1:
			// 拡張のウェブページを開く
			if ((!ctrl && !shift && !alt) && addon.homepageURL) {
				openLinkIn(addon.homepageURL, 'tabshifted', {}); // 'tab' で背面に開く
			}
			// いろいろコピー
			else if (ctrl && !shift && !alt) {
				clipboard = Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper);
				clipboard.copyString("id: " + addon.id + "\r\n" + "iconURL: " + addon.iconURL);
			}
			break;
		case 2:
			// 拡張の設定画面を開く
			if ((!ctrl && !shift && !alt) && addon.optionsURL) {
				if (addon.optionsType == 2) {
					BrowserOpenAddonsMgr('addons://detail/' + encodeURIComponent(addon.id) + ('/preferences'));
				} else {
					openDialog(addon.optionsURL, addon.name, 'chrome,titlebar,toolbar,resizable,scrollbars,centerscreen,dialog=no,modal=no');
				}
			}
			// アンインストール
			else if (ctrl && !shift && !alt) {
				(addon.pendingOperations & AddonManager.PENDING_UNINSTALL) ? addon.cancelUninstall() : addon.uninstall();
				this.setUninstalled(mi, addon.pendingOperations & AddonManager.PENDING_UNINSTALL);
			}
			break;
		}
	},

	isAskToActivateAddon: function(addon) {
		return addon.type == 'plugin'
				&& 'STATE_ASK_TO_ACTIVATE' in AddonManager
				&& Application.prefs.getValue('plugins.click_to_play', false);
	},

	setDisabled: function(mi, disabled) {
		var askToActivate = 'STATE_ASK_TO_ACTIVATE' in AddonManager && disabled == AddonManager.STATE_ASK_TO_ACTIVATE;
		(askToActivate) ? mi.classList.add('askToActivate') : mi.classList.remove('askToActivate');
		(disabled && !askToActivate) ? mi.classList.add('addon-disabled') : mi.classList.remove('addon-disabled');
	},

	setUninstalled: function(mi, uninstalled) {
		(uninstalled) ? mi.classList.add('addon-uninstall') : mi.classList.remove('addon-uninstall');
	}

};
EOM.init();
