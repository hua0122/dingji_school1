// 内容详情
let user_index = "/api/user/index";
// 建议投诉
let user_feedback = "/api/user/feedback";
// 学习中心
let user_study = "/api/user/study";
// 我的协议
let user_agreement="/api/user/agreement";
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
	let ajaxdata = {};
	let data = ajaxGet(user_study,ajaxdata)
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
		$(".infocontent").text(data.data.study.content);
		$(".codecode").text(data.data.code.code);
		$(".codeverify").text(data.data.code.verify);
		$(".codestation_name").text(data.data.code.station_name);
		$(".codecreate_time").text(data.data.code.create_time);
	}

}
function agreement(){
	
		let ajaxdata = {
			school_id:school_id,
		}
	let data=ajaxGet(user_agreement,ajaxdata)
}
function index() {
	wxinfoindex();
agreement();
}
