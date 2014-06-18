(function() {
	DaT = $("TabsToolbar").appendChild($C("label", {
				id: "Clock",
				tooltiptext: "現時日期和時間",
				style: "margin: 5px -4px 5px 4px; font-weight: bold; font: 18px Arial, Microsoft Yahei; color: grey; min-width: 210px;",
				ordinal: "0",
			}));
	function startTime() {
		var dayName = new Array ("週日", "週一", "週二", "週三", "週四", "週五", "週六");
		var today = new Date();
		var D = today.getDate(),
			M = today.getMonth() + 1,
			Y = today.getFullYear(),
			h = today.getHours(),
			m = today.getMinutes(),
			s = today.getSeconds();
		D = checkTime(D);
		M = checkTime(M);
		h = checkTime(h);
		m = checkTime(m);
		s = checkTime(s);
		DaT.value = D + "/" + M + "/" + Y + ", " + dayName[today.getDay()] + " " + h + ":" + m + ":" + s;
		setTimeout(function() {startTime();}, 250);
	}
	function checkTime(i) {
		if (i < 10) {i = "0" + i}
		return i
	}
	startTime();

	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
