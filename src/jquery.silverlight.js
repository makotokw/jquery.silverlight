/*!
 * jquery.silverlight
 * 
 * Copyright (c) 2009-2010 makoto_kw (makoto.kw@gmail.com)
 * Dual licensed under the MIT and GPL licenses.
 * 
 * Version: 1.0
 */
(function($) {
	var ua = navigator.userAgent.toLowerCase(),
		check = function(r){return r.test(ua);},
		isOpera = check(/opera/),
		isWebKit = check(/webkit/),
		isGecko = !isWebKit && check(/gecko/),
		isIE = !isOpera && check(/msie/),
		isWindows = check(/windows|win32/)
		;
	$.fn.extend({
		silverlight:function(options) {
			options = $.extend({
				data:'data:application/x-silverlight-2,',
				type:'application/x-silverlight-2',
				width:'100%',
				height:'100%',
				param: {
					onError: 'onSilverlightError',
					minRuntimeVersion: '3.0.40818.0',
					autoUpgrade: 'true'
				},
				content:'<a href="http://go.microsoft.com/fwlink/?LinkID=149156&v=3.0.40818.0" style="text-decoration:none">'
 			  		+'<img src="http://go.microsoft.com/fwlink/?LinkId=108181" alt="Get Microsoft Silverlight" style="border-style:none"/>'
 					+'</a>'
			},options);
			var $obj = $('<object/>');
			$.each(['id','data','type','width','height'], function() {
				var k = this.toString(), v = options[k];
				if (v !== undefined) {
					$obj.attr(k,v);
				}
			});
			$.each(options.param, function(name, value) {
				$obj.append($('<param>').attr({name: name,value: value}));
			});
			$obj.append(options.content);
			$(this).append($obj);
		}
	})
})(jQuery);