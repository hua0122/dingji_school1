
// 内容详情
let user_index="/api/user/index";
// 建议投诉
let user_feedback="/api/user/feedback";
// 学习中心
let user_study="/api/user/study";
// 内容详情
function wxinfoindex() {
	let id=parseInt(window.location.href.split("id=")[1]);
	let data = ajaxWX(user_index)
	$("#my_model").attr("src",data.data.headimgurl)
	$("#nickname").text(data.data.nickname)
}

function feedback(content) {

	let ajaxdata = {
		content:content,
		school_id: school_id
	}
	let data = ajaxPost(user_feedback, ajaxdata)
	data=eval("("+data+")");
	if(data.code=='200'){
		alert('提交成功');
		location.href="../user/index";
	}else{
		alert("提交失败");
	}
}


function study() {
	let data = ajaxGet(user_study)
	if(data.status=="000"){
		$(".nodata").show();
		$(".info").hide();
	}
	
	if(data.status=="200"){
		$(".nodata").hide();
		$(".info").show();
	}
	
}
function index(){
	wxinfoindex();
}



