(function() {
	TriggerZone = {
		init: function() {
			this.icon = $("appcontent").appendChild($C("hbox", {
				id: "Trigger-Zone",
				class: "toolbar",
				tooltiptext: "觸發區域",
				style: "position: fixed; right: 16px; bottom: 16px; background: -moz-linear-gradient(top, rgb(252, 252, 252) 0%, rgb(245, 245, 245) 33%, rgb(245, 245, 245) 100%); opacity: 0.9; min-width: auto; max-width: 118px; border: 2px solid rgb(144,144,144); border-radius: 5px;",
			}));

			for (let i = 0, Btn; Btn = mBtns[i]; i++) {
				var BtnItem = this.icon.appendChild($C("toolbarbutton", {
					id: Btn.id,
					tooltiptext: Btn.tooltiptext,
					image: Btn.image,
					class: "toolbarbutton-1",
					oncommand: Btn.oncommand,
//					onclick: Btn.onclick,
//					onDOMMouseScroll: Btn.onDOMMouseScroll,
					onmouseover: Btn.onmouseover,
//					style: Btn.style,
				}));
			}

			var css = '\
				#Trigger-Zone:not(:hover) {opacity: 0.2!important;}\
				#Trigger-Zone toolbarbutton:active {margin-top: -1px!important; padding-bottom: 3px!important;}\
				'.replace(/[\r\n\t]/g, '');;
			this.icon.style = addStyle(css);
		}
	};

	var IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGklEQVRYhe3BAQEAAACCIP+vbkhAAQAAAO8GECAAAUcBoIgAAAAASUVORK5CYII="

	var mBtns = [
		{
			tooltiptext: "",
			image: IMG,
		},
		{
			id: "ScrollTop-button",
			tooltiptext: "滾動到頁面頂部",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE9ElEQVRYhcWXW08TeRjG/x+CD8C3MQiCCG3TwvQAMp2ZHmKhpdCWnmgphYLIoUI00ErRlQ20UE6FInqxuoFg4l4oRm5c4xovEJKyWGjx2QuhkTD04Lrum/zu5v09zzvJXAwhJxONRoti8bh2Jf7o9XL8UXpldQ0/kuX4o/Ty6tqr2MoqG41Gi8i3E15cLF6MxaeXYvHD2PIq/kuWYvHkUiweDi8uFmcun1+IhRcWl/EzmVuITUej0SISmZ/XRucXktH5RfxcFpKR+XkticxEt2Zm5/B/EJmJbpGp8GxqKjyLH0Kk4J0UmZyK4Efx8NepgnfIg8kp/FuCofuwWO1QMhyaW0wYDYznvUtCDx7i+5lEYDwEjbYRpWXluFYlAMupoWsyYCw4jolfJnM6SDB0H9/DvYkHGAuG0GQworSsHGJJLdbWHmNvbw+BQBBtVkdeHjIaGEehjAVDGA2Mo9XchrIrFRBLavH4yRMcHx8DAHZ2PqGl1YzOLl/m2Ysgd0eD+B5sjnZUXL12Lvx0nj59BlrJon/wdlYPGbkzikJxdXSi8lo1aikZfvvt6blwADg8PISvpxesSgP/8J0LXcQ/fAf5cnvkLjxeHwRCMWopGZ49+x1fvnw5F346b9/+CZpmYDJbL3SSgaFh5MOgfwTe7l6IJVRe4acTmZmFSFwDt6cLg/6Rc17S1z+EXNwa8KPLdxOUVAG5oh7rGxs4Ps4dDgCJRAImkwWUVI7unj7cGvCfcZPevgHkost3E3X1DVDU1WNz83lel387L178AUkNBZVai56b/WfcpLunD7lgOQ0kNRQ2N58XFHw66XQaw8MjKK+oRIupDb7eWxk38Xb3IhtujxdCkQSSGgorK3G8ebON9+//wqfdXRwcHOT9Nj5+/AhOpYFAKEG7uzPjJx2d3ciGq8MLSqbA5dIrKK+ohEAoBiWVg6YZeLu6kUgkeAOTyST29/dxdHSU+Uzj8VVUVQthttjgOfETl7sTuTC32VF/nYZIXAuhSIIqgQgll8uga2zC/v7fvAWic3O4oWuC1eaAz9eLsUAQA4NDkMnrYLO3Z9zE4XQjF872Djicbtjs7bDanDBbbKiqFsLj8SKVSvEW6Ovrx5Xyq2A5DTiVFiyngVqjg9lig+PE53C6Qaw2J/LC7oTV3g6bvT1TIDQxwRueSqXgcLpQVS2ExeqAzeGC7WT39IhTiKXNjkJpabWgWiDCSjzOW+Dg4AAGgxHVAhFMZmtWF2k1taFQ9IYWCIRirG9s8BbY3dsFw6ogEtegpdWS1UWajSYUgrHFBF2jAZIaCq+2tngLfPjwAVKZAmIJhWZja1YfadIbU016I/JFbzBCrdFBrqjHu3fveAtsb29DKJKghpLl8qXIDZ3+pa5Rj0JgWDUYVoWdnR3eAuvrG7haWQVKKs/quaHTvyRqtY5Ta3SfNVod8qMRDTQDvb4ZicQ+b4HpcASlZeWQyhTQaBt5PWqN7rNareMITdNFnEo7zak0yA8tFHUNcLk6cHR0xFtgcMiPSyWlkMoU4FTaizzTNE1//UllGKZYyaimaSV7qGQ4ZINhVZDJ6xAI3uMNT6fTcHd4cKmkFJRUDoZVndmnleyhkuXCDMMUn/lDpmm6iKYZ7fUG5evrDcp0A83gIqQyBZaWYrwFkskkWk1mlFwuQy0ly+x8dSpf0TTDZi4nhPwDYvVmLc4i8g0AAAAASUVORK5CYII=",
			oncommand: "content.scrollTo(0, 0);",
		},
		{
			tooltiptext: "",
			image: IMG,
		},
		{
			id: "PrevPage-button",
			tooltiptext: "上一頁",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE2klEQVRYhcXX60+TZxjH8fuP4A/gr9nC+SgLpxZo+/TpMTxtoVCgAiIHix1QQARGYeLcTDiWU6Gge+FwEn3hEkXjK50xMVGW0GFtS797wcZmBnLwdCWf5HlxX9fvvl/cT3IL8XcFAoGkYChkXQmtPVoOrcVXVm/wMS2H1uLLqzceBldWDYFAIEn8t6YWF5OXgqGppWDobXB5lU9pKRh6uxQMTU0tLibvn3xuITi5sLjM5zS3EJwMBAJJYnp+3hqYX4gE5hf5vBYi0/PzVjE9E9icmZ3jS5ieCWyKianZ2MTULF9ITFyfmOZLEteuT/AlifFrP/Ehrv54fd9p+sXY+A98iP6BIVrOt9PV08folasn7hcjo1c4Df/YOJ3eLgqLSigqLkWr09PhuYh/bPxEc8TwyBin8W13L4XFpZSVa7h79x7LyytYrDYGh/1H9n7n/57hkTEGh/2Iy0MjnFS3rx9VWcVe+L17ADx6/BidJOPrG9hfNzjs3/seHKF/YIie3kt0ertpPtdKpc2BTpIR/QNDHNely8P09F5Cq5MpVZVxZ2ODf+r58+foJJkLHi++vgG8XT7aOjpx1bkxGM2oyyoo+KaIrOxc0tIzSUlNJyU1HeHrG+C4un39GEwWSlVlrK/fJpFI7G/g9estZNlIUYmKomIVefkFZOfkkZ2TR15+AcUlKrQ6PYpip7m5Bf/oGItLS4iunj6O0u3rp6unj0rFgbqsnPX19XfCAXZ2dui44KFSsdPa1s741auEQqtsbGywubnJs2e/8+rVK8LhMNFodL9feLt8HEe104VKXc6tW7/8LxwgkUiwvb1NOPwnsViMA5YcWMJzsYv36fR246pzU1au4ebNn9nd3T3e5GOW6PB4OcwFj5cGdxMarfRJwgFEa7uHg7S1e2hsakGjlVhbu/FJwgFEy/l2DtaBXjZhNJnZ2tr66MHxeJxIJIJoaj7Pgc61Uq7RkZ2Tx4h/lNcn2EQikSAWi7Gzs8PWH1u8ePGCJ0+e8OudO0xMTtLb109rWzv1DW6E+2wzBznbeA6bvXr/x6HYHKyv3yYajR4aHIlECMzN0dXdQ3NzC44qJwajifJyDSWlagqLSiguUaPR6jGZK1FsVYj6hkYOdxaLVeFMQSGpaRnknymg86KXp0+fHngVw+EwlYqdr75OJSc3n5JSNZLeiMVqw+5wUlNbR129m/qGRhrcTTS4mxC1rgaOUlVdi142kpt3htS0DDRaHTMzs2xvb7+zgWg0itvdSHpGFtZKO7WuBlx1/zpotqh2ujiKs8aFs6YOm70KjVYiKzuXzKwcXHX13L//G/F4HIDd3V08nRdJSc3AZLbirKk7crawO5wxu8PJcTiq9lisNlTqCjIysyksKmFgYJCXL18C4PePkpKajkarx1FVc9TMmKhUHA8Um4OTqlQcGIxmiopLycjMxmSysLq6hq+3j9S0DNRlFceZ8UCYzYrRbFHeWKwKJ2fDbFGQ9AbOFBSSk5tPdk4emVk56CQZi9V2aK/ZorwxmxWjkCQpyWiyThpNFk7PisFopkIjoVJXoNFKGIxH9kxKkrT3SJVlOVkvmyYlveGtXjZyWrLBtO896yJ62TQpy3LyOy9kSZKSJEm2anX6R1qdPq6TZD6mvZn6h5IkG/ZPLoT4CwYoX4ezI796AAAAAElFTkSuQmCC",
			onmouseover: "nextPage.next();",
			oncommand: "nextPage.next();",
		},
		{
			tooltiptext: "",
			image: IMG,
		},
		{
			id: "NextPage-button",
			tooltiptext: "下一頁",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE+klEQVRYhcXXSVNTaRTG8fsh+AB+mraYkUEKpAnSkgRCUkkIAgkZSCCEwTCIzM0gg4ImJLlkgojV3QtXbZVVKroRod20sFFQLxL594KhsKUDdDmcqt/unPM+7+a9dQVhv0RRTIrGYprF2NLzhdhSfPHefb6mhdhSfOHe/eXo4r1yURSThKM1Fw6fi0Rjc5FobDu6cI8TLR5xmv4jItGYFI7GvHPh8LnDm8+Hot5QeIFTiSwghsJ45gIEgmFCkVPO/ct8KOoVRTFJ8AWDGjEYksRgmBOFwnh8ASzWBmQlpag1eqZuzzAfipw8+4WQ5AsGNcLdOf8zvxgkMB/CLwb3zeMPHEMM0tHVQ0AUuTUzQ9aFHCpUambuePbmjptJwOcXnwlyZcVOTa2Rjq7rjIxNMD1zh7teHx5fAK8/gMe3by7AXa+POpOZp8vLxONxJqenyczK5mqtkVmP97DvDHaEn86ncD45lbT0THLz8pGVlKJSa2mwN9HbN8jYxBTTM3eY9fiYuj2Lvuoqq2trAEiSxM2JCbJz8nA0uZj1+M5MqDOaUGu0lP5yhYLCIi5k55KWnklqWgaZWdlczC/kcmkZOn01FqsdjVbHxsYGB3UQIr/gEtc6urk16zkTQZIk3rx9y+vX67x8+ZLHj5/w4MEDQuEIQ8O/YrE27Acso/DSz9TWGtnc3ORoSZLE6OgYPxeX0NM7wNTtWSZvzZyKQILa3d1le3ubt5ubbGxssLq6yurqGp8+ffqi9/379wwMDlGmKGdgaISbU7cYn5w+UcIAZ613794zODiMVmdgcHiU0fFJRsYmEvqqAfZCvGNoaBhjvYXB4VGGR8YT+uoBADa3tujrH8DR1MzA0EhC3yQAwPr6OobqGlra3PQNDNPbP3QsYWxsnHAkwqNHj1hZWeHv16958+YNkiQRj8f/1+EfP37kt9//oKCwiDqTmZ7eAa7f6D+WYGtoxGS2oa+6irJcRXm5Cq1WT53RhNPp4kZvH/5AgD8fPmRtbS1hqN3dXf569Qp3Rye5efmkpmVgrLfQ3dNHZ/eNYwkdXT10dPXg7uimpc2No8mFyWxFqzdQLCslJ/ciWRdyyMzKPvYNOKitrS38/gBXyhQkp6SRkppBsawUV+s1Ojqv4/4PQtu1Tg60X+uk3d11qLXdjdPVhqG6lpTUdIwmM5IkfXZwPB7n8eMn1JstZGReICU1nbyLBej01TibW2k/sv84Qkubm0Ra29yoNXqSU9Lo7ev/7BFaX19ncHCIgsKi/YML0emrcTQ2H86etF9wutpIpKm5FVlJKckpaYjBILD39C4t3UdVqT78iGm0VdjsjTS72mg+YedRQmOTi0Qa7E3kFxSRmpZBMBTmxYsVnM0usnPyyMnNR63RYbHa9/qdLQl3HUdosDeRiK2hkWLZZVJS0ymWlVAsu0xuXj6Vah31Zht2hxO7w5lwRyKCxWonEavNQU2tCVlJKQWFRVSo1BhNFqw2B1abI+HsaQj1ZhunYaq3Yqq3nqr3LIQ6o5kfSbhaY+RHEqoMNTtVhhp+kB1BqzM81ekN/AhaneGpUFmpq6hU6z6oNTq+p0q17kNlpa5CkMvlSRUqjbdCpeb70njlcvneT6pSqTynUKq8ckX5tkJZwTcmKZQqr1KpPPfZH7JcLk+Sy5WaK2WK51fKFPEyuZKvaW+nYlkuV5Yf3lwQhH8AVlohEC+deqQAAAAASUVORK5CYII=",
			onmouseover: "nextPage.next(true);",
			oncommand: "nextPage.next(true);",
		},
		{
			tooltiptext: "",
			image: IMG,
		},
		{
			id: "ScrollBottom-button",
			tooltiptext: "滾動到頁面底部",
			image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFLklEQVRYhcXXW08aaQDG8fdD+AG6X2abguABpAGtZwcEhghSOYpWFG09S0EFaz3gscppHA6emu4m26ttulm3rRdtqt2bVnvh0lSstM9euBqLg+Jmt32TX8LN/OeZuSFDyD+HYZic+Oq6Jhpb2VSq6NSPV3kwmS1IJpPgOhM+HyZ8U1hbf4SVtYcXWl5dTy2vPXweX1mrZRgmh5w+4XD8h1h8NRCLrx7EV9ZgtTXj6jU+aE0d9vb+4hwQjcYwOOTB8uo64strWYvFVw9i8dVAIBq9cvLkbCQeiESXEYkuIxpfgXvQA4EwH5VV1Xi3s8M54OnT39Dq6AAbjeP42stYisT9DMPkkCDLahg2kmTYKBg2iqVIDL7pWYiLpJDKSvD69WvOAa9evYKu/iYWA0EwkaNrLyeSDLKshgRDzItQeAknGBZzC36UlVehoFCMjY0/OAe8ffsWNF2Hcd8UQgyLrxpZCoaYF2QxED5cDIRxIhjGgj8IlboOuYI8/PL4MeeAvb09aHV6OF2D8IcYfNXI3iGZXwwi3YI/CFuzHfxcISLRGOeAZDIJk9kCe2s7FvxnG9kiM/OLSDf3YBH9TjeEeQXwjtzDly9fzgxIpVJoc7RDqdZganb+TCNbxDczh3RTs/PwjIxCXHQdTU23cHBwwPkWXO5BSGUlGB2bxPTcA0zNzmNyevZM7zxk3DeNdBNTM7h3fwKlZRWgNVokEgnOAaFQGCKxBJ1dvejtc8JssUGp1sBkaYT33hgmpmbOtNOR0bFJZFKrolFVVYPd3V3OAb8+eYL8gkLkF4ggEOaDxxeAxxeAnyuEvsGYsXsaGRkdBxfPyH0YjBbIim9ga2uLc8DW9jYMRjPMFivcg0NYYlmwkShulJajvLIaw95RzvZpZNg7imPuIS86u3rRaGvGTYMJWp0eRpMZW1vbnANSqRQSiQSSySQ+f/4MAHj58iVKS8vRYLTgdDsT4h7ywj3khWvQgwajGUssi83NTWxtb2N3dxeJROIkftHZ39+Ho70DYokU3b0DGBwewXE/E+J0DeGuexjdvQOQFd/A3NwcDg8Ps7ph+llbf4hCURHq9QY4XUNZIX0DLvQ73ejuHUBpWQXyC0SYnpnJ+Dec6bzb2YFKTUMklqDjTjf6nW70DbguRHr6nDh2y94GqawEefmFmPD5sh6RSqXg8XjBzxVCq7uJ082LkM7uPhzr6umHvbUdZeWVRyMmJ7Ma8fvGBqSyEojEEtjbOtDV04/T3fOQ2509OO1OZw/aHLdByZUoKBRjbHwCHz9+zHjzRCIBq9WGa7xc0Bod0nsXIY6OTqRr7+hEm+M2aI0OIrEEHo8344hQKAxhXgFEYgmamu1o5+idh7S2deA89XoDJNdlnCPevPkT1TVy8PgCKFWaczuZkFstbcjMgRa7AwajBcUlZRj2ePHhwwcAwMGnT+jp7cM1ngAisQQWaxNa7I5zWtyIrakFF2lqtsNotqK8ogrOuy68f/8ej376GeKi6+DxBZArVLA1X9zhQqyNzciWydwISl4LlZqGVFYMHl+AIokUBqM560Y6YjI34jKMJiuUKhqlZRWorKqBrr7hUtenIw0GMy7LYLRw/v43SL3ecFivN+A7OSR1Wv0zrU6P76FOq39G1GqtUk1r92mNFt+Smtbuq9VaJaEoKqdWSQeUKhrflsZPUdTRR6pCobgir1UGKHntgVyhxP8sKVeo/AqF4spXX8gUReVQlEJTXSPfrK6Rp2ooBf5LR035c4pS1J48OSHkb00IGjA/4502AAAAAElFTkSuQmCC",
			oncommand: "content.scrollTo(0, 10000000000);",
		},
		{
			tooltiptext: "",
			image: IMG,
		},
	];
	TriggerZone.init();

	function $(id) document.getElementById(id);
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
	function addStyle(css) {
		var pi = document.createProcessingInstruction(
			'xml-stylesheet',
			'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
		);
		return document.insertBefore(pi, document.documentElement);
	}
})();
