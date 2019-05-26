/*
 * jQuery banner plug-in
 * http://www.dasheng.com/
 *
 * Copyright (c) 2010-2012
 * Author: Dasheng
 *
 * Date: 2010-01-10
 * Revision: 0.01
 */
(function($){
	$.fn.dashengBanner=function(setting){
		return this.each(function(){
			
			//分析参数并设定默认值
			var speed=	"normal";	//显示速度:"fast"|"nomarl"|"slow"|(毫秒数) 默认值:"nomarl"
			var alpha=	0.5;		//滚动透明度:(0-1的小数) 默认值:0.5
			var step	=1;			//滚动步长:(块为单位) 默认值:1
			var auto	= false;	//自动滚动:true|false 默认值:false
			var delay	=3;			//自滚延时:(秒) 默认值:3
			
			if(!(typeof(setting)=="undefined")){
				if(!(typeof(setting.speed)=="undefined")) speed=setting.speed;
				if(!(typeof(setting.alpha)=="undefined")) alpha=setting.alpha;
				if(!(typeof(setting.step)=="undefined")) step=setting.step;
				if(!(typeof(setting.auto)=="undefined")) auto=setting.auto;
				if(!(typeof(setting.delay)=="undefined")) delay=setting.delay;
			}
			
			//获取Banner图片
			var oImg=$(this).find(".ban_content img");
			
			//获取滚动块
			var banList=$(this).find(".ban_b_list")
			var count=banList.length;
			var index=0;
			var intervalID=null;
			
			banList.each(function(index){
				//鼠标悬停
				$(this).hover(function(){
					showEffect(index);
				},function(){
					$(this).attr("class","ban_b_list");
				});
			});
			
			//获取控制按钮(可无)
			var pbtn=$(this).find("#prev_btn");
			var nbtn=$(this).find("#next_btn");
			//若无则创建之(供内部维护,防止页面出错)
			if(nbtn.length<=0) nbtn=$("<div id=next_btn></div>");
			if(pbtn.length<=0) pbtn=$("<div id=prev_btn></div>");
			
			//获取内容框架(必需)
			var content=$(this).find(".ban_b_content");
			//添加默认样式
			content.parent().css("position","relative");
			content.css("position","relative");
			
			//往前点击
			var scrollPrev=function(){
				pbtn.unbind("click",scrollPrev);
				content.css({marginLeft:-step*banList.width()})
				for(i=1;i<=step;i++){
					content.find("div:last").prependTo(content);
				}
				content.animate({opacity:alpha},speed);
				content.animate({
					marginLeft:0,opacity:1
				},speed,function(){
					pbtn.bind("click",scrollPrev);
				
					index--;
					index=(index+count)%count;
					showEffect(index);
				});
			}
			
			//往后点击
			var scrollNext=function(){
				nbtn.unbind("click",scrollNext);
				content.animate({opacity:alpha},speed);
				content.animate({
					marginLeft:-step*banList.width(),opacity:1
				},speed,function(){
					$(this).css({marginLeft:0});
					for(i=1;i<=step;i++){
						$(this).find("div:first").appendTo(this);
					}
					nbtn.bind("click",scrollNext);
				
					index++;
					index=index%count;
					showEffect(index);
				});
			}
			
			//切换效果
			function showEffect(i){
				var bpic=banList.eq(i).find("img").attr("rel");

				oImg.animate({opacity:0.5},speed,function(){
					oImg.attr("src",bpic);
					$(this).animate({opacity:1},speed);
				});
				
				banList.attr("class","ban_b_list");
				banList.eq(i).attr("class","ban_b_list_on");
			}
			
			//绑定占击事件
			pbtn.bind("click",scrollPrev);
			nbtn.bind("click",scrollNext);
			
			//添加定时器
			if(auto){
				intervalID=setInterval(function(){
					nbtn.trigger("click");
				},1000*delay);
				
				//鼠标悬浮,清除定时器
				$(this).hover(function(){
					clearInterval(intervalID);
				},function(){
					intervalID=setInterval(function(){
						nbtn.trigger("click");
					},1000*delay);
				});
			}

		});
	}
})(jQuery);