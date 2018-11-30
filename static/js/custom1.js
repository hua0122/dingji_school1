if (/Android/gi.test(navigator.userAgent)) {
	window.addEventListener('resize', function() {
		if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
			window.setTimeout(function() {
				document.activeElement.scrollIntoViewIfNeeded();
			}, 0);
		}
	});
}

//微信浏览器中，aler弹框不显示域名
(function() {
	//先判断是否为微信浏览器
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		//重写alert方法，alert()方法重写，不能传多余参数
		window.alert = function(name) {
			var iframe = document.createElement("IFRAME");
			iframe.style.display = "none";
			iframe.setAttribute("src", 'data:text/plain');
			document.documentElement.appendChild(iframe);
			window.frames[0].window.alert(name);
			iframe.parentNode.removeChild(iframe);
		}
	}
})();
document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>');

$(function() {
	getydxc();
});
$(function() {
	pushHistory();
	window.addEventListener("popstate", function(e) {
		// 		if (typeof document.referrer === '') {
		// 			// 没有来源页面信息的时候，改成首页URL地址
		// 			location.href = "/";
		// 
		// 		}else{
// 		let urlfrom=location.href.indexOf("index/index.html");
// 		if(urlfrom!=-1){
// 			WeixinJSBridge.call('closeWindow');
// 		}else{
		// location.href = document.referrer;
		// }
		// }

	}, false);

	function pushHistory() {
		var state = {
			title: "title",
			url: "#"
		};
		window.history.pushState(state, "title", "#");
	}

});
//微信配置
function getydxc() {
	$.ajax({
		type: 'GET',
		url: 'http://ceshi.yidianxueche.cn/s_user/tp.php?method=getwxpz',
		dataType: 'json',
		success: function(data) {
			sessionStorage.setItem("wxdata", JSON.stringify(data));
			if (1 == data.code) {
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: data.content.appId, // 必填，公众号的唯一标识
					timestamp: data.content.timestamp, // 必填，生成签名的时间戳
					nonceStr: data.content.nonceStr, // 必填，生成签名的随机串
					signature: data.content.signature, // 必填，签名，见附录1
					jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo',
						'onMenuShareQZone', 'getLocation', 'chooseWXPay'
					] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});

				var title = "易点学车服务平台";
				var link = "http://ydxctrue.yidianxueche.cn/";
				var imgUrl = "http://ydxctrue.yidianxueche.cn/template/wap/public/css/self/image/banner_1.jpg";
				var desc = "人工智能引领驾培未来，易点学车定制中国好司机";
				var type = "";
				var dataUrl = "";
				wx.ready(function() {
					wx.getLocation({
						type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						success: function(res) {
							var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
							var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
							sessionStorage.setItem("latlng", JSON.stringify({
								lat: latitude,
								lng: longitude
							}))
						}
					});
					wx.onMenuShareTimeline({
						title: title, // 分享标题
						link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: imgUrl, // 分享图标
						success: function() {
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
					wx.onMenuShareAppMessage({
						title: title, // 分享标题
						desc: desc, // 分享描述
						link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: imgUrl, // 分享图标
						type: type, // 分享类型,music、video或link，不填默认为link
						dataUrl: dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
						success: function() {
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
					wx.onMenuShareQQ({
						title: title, // 分享标题
						desc: desc, // 分享描述
						link: link, // 分享链接
						imgUrl: imgUrl, // 分享图标
						success: function() {
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
					wx.onMenuShareWeibo({
						title: title, // 分享标题
						desc: desc, // 分享描述
						link: link, // 分享链接
						imgUrl: imgUrl, // 分享图标
						success: function() {
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
					wx.onMenuShareQZone({
						title: title, // 分享标题
						desc: desc, // 分享描述
						link: link, // 分享链接
						imgUrl: imgUrl, // 分享图标
						success: function() {
							// 用户确认分享后执行的回调函数
						},
						cancel: function() {
							// 用户取消分享后执行的回调函数
						}
					});
				});
			} else {
				//alert('系统繁忙！稍后再试！');
			}
		},
		error: function(data) {
			//layer.msg('删除失败!',{icon:1,time:1000});;
		},
	});
}
// 获取url有效信息
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
