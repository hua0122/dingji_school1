// 内容详情
let user_index = "/api/user/index";
// 建议投诉
let user_feedback = "/api/user/feedback";
// 学习中心
let user_study = "/api/user/study";
// 内容详情
function wxinfoindex() {
	let ajaxdata={};
	let id = parseInt(window.location.href.split("id=")[1]);
	let data = ajaxPost(user_index,ajaxdata);
	$("#my_model").attr("src", data.data.headimgurl)
	$("#nickname").text(data.data.nickname)
}

function feedback(content) {

	let ajaxdata = {
		content: content,
		school_id: school_id
	}
	let data = ajaxPost(user_feedback, ajaxdata)
	if (data.status == '200') {
		alert('提交成功');
		location.href = "../user/index.html";
	} else {
		alert("提交失败");
	}
}


function study() {
	let ajaxdata = {};
	let data = ajaxGet(user_study,ajaxdata)
	console.log(data)
	if (data.status == "000") {
		$(".nodata").show();
		$(".info").hide();
	}

	if (data.status == "200") {
		$(".nodata").hide();
		$(".info").show();
		$(".img-left").html('<img src="'+domainName+data.data.study.picurl+'" class="picurl" />')
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
		$(".infocontent").text(data.data.study.content);
		$(".activity_name").html(data.data.study.activity_name);
		if(data.data.study.activity_type!=null&&data.data.study.activity_type!="null"&&data.data.study.activity_type!=undefined&&data.data.study.activity_type!="undefined"){
			if(data.data.study.activity_type==3||data.data.study.activity_type=="3"){
			$(".activity_amount").html("+"+data.data.study.activity_amount);
			}else{
				$(".activity_amount").html("-"+data.data.study.activity_amount);
			}
		}
		if(data.data.study.activity_gift!=null)
		$(".site").append('<div class="col-xs-12 activity_gift" style="border-top: 1px solid #ccc"><p><b style="font-size: 16px; font-weight: 500">获赠</b><span class="span-right">'+data.data.study.activity_gift+'</span></p></div>')
		$(".codecode").text(data.data.code.code);
		$(".codeverify").text(data.data.code.verify);
		$(".codestation_name").text(data.data.code.station_name);
		$(".codecreate_time").text(data.data.code.create_time);
		
		getBaiduLocation(latlng.lng, latlng.lat, data.data.study.lng, data.data.study.lat); //转换为百度坐标
	}

}

function index() {
	wxinfoindex();
}
