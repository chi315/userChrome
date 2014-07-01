keys[1] = function() {
				XULBrowserWindow.statusTextField.label = "重新載入 & 頁面重置 ";
				UCL.rebuild();
				USL.rebuild();
				ucjsMouseGestures.reload(true);
				addMenu.rebuild(true);
				uAutoPagerize.loadSetting(true);
				uAutoPagerize.loadSetting_CN();
				refererChanger.reload(true);
				KeyChanger.makeKeyset(true);
				FullZoom.reset(); setTimeout (function() {FullZoom.enlarge();}, 0);
			};
keys[2] = "XULBrowserWindow.statusTextField.label = 'Gmail '; gBrowser.selectedTab = gBrowser.addTab('https://accounts.google.com/ServiceLogin?service=mail&passive=true&rm=false&continue=https://mail.google.com/mail/?tab%3Dwm&scc=1&ltmpl=default&ltmplcache=2');";
keys[3] = function() {
				var Bar = document.getElementById('urlbar');
				Bar.value = "切換左鍵打開鏈結 (前景/背景)";
				setTimeout (function() {Bar.handleRevert();}, 2000);
				var p = "browser.tabs.loadDivertedInBackground";
				var value = gPrefService.getBoolPref(p) == false ? true : false;
				gPrefService.setBoolPref(p, value);
				var str = value === false ? '前景' : '背景';
				XULBrowserWindow.statusTextField.label = str + '打開分頁 (左鍵) ';
			};
keys[4] = function() {
				var Bar = document.getElementById('urlbar');
				Bar.value = "切換中鍵打開鏈結 (前景/背景)";
				setTimeout (function() {Bar.handleRevert();}, 2000);
				var p = "browser.tabs.loadInBackground";
				var value = gPrefService.getBoolPref(p) == false ? true : false;
				gPrefService.setBoolPref(p, value);
				var str = value === false ? '前景' : '背景';
				XULBrowserWindow.statusTextField.label = str + '打開分頁 (中鍵) ';
			};
keys[5] = function() {
				var Bar = document.getElementById('urlbar');
				Bar.value = "切換中鍵打開書籤 (前景/背景)";
				setTimeout (function() {Bar.handleRevert();}, 2000);
				var p = "browser.tabs.loadBookmarksInBackground";
				var value = gPrefService.getBoolPref(p) == false ? true : false;
				gPrefService.setBoolPref(p, value);
				var str = value === false ? '前景' : '背景';
				XULBrowserWindow.statusTextField.label = str + '打開書籤 (中鍵) ';
			};
keys[6] = function() {
				var Bar = document.getElementById('urlbar');
				Bar.value = "切換打開搜索結果 (前景/背景)";
				setTimeout (function() {Bar.handleRevert();}, 2000);
				var p = "browser.search.context.loadInBackground";
				var value = gPrefService.getBoolPref(p) == false ? true : false;
				gPrefService.setBoolPref(p, value);
				var str = value === false ? '前景' : '背景';
				XULBrowserWindow.statusTextField.label = str + '打開搜索結果 ';
			};
keys[7] = "XULBrowserWindow.statusTextField.label = '啟用 / 停用 TriggerZone '; UCL.toggle('ToggleTriggerZone.css');";
keys['q'] = function() {
				XULBrowserWindow.statusTextField.label = "後退/上一頁 ";
				var nav = gBrowser.webNavigation;
				if (nav.canGoBack) nav.goBack();
				else nextPage.next();
			};
keys['w'] = function() {
				XULBrowserWindow.statusTextField.label = "前進/下一頁 ";
				var nav = gBrowser.webNavigation;
				if (nav.canGoForward) nav.goForward();
				else nextPage.next(true);
			};
keys['e'] = function() {
				XULBrowserWindow.statusTextField.label = "清除復原分頁列表 ";
				var Setting = "browser.sessionstore.max_tabs_undo";
				gPrefService.setIntPref(Setting, 0);
				gPrefService.setIntPref(Setting, 50);
			};
keys['r'] = "XULBrowserWindow.statusTextField.label = '取消暫時許可 '; noscriptOverlay.revokeTemp();";
keys['t'] = "XULBrowserWindow.statusTextField.label = '暫時允許此頁面的所有物件 '; noscriptOverlay.allowPage();";
keys['a'] = "XULBrowserWindow.statusTextField.label = 'Adblock Plus 條件偏好設定 '; document.getElementById('abp-menuitem-filters').doCommand();";
keys['s'] = "XULBrowserWindow.statusTextField.label = '定位到searchbar並清除關鍵字 '; document.getElementById('searchbar').focus(); document.getElementById('searchbar').value = ''; gFindBar._foundMatches.hidden = true; gFindBar._foundMatches.value = '';";
keys['d'] = "XULBrowserWindow.statusTextField.label = '切換 dTa 單鍵下載選擇器 '; dTaTurboSelect.Toggle();";
keys['f'] = function() {
				XULBrowserWindow.statusTextField.label = "開啟並定位到findbar ";
				gFindBar.open();
				gFindBar.toggleHighlight(1);
				gFindBar.getElement('highlight').setAttribute("checked", "true");
				gFindBar._findField.value = "";
				gFindBar._findField.focus();
			};
keys['z'] = function() {
				XULBrowserWindow.statusTextField.label = "全選 & 複製頁面全部文字 ";
				goDoCommand("cmd_selectAll");
				Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(content.document.documentElement.textContent);
			};
keys['x'] = "XULBrowserWindow.statusTextField.label = '復原關閉分頁 '; undoCloseTab();";
keys['c'] = "XULBrowserWindow.statusTextField.label = '關閉分頁 '; gBrowser.removeCurrentTab();";
keys['u'] = "XULBrowserWindow.statusTextField.label = '定位到urlbar並清除關鍵字 '; document.getElementById('urlbar').focus(); document.getElementById('urlbar').value ='';";
