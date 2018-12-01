// banner-api
let index_get_banner = "/api/index/get_banner";
// 走进鼎吉
let index_get_about = "/api/index/get_about";
// 发现最美鼎吉
let index_get_beautiful = "/api/index/get_beautiful";
// 教练风采
let index_get_coach = "/api/index/get_coach";
// 团队风采
let index_get_team = "/api/index/get_team";
// 学员风采
let index_get_student = "/api/index/get_student";
// 最新活动
let index_get_activity = "/api/index/get_activity";
// 首页api
function get_banner() {

	let ajaxdata = {
		school_id: school_id
	}
	let data = ajaxGet(index_get_banner, ajaxdata)
	let src = "";
	for (var i = 1; i < data.data.length; i++) {
		src +=
			"<li data-delay='5' style='height: 100%;' data-src='5' data-trans3d='tr6,tr17,tr22,tr23,tr26,tr27,tr29,tr32,tr34,tr35,tr53,tr54,tr62,tr63,tr4,tr13' data-trans2d='tr3,tr8,tr12,tr19,tr22,tr25,tr27,tr29,tr31,tr34,tr35,tr38,tr39,tr41'>" +
			"<img style='height: 100%;' src='../static/images/blank.png' data-src='" + domainName + data.data[i].picurl + "' data-thumb='" +
			domainName + data.data[i].picurl + "'/>" +
			"</li>";
	}
	let bannersrc =
		"<li data-delay='5' style='height: 100%;' data-src='5' data-trans3d='tr6,tr17,tr22,tr23,tr29,tr27,tr32,tr34,tr35,tr53,tr54,tr62,tr63,tr4,tr13,tr45' data-trans2d='tr3,tr8,tr12,tr19,tr22,tr25,tr27,tr29,tr31,tr34,tr35,tr38,tr39,tr41'>" +
		"<img style='height: 100%;' src='" + domainName + data.data[0].picurl + "'  data-thumb='" + domainName + data.data[0].picurl + "'/>" +
		" </li>" + src;
	$("#volistbanner1").html(bannersrc);
	var cuteslider3 = new Cute.Slider();
	cuteslider3.setup("cuteslider_3", "cuteslider_3_wrapper", "../static/css/slider-style.css");
	cuteslider3.api.addEventListener(Cute.SliderEvent.CHANGE_START, function(event) {});
	cuteslider3.api.addEventListener(Cute.SliderEvent.CHANGE_END, function(event) {});
	cuteslider3.api.addEventListener(Cute.SliderEvent.WATING, function(event) {});
	cuteslider3.api.addEventListener(Cute.SliderEvent.CHANGE_NEXT_SLIDE, function(event) {});
	cuteslider3.api.addEventListener(Cute.SliderEvent.WATING_FOR_NEXT, function(event) {});
	
	// document.querySelector("#cuteslider_3").style.height="100%";
}


function get_name(get_name, index_get_name) {
	let ajaxdata = {
		school_id: school_id
	}
	let data = ajaxGet(index_get_name, ajaxdata)
	let srcone = "<img src='" + domainName + data.data[0].picurl + "' style='width:66%;height: 105px;' />" +
		"<img src='" + domainName + data.data[1].picurl + "' style='width:33%;height: 105px;float: right;' />";
	let srctwo = "<img src='" + domainName + data.data[2].picurl + "' style='width:31.9%;height: 105px;' />" +
		"<img src='" + domainName + data.data[3].picurl + "' style='width:33%;height: 105px;' />" +
		"<img src='" + domainName + data.data[4].picurl + "' style='width:33%;height: 105px;float: right;' />";
	$(get_name).find(".img-one").html(srcone);
	$(get_name).find(".img-two").html(srctwo);
}
// 走进鼎吉
function get_about() {
	get_name(".get_about", index_get_about);
}

// 发现最美鼎吉
function get_beautiful() {
	let ajaxdata = {
		school_id: school_id
	}
	let data = ajaxGet(index_get_beautiful, ajaxdata)
	let src = "";
	for (var i = 1; i < data.data.length; i++) {

		src += "<li>" +
			"<span class='pic'><img src='" + domainName + data.data[i].picurl + "'></span>" +
			"</li>";
	}
	$("#marquee1_1").html(src);
	// 开启无缝滚动
	// marqueeStart(1, "left");
$("#marquee2").kxbdMarquee({
					isEqual: false
				});
}

// 教练风采
function get_coach() {
	get_name(".get_coach", index_get_coach);
}
// 团队风采
function get_team() {
	get_name(".get_team", index_get_team);
}
// 学员风采
function get_student() {
	get_name(".get_student", index_get_student);
}
// 最新活动
function get_activity() {
	let ajaxdata = {
		school_id: school_id
	}
	let data = ajaxGet(index_get_activity, ajaxdata)
	$(".activity-item").find("img").attr("src", domainName + data.data.picurl)
	$(".activity-item").find("h2").text(data.data.title)
}

function index() {
	get_banner();
	get_about();
	get_beautiful();
	get_coach();
	get_team();
	get_student();
	get_activity();
}
