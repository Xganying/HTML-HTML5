// 定时器js

var canvas = document.getElementById('countDown');
var context = canvas.getContext("2d");
var start = document.querySelector('a.J_start');
var stop = document.querySelector('a.J_stop');
var reset = document.querySelector('a.J_reset');

// 绘制定时器数字
function draw(text){ // 清空画布指定矩形区域内容
	context.clearRect(0, 0, parseInt(canvas.width), parseInt(canvas.height));
	context.fillStyle = 'black';// 设置画布定时器背景颜色为黑色
	context.font = 'italic 50px sans-serif'; // 设置文字字体和大小
	context.textBaseline = 'top'; // 设置文字基线
	context.fillText(text || '00:00:00:000', 0, 0); // 填充文字到指画布指定区域
	var start_time=null; //单击开始时间，时差（毫秒），停顿时的时差（毫秒），轮询变量
	var	time_spend=null;
	var	time_stop=null;
	var	interval=null;

	function runtime(){
		// 计算时差，返回指定格式：hh:MM:ss:SSS
		time_spend = (new Date() - start_time + time_stop) || 0;
		var hour, minute, second, millisecond, temp_time_spend = time_spend;
		millisecond = temp_time_spend % 1000; // 获取毫秒
		temp_time_spend = parseInt(temp_time_spend / 1000); // 获取剔除毫秒后的秒
		second = temp_time_spend % 60; // 获取秒
		temp_time_spend = (temp_time_spend - second) / 60; // 获取剔除毫秒后的分
		minute = temp_time_spend % 60; // 获取分
		hour = (temp_time_spend - minute) / 60; // 获取剔除毫秒后的小时
		second = second < 10 ? ('0' + second) : second; // 不足2位补0
		minute = minute < 10 ? ('0' + minute) : minute;
		hour = hour < 10 ? ('0' + hour) : hour;
		return [hour ,minute, second, millisecond].join(':');
	}

	// 开始按钮单击事件
	start.addEventListener('click',function(e){
		e.preventDefault(); // 禁止a链接默认事件
		if( ! interval){
			start_time = new Date();
			interval = setInterval(function(){ // 每10ms执行一次，获取对应的计数并绘制
				draw(runtime());
			},10);
		}
	},false);

	// 暂停按钮单击事件
	stop.addEventListener('click',function(e){
		e.preventDefault();
		// 缓存停止时候的时差
		time_stop = time_spend;
		clearInterval(interval);
		interval = null;
	},false);

	// 复位按钮单击事件
	reset.addEventListener('click',function(e){
		e.preventDefault();
		time_stop = 0;
		clearInterval(interval); // 清零时差
		interval = null;
		draw(); // 绘制默认计数
	},false);
}

draw();
