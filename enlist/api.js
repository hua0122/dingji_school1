// banner-api
let sign_get_banner = "/api/sign/get_banner";
// 场地列表
let sign_get_area = "/api/sign/get_area";
// 班别列表
let sign_get_grade = "/api/sign/get_grade";
// 班别详情
let sign_grade_detail = "/api/sign/grade_detail";
// 活动列表
let sign_get_activity = "/api/sign/get_activity";
// 体检站列表
let sign_get_station = "/api/sign/get_station";
// let latlng=JSON.parse(sessionStorage.getItem("latlng"));
// 报名api
// banner
function get_banner() {

	let ajaxdata = {
		school_id: school_id
	}
	let data = ajaxGet(sign_get_banner, ajaxdata)
	let src = "";
	for (var i = 1; i < data.data.length; i++) {
		src += "<li style='background:url(" + domainName + data.data[i].picurl + ") 50% 50% no-repeat;'></li>";

	}
	$(".slides").html(src);
}
// 场地列表
function get_area() {
	let ajaxdata = {
		school_id: school_id
	}
	let data = ajaxGet(sign_get_area, ajaxdata)
	let src = "";
	for (var i = 0; i < data.data.length; i++) {
		src += "<label><input type='radio' name='city' value=" + data.data[i].id + "/>" + data.data[i].name + "</label><br/>"
	}
	$("#area").html(src);
	return data.data
}
// 班别列表
function get_list(city) {
	let ajaxdata = {
		area_id: parseInt(city)
	};
	let data = ajaxPost(sign_get_grade, ajaxdata)
	let src = "";
	if (data.data != null && data.data.length != 0) {

		for (var i = 0; i < data.data.length; i++) {

			src += "<div class='col-xs-12'>" +
				"<a href='../enlist/detail.html?id=" + data.data[i].id + "'>" + data.data[i].name + "C" + data.data[i].type +
				"<span class='right'>" + data.data[i].price + "</span></a>" +
				"</div>";
		}
		$("#course_list").html(src);
	} else {
		$("#course_list").empty();
		$("#course_list").append('<div class="col-xs-12">暂无数据</div>');
	}
}


// 班别详情
function grade_detail() {
	let id = parseInt(window.location.href.split("id=")[1]);
	let ajaxdata = {
		id: id
	};
	let data = ajaxPost(sign_grade_detail, ajaxdata)
	sessionStorage.setItem("grade_detail", JSON.stringify(data.data))
	$(".img-left img").attr("src", domainName + data.data.picurl);
	$(".address_name").text(data.data.address);
	$(".infocontent").text(data.data.content);
	$(".infonotice").text(data.data.notice);
	$(".enroll-btn").attr("href", "../enlist/sign.html?id=" + data.data.notice)
}
// 活动列表
function get_activity() {

	let ajaxdata = {
		school_id: school_id
	};
	let data = ajaxPost(sign_get_activity, ajaxdata)
	let src = "";
	for (var i = 0; i < data.data.length; i++) {
		src += '<div class="modal-body">' +
			'<input type="radio" value="' + data.data[i].id + '" class="activity_id" name="activity_id" style="width: 25px;">' +
			'<div><img src="" width="83" height="83"/> <br/>' + data.data[i].name + '</div>' +
			'<div><span>' + data.data[i].description + '</span></div>' +
			'</div>';
	}
	$("#activity").html(src);
}
// 体检列表
function get_station() {

	let ajaxdata = {
		school_id: school_id
	}
	let data = ajaxGet(sign_get_station, ajaxdata)
	let src = "";
	sessionStorage.setItem("get_station", JSON.stringify(data.data))
	var map = new BMap.Map("container");
	var point1 = new BMap.Point(latlng.lng, latlng.lat);
	for (var i = 1; i < data.data.length; i++) {

		var point2 = new BMap.Point(data.data[i].lng, data.data[i].lat);
		let distancetext = Math.round(map.getDistance(point1, point2) / 1000);
		src += '<li>' +
			'<div  class="shenqing">' +
			'<span class="left tit">' +
			'<span class="station">' + data.data[i].name + '</span>' +
			' <span class="dizhi">地址:' + data.data[i].address + '</span>' +
			'</span>' +
			'<span class="right address">距您' + distancetext + 'km <img src="../static/images/map1.png" width="30"/></span>' +
			'</div>' +
			'</li>';

	}
	$(".stationitem").html(src);
}

function index() {
	get_banner();
	return get_area();
}

function detail() {
	grade_detail();
}

function subsign() {
	let grade_detail = JSON.parse(sessionStorage.getItem("grade_detail"));
	$("#grade_id").attr("value", grade_detail.id)
	$(".gradename").text(grade_detail.name)
	$(".gradetype").text(grade_detail.type)
	$("#payable").text(grade_detail.price)
	$(".gradearea_name").text(grade_detail.area_name)
	$("#area_id").attr("value", grade_detail.area_id)
	$(".total-count").text(grade_detail.price)

	get_activity();
}

function test() {
	get_station()
}


function geocoderfun(indexdata){
			var distance = [];
				var geocoder = new qq.maps.Geocoder({
					complete: function(result) { //解析成功的回调函数
						var address = result.detail.address; //获取详细地址信息
						var map = new BMap.Map("container");
						var point1 = new BMap.Point(latlng.lng, latlng.lat);
						for (var i = 0; i < indexdata.length; i++) {
							var point2 = new BMap.Point(indexdata[i].lng, indexdata[i].lat);
							distance.push(map.getDistance(point1, point2) / 1000);
						}
						if(distance.length==indexdata.length){
							let distanceMin = Math.min.apply(null, distance); //最小值
							if (distanceMin <= 5) {
								let dataindex = distance.indexOf(distanceMin)
								$("#city").val(indexdata[dataindex].id);
								get_list(indexdata[dataindex].id);
								$("#text").html(indexdata[dataindex].name);
							} else {
								alert('请选择最近区域');
							}
							}
						
						// console.log(res.latitude); //纬度
						// console.log(res.longitude); //经度
						// console.log(address);
					}
				});
				geocoder.getAddress(new qq.maps.LatLng(latlng.lat, latlng.lng));
			}