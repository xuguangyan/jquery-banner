# jquery-banner
<br/>jQuery Banner plug-in
<br/><b>大圣横幅切换特效--dashengBanner</b>
<br/>
<br/><link rel="stylesheet" type="text/css" href="css/dashengBanner.css" />
<br/><script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>
<br/><script type="text/javascript" src="js/jquery.banner.js"></script>
<br/>
<br/><script language="javascript">
<br/>$(document).ready(function(){
<br/>	$(".banner").dashengBanner({
<br/>	speed: 	"nomarl",	//显示速度:"fast"|"nomarl"|"slow"|(毫秒数) 默认值:"nomarl"
<br/>	alpha:	.5,			//滚动透明度:(0-1的小数) 默认值:0.5
<br/>	step:	1,			//滚动步长:(块为单位) 默认值:1
<br/>	auto:true,			//自动滚动:true|false 默认值:false
<br/>	delay:4				//自滚延时:(秒) 默认值:3
<br/>	});
<br/>});
<br/></script>
