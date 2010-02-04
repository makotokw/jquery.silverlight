/*
 * jquery.silverlight
 * 
 * Copyright (c) 2010 makoto_kw, http://www.makotokw.com
 * Licensed under the MIT license.
 * 
 * @author makoto_kw
 * @version 0.1
 */
(function(j){var a=navigator.userAgent.toLowerCase(),d=function(l){return l.test(a)},c=d(/opera/),k=d(/webkit/),b=!k&&d(/gecko/),e=!c&&d(/msie/),h=d(/windows|win32/);var g={silverlight:{data:"data:application/x-silverlight-2,",type:"application/x-silverlight-2",width:"640",height:"480",param:{onError:"onSilverlightError",minRuntimeVersion:"3.0.40818.0",autoUpgrade:"true"},content:'<a href="http://go.microsoft.com/fwlink/?LinkID=149156&v=3.0.40818.0" style="text-decoration:none"><img src="http://go.microsoft.com/fwlink/?LinkId=108181" alt="Get Microsoft Silverlight" style="border-style:none"/></a>'},window:{id:"silverlightbox",css:{position:"absolute",top:0,left:0,width:"100%",zIndex:100,textAlign:"center",lineHeight:0}},overlay:{enabled:true,id:"silverlightbox_overlay",fadeIn:200,feedOut:400,css:{backgroundColor:"#000",opacity:0.8,position:"absolute",top:0,left:0,zIndex:90,width:"100%",height:"500px"}}};function i(m){m=j.extend(true,{},g.silverlight,m);var l=[],n=[];j.each(["id","data","type","width","height"],function(){var p=this.toString(),o=m[p];if(o!==undefined){l.push(p+'="'+o.toString()+'"')}});j.each(m.param,function(o,p){n.push('<param name="'+o+'" value="'+p+'">')});n.push(m.content);return"<object "+l.join("")+">"+n.join("")+"</object>"}function f(o){if(o=="close"){r()}o=j.extend(true,{},g,o);m();function m(){var t=j("#"+o.window.id);if(t.length==0){t=j("<div/>").attr({id:o.window.id}).css(o.window.css);j("body").append(t)}var s=j("#"+o.overlay.id);if(s.length==0){s=j("<div/>").attr({id:o.overlay.id}).css(o.overlay.css).click(function(u){r();return false});j("body").append(s)}j("embed, object, select").css({visibility:"hidden"});s.hide().addClass("silverlightbox_overlay").fadeIn(o.overlay.fadeIn,function(){});t.silverlight(o.silverlight);n();j(document).bind("keydown.silverlightbox",function(u){if(u.keyCode==27){r()}return true});j(window).bind("resize.silverlightbox",function(){n()})}function r(){j(window).unbind("resize.silverlightbox");j(document).unbind("keydown.silverlightbox");var s=j("#"+o.overlay.id),t=j("#"+o.window.id);t.remove();s.fadeOut(o.overlay.fadeOut,function(){s.remove();j("embed, object, select").css({visibility:"visible"})})}function n(){var s=j("#"+o.overlay.id),v=j("#"+o.window.id);if(s.length>0||v.length>0){var t=q(),u=l(),w=p(t);s.css({backgroundColor:o.overlay.backgroundColor,opacity:o.overlay.opacity,width:t[0],height:t[1]});v.css({top:u[1]+((t[3]-w[1])/2)-5,left:u[0]+((t[2]-w[0])/2)-5,width:w[0]+10,height:w[1]+10});j("object",v).attr({width:w[0],height:w[1]})}}function q(){var u,s;if(window.innerHeight&&window.scrollMaxY){u=window.innerWidth+window.scrollMaxX;s=window.innerHeight+window.scrollMaxY}else{if(document.body.scrollHeight>document.body.offsetHeight){u=document.body.scrollWidth;s=document.body.scrollHeight}else{u=document.body.offsetWidth;s=document.body.offsetHeight}}var t,v;if(self.innerHeight){t=(document.documentElement.clientWidth)?document.documentElement.clientWidth:self.innerWidth;v=self.innerHeight}else{if(document.documentElement&&document.documentElement.clientHeight){t=document.documentElement.clientWidth;v=document.documentElement.clientHeight}else{if(document.body){t=document.body.clientWidth;v=document.body.clientHeight}}}return[Math.min(u,t),Math.max(s,v),t,v]}function l(){var t,s;if(self.pageYOffset){s=self.pageYOffset;t=self.pageXOffset}else{if(document.documentElement&&document.documentElement.scrollTop){s=document.documentElement.scrollTop;t=document.documentElement.scrollLeft}else{if(document.body){s=document.body.scrollTop;t=document.body.scrollLeft}}}return[t,s]}function p(t){var u=o.silverlight.width,s=o.silverlight.height;try{if(u.toString().indexOf("%")!==-1){u=t[2]*parseInt(u)/100}else{u=parseInt(u)}if(s.toString().indexOf("%")!==-1){s=t[3]*parseInt(s)/100}else{s=parseInt(s)}return[u,s]}catch(v){}return[g.silverlight.width,g.silverlight.height]}return this}j.fn.extend({silverlight:function(l){j(this).append(j(i(l)));return this}});j.extend({silverlightContent:i,silverlightBox:f})})(jQuery);