var lazyLoadImg = new LazyLoadImg({
	el: document.querySelector('body'),
	mode: 'diy', //默认模式，将显示原图，diy模式，将自定义剪切，默认剪切居中部分
	time: 300, // 设置一个检测时间间隔
	done: true, //页面内所有数据图片加载完成后，是否自己销毁程序，true默认销毁，false不销毁
	position: { // 只要其中一个位置符合条件，都会触发加载机制
		top: 0, // 元素距离顶部
		right: 0, // 元素距离右边
		bottom: 0, // 元素距离下面
		left: 0 // 元素距离左边
	},
	diy: { //设置图片剪切规则，diy模式时才有效果
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center'
	},
	before: function() {},
	success: function(el) {
		el.classList.add('load-success')
	},
	error: function(el) {
		el.src = ''
	}
})