// ==UserScript==
// @name			LinkLocationbarLite.uc.js
// @namespace		myfriday9_r1232313@live.com
// @description		マウスがリンク上にあるとき、リンクのURLをロケーションバーに表示
// @version			2013/01/16
// @include			main
// @compatibility	Firefox 18
// @auther			http://j.mozest.com/zh-CN/ucscript/script/48/
// ==/UserScript==
(function() {
	if (!isElementVisible(gURLBar)) return;	// アドレスバーが無かったらストップ

	var loadingStat = true;	// ステータスもアドレスバーに表示する

	var urlbarIcons = document.getElementById('urlbar');
	var additionBar = document.createElement('label');
	additionBar.setAttribute('id', 'addtion-link');
	additionBar.setAttribute('value', '');
	additionBar.setAttribute('crop', 'center');	// 長いURLの真ん中を省略
	//additionBar.setAttribute('flex', '1');
	//additionBar.setAttribute('style', "-moz-box-ordinal-group: 99 !important;");  ////在urlbar-icons最左边显示?
	additionBar.style.color = 'green';
	additionBar.style.margin = "0px 0px 0px 0px";
	urlbarIcons.insertBefore(additionBar, urlbarIcons.firstChild);

	function resetmaxWidth() {
		//var p = gURLBar.boxObject.width;
		//テキストがはみ出すようなら引く數字を大きくするといいかも
		//urlbarIcons.style.maxWidth = Math.ceil(p - 270) + 'px';
	}
	resetmaxWidth();
	window.addEventListener('resize', resetmaxWidth, false);

	XULBrowserWindow.statusTextField.__defineGetter__('label', function() {
		return this.getAttribute("label");
  	});
	XULBrowserWindow.statusTextField.__defineSetter__('label', function(str) {
		if (str) {
			this.setAttribute('label', str);
			if(this.getAttribute('type') == 'overLink') {	// overLink
				additionBar.value = '➥' + str + ' ';
			} else {	// その他
				if (loadingStat == true) {
					additionBar.value = str;
				} else {
					this.style.opacity = 1;
					additionBar.value = '';
				}
			}
		} else {
			this.style.opacity = 0;
			additionBar.value = '';
	    }
	    if (this.style.opacity == 0) {
	    	XULBrowserWindow.statusTextField.removeAttribute('mirror');
	    }
	    return str;
	});
})();
