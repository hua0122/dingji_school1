// 内容详情
let user_index = "/api/user/index";
// 建议投诉
let user_feedback = "/api/user/feedback";
// 学习中心
let user_study = "/api/user/study";
// 内容详情
function wxinfoindex() {
	let id = parseInt(window.location.href.split("id=")[1]);
	let data = ajaxWX(user_index)
	$("#my_model").attr("src", data.data.headimgurl)
	$("#nickname").text(data.data.nickname)
}

function feedback(content) {

	let ajaxdata = {
		content: content,
		school_id: school_id
	}
	let data = ajaxPost(user_feedback, ajaxdata)
	data = eval("(" + data + ")");
	if (data.code == '200') {
		alert('提交成功');
		location.href = "../user/index";
	} else {
		alert("提交失败");
	}
}


function study() {
	let data = ajaxGet(user_study)
	if (data.status == "000") {
		$(".nodata").show();
		$(".info").hide();
	}

	if (data.status == "200") {
		$(".nodata").hide();
		$(".info").show();
		$(".infoaddress").text(data.data.study.address);
		$("#lng").val(data.data.study.lng);
		$("#lat").val(data.data.study.lat);
		$(".infograde_name").text(data.data.study.grade_name);
		$(".infoprice").text(data.data.study.price);
		$(".infopayable").text(data.data.study.payable);
		$(".infopayment").text(data.data.study.payment);
		$(".infounpaid").text(data.data.study.unpaid);
		$(".infosn").text(data.data.study.sn);
		$(".infosign_date").text(data.data.study.sign_date);
		$("infocontent").text(data.data.study.content);
		$(".codecode").text(data.data.code.code);
		$(".codeverify").text(data.data.code.verify);
		$(".codestation_name").text(data.data.code.station_name);
		$(".codecreate_time").text(data.data.code.create_time);
	}

}
function index() {
	wxinfoindex();
}
var wxconfig={
	config:function(data){
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: data.appId, // 必填，公众号的唯一标识
			timestamp: data.timestamp, // 必填，生成签名的时间戳
			nonceStr: data.nonceStr, // 必填，生成签名的随机串
			signature: data.signature, // 必填，签名，见附录1
			jsApiList: ['getLocation,chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	},
	getLocation:function(data){
		wx.ready(function() {
			wx.getLocation({
				success: function(res) {
					console.log(res.latitude); //纬度
					console.log(res.longitude); //经度
		
// 					var geocoder = new qq.maps.Geocoder({
// 						complete: function(result) { //解析成功的回调函数
// 							var address = result.detail.address; //获取详细地址信息
// 		
// 							if (address.indexOf("沙坪坝") != -1) {
// 								$("#city").val('1');
// 								get_list(1);
// 							} else if (address.indexOf("南岸") != -1) {
// 								$("#city").val('2');
// 								get_list(2);
// 							} else if (address.indexOf("北碚") != -1) {
// 								$("#city").val('3');
// 								get_list(3);
// 							} else {
// 								alert('请选择最近区域');
// 							}
// 							console.log(address);
// 						}
// 					});
					// geocoder.getAddress(new qq.maps.LatLng(res.latitude, res.longitude));
		
				},
				fail: function(res) {
					console.log(res.latitude);
				},
				cancel: function(res) {}
			});
		});
	},
	chooseWXPay:function(data){
		wx.ready(function() {
			console.log(data);
			wx.chooseWXPay({
				appId: data.appId, //公众号名称，由商户传入
				timestamp: data.timestamp, //时间戳，自1970年以来的秒数
				nonceStr: data.nonceStr, //随机串
				package: data.package,
				signType: "MD5", //微信签名方式：
				paySign: data.paySign, //微信签名
				success: function(res) {
					//alert(res.msg);
					window.location.href = "../enlist/success.html";
				},
				cancel: function(res) { // 支付取消回调函数
					window.location.href = "../enlist/fail.html";
				},
				fail: function(res) { // 支付失败回调函数
					window.location.href = "../enlist/fail.html";
				}
			});
		});
	}
}

