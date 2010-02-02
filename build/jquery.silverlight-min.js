/*
 * jquery.silverlight
 * 
 * Copyright (c) 2009-2010 makoto_kw (makoto.kw@gmail.com)
 * Dual licensed under the MIT and GPL licenses.
 * 
 * Version: 1.0
 */
(function(h){var e=navigator.userAgent.toLowerCase(),c=function(i){return i.test(e)},d=c(/opera/),g=c(/webkit/),b=!g&&c(/gecko/),f=!d&&c(/msie/),a=c(/windows|win32/);h.fn.extend({silverlight:function(i){i=h.extend({data:"data:application/x-silverlight-2,",type:"application/x-silverlight-2",width:"100%",height:"100%",param:{onError:"onSilverlightError",minRuntimeVersion:"3.0.40818.0",autoUpgrade:"true"},content:'<a href="http://go.microsoft.com/fwlink/?LinkID=149156&v=3.0.40818.0" style="text-decoration:none"><img src="http://go.microsoft.com/fwlink/?LinkId=108181" alt="Get Microsoft Silverlight" style="border-style:none"/></a>'},i);var j=h("<object/>");h.each(["id","data","type","width","height"],function(){var m=this.toString(),l=i[m];if(l!==undefined){j.attr(m,l)}});h.each(i.param,function(k,l){j.append(h("<param>").attr({name:k,value:l}))});j.append(i.content);h(this).append(j)}})})(jQuery);