// 域名地址
let domainName = "http://ceshi.yidianxueche.cn";
// 学校id
let school_id = 1;
// 获取保存的经纬度
let latlng=JSON.parse(sessionStorage.getItem("latlng"));
// ajax-get调用
function ajaxGet(_url, _data) {
	var dataAjax = "";
	$.ajax({
		type: "get",
		url: domainName + _url,
		dataType: "json",
		data: _data,
		success: function(data) {
			dataAjax = data;
		},
		error: function(res) {
			dataAjax = "请求出错";
		},
		async: false
	});
	return dataAjax;
}
// ajax-post调用
function ajaxPost(_url, _data) {
	var dataAjax = "";
	$.ajax({
		type: "post",
		url: domainName + _url,
		dataType: "json",
		data: _data,
		success: function(data) {
			dataAjax = data;
		},
		error: function() {
			dataAjax = "请求出错";
		},
		async: false
	});
	return dataAjax;
}
function ajaxWX() {
	
		var dataAjax = "";
	$.ajax({
		type: "get",
		url: "http://ceshi.yidianxueche.cn/api/user/index",
		success: function(data) {
			dataAjax = data;
		},
		error: function() {
			dataAjax = "请求出错";
		},
		async: false
	});
	return dataAjax;
}

//转换百度坐标
    var getBaiduLocation = function(longitude,latitude) {
        $.ajax({
            type: "GET",
            url: 'http://api.map.baidu.com/geoconv/v1/?coords='+longitude+','+latitude+'&from=1&to=5&output=json&ak=nHbhscSu1l3CjSLBNRUleeW1lppoVpaL',
            dataType: 'jsonp',
            success: function (msg) {
                try {
                    var result = msg.result;
                    var lat = result[0].y;
                    var lng = result[0].x;
                    //alert("99.999999,29.537472");

                    //location.href="http://api.map.baidu.com/direction?origin="+lat+","+lng+"&destination=29.614186,106.335563&mode=driving&region=重庆&output=html";
                    var href="http://api.map.baidu.com/direction?origin="+lat+","+lng+"&destination=29.537472,99.999999&mode=driving&region=重庆&output=html";

                    $("#address").attr('href',href);
                } catch (e) {
                    $.fn.alert(e.message);
                }
            }
        });
    };