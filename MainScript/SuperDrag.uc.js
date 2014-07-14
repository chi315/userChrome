// ==UserScript==
// @name			SuperDrag.uc.js
// @homepageURL		http://www.cnblogs.com/ziyunfei/archive/2011/12/20/2293928.html
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && (function(event) {
	var self = arguments.callee;
	if (!event) {
		self.GESTURES = {
			image: {
				U: {
					name: "複製圖片網址",
					cmd: function(event, self) {
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("application/x-moz-file-promise-url"));
					}
				},
				UD: {
					name: "複製圖片",
					cmd: function(event, self) {
						(document.popupNode = content.document.createElement('img')).src = event.dataTransfer.getData("application/x-moz-file-promise-url");
						goDoCommand('cmd_copyImageContents');
					}
				},
				D: {
					name: "下載圖片(不彈窗)",
					cmd: function(event, self) {
						saveImageURL(event.dataTransfer.getData("application/x-moz-file-promise-url"), null, null, null, true, null, document);
					}
				},
				L: {
					name: "檢視圖片(新分頁前景)",
					cmd: function(event, self) {
						gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("application/x-moz-file-promise-url"));
					}
				},
				R: {
					name: "Google 加密搜尋相似圖片",
					cmd: function(event, self) {
						gBrowser.selectedTab = gBrowser.addTab('https://encrypted.google.com/searchbyimage?image_url=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
					}
				},
				RL: {
					name: "搜尋相似圖片(全部引擎)",
					cmd: function(event, self) {
						var imgURL = event.dataTransfer.getData("application/x-moz-file-promise-url");
						gBrowser.addTab('http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + encodeURIComponent(imgURL));
						gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + encodeURIComponent(imgURL));
						gBrowser.selectedTab = gBrowser.addTab('https://encrypted.google.com/searchbyimage?image_url=' + encodeURIComponent(imgURL));
						gBrowser.addTab('http://pic.sogou.com/ris?query=' + encodeURIComponent(imgURL));
						gBrowser.addTab('http://iqdb.org/?url=' + encodeURIComponent(imgURL));
					}
				},
			},
			link: {
				U: {
					name: "複製鏈結網址",
					cmd: function(event, self) {
//						gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]); 開啟及複製鏈結網址(新分頁前景)
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
					}
				},
				UD: {
					name: "尋找 & 高亮關鍵字及複製鏈結文字",
					cmd: function(event, self) {
						var linkTXT = event.dataTransfer.getData("text/x-moz-url").split("\n")[1];
//						gFindBar.open();
						gFindBar.toggleHighlight(1);
						gFindBar._findField.value = linkTXT;
						gWHT.addWord(linkTXT);
						document.getElementById('searchbar').value = linkTXT;
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(linkTXT);
					}
				},
				D: {
					name: "下載鏈結(不彈窗)",
					cmd: function(event, self) {
						saveImageURL(event.dataTransfer.getData("text/x-moz-url").split("\n")[0], null, null, null, true, null, document);
					}
				},
				DU: {
					name: "檢視當前鏈結網址的源代碼",
					cmd: function(event, self) {
						gBrowser.selectedTab = gBrowser.addTab('view-source:' + event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
					}
				},
				L: {
					name: "Google 翻譯鏈結文字 (中文)",
					cmd: function(event, self) {
						var div = content.document.documentElement.appendChild(content.document.createElement("div"));
						div.style.cssText = "position:absolute;z-index:1000;border:2px solid #FFF;border-radius:5px;background-color:#3B3B3B;padding: 0px 3px 1px 3px;font-size:12pt;box-shadow: 0px 0px 4px #000;color:#FFF;opacity:0.95;left:" + +(event.clientX + content.scrollX + 10) + 'px;top:' + +(event.clientY + content.scrollY + 10) + "px";
						var xmlhttp = new XMLHttpRequest;
						xmlhttp.open("get", "http://translate.google.hk/translate_a/t?client=t&hl=zh-TW&sl=auto&tl=zh-TW&text=" + event.dataTransfer.getData("text/x-moz-url").split("\n")[1], 0);
						xmlhttp.send();
						div.textContent = eval("(" + xmlhttp.responseText + ")")[0][0][0];
						content.addEventListener("click", function(e) {
							if (e.button == 0) {
							Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(div.textContent);
								goDoCommand("cmd_paste");
							}
							else if (e.button == 2) {
							gBrowser.selectedTab = gBrowser.addTab('https://translate.google.com/#auto/zh-TW/' + encodeURIComponent(event.dataTransfer.getData("text/x-moz-url").split("\n")[1]));
							}
							content.removeEventListener("click", arguments.callee, false);
							div.parentNode.removeChild(div);
						}, false);
					}
				},
				LR: {
					name: "Google 加密及百度圖片搜尋及複製鏈結文字",
					cmd: function(event, self) {
						var linkTXT = event.dataTransfer.getData("text/x-moz-url").split("\n")[1];
						gBrowser.selectedTab = gBrowser.addTab('https://duckduckgo.com/?q=!img ' + encodeURIComponent(linkTXT));
						gBrowser.addTab('http://image.baidu.com/i?&cl=2&ie=utf-8&oe=utf-8&word=' + encodeURIComponent(linkTXT));
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(linkTXT);
					}
				},
				LU: {
					name: "Google 翻譯及複製鏈結文字(新分頁前景)",
					cmd: function(event, self) {
						var linkTXT = event.dataTransfer.getData("text/x-moz-url").split("\n")[1];
						gBrowser.selectedTab = gBrowser.addTab('https://translate.google.com/#auto/zh-TW/' + encodeURIComponent(linkTXT));
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(linkTXT);
					}
				},
				LD: {
					name: "Google 翻譯鏈結文字 (英文)",
					cmd: function(event, self) {
						var div = content.document.documentElement.appendChild(content.document.createElement("div"));
						div.style.cssText = "position:absolute;z-index:1000;border:solid 2px rgb(144,144,144);border-radius:5px;background:-moz-linear-gradient(top, rgb(252, 252, 252) 0%, rgb(245, 245, 245) 33%, rgb(245, 245, 245) 100%);padding: 0px 3px 1px 3px;font-size: 12pt;color: rgb(66,66,66);left:" + +(event.clientX + content.scrollX + 10) + 'px;top:' + +(event.clientY + content.scrollY + 10) + "px";
						var xmlhttp = new XMLHttpRequest;
						xmlhttp.open("get", "http://translate.google.hk/translate_a/t?client=t&hl=zh-TW&sl=auto&tl=en&text=" + event.dataTransfer.getData("text/x-moz-url").split("\n")[1], 0);
						xmlhttp.send();
						goDoCommand("cmd_cut");
						for(var i = 0; i < xmlhttp.responseText.length; i++) {
						div.textContent += eval("(" + xmlhttp.responseText + ")")[0][i][0];
						content.addEventListener("click", function(e) {
							if (e.button == 0) {
							Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(div.textContent);
								goDoCommand("cmd_paste");
							}
							else if (e.button == 2) {
							gBrowser.selectedTab = gBrowser.addTab('https://translate.google.com/#auto/zh-TW/' + encodeURIComponent(event.dataTransfer.getData("text/x-moz-url").split("\n")[1]));
							}
							content.removeEventListener("click", arguments.callee, false);
							div.parentNode.removeChild(div);
						}, false);
						};
					}
				},
				R: {
					name: "Google 加密搜尋及複製鏈結文字(新分頁前景)",
					cmd: function(event, self) {
						var linkTXT = event.dataTransfer.getData("text/x-moz-url").split("\n")[1];
						gBrowser.selectedTab = gBrowser.addTab("https://encrypted.google.com/#q=" + encodeURIComponent(linkTXT));
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(linkTXT);
					}
				},
				RL: {
					name: "彈出搜索框(新分頁前景)",
					cmd: function(event, self) {
						var popup = document.getAnonymousElementByAttribute(document.querySelector("#searchbar").searchButton, "anonid", "searchbar-popup");
						var linkTXT = event.dataTransfer.getData("text/x-moz-url").split("\n")[1];
						var serach = function() {
								popup.removeEventListener("command", serach, false);
								popup.removeEventListener("popuphidden", closeSerach, false)
								setTimeout(function(selectedEngine) {
									gBrowser.selectedTab = gBrowser.addTab();
									BrowserSearch.loadSearch(linkTXT, false);
									popup.querySelectorAll("#" + selectedEngine.id)[0].click();
								}, 10, popup.querySelector("*[selected=true]"))
							}
						var closeSerach = function() {
								popup.removeEventListener("command", serach, false);
								popup.removeEventListener("popuphidden", closeSerach, false)
							}
						popup.addEventListener("command", serach, false)
						popup.addEventListener("popuphidden", closeSerach, false)
						popup.openPopup(null, null, event.screenX - 100, event.screenY - 100);
					}
				},
				RU: {
					name: "Google 加密站內搜尋及複製鏈結文字(新分頁前景)",
					cmd: function(event, self) {
						var linkTXT = event.dataTransfer.getData("text/x-moz-url").split("\n")[1];
						gBrowser.selectedTab = gBrowser.addTab('https://encrypted.google.com/#q=site:' + content.location.host + ' ' + encodeURIComponent(linkTXT));
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(linkTXT);
					}
				},
				RD: {
					name: "彈出搜索框(新分頁背景)",
					cmd: function(event, self) {
						var popup = document.getAnonymousElementByAttribute(document.querySelector("#searchbar").searchButton, "anonid", "searchbar-popup");
						var linkTXT = event.dataTransfer.getData("text/x-moz-url").split("\n")[1];
						var serach = function() {
								popup.removeEventListener("command", serach, false);
								popup.removeEventListener("popuphidden", closeSerach, false)
								setTimeout(function(selectedEngine) {
									BrowserSearch.loadSearch(linkTXT, true);
									popup.querySelectorAll("#" + selectedEngine.id)[0].click();
								}, 10, popup.querySelector("*[selected=true]"))
							}
						var closeSerach = function() {
								popup.removeEventListener("command", serach, false);
								popup.removeEventListener("popuphidden", closeSerach, false)
							}
						popup.addEventListener("command", serach, false)
						popup.addEventListener("popuphidden", closeSerach, false)
						popup.openPopup(null, null, event.screenX - 100, event.screenY - 100);
					}
				},
			},
			text: {
				U: {
					name: "複製",
					cmd: function(event, self) {
						goDoCommand("cmd_copy");
					}
				},
				UD: {
					name: "尋找 & 高亮關鍵字及複製選取文字",
					cmd: function(event, self) {
						var TXT = event.dataTransfer.getData("text/unicode");
//						gFindBar.open();
						gFindBar.toggleHighlight(1);
						gFindBar._findField.value = TXT;
						gWHT.addWord(TXT);
						document.getElementById('searchbar').value = TXT;
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(TXT);
					}
				},
				UR: {
					name: "複製為HTML",
					cmd: function(event, self) {
						var div = content.document.createElement('div');
						div.appendChild(content.getSelection().getRangeAt(0).cloneContents());
						Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(div.innerHTML);
					}
				},
				D: {
					name: "下載文字(不彈窗)",
					cmd: function(event, self) {
						saveImageURL('data:text/plain;charset=UTF-8;base64,' + btoa(unescape(encodeURIComponent(event.dataTransfer.getData("text/unicode")))), event.dataTransfer.getData("text/unicode").slice(0, 5) + ".txt", null, null, true, null, document);
					}
				},
				DU: {
					name: "貼上",
					cmd: function(event, self) {
						goDoCommand("cmd_paste");
					}
				},
				DR: {
					name: "開啟選取範圍內的鏈結",
					cmd: function(event, self) {
						var urls = {};
						addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {
							if (!urls[a.href] && /^http|^file|^about/.test(a.href))
								gBrowser.addTab(a.href);
							urls[a.href] = true;
						});
					}
				},
				DL: {
					name: "開啟選取範圍內的圖片",
					cmd: function(event, self) {
						var urls = [];
						addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {
							if (/\.(jpe?g|png|gif|bmp)$/i.test(a.href) && urls.indexOf(a.href) === -1)
								urls.push(a.href);
						});
						if (urls.length === 0) return;

						var htmlsrc = '<style> img {max-width: 100%; max-height: 100%;} </style>';
						htmlsrc += urls.map(function(u) '\n<img src="' + u + '">').join("");
						gBrowser.addTab("data:text/html;charset=utf-8," + encodeURIComponent(htmlsrc));
					}
				},
				L: {
					name: "Google 翻譯選取文字 (中文)",
					cmd: function(event, self) {
						var div = content.document.documentElement.appendChild(content.document.createElement("div"));
						div.style.cssText = "position:absolute;z-index:1000;border:2px solid #FFF;border-radius:5px;background-color:#3B3B3B;padding: 0px 3px 1px 3px;font-size:12pt;box-shadow: 0px 0px 4px #000;color:#FFF;opacity:0.95;left:" + +(event.clientX + content.scrollX + 10) + 'px;top:' + +(event.clientY + content.scrollY + 10) + "px";
						var xmlhttp = new XMLHttpRequest;
						xmlhttp.open("get", "http://translate.google.hk/translate_a/t?client=t&hl=zh-TW&sl=auto&tl=zh-TW&text=" + event.dataTransfer.getData("text/unicode"), 0);
						xmlhttp.send();
						goDoCommand("cmd_cut");
						for(var i = 0; i < xmlhttp.responseText.length; i++) {
						div.textContent += eval("(" + xmlhttp.responseText + ")")[0][i][0];
						content.addEventListener("click", function(e) {
							if (e.button == 0) {
							Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(div.textContent);
								goDoCommand("cmd_paste");
							}
							else if (e.button == 2) {
							gBrowser.selectedTab = gBrowser.addTab('https://translate.google.com/#auto/zh-TW/' + encodeURIComponent(event.dataTransfer.getData("text/unicode")));
							}
							content.removeEventListener("click", arguments.callee, false);
							div.parentNode.removeChild(div);
						}, false);
						};
					}
				},
				LR: {
					name: "Google 加密及百度圖片搜尋及複製選取文字",
					cmd: function(event, self) {
						var TXT = event.dataTransfer.getData("text/unicode");
						gBrowser.selectedTab = gBrowser.addTab('https://duckduckgo.com/?q=!img ' + encodeURIComponent(TXT));
						gBrowser.addTab('http://image.baidu.com/i?&cl=2&ie=utf-8&oe=utf-8&word=' + encodeURIComponent(TXT));
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(TXT);
					}
				},
				LU: {
					name: "Google 翻譯及複製選取文字(新分頁前景)",
					cmd: function(event, self) {
						var TXT = event.dataTransfer.getData("text/unicode");
						gBrowser.selectedTab = gBrowser.addTab('https://translate.google.com/#auto/zh-TW/' + encodeURIComponent(TXT));
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(TXT);
					}
				},
				LD: {
					name: "Google 翻譯選取文字 (英文)",
					cmd: function(event, self) {
						var div = content.document.documentElement.appendChild(content.document.createElement("div"));
						div.style.cssText = "position:absolute;z-index:1000;border:solid 2px rgb(144,144,144);border-radius:5px;background:-moz-linear-gradient(top, rgb(252, 252, 252) 0%, rgb(245, 245, 245) 33%, rgb(245, 245, 245) 100%);padding: 0px 3px 1px 3px;font-size: 12pt;color: rgb(66,66,66);left:" + +(event.clientX + content.scrollX + 10) + 'px;top:' + +(event.clientY + content.scrollY + 10) + "px";
						var xmlhttp = new XMLHttpRequest;
						xmlhttp.open("get", "http://translate.google.hk/translate_a/t?client=t&hl=zh-TW&sl=auto&tl=en&text=" + event.dataTransfer.getData("text/unicode"), 0);
						xmlhttp.send();
						goDoCommand("cmd_cut");
						for(var i = 0; i < xmlhttp.responseText.length; i++) {
						div.textContent += eval("(" + xmlhttp.responseText + ")")[0][i][0];
						content.addEventListener("click", function(e) {
							if (e.button == 0) {
							Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(div.textContent);
								goDoCommand("cmd_paste");
							}
							else if (e.button == 2) {
							gBrowser.selectedTab = gBrowser.addTab('https://translate.google.com/#auto/zh-TW/' + encodeURIComponent(event.dataTransfer.getData("text/unicode")));
							}
							content.removeEventListener("click", arguments.callee, false);
							div.parentNode.removeChild(div);
						}, false);
						};
					}
				},
				R: {
					name: "Google 加密搜尋及複製選取文字[識別URL並打開](新分頁前景)",
					cmd: function(event, self) {
						var TXT = event.dataTransfer.getData("text/unicode");
						(/^\s*(?:(?:(?:ht|f)tps?:\/\/)?(?:(?:\w+?)(?:\.(?:[\w-]+?))*(?:\.(?:[a-zA-Z]{2,5}))|(?:(?:\d+)(?:\.\d+){3}))(?::\d{2,5})?(?:\/\S*|$)|data:(text|image)\/[\u0025-\u007a]+)\s*$/.test(TXT) && (gBrowser.selectedTab = gBrowser.addTab(TXT))) || (gBrowser.selectedTab = gBrowser.addTab("https://encrypted.google.com/#q=" + encodeURIComponent(TXT)));
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(TXT);
					}
				},
				RL: {
					name: "彈出搜索框(新分頁前景)",
					cmd: function(event, self) {
						var popup = document.getAnonymousElementByAttribute(document.querySelector("#searchbar").searchButton, "anonid", "searchbar-popup"),
							searchbar = document.getElementById('searchbar'),
							selected = event.dataTransfer.getData("text/unicode");
						if (!searchbar.value == "") {
							var TXT = searchbar.value;
							searchbar.value = "";
						}
						else {
							if (selected) {var TXT = selected;}
							else {var TXT = readFromClipboard();}
						}
						var serach = function() {
								popup.removeEventListener("command", serach, false);
								popup.removeEventListener("popuphidden", closeSerach, false)
								setTimeout(function(selectedEngine) {
									gBrowser.selectedTab = gBrowser.addTab();
									BrowserSearch.loadSearch(TXT, false);
									popup.querySelectorAll("#" + selectedEngine.id)[0].click();
								}, 10, popup.querySelector("*[selected=true]"))
							}
						var closeSerach = function() {
								popup.removeEventListener("command", serach, false);
								popup.removeEventListener("popuphidden", closeSerach, false)
							}
						popup.addEventListener("command", serach, false)
						popup.addEventListener("popuphidden", closeSerach, false)
						popup.openPopup(null, null, event.screenX - 100, event.screenY - 100);
					}
				},
				RU: {
					name: "Google 加密站內搜尋及複製選取文字(新分頁前景)",
					cmd: function(event, self) {
						var TXT = event.dataTransfer.getData("text/unicode");
						gBrowser.selectedTab = gBrowser.addTab('https://encrypted.google.com/#q=site:' + content.location.host + ' ' + encodeURIComponent(TXT));
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(TXT);
					}
				},
				RD: {
					name: "彈出搜索框(新分頁背景)",
					cmd: function(event, self) {
						var popup = document.getAnonymousElementByAttribute(document.querySelector("#searchbar").searchButton, "anonid", "searchbar-popup");
						var TXT = event.dataTransfer.getData("text/unicode");
						var serach = function() {
								popup.removeEventListener("command", serach, false);
								popup.removeEventListener("popuphidden", closeSerach, false)
								setTimeout(function(selectedEngine) {
									BrowserSearch.loadSearch(TXT, true);
									popup.querySelectorAll("#" + selectedEngine.id)[0].click();
								}, 10, popup.querySelector("*[selected=true]"))
							}
						var closeSerach = function() {
								popup.removeEventListener("command", serach, false);
								popup.removeEventListener("popuphidden", closeSerach, false)
							}
						popup.addEventListener("command", serach, false)
						popup.addEventListener("popuphidden", closeSerach, false)
						popup.openPopup(null, null, event.screenX - 100, event.screenY - 100);
					}
				},
			},
		};
		["dragstart", "dragover", "drop"].forEach(function(type) {
			gBrowser.mPanelContainer.addEventListener(type, self, false);
		});
		window.addEventListener("unload", function() {
			["dragstart", "dragover", "drop"].forEach(function(type) {
				gBrowser.mPanelContainer.removeEventListener(type, self, false);
			});
		}, false);
		return;
	}
	switch (event.type) {
	case "dragstart":
		{
			self.lastPoint = [event.screenX, event.screenY];
			self.sourceNode = event.target;
			self.directionChain = "";
			event.target.localName == "img" && event.dataTransfer.setData("application/x-moz-file-promise-url", event.target.src);
			if (event.dataTransfer.types.contains("application/x-moz-file-promise-url")) {
				self.type = "image";
			} else if (event.dataTransfer.types.contains("text/x-moz-url")) {
				self.type = "link";
			} else {
				self.type = "text";
			}
			break;
		}
	case "dragover":
		{
			if (!self.lastPoint) return;
			Components.classes["@mozilla.org/widget/dragservice;1"].getService(Components.interfaces.nsIDragService).getCurrentSession().canDrop = true;
			var [subX, subY] = [event.screenX - self.lastPoint[0], event.screenY - self.lastPoint[1]];
			var [distX, distY] = [(subX > 0 ? subX : (-subX)), (subY > 0 ? subY : (-subY))];
			var direction;
			if (distX < 10 && distY < 10) return;
			if (distX > distY) direction = subX < 0 ? "L" : "R";
			else direction = subY < 0 ? "U" : "D";
			if (direction != self.directionChain.charAt(self.directionChain.length - 1)) {
				self.directionChain += direction;
				XULBrowserWindow.statusTextField.label = self.GESTURES[self.type][self.directionChain] ? "手勢: " + self.directionChain + " " + self.GESTURES[self.type][self.directionChain].name + " " : "未知手勢:" + self.directionChain + " ";
				self.cmd = self.GESTURES[self.type][self.directionChain] ? self.GESTURES[self.type][self.directionChain].cmd : "";
			}
			self.lastPoint = [event.screenX, event.screenY];
			break;
		}
	case "drop":
		{
			if (self.lastPoint && event.target.localName != "textarea" && (!(event.target.localName == "input" && (event.target.type == "text" || event.target.type == "password"))) && event.target.contentEditable != "true") {
				event.preventDefault();
				event.stopPropagation();
				self.lastPoint = XULBrowserWindow.statusTextField.label = "";
				self.cmd && self.cmd(event, self);
			}
		}
	}
})()
